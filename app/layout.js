import ReactDOM from "react-dom";
import "./globals.css";
import { asset } from "@/lib/asset";

/* Fonts are self-hosted from public/fonts and declared with @font-face at the
   top of globals.css. They used to be loaded through `next/font/google`, which
   reaches fonts.gstatic.com during the build — an unreliable dependency here,
   and the same reason the Arabic faces were already self-hosted. Run
   `npm run fonts` to re-copy them from @fontsource. */

// The public URL the portfolio is shared from (InfinityFree custom domain).
// metadataBase turns the relative og image path into the absolute URL that
// social scrapers (WhatsApp, Facebook, LinkedIn, iMessage, X) require.
const SITE_URL = "https://slimportofolio.great-site.net";
const SITE_NAME = "slimportofolio";
const SITE_DESC =
  "Ahmed Slim — Software Engineer & Creative Developer. Web, mobile & AI apps and brand design, in an immersive cinematic portfolio.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "slimportofolio",
    "Ahmed Slim",
    "portfolio",
    "software engineer",
    "creative developer",
    "web developer Tunisia",
    "AI",
    "graphic design",
  ],
  authors: [{ name: "Ahmed Slim" }],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Slim — slimportofolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: ["/og.jpg"],
  },
};

export const viewport = {
  themeColor: "#070A1E",
  width: "device-width",
  initialScale: 1,
};

// The three faces the very first screen is written in. A self-hosted font is
// only discovered once the stylesheet has been parsed; preloading them starts
// the download alongside the CSS instead of a round trip after it, so the
// intro paints in its real type rather than swapping fonts under the visitor.
const PRELOAD_FONTS = [
  "/fonts/cinzel-latin-700-normal.woff2",
  "/fonts/cormorant-garamond-latin-400-normal.woff2",
  "/fonts/space-mono-latin-400-normal.woff2",
];

export default function RootLayout({ children }) {
  // ReactDOM.preload rather than rendering <link> tags: React hoists link
  // elements into <head> on its own, so rendering them emitted each preload
  // twice. This API dedupes.
  for (const href of PRELOAD_FONTS) {
    ReactDOM.preload(asset(href), {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
