"use client";

import Link from "next/link";

import { useI18n } from "@/components/LanguageProvider";

export default function Footer() {
  const { site, ui } = useI18n();
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
          {/* next/link, not <a>: /privacy is a real route in the export, and the
              client-side navigation keeps the visitor from paying for the whole
              intro again on the way back. */}
          <Link href="/privacy/">{ui.footer.privacy}</Link>
        </div>
        <div className="fine">
          © {year} {site.name} · {ui.footer.location}
        </div>
      </div>
    </footer>
  );
}
