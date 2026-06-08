/* Generates public/og.jpg — the 1200×630 social share card shown when the
   portfolio link is pasted into WhatsApp / Facebook / LinkedIn / iMessage.
   Run with: node scripts/make-og.cjs                                         */
const path = require("path");
const sharp = require("sharp");

const W = 1200;
const H = 630;
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "og.jpg");
const PHOTO = path.join(ROOT, "public", "ahmed.jpg");

// Circular avatar (matches the void theme's portal feel).
const AV = 330;
const avX = 130;
const avY = (H - AV) / 2;

async function build() {
  // 1 — circular-cropped avatar with a soft cyan ring.
  const circleMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`
  );
  const avatar = await sharp(PHOTO)
    .resize(AV, AV, { fit: "cover", position: "top" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 2 — dark cinematic background + text, matching the live site palette.
  const tx = avX + AV + 70; // text column start
  const bg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <radialGradient id="g1" cx="78%" cy="-10%" r="80%">
        <stop offset="0%" stop-color="#1e9fff" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#1e9fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="10%" cy="115%" r="90%">
        <stop offset="0%" stop-color="#9a6bff" stop-opacity="0.20"/>
        <stop offset="60%" stop-color="#9a6bff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#070A1E"/>
        <stop offset="55%" stop-color="#05060f"/>
        <stop offset="100%" stop-color="#04050f"/>
      </linearGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00F7FF"/>
        <stop offset="100%" stop-color="#1E9FFF"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bgv)"/>
    <rect width="${W}" height="${H}" fill="url(#g1)"/>
    <rect width="${W}" height="${H}" fill="url(#g2)"/>
    <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="22" fill="none" stroke="#1b2546" stroke-width="2"/>

    <!-- glowing ring behind the avatar -->
    <circle cx="${avX + AV / 2}" cy="${avY + AV / 2}" r="${AV / 2 + 12}" fill="none" stroke="url(#ring)" stroke-width="4" opacity="0.85"/>

    <text x="${tx}" y="232" font-family="'Courier New', monospace" font-size="28" letter-spacing="10" fill="#E5C16F">SLIMPORTOFOLIO</text>
    <text x="${tx}" y="320" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="84" fill="#F4F7FF">Ahmed Slim</text>
    <text x="${tx}" y="380" font-family="Georgia, serif" font-size="34" fill="#00F7FF">Software Engineer · Creative Developer</text>
    <text x="${tx}" y="436" font-family="'Courier New', monospace" font-size="24" letter-spacing="4" fill="#9fb0d8">Web · Mobile · AI · Graphic Design</text>
  </svg>`);

  await sharp(bg)
    .composite([{ input: avatar, left: avX, top: Math.round(avY) }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUT);

  console.log("✓ wrote", path.relative(ROOT, OUT));
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
