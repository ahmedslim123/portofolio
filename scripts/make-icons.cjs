/* ============================================================================
   Generates the whole icon set from ONE vector source, so every size is the
   same mark and nothing drifts when the brand changes.

       node scripts/make-icons.cjs

   Writes:
     app/icon.svg                the scalable icon modern browsers prefer
     app/favicon.ico             16 / 32 / 48 px, for the browser tab
     app/apple-icon.png          180x180, iOS home screen (opaque, no rounding —
                                 iOS rounds it itself and punishes pre-rounding)
     public/icon-192.png         PWA / Android
     public/icon-512.png         PWA / Android, splash screens
     public/icon-maskable.png    512px with the mark inside Android's safe zone

   THE MARK is the navbar rune (see `.logo .rune` in globals.css): a gold ring
   with a cyan diamond suspended in it, over the void. It is the one piece of
   brand geometry already on the site, it is not a letter — so it does not
   collapse into mush at 16px the way an "AS" monogram would — and it is
   legible in a row of thirty other tabs.
   ============================================================================ */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const APP = path.join(ROOT, "app");
const PUB = path.join(ROOT, "public");

// Palette lifted verbatim from :root in app/globals.css.
const GOLD = "#e5c16f";
const CYAN = "#00f7ff";
const VOID_TOP = "#131a44";
const VOID_MID = "#0b0f2b";
const VOID_BOT = "#05060f";

/**
 * The mark, drawn on a 64-unit canvas.
 *
 * @param {object}  o
 * @param {number}  o.scale   size of the mark relative to the canvas (1 = full
 *                            bleed). Android maskable icons crop to a circle of
 *                            ~80%, so that variant passes a smaller number.
 * @param {number}  o.radius  corner rounding of the plate, in canvas units.
 * @param {boolean} o.detail  draw the fine details (inner hairline, glow).
 *                            Off for the 16px favicon, where they turn to mud.
 */
function markSvg({ scale = 1, radius = 0, detail = true } = {}) {
  const C = 32; // centre
  // At 16px the mark gets ~16 device pixels for the whole plate, so the ring
  // pulls in and the stroke and the gem grow: what survives that scale is
  // contrast between two shapes, not fidelity to the 512px drawing.
  const ring = (detail ? 22 : 19.5) * scale; // gold ring radius
  const ringW = (detail ? 3.4 : 4.4) * scale;
  const dia = (detail ? 10.5 : 12) * scale; // diamond half-diagonal

  const diamond = [
    `${C},${C - dia}`,
    `${C + dia},${C}`,
    `${C},${C + dia}`,
    `${C - dia},${C}`,
  ].join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Ahmed Slim">
  <defs>
    <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${VOID_TOP}"/>
      <stop offset="55%"  stop-color="${VOID_MID}"/>
      <stop offset="100%" stop-color="${VOID_BOT}"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="${CYAN}" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="${CYAN}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="35%"  stop-color="${CYAN}"/>
      <stop offset="100%" stop-color="#1e9fff"/>
    </linearGradient>
  </defs>

  <rect width="64" height="64" rx="${radius}" ry="${radius}" fill="url(#plate)"/>
  ${detail ? `<circle cx="${C}" cy="${C}" r="${ring + 6 * scale}" fill="url(#halo)"/>` : ""}
  <circle cx="${C}" cy="${C}" r="${ring}" fill="none" stroke="${GOLD}" stroke-width="${ringW}"/>
  ${
    detail
      ? `<circle cx="${C}" cy="${C}" r="${ring - 4.2 * scale}" fill="none" stroke="${CYAN}" stroke-width="${0.9 * scale}" opacity="0.45"/>`
      : ""
  }
  <polygon points="${diamond}" fill="url(#gem)"/>
</svg>`;
}

const png = (svg, size, { opaque = false } = {}) => {
  let p = sharp(Buffer.from(svg), { density: 384 }).resize(size, size);
  // iOS ignores alpha on apple-touch-icon and composites it onto white, which
  // would put a white halo around a dark mark. Flatten onto the void instead.
  if (opaque) p = p.flatten({ background: VOID_MID });
  return p.png({ compressionLevel: 9 }).toBuffer();
};

/**
 * Packs PNGs into a multi-resolution .ico.
 *
 * sharp cannot write ICO, but the format has allowed a raw PNG payload per
 * entry since Vista and every browser in use reads it — so the container is
 * just a 6-byte header, one 16-byte directory entry per size, then the PNGs.
 */
function ico(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const head = Buffer.alloc(HEADER);
  head.writeUInt16LE(0, 0); // reserved
  head.writeUInt16LE(1, 2); // 1 = icon (2 would be cursor)
  head.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const dir = images.map(({ size, data }) => {
    const e = Buffer.alloc(ENTRY);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette size — 0 for truecolour
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([head, ...dir, ...images.map((i) => i.data)]);
}

async function build() {
  const wrote = [];
  const put = (file, data) => {
    fs.writeFileSync(file, data);
    wrote.push(`${path.relative(ROOT, file).replace(/\\/g, "/")}  ${(data.length / 1024).toFixed(1)} kB`);
  };

  // 1 — the scalable icon. Browsers that support it stop here, at any size.
  const svg = markSvg({ radius: 12 });
  put(path.join(APP, "icon.svg"), Buffer.from(svg));

  // 2 — favicon.ico. The 16px face is drawn from a simplified source: at that
  //     size the hairline and the halo are sub-pixel and only muddy the mark.
  const tiny = markSvg({ radius: 6, detail: false });
  put(
    path.join(APP, "favicon.ico"),
    ico([
      { size: 16, data: await png(tiny, 16) },
      { size: 32, data: await png(markSvg({ radius: 8 }), 32) },
      { size: 48, data: await png(svg, 48) },
    ])
  );

  // 3 — iOS home screen. Square and opaque; iOS applies its own mask.
  put(path.join(APP, "apple-icon.png"), await png(markSvg({ radius: 0 }), 180, { opaque: true }));

  // 4 — PWA / Android.
  put(path.join(PUB, "icon-192.png"), await png(markSvg({ radius: 14 }), 192));
  put(path.join(PUB, "icon-512.png"), await png(markSvg({ radius: 14 }), 512));
  // Maskable: Android crops to an arbitrary shape inside the middle 80%, so the
  // mark shrinks and the plate goes full-bleed square.
  put(
    path.join(PUB, "icon-maskable.png"),
    await png(markSvg({ scale: 0.62, radius: 0 }), 512, { opaque: true })
  );

  console.log("icons written:\n  " + wrote.join("\n  "));
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
