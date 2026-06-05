"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";

const EASE = [0.165, 0.84, 0.44, 1];

export default function Hero({ revealed, scrollTo }) {
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
            <motion.p className="hero-bio" {...fade(0.8)}>
              {site.heroBio}
            </motion.p>
            <motion.div className="hero-cta" {...fade(0.95)}>
              <a
                href="#projects"
                className="btn primary"
                onClick={(e) => go(e, "projects")}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="btn ghost"
                onClick={(e) => go(e, "contact")}
              >
                Get in Touch
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
                  <img src={site.photo} alt={site.name} />
                ) : (
                  <div className="initials">{site.initials}</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="bar" />
      </div>
    </section>
  );
}
