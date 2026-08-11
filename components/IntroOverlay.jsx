"use client";

import { useI18n } from "@/components/LanguageProvider";

/** The Grand Door overlay — it names whose portfolio the visitor is about to
 *  enter, then hands over to the scene. The 3D door itself lives in the canvas.
 *  Strings come from the locale dictionary; the name and role are read straight
 *  from `site`, so this can never disagree with the hero below it. */
export default function IntroOverlay({
  titleRef,
  hintRef,
  showEnter,
  onEnter,
  hidden,
}) {
  const { site, ui } = useI18n();

  if (hidden) return null;

  return (
    <div className="intro" aria-hidden={hidden}>
      <div ref={titleRef} className="intro-title">
        <span className="intro-eyebrow">{ui.intro.eyebrow}</span>
        <h1>{site.name}</h1>
        <p>{site.role}</p>
      </div>

      {showEnter ? (
        <button className="enter-btn" style={{ opacity: 1 }} onClick={onEnter}>
          {ui.intro.enter}
        </button>
      ) : (
        <div ref={hintRef} className="intro-hint">
          {ui.intro.hint}
          <span className="pulse">{ui.intro.pulse}</span>
        </div>
      )}
    </div>
  );
}
