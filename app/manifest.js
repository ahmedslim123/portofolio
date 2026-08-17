import { PERSON, SHARE_TITLE, SITE_DESC, THEME_COLOR } from "@/lib/seo";

/**
 * Web app manifest.
 *
 * What it buys a portfolio: an Android visitor who taps "Add to home screen"
 * gets the real icon and the real name instead of a screenshot of the tab and
 * the truncated <title>, and Chrome stops warning about a missing manifest in
 * the Lighthouse PWA audit.
 *
 * Two icon purposes, because they are not interchangeable: `any` is drawn as
 * given, `maskable` is cropped by Android to whatever shape the launcher uses,
 * so it needs its own file with the mark pulled inside the safe zone.
 */
// `output: export` has no server to answer a request, so every metadata route
// must be resolved at build time and written to a file. Without this Next
// refuses to export the route at all.
export const dynamic = "force-static";

export default function manifest() {
  return {
    name: SHARE_TITLE,
    short_name: PERSON.name,
    description: SITE_DESC,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
