/* One-shot media pipeline: compress project videos (→720p H.264, faststart) and
   optimize images into public/projects/<slug>/ with clean, deterministic names.
   Usage: node .media-build.cjs            (all)
          node .media-build.cjs slug1 slug2 (subset) */
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const ffmpeg = require("ffmpeg-static");
const sharp = require("sharp");

const SRC = path.join(__dirname, "projects");
const OUT = path.join(__dirname, "public", "projects");

// NOTE: Capture.PNG / capture.PNG are Upwork *listing screenshots* (chrome +
// description text) — they are NEVER used as assets, only read for copy.
const projects = [
  { slug: "tera-energy", dir: "Tera Energy marketing Manager",
    images: ["Produits bientot disponible (1).png", "tounis aff.png", "ta7la tab7iraa.png", "mojito 2 edited.png", "FRANCHINE3.png", "aid fitr.png", "aid idha.png"],
    videos: [], cover: { image: "Produits bientot disponible (1).png" } },
  { slug: "city-group", dir: "city group sarl website",
    images: [], videos: [{ src: "video.mp4", out: "demo" }], cover: { poster: "demo" } },
  { slug: "talentmatch-ai", dir: "TalentMatch AI",
    images: [], videos: [{ src: "prketc.mp4", out: "demo" }], cover: { poster: "demo" } },
  { slug: "wakelni", dir: "Wakelni",
    images: [], videos: [{ src: "2.mp4", out: "demo" }], cover: { poster: "demo" } },
  { slug: "recruitment-control-room", dir: "Recrutement control room",
    images: [], videos: [{ src: "1.mp4", out: "demo" }], cover: { poster: "demo" } },
  { slug: "sbiba-heritage", dir: "Sbiba Heritage with IA Innovation",
    images: [], videos: [{ src: "SBIBA.mp4", out: "demo" }], cover: { poster: "demo" } },
  { slug: "mriguel-ecommerce", dir: "ECommerce Marketing Manager",
    images: ["EID FITR.png", "aid idha.png", "ramathan kareem.png"],
    videos: [{ src: "2ed.mp4", out: "ad1" }], cover: { image: "EID FITR.png" } },
  { slug: "video-montage", dir: "Montage Video ( IA , capcut , premiere pro )",
    images: [], videos: [{ src: "MONTAGEE.mp4", out: "reel" }, { src: "MOKITOIA.mp4", out: "mojito" }, { src: "sou9 mirta7.mp4", out: "sou9" }],
    cover: { poster: "reel" } },
  // social-media-design door was removed from the portfolio (2026-06).
];

const VF = "scale=w=min(1280\\,iw):h=min(720\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2";

function encodeVideo(input, outMp4, outPoster) {
  execFileSync(ffmpeg, [
    "-y", "-i", input,
    "-vf", VF, "-r", "30",
    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-crf", "30", "-preset", "veryfast", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "96k",
    outMp4,
  ], { stdio: "ignore" });
  // poster from ~1.2s in
  execFileSync(ffmpeg, [
    "-y", "-ss", "1.2", "-i", input, "-frames:v", "1",
    "-vf", VF, "-q:v", "4", outPoster,
  ], { stdio: "ignore" });
}

async function optimizeImage(input, out, width = 1600, q = 82) {
  await sharp(input).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: q, mozjpeg: true }).toFile(out);
}

(async () => {
  const only = process.argv.slice(2);
  for (const p of projects) {
    if (only.length && !only.includes(p.slug)) continue;
    const srcDir = path.join(SRC, p.dir);
    const outDir = path.join(OUT, p.slug);
    fs.mkdirSync(outDir, { recursive: true });
    const manifest = { slug: p.slug, images: [], videos: [] };

    let n = 1;
    for (const img of p.images) {
      const inp = path.join(srcDir, img);
      if (!fs.existsSync(inp)) { console.log("  ! missing image", inp); continue; }
      const name = `img${n}.jpg`;
      await optimizeImage(inp, path.join(outDir, name));
      manifest.images.push(name);
      n++;
    }

    for (const v of p.videos) {
      const inp = path.join(srcDir, v.src);
      if (!fs.existsSync(inp)) { console.log("  ! missing video", inp); continue; }
      const mp4 = `${v.out}.mp4`;
      const poster = `${v.out}.jpg`;
      if (fs.existsSync(path.join(outDir, mp4)) && fs.existsSync(path.join(outDir, poster))) {
        console.log(`  · ${p.slug}/${mp4} exists — skipping encode`);
        manifest.videos.push({ mp4, poster });
        continue;
      }
      const t0 = Date.now();
      encodeVideo(inp, path.join(outDir, mp4), path.join(outDir, poster));
      const sz = fs.statSync(path.join(outDir, mp4)).size / 1048576;
      console.log(`  ✓ ${p.slug}/${mp4}  ${sz.toFixed(1)}MB  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
      manifest.videos.push({ mp4, poster });
    }

    // cover for the door — prefer an explicit cover.png dropped into the raw folder
    // (door is object-fit:cover / 3:4.4, so we keep aspect ratio and just compress).
    const explicitCover = path.join(srcDir, "cover.png");
    if (fs.existsSync(explicitCover)) {
      await sharp(explicitCover).rotate().resize({ width: 1080, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, "cover.jpg"));
    } else if (p.cover.image) {
      await optimizeImage(path.join(srcDir, p.cover.image), path.join(outDir, "cover.jpg"), 820, 80);
    } else if (p.cover.poster) {
      const posterPath = path.join(outDir, `${p.cover.poster}.jpg`);
      if (fs.existsSync(posterPath)) {
        await sharp(posterPath).resize({ width: 820, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(outDir, "cover.jpg"));
      }
    }
    console.log(`✓ ${p.slug}: ${manifest.images.length} imgs, ${manifest.videos.length} vids`);
  }
  console.log("DONE");
})();
