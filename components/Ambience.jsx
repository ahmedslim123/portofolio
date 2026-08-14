"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

/**
 * The ambient loop that plays behind the portfolio once the door has opened.
 *
 * Three things this has to get right:
 *
 * 1. Browsers block sound that starts without a user gesture. The door intro
 *    runs on its own on desktop, so the first `play()` is usually refused —
 *    that is normal, not a bug. When it is refused we arm a one-shot listener
 *    and start on the visitor's first click, tap or key press instead. On the
 *    touch/reduced-motion path the visitor presses "Enter" themselves, which
 *    grants activation, so it starts immediately there.
 *
 * 2. The button reflects what the audio is ACTUALLY doing, not what we wish it
 *    were doing — so a blocked autoplay shows as "sound off", which is true and
 *    tells the visitor exactly what to click.
 *
 * 3. The choice sticks. Someone who turns it off never gets it back on a reload.
 *
 * The file is `preload="none"`: 774 KB is only fetched when sound is actually
 * going to play, so it never touches the first paint.
 */

const SRC = "/audio/ambience.m4a";
// Background level. Loud enough to feel, quiet enough to read over.
const VOLUME = 0.26;
const FADE_IN_MS = 2600;
const FADE_OUT_MS = 600;
const STORAGE_KEY = "chamber:sound";

function SpeakerOn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12Zm-2.5 6.7a7 7 0 0 0 0-13.4v1.6a5.5 5.5 0 0 1 0 10.2v1.6Z"
      />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M4 9v6h4l5 4V5L8 9H4Zm11.5 0.9 1.3-1.3 2.1 2.1 2.1-2.1 1.3 1.3-2.1 2.1 2.1 2.1-1.3 1.3-2.1-2.1-2.1 2.1-1.3-1.3 2.1-2.1-2.1-2.1Z"
      />
    </svg>
  );
}

export default function Ambience({ entered }) {
  const { ui } = useI18n();
  // Mirrors the real state of the element, never an intention.
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const wantRef = useRef(null); // the stored preference, read once
  const armedRef = useRef(false);

  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  // Ramp the volume rather than switching it — a loop that snaps to full
  // volume sounds like a mistake. 40ms steps, only while a fade is running.
  const fadeTo = (target, ms, done) => {
    const a = audioRef.current;
    if (!a) return;
    clearFade();
    const from = a.volume;
    const t0 = performance.now();
    fadeRef.current = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      a.volume = from + (target - from) * k;
      if (k >= 1) {
        clearFade();
        done?.();
      }
    }, 40);
  };

  /** Try to play. Resolves into `playing`; a refusal arms the first gesture. */
  const start = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    const p = a.play();
    if (!p || typeof p.then !== "function") return;
    p.then(() => {
      setPlaying(true);
      fadeTo(VOLUME, FADE_IN_MS);
    }).catch(() => {
      // Autoplay refused — wait for the visitor to do anything at all.
      setPlaying(false);
      armFirstGesture();
    });
  };

  const armFirstGesture = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    const go = () => {
      disarm();
      if (wantRef.current) start();
    };
    const disarm = () => {
      armedRef.current = false;
      window.removeEventListener("pointerdown", go);
      window.removeEventListener("keydown", go);
      window.removeEventListener("touchstart", go);
    };
    window.addEventListener("pointerdown", go, { once: true });
    window.addEventListener("keydown", go, { once: true });
    window.addEventListener("touchstart", go, { once: true });
  };

  useEffect(() => {
    if (wantRef.current === null) {
      try {
        wantRef.current = localStorage.getItem(STORAGE_KEY) !== "off";
      } catch {
        wantRef.current = true;
      }
    }
    if (!entered || !wantRef.current) return;
    // Not a synchronous setState: `start` resolves through a promise.
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  // A loop playing to an empty room is just battery. Pause with the tab.
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) {
        a.pause();
      } else if (wantRef.current && playing) {
        a.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing]);

  useEffect(() => clearFade, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      wantRef.current = false;
      try {
        localStorage.setItem(STORAGE_KEY, "off");
      } catch {}
      setPlaying(false);
      fadeTo(0, FADE_OUT_MS, () => a.pause());
    } else {
      wantRef.current = true;
      try {
        localStorage.setItem(STORAGE_KEY, "on");
      } catch {}
      start();
    }
  };

  const label = playing ? ui.sound.off : ui.sound.on;

  return (
    <>
      <audio ref={audioRef} src={asset(SRC)} loop preload="none" />
      <button
        type="button"
        className={`sound-btn${playing ? " on" : ""}`}
        onClick={toggle}
        aria-label={label}
        aria-pressed={playing}
        title={label}
      >
        {playing ? <SpeakerOn /> : <SpeakerOff />}
        <span className="eq" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
}
