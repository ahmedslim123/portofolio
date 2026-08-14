"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

// The room is the only thing on the site that still uses framer-motion, and it
// only exists once a visitor opens a door. Split out, framer leaves the
// first-paint bundle entirely. `prefetchRoom` below pulls the chunk in on the
// first hover or press, long before the 720ms door swing finishes.
const ProjectRoom = dynamic(() => import("@/components/ProjectRoom"), { ssr: false });
const prefetchRoom = () => import("@/components/ProjectRoom");

const PHONE_MQ = "(max-width: 700px)";
// Mirrors the <picture> media query inside ProjectRoom, so the preload below
// fetches the same file the browser is about to choose.
const galleryVariant = (src) => {
  if (typeof src !== "string" || !src.endsWith(".webp")) return src;
  const isPhone = typeof window !== "undefined" && window.matchMedia(PHONE_MQ).matches;
  return isPhone ? src.replace(/\.webp$/, "-sm.webp") : src;
};

export default function Projects() {
  const { site, ui } = useI18n();
  // openIdx → the door is physically swung open.
  // modalIdx → the case-study room is mounted (revealed a beat later).
  const [openIdx, setOpenIdx] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);
  const [activeMedia, setActiveMedia] = useState(0);
  // Set from the click handler (never an effect), so it is a plain event-driven
  // state update and the value is correct for the room about to open.
  const [phone, setPhone] = useState(false);
  // Once a door has been opened the room component stays mounted, because
  // AnimatePresence must remain in the tree for the closing animation to play.
  const [roomMounted, setRoomMounted] = useState(false);
  const timer = useRef();
  const roomRef = useRef(null);

  const project = modalIdx != null ? site.projects[modalIdx] : null;
  const media = project?.media || [];
  const current = media[activeMedia] || media[0];

  const openDoor = (i) => {
    if (openIdx === i) return;
    clearTimeout(timer.current);
    prefetchRoom();
    setRoomMounted(true);
    setOpenIdx(i);
    setActiveMedia(0);
    setPhone(typeof window !== "undefined" && window.matchMedia(PHONE_MQ).matches);
    // The leaf takes 720ms to swing before the room mounts. Spend that gap
    // fetching AND decoding the first gallery frame, so the room arrives with
    // its image ready instead of blocking the main thread on decode at the
    // exact moment it animates in.
    const first = site.projects[i]?.media?.find((m) => m.type === "image");
    if (first?.src) {
      const img = new Image();
      img.decoding = "async";
      img.src = asset(galleryVariant(first.src));
      img.decode?.().catch(() => {});
    }
    timer.current = setTimeout(() => setModalIdx(i), 720);
  };

  const close = () => {
    clearTimeout(timer.current);
    setModalIdx(null);
    timer.current = setTimeout(() => setOpenIdx(null), 380);
  };

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => setActiveMedia(0), [modalIdx]);

  useEffect(() => {
    if (modalIdx == null) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIdx]);

  // Freeze the page behind the open room so the home content can never scroll
  // or bleed through the door. Chamber listens and stops Lenis + native scroll.
  useEffect(() => {
    if (modalIdx == null) return;
    window.dispatchEvent(new Event("chamber:modal-open"));
    return () => window.dispatchEvent(new Event("chamber:modal-close"));
  }, [modalIdx]);

  // Click-and-drag scrolling INSIDE the open project room — same grab-to-move
  // feel as the page, scoped to the room's own scroll so the story reads easily.
  useEffect(() => {
    const el = roomRef.current;
    if (modalIdx == null || !el) return;
    const SKIP = "a, button, input, textarea, select, label, video, iframe, [role='button']";
    let down = false;
    let dragging = false;
    let startY = 0;
    let startTop = 0;
    let downEl = null;
    let pid = null;

    const onDown = (e) => {
      if (e.button !== 0 || (e.target.closest && e.target.closest(SKIP))) return;
      down = true;
      dragging = false;
      startY = e.clientY;
      startTop = el.scrollTop;
      downEl = e.target;
      pid = e.pointerId;
    };
    const onMove = (e) => {
      if (!down) return;
      const dy = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(dy) < 6) return;
        dragging = true;
        document.body.classList.add("dragging");
        try {
          downEl.setPointerCapture?.(pid);
        } catch {}
      }
      el.scrollTop = startTop - dy;
      e.preventDefault();
    };
    const onUp = () => {
      down = false;
      if (dragging) {
        dragging = false;
        document.body.classList.remove("dragging");
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.classList.remove("dragging");
    };
  }, [modalIdx]);

  return (
    <section id="projects" className="section" data-name="Projects">
      <div className="wrap">
        <Reveal className="eyebrow">{ui.projects.eyebrow}</Reveal>
        <Reveal className="h-title" as="h2">
          {ui.projects.title}
        </Reveal>
        <Reveal className="lead">{ui.projects.lead}</Reveal>

        <div className="hall">
          {site.projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06}>
              <button
                className={`door${openIdx === i ? " open" : ""}`}
                style={{ "--door-bg": p.bg, "--door-glow": p.glow, "--accent": p.accent }}
                onClick={() => openDoor(i)}
                onPointerEnter={prefetchRoom}
                aria-label={`Open ${p.name} case study`}
              >
                <div className="interior">
                  <div className="threshold" />
                  <div className="enter">{ui.projects.stepInside}</div>
                  <div className="arrow">→</div>
                </div>
                <div className="leaf">
                  {p.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="door-cover"
                      src={asset(p.cover)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="door-scrim" />
                  <div className="seam" />
                  <div className="handle" />
                  <div className="glow" />
                  <div className="meta">
                    <div className="tag">{p.tag}</div>
                    <div className="nm">{p.name}</div>
                  </div>
                </div>
                <div className="spill" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {roomMounted && (
        <ProjectRoom
          project={project}
          current={current}
          media={media}
          activeMedia={activeMedia}
          setActiveMedia={setActiveMedia}
          close={close}
          phone={phone}
          ui={ui}
          roomRef={roomRef}
        />
      )}
    </section>
  );
}
