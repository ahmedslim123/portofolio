import { Cinzel, Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";

/* Display — engraved, cathedral serif for headings & name.
   Only 600/700/800 are referenced in globals.css, so we load exactly those —
   trimming three unused weight files from the critical first paint. */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/* Body — elegant high-contrast serif for prose. No italic is used anywhere in
   the styles, so we ship only the normal styles — dropping three font files. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-body",
  display: "swap",
});

/* Mono — holographic HUD labels & eyebrows */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
