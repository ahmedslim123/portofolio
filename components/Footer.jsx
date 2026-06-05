"use client";

import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="sig">{site.name}</div>
        <div className="links">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <div className="fine">
          © {year} {site.name} · All rights reserved. Crafted with light, sound
          &amp; mechanism — the Chamber of Curiosities.
        </div>
      </div>
    </footer>
  );
}
