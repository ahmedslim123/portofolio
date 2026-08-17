import { SITE_URL } from "@/lib/seo";

/**
 * sitemap.xml.
 *
 * The portfolio is one page: the sections and the project rooms are anchors and
 * client-side panels, not routes, and a sitemap that lists `#projects` as a URL
 * is a sitemap Google discards. So it lists the real routes only.
 *
 * `lastModified` is the build date, which is honest here — a static export is
 * rebuilt whenever the content changes.
 */
// `output: export` has no server to answer a request, so every metadata route
// must be resolved at build time and written to a file. Without this Next
// refuses to export the route at all.
export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
