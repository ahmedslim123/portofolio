/* ============================================================================
   Generates public/og.jpg — the 1200x630 card WhatsApp, Facebook, LinkedIn,
   iMessage, Slack and X show when the link is pasted into a chat.

       node scripts/make-og.cjs

   Design rules this file obeys, because a share card is read at thumbnail size
   in a chat list:
     - the face is large and on the left, where the eye lands first;
     - the name is the biggest text on the card, not the domain;
     - nothing important sits within 40px of an edge — chat clients crop;
     - the file stays well under 300kB, which is where WhatsApp stops fetching
       a preview image and falls back to a bare grey link.
   ============================================================================ */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const W = 1200;
const H = 630;
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "og.jpg");

// The full-resolution original, not the 720px web copy: the avatar is drawn at
// 340px and upscaling the web copy softens the face.
const PHOTO = [
  path.join(ROOT, "assets-src", "ahmed.jpg"),
  path.join(ROOT, "public", "ahmed.webp"),
].find((p) => fs.existsSync(p));

const GOLD = "#e5c16f";
const CYAN = "#00f7ff";

// Circular avatar, echoing the hero portal.
const AV = 340;
const avX = 118;
const avY = Math.round((H - AV) / 2);

async function build() {
  if (!PHOTO) throw new Error("no source photo found (assets-src/ahmed.jpg)");

  // 1 — circular-cropped avatar.
  const circleMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${AV}" height="${AV}"><circle cx="${AV / 2}" cy="${AV / 2}" r="${AV / 2}" fill="#fff"/></svg>`
  );
  const avatar = await sharp(PHOTO)
    .resize(AV, AV, { fit: "cover", position: "top" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 2 — the void backdrop and the text column.
  const tx = avX + AV + 74; // text column start
  const cx = avX + AV / 2;
  const cy = avY + AV / 2;

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
        <stop offset="0%" stop-color="${CYAN}"/>
        <stop offset="100%" stop-color="#1E9FFF"/>
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stop-color="${CYAN}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${CYAN}" stop-opacity="0.30"/>
      </radialGradient>
      <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="40%" stop-color="${CYAN}"/>
        <stop offset="100%" stop-color="#1e9fff"/>
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bgv)"/>
    <rect width="${W}" height="${H}" fill="url(#g1)"/>
    <rect width="${W}" height="${H}" fill="url(#g2)"/>
    <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="22" fill="none" stroke="#1b2546" stroke-width="2"/>

    <!-- glowing portal ring behind the avatar -->
    <circle cx="${cx}" cy="${cy}" r="${AV / 2 + 26}" fill="url(#halo)"/>
    <circle cx="${cx}" cy="${cy}" r="${AV / 2 + 13}" fill="none" stroke="url(#ring)" stroke-width="4" opacity="0.9"/>

    <!-- the brand rune, same mark as the favicon, top-right corner -->
    <g transform="translate(1082, 74)">
      <circle r="30" fill="none" stroke="${GOLD}" stroke-width="3"/>
      <polygon points="0,-14 14,0 0,14 -14,0" fill="url(#gem)"/>
    </g>

    <text x="${tx}" y="228" font-family="'Courier New', monospace" font-size="26" letter-spacing="9" fill="${GOLD}">AHMEDSLIM.COM</text>
    <text x="${tx}" y="322" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="86" fill="#F4F7FF">Ahmed Slim</text>
    <text x="${tx}" y="382" font-family="Georgia, serif" font-size="34" fill="${CYAN}">Software Engineer &#183; Creative Developer</text>
    <text x="${tx}" y="440" font-family="'Courier New', monospace" font-size="23" letter-spacing="3.5" fill="#9fb0d8">Web &#183; Mobile &#183; AI &#183; Graphic Design</text>
    <text x="${tx}" y="492" font-family="'Courier New', monospace" font-size="20" letter-spacing="2.5" fill="#6f7ea8">Sousse, Tunisia &#183; Available for freelance</text>
  </svg>`);

  await sharp(bg)
    .composite([{ input: avatar, left: avX, top: avY }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(OUT);

  const kb = fs.statSync(OUT).size / 1024;
  console.log(`wrote ${path.relative(ROOT, OUT)}  ${W}x${H}  ${kb.toFixed(0)} kB`);
  if (kb > 300) console.warn("WARNING: over 300 kB — WhatsApp may skip the preview");
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
