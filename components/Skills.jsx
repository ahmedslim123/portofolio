"use client";

import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

// Scattered centre points (left%, top%) for the galaxy layout on desktop.
const SPOTS = [
  [14, 24],
  [37, 12],
  [60, 22],
  [83, 30],
  [22, 58],
  [46, 46],
  [69, 56],
  [88, 66],
  [31, 82],
  [60, 80],
];

export default function Skills() {
  return (
    <section id="skills" className="section" data-name="Skills">
      <div className="wrap">
        <Reveal className="eyebrow">Arsenal · Languages &amp; Tools</Reveal>
        <Reveal className="h-title" as="h2">
          Constellation of Skills
        </Reveal>
        <Reveal className="lead">
          Each orb is a craft I work in — the ring shows proficiency, the size
          reflects mastery. Hover to read the numbers.
        </Reveal>
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
