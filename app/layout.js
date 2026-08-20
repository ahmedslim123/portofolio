import ReactDOM from "react-dom";
import "./globals.css";
import { asset } from "@/lib/asset";
import {
  jsonLd,
  OG_IMAGE,
  SHARE_TITLE,
  SITE_DESC,
  SITE_TITLE,
  SITE_URL,
  THEME_COLOR,
  PERSON,
} from "@/lib/seo";

/* Fonts are self-hosted from public/fonts and declared with @font-face at the
   top of globals.css. They used to be loaded through `next/font/google`, which
   reaches fonts.gstatic.com during the build — an unreliable dependency here,
   and the same reason the Arabic faces were already self-hosted. Run
   `npm run fonts` to re-copy them from @fontsource. */

export const metadata = {
  // Turns every relative path below (og.jpg, the canonical) into the absolute
  // URL that social scrapers require — a relative og:image is simply dropped by
  // WhatsApp and Facebook, and the link renders as a bare grey rectangle.
  metadataBase: new URL(SITE_URL),

  // `default` (not a bare string) so any page added later inherits the suffix
  // through `template` without repeating the name.
  title: { default: SITE_TITLE, template: `%s — ${PERSON.name}` },
  description: SITE_DESC,
  applicationName: SHARE_TITLE,
  keywords: [
    "Ahmed Slim",
    "Ahmed Slim portfolio",
    "ahmedslim.com",
    "software engineer Tunisia",
    "creative developer",
    "développeur web Tunisie",
    "freelance developer Sousse",
    "Next.js developer",
    "Three.js portfolio",
    "AI integration",
    "graphic design Tunisia",
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "technology",
  alternates: { canonical: "/" },

  // Explicit rather than implied. `max-image-preview: large` is the flag that
  // lets Google show the big thumbnail next to the result instead of a favicon.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /**
   * The icons are declared here, by hand, because they live in public/ now
   * rather than app/.
   *
   * Next's app/icon.* convention works fine for browsers but fingerprints the
   * URL on every build:
   *
   *     <link rel="icon" href="/favicon.ico?favicon.3o2tfok3x6zl1.ico">
   *
   * Google's guidance for the favicon it shows beside a search result asks
   * for a URL that does not change — it crawls favicons on its own slow
   * schedule, separately from the page. This site redeploys often, so that
   * hash meant the icon URL had effectively never held still. Served from
   * public/, these three paths are fixed forever.
   *
   * The .ico is first and carries sizes="48x48" deliberately: it contains
   * 16/32/48 and Google asks for a square that is a multiple of 48.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SHARE_TITLE,
    title: SHARE_TITLE,
    description: SITE_DESC,
    locale: "en_US",
    // The page carries all three languages behind a switch, so a scraper that
    // honours these will still land on the same URL — it just knows the content
    // exists in French and Arabic too.
    alternateLocale: ["fr_FR", "ar_TN"],
    images: [OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SITE_DESC,
    images: [OG_IMAGE.url],
  },

  // Lets iOS use the real name and a dark status bar if the site is saved to
  // the home screen, instead of the truncated <title> on a white bar.
  appleWebApp: {
    capable: true,
    title: PERSON.name,
    statusBarStyle: "black-translucent",
  },

  // Filled in from the environment after the domain is verified, so the token
  // never has to be committed. Leave unset and the tag is simply not emitted.
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,

  // Icons come from the file conventions (app/favicon.ico, app/icon.svg,
  // app/apple-icon.png); Next emits the <link> tags for them. Only the
  // Microsoft tile, which has no file convention, is declared by hand.
  other: { "msapplication-TileColor": THEME_COLOR },
};

export const viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
  // Deliberately NOT maximum-scale/user-scalable=no: blocking pinch-zoom is a
  // WCAG failure, and iOS ignores it anyway since 10.
  colorScheme: "dark",
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
      <body suppressHydrationWarning>
        {children}
        {/* Structured data. Rendered as a plain <script> rather than next/script
            because it has to be in the static HTML for a crawler that does not
            run JavaScript — which is most of them, including the WhatsApp and
            LinkedIn scrapers. The JSON is built from a literal in lib/seo.js,
            never from user input, so there is nothing to escape. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
      </body>
    </html>
  );
}
