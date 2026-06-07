"use client";

import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

export default function Timeline() {
  const { site, ui } = useI18n();
  return (
    <section id="timeline" className="section" data-name="Journey">
      <div className="wrap">
        <Reveal className="eyebrow">{ui.timeline.eyebrow}</Reveal>
        <Reveal className="h-title" as="h2">
          {ui.timeline.title}
        </Reveal>
        <div className="timeline">
          {site.timeline.map((n, i) => (
            <Reveal className="tnode" key={i} delay={i * 0.05}>
              <div className="yr">{n.yr}</div>
              <h4>{n.role}</h4>
              <div className="org">{n.org}</div>
              <p>{n.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
