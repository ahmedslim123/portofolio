"use client";

import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

// Scattered centre points (left%, top%) for the galaxy layout on desktop —
// one per skill, in the same order as `site.skills`.
//
// Laid out together with the orb diameters so no two circles touch, and with
// enough slack that they still do not touch when one is hovered: `.orb:hover`
// scales by 1.16, which adds ~12px of radius to the largest orbs. Measured at
// 1440, 1024 and 900px wide — no overlaps anywhere, closest pair 35px, so
// ~23px still clear mid-hover. Below 860px the galaxy becomes a wrapping flex
// row and these positions stop applying.
//
// If you add or remove a skill, add or remove a spot here too, then re-measure.
const SPOTS = [
  [14, 16],
  [40, 13],
  [66, 15],
  [88, 34],
  [14, 43],
  [41, 41],
  [64, 42],
  [27, 65],
  [50, 64],
  [79, 62],
  [22, 88],
  [72, 87],
];

// Float for each orb: [seconds per glide, x px, y px]. Different tempos and
// directions so the field drifts like weightless bodies, never as one wave.
// Amplitudes stay ≤ ~10px from rest — see the spacing note above.
const FLOAT = [
  [8.5, 4, 8],
  [10, -5, 7],
  [7.5, 3, 9],
  [9.5, -4, 8],
  [8, 5, -7],
  [10.5, -3, 9],
  [9, 4, -8],
  [7.8, -5, 7],
  [9.8, 3, -9],
  [8.3, -4, 8],
  [10.2, 5, 7],
  [8.8, -3, -8],
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
            const [dur, fx, fy] = FLOAT[i % FLOAT.length];
            return (
              <div
                key={s.name}
                className="orb-slot"
                style={{
                  left: `${sp[0]}%`,
                  top: `${sp[1]}%`,
                  width: s.size,
                  height: s.size,
                  "--float-dur": `${dur}s`,
                  "--float-x": `${fx}px`,
                  "--float-y": `${fy}px`,
                  // negative delay: every orb is already mid-glide on arrival
                  "--float-delay": `-${((i * 2.3) % dur).toFixed(1)}s`,
                  "--halo-dur": `${32 + ((i * 5) % 13)}s`,
                  "--halo-dir": i % 2 ? "reverse" : "normal",
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
