import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * The single most common launch failure is shipping a staging `Disallow: /`,
 * so this file is deliberately dumb: everything is allowed, always, and there
 * is no environment switch that could accidentally flip it. If a staging build
 * ever needs blocking, block it at the host with an HTTP header, not here.
 *
 * `_next/static` is allowed on purpose — Google renders the page with
 * JavaScript, and blocking the chunks makes it see an empty void.
 */
// `output: export` has no server to answer a request, so every metadata route
// must be resolved at build time and written to a file. Without this Next
// refuses to export the route at all.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
