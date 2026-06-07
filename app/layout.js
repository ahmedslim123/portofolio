import { Cinzel, Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";

/* Display — engraved, cathedral serif for headings & name */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

/* Body — elegant high-contrast serif for prose */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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

export const metadata = {
  title: "Chamber of Curiosities · Portfolio",
  description:
    "A cinematic WebGL portfolio — the door as a gateway to knowledge. Step through the grand door into an immersive 3D experience.",
  keywords: [
    "portfolio",
    "creative developer",
    "WebGL",
    "Three.js",
    "React",
    "interaction design",
  ],
  authors: [{ name: "Chamber of Curiosities" }],
  openGraph: {
    title: "Chamber of Curiosities · Portfolio",
    description:
      "A cinematic WebGL portfolio — the door as a gateway to knowledge.",
    type: "website",
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
