// Prefixes public (`/...`) asset URLs with the deploy base path so they resolve
// correctly whether the site is served from the domain root (InfinityFree /
// custom domain) or a sub-path (GitHub Pages project site, e.g. /portofolio).
//
// The base path is injected at build time via NEXT_PUBLIC_BASE_PATH and must
// match `basePath`/`assetPrefix` in next.config.mjs. Framework assets (_next,
// fonts) are prefixed automatically by Next; this helper is for files in /public.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path) =>
  typeof path === "string" && path.startsWith("/") ? `${BASE_PATH}${path}` : path;
