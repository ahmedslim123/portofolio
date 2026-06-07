"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

/** Animated count-up that fires once when scrolled into view. */
function CountUp({ to }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{val}</span>;
}

export default function About() {
  const { site, ui } = useI18n();
  return (
    <section id="about" className="section" data-name="About">
      <div className="wrap">
        <Reveal className="eyebrow">{ui.about.eyebrow}</Reveal>
        <Reveal className="h-title" as="h2">
          {ui.about.title}
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-text">
            {site.about.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: htmlize(p) }} />
            ))}
          </Reveal>
          <Reveal className="stat-grid" delay={0.1}>
            {site.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="num">
                  <CountUp to={s.num} />
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Tiny allow-list: only our own <hl> highlight tag is honored. */
function htmlize(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&lt;hl&gt;/g, '<span class="hl">')
    .replace(/&lt;\/hl&gt;/g, "</span>");
}
