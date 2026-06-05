"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";

export default function DotNav({ scrollTo, revealed }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    if (!revealed) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [revealed]);

  return (
    <div className="dots">
      {sections.map((s) => (
        <button
          key={s.id}
          className={active === s.id ? "active" : ""}
          onClick={() => scrollTo(`#${s.id}`)}
          aria-label={s.name}
        >
          <span>{s.name}</span>
        </button>
      ))}
    </div>
  );
}
