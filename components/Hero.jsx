"use client";

import { useI18n } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

/**
 * The hero entrance is pure CSS (see `.hero-fade` / `.hero-name .ln span` in
 * globals.css). Adding `revealed` to the section starts every transition; each
 * element carries its own delay in a `--d` custom property. This used to be
 * Framer Motion — moving it out left the project room as framer's only
 * consumer, so it no longer ships in the first-paint bundle.
 */
export default function Hero({ revealed, scrollTo }) {
  const { site, ui } = useI18n();
  const words = site.name.split(" ");

  const go = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  const delay = (s) => ({ "--d": `${s}s` });

  return (
    <section
      id="hero"
      className={`hero section${revealed ? " revealed" : ""}`}
      data-name="Home"
    >
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-fade" style={delay(0.5)}>
              {site.role}
            </div>
            <h1 className="hero-name">
              {words.map((w, i) => (
                <span className="ln" key={i}>
                  <span style={delay(0.35 + i * 0.12)}>{w}</span>
                </span>
              ))}
            </h1>
            <div className="hero-role hero-fade" style={delay(0.7)}>
              {site.tagline}
            </div>
            {(site.phone || site.email) && (
              <div className="hero-contacts hero-fade" style={delay(0.78)}>
                {site.phone && (
                  <a
                    className="hero-contact hero-phone"
                    href={`tel:${site.phone}`}
                    aria-label={`${ui.hero.callMe}: ${site.phoneDisplay || site.phone}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path
                        fill="currentColor"
                        d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.58 3.6a1 1 0 0 1-.25 1l-2.23 2.2Z"
                      />
                    </svg>
                    <span>{site.phoneDisplay || site.phone}</span>
                  </a>
                )}
                {site.email && (
                  <a
                    className="hero-contact hero-mail"
                    href={`mailto:${site.email}`}
                    aria-label={`${ui.hero.emailMe}: ${site.email}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                      <path
                        fill="currentColor"
                        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.4l8 5 8-5V6H4Zm16 12V8.7l-7.47 4.67a1 1 0 0 1-1.06 0L4 8.7V18h16Z"
                      />
                    </svg>
                    <span>{site.email}</span>
                  </a>
                )}
              </div>
            )}
            <p className="hero-bio hero-fade" style={delay(0.8)}>
              {site.heroBio}
            </p>
            <div className="hero-cta hero-fade" style={delay(0.95)}>
              <a href="#projects" className="btn primary" onClick={(e) => go(e, "projects")}>
                {ui.hero.viewProjects}
              </a>
              <a href="#contact" className="btn ghost" onClick={(e) => go(e, "contact")}>
                {ui.hero.getInTouch}
              </a>
            </div>
          </div>

          <div className="hero-fade" style={delay(0.6)}>
            <div className="portal">
              <div className="ring r2" />
              <div className="ring" />
              <div className="photo">
                {site.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(site.photo)}
                    // Three widths, and a `sizes` that describes the box the
                    // portrait is actually painted in — `.portal` is
                    // min(360px, 80vw) and `.photo` insets it by 18px on each
                    // side, so the drawn width is 36px less than the portal.
                    // Without an accurate `sizes` the browser assumes the image
                    // fills the viewport and always takes the largest file; with
                    // it, a 1x laptop takes 360w (11 kB) and only a 3x phone or
                    // a retina desktop pays for 720w (32 kB).
                    srcSet={[
                      `${asset("/ahmed-360.webp")} 360w`,
                      `${asset("/ahmed-540.webp")} 540w`,
                      `${asset(site.photo)} 720w`,
                    ].join(", ")}
                    sizes="(max-width: 450px) calc(80vw - 36px), 324px"
                    alt={site.name}
                    width="720"
                    height="720"
                    decoding="async"
                  />
                ) : (
                  <div className="initials">{site.initials}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>{ui.hero.scroll}</span>
        <span className="bar" />
      </div>
    </section>
  );
}
