"use client";

import { useI18n } from "@/components/LanguageProvider";

export default function Footer() {
  const { site } = useI18n();
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
        <div className="fine">© {year} {site.name}</div>
      </div>
    </footer>
  );
}
