import Link from "next/link";

export const metadata = {
  title: "Door not found",
  // A 404 that gets indexed competes with the real page for the name. Static
  // exports cannot send a 404 status code, so this meta tag is the only way to
  // tell a crawler that the page is not content.
  robots: { index: false, follow: true },
};

/**
 * 404. Deliberately a plain server component: no Three.js, no Lenis, no intro —
 * someone who mistyped a URL should get a way out in one paint, not a six-second
 * cinematic. Every route below the root that does not exist lands here, and the
 * static export writes it to out/404.html, which is the filename GitHub Pages,
 * Netlify, Cloudflare Pages and Apache all look for.
 */
export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-inner">
        <span className="nf-rune" aria-hidden="true" />
        <p className="nf-code">404</p>
        <h1 className="nf-title">This door leads nowhere</h1>
        <p className="nf-text">
          The page you were looking for is not part of the chamber — it may have been
          moved, or the link may have been mistyped.
        </p>
        <Link className="nf-back" href="/">
          Return to the entrance
        </Link>
      </div>
    </main>
  );
}
