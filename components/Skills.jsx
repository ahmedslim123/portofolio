"use client";

import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

// Scattered centre points (left%, top%) for the galaxy layout on desktop —
// one per skill, in the same order as `site.skills`. Laid out together with the
// orb diameters so no two circles touch: the closest pair here still clears its
// combined radii by ~40px at a 1000px-wide galaxy, which is the narrowest this
// layout ever gets (below 860px the galaxy becomes a wrapping flex row and
// these positions stop applying).
// If you add or remove a skill, add or remove a spot here too.
const SPOTS = [
  [16, 26],
  [40, 14],
  [64, 25],
  [87, 34],
  [26, 60],
  [51, 50],
  [75, 62],
  [36, 85],
  [64, 84],
];

export default function Skills() {
  const { site, ui } = useI18n();
  return (
    <section id="skills" className="section" data-name="Skills">
      <div className="wrap">
        <Reveal className="eyebrow">{ui.skills.eyebrow}</Reveal>
        <Reveal className="h-title" as="h2">
          {ui.skills.title}
        </Reveal>
        <Reveal className="lead">{ui.skills.lead}</Reveal>
        <div className="galaxy">
          {site.skills.map((s, i) => {
            const sp = SPOTS[i % SPOTS.length];
            return (
              <div
                key={s.name}
                className="orb-slot"
                style={{
                  left: `${sp[0]}%`,
                  top: `${sp[1]}%`,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div className="orb" style={{ "--pct": s.pct }}>
                  <span className="orb-ring" />
                  <span className="orb-core" />
                  <span className="nm">{s.name}</span>
                  <span className="pct">{s.pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
