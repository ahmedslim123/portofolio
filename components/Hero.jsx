"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

const EASE = [0.165, 0.84, 0.44, 1];

export default function Hero({ revealed, scrollTo }) {
  const { site, ui } = useI18n();
  const words = site.name.split(" ");

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="hero" className="hero section" data-name="Home">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <motion.div className="eyebrow" {...fade(0.5)}>
              {site.role}
            </motion.div>
            <h1 className="hero-name">
              {words.map((w, i) => (
                <span className="ln" key={i}>
                  {/* framer drives the line slide so it always settles visible,
                      even if the intro's GSAP context is reverted mid-reveal */}
                  <motion.span
                    initial={{ yPercent: 110 }}
                    animate={revealed ? { yPercent: 0 } : { yPercent: 110 }}
                    transition={{ duration: 1.0, ease: [0.16, 0.84, 0.44, 1], delay: 0.35 + i * 0.12 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div className="hero-role" {...fade(0.7)}>
              {site.tagline}
            </motion.div>
            {site.phone && (
              <motion.a className="hero-phone" href={`tel:${site.phone}`} {...fade(0.78)}>
                <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                  <path
                    fill="currentColor"
                    d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.58 3.6a1 1 0 0 1-.25 1l-2.23 2.2Z"
                  />
                </svg>
                <span>{site.phoneDisplay || site.phone}</span>
              </motion.a>
            )}
            <motion.p className="hero-bio" {...fade(0.8)}>
              {site.heroBio}
            </motion.p>
            <motion.div className="hero-cta" {...fade(0.95)}>
              <a
                href="#projects"
                className="btn primary"
                onClick={(e) => go(e, "projects")}
              >
                {ui.hero.viewProjects}
              </a>
              <a
                href="#contact"
                className="btn ghost"
                onClick={(e) => go(e, "contact")}
              >
                {ui.hero.getInTouch}
              </a>
            </motion.div>
          </div>

          <motion.div {...fade(0.6)}>
            <div className="portal">
              <div className="ring r2" />
              <div className="ring" />
              <div className="photo">
                {site.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(site.photo)} alt={site.name} />
                ) : (
                  <div className="initials">{site.initials}</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>{ui.hero.scroll}</span>
        <span className="bar" />
      </div>
    </section>
  );
}
