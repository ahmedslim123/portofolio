/**
 * Copy the font subsets out of @fontsource into public/fonts.
 *
 * The files are committed to the repo so the build never reaches the network
 * for a font — `next/font/google` fetches are a known build-failure risk here.
 * @fontsource is a devDependency only: nothing imports it at runtime, it is
 * just where these files come from. Re-run after bumping any of the packages.
 *
 *   npm run fonts
 *
 * Only the weights globals.css actually declares are copied — Cinzel ships
 * five, we use three. Latin and Arabic are separate files with separate
 * `unicode-range`s, so an English visitor never downloads an Arabic face and
 * vice versa.
 */
import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(ROOT, "public", "fonts");

const FILES = [
  // Arabic
  ["@fontsource/amiri", "amiri-arabic-400-normal.woff2"],
  ["@fontsource/amiri", "amiri-arabic-700-normal.woff2"],
  ["@fontsource/cairo", "cairo-arabic-400-normal.woff2"],
  ["@fontsource/cairo", "cairo-arabic-600-normal.woff2"],
  // Latin — display (headings & the name)
  ["@fontsource/cinzel", "cinzel-latin-600-normal.woff2"],
  ["@fontsource/cinzel", "cinzel-latin-700-normal.woff2"],
  ["@fontsource/cinzel", "cinzel-latin-800-normal.woff2"],
  // Latin — body prose
  ["@fontsource/cormorant-garamond", "cormorant-garamond-latin-400-normal.woff2"],
  ["@fontsource/cormorant-garamond", "cormorant-garamond-latin-500-normal.woff2"],
  ["@fontsource/cormorant-garamond", "cormorant-garamond-latin-600-normal.woff2"],
  // Latin — mono HUD labels
  ["@fontsource/space-mono", "space-mono-latin-400-normal.woff2"],
  ["@fontsource/space-mono", "space-mono-latin-700-normal.woff2"],
];

mkdirSync(DEST, { recursive: true });

let copied = 0;
for (const [pkg, file] of FILES) {
  const src = join(ROOT, "node_modules", pkg, "files", file);
  if (!existsSync(src)) {
    console.error(`missing: ${src}\n  run \`npm install\` first.`);
    process.exitCode = 1;
    continue;
  }
  copyFileSync(src, join(DEST, file));
  console.log(`${file}  ${(statSync(src).size / 1024).toFixed(0)} KB`);
  copied++;
}
console.log(`\n${copied}/${FILES.length} font files synced to public/fonts.`);
