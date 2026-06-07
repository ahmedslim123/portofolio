import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Sub-path for project-site deploys (GitHub Pages → "/portofolio"). Left empty
// for root deploys (InfinityFree / custom domain). Set via env at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into `out/` — deployable to any static host
  // (GitHub Pages, InfinityFree, Netlify, …) with no Node server.
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  // The static export can't use the default (server) image optimizer.
  images: { unoptimized: true },
  // Pin the workspace root to this project (a stray lockfile lives one level up).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
