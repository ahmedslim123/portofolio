"use client";

/** The Grand Door overlay — title, hint, and (for reduced-motion/touch) a
 *  manual "Enter the Chamber" button. The 3D door itself lives in the canvas. */
export default function IntroOverlay({
  titleRef,
  hintRef,
  showEnter,
  onEnter,
  hidden,
}) {
  if (hidden) return null;

  return (
    <div className="intro" aria-hidden={hidden}>
      <div ref={titleRef} className="intro-title">
        <h1>CHAMBER OF CURIOSITIES</h1>
        <p>The Door as a Gateway to Knowledge</p>
      </div>

      {showEnter ? (
        <button
          className="enter-btn"
          style={{ opacity: 1 }}
          onClick={onEnter}
        >
          Enter the Chamber
        </button>
      ) : (
        <div ref={hintRef} className="intro-hint">
          The door is awakening
          <span className="pulse">◈ &nbsp; OPENING &nbsp; ◈</span>
        </div>
      )}
    </div>
  );
}
