"use client";

import { useEffect, useState } from "react";
import { site, sections } from "@/content/site";

export default function Navbar({ scrollTo }) {
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
    </nav>
  );
}
