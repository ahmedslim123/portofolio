"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/LanguageProvider";

// Real SVG flags — emoji flags (🇺🇸/🇫🇷) fall back to "US"/"FR" letters on
// Windows, so we draw them instead to guarantee a crisp flag everywhere.
function FlagUS() {
  return (
    <svg className="flag-svg" viewBox="0 0 24 16" aria-hidden focusable="false">
      <rect width="24" height="16" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.23" width="24" height="1.23" />
        <rect y="3.69" width="24" height="1.23" />
        <rect y="6.15" width="24" height="1.23" />
        <rect y="8.62" width="24" height="1.23" />
        <rect y="11.08" width="24" height="1.23" />
        <rect y="13.54" width="24" height="1.23" />
      </g>
      <rect width="10" height="8.62" fill="#3C3B6E" />
      <g fill="#fff">
        <circle cx="2" cy="1.7" r=".6" /><circle cx="5" cy="1.7" r=".6" /><circle cx="8" cy="1.7" r=".6" />
        <circle cx="3.5" cy="3.3" r=".6" /><circle cx="6.5" cy="3.3" r=".6" />
        <circle cx="2" cy="4.9" r=".6" /><circle cx="5" cy="4.9" r=".6" /><circle cx="8" cy="4.9" r=".6" />
        <circle cx="3.5" cy="6.5" r=".6" /><circle cx="6.5" cy="6.5" r=".6" />
      </g>
    </svg>
  );
}
function FlagFR() {
  return (
    <svg className="flag-svg" viewBox="0 0 24 16" aria-hidden focusable="false">
      <rect width="24" height="16" fill="#fff" />
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </svg>
  );
}

export default function Navbar({ scrollTo }) {
  const { site, sections, ui, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [head, tail] = site.brand.split("·");

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#hero" className="logo" onClick={(e) => go(e, "hero")}>
        <span className="rune" />
        {head}
        {tail && (
          <>
            <span className="dot">·</span>
            {tail}
          </>
        )}
      </a>
      <div className="nav-links">
        {sections
          .filter((s) => s.id !== "hero")
          .map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={(e) => go(e, s.id)}>
              {s.name}
            </a>
          ))}
      </div>

      <div className="lang-switch" role="group" aria-label={ui.lang.label}>
        <button
          type="button"
          className={`lang-btn${lang === "en" ? " active" : ""}`}
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
          aria-label={ui.lang.english}
          title={ui.lang.english}
        >
          <FlagUS />
        </button>
        <button
          type="button"
          className={`lang-btn${lang === "fr" ? " active" : ""}`}
          onClick={() => setLang("fr")}
          aria-pressed={lang === "fr"}
          aria-label={ui.lang.french}
          title={ui.lang.french}
        >
          <FlagFR />
        </button>
      </div>
    </nav>
  );
}
