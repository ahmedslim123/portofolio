"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";

const EASE = [0.165, 0.84, 0.44, 1];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.93 8.43-9.94Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z"
      />
    </svg>
  );
}

const EMBED_TYPES = new Set(["youtube", "vimeo"]);

const embedSrc = (type, id) =>
  type === "vimeo"
    ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

// Thumbnail fallback when no local poster is supplied. Vimeo needs an API call
// for thumbnails, so vimeo media should always ship a poster.
const embedThumb = (type, id, poster) =>
  poster || (type === "youtube" ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");

// A lightweight video "facade": we show the poster + a play button and only
// mount the heavy iframe once the visitor actually clicks — so the page stays
// fast and never lags loading embeds it may never need. Works for YouTube + Vimeo.
function EmbedFrame({ type, id, poster }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="yt-iframe"
        src={embedSrc(type, id)}
        title="Project video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button className="yt-facade" onClick={() => setPlaying(true)} aria-label="Play video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(embedThumb(type, id, poster))} alt="" loading="lazy" />
      <span className="yt-play" aria-hidden>
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

// The room swings toward the viewer like a vault door, then staggers its
// sections in. One element drives both via variants.
const roomVariants = {
  hidden: { opacity: 0, rotateY: -22, y: 60, scale: 0.92 },
  show: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1, delayChildren: 0.26 },
  },
  exit: { opacity: 0, rotateY: 12, y: 40, scale: 0.95, transition: { duration: 0.4, ease: EASE } },
};
const sectionVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Projects() {
  const { site, ui } = useI18n();
  // openIdx → the door is physically swung open.
  // modalIdx → the case-study room is mounted (revealed a beat later).
  const [openIdx, setOpenIdx] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const timer = useRef();
  const roomRef = useRef(null);

  const project = modalIdx != null ? site.projects[modalIdx] : null;
  const media = project?.media || [];
  const current = media[activeMedia] || media[0];

  const openDoor = (i) => {
    if (openIdx === i) return;
    clearTimeout(timer.current);
    setOpenIdx(i);
    setActiveMedia(0);
    // let the leaf swing + light flood before the room rises
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
                    <img className="door-cover" src={asset(p.cover)} alt="" loading="lazy" decoding="async" />
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

      <AnimatePresence>
        {project && (
          <div className="modal">
            <motion.div
              className="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              onClick={close}
            />
            <motion.div
              className="room"
              ref={roomRef}
              variants={roomVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div
                className="room-hero"
                style={{ "--accent": project.accent }}
                variants={sectionVariants}
              >
                <button className="room-close" onClick={close} aria-label="Close">
                  ✕
                </button>
                <div className="tag" style={{ color: project.accent }}>
                  {project.tag}
                </div>
                <h2>{project.name}</h2>
                <div className="sub">{project.sub}</div>
              </motion.div>

              {current && (
                <motion.div className="room-gallery" variants={sectionVariants}>
                  <div className="gallery-main" style={{ "--accent": project.accent }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id || current.src}
                        className="gallery-frame"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {EMBED_TYPES.has(current.type) ? (
                          <EmbedFrame type={current.type} id={current.id} poster={current.poster} />
                        ) : current.type === "video" ? (
                          <video
                            src={asset(current.src)}
                            poster={asset(current.poster)}
                            controls
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={asset(current.src)} alt={project.name} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {media.length > 1 && (
                    <div className="gallery-thumbs">
                      {media.map((m, i) => (
                        <button
                          key={m.id || m.src}
                          className={`thumb${i === activeMedia ? " active" : ""}`}
                          style={{ "--accent": project.accent }}
                          onClick={() => setActiveMedia(i)}
                          aria-label={`View ${m.type} ${i + 1}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset(m.type === "image" ? m.src : embedThumb(m.type, m.id, m.poster))}
                            alt=""
                            loading="lazy"
                          />
                          {m.type !== "image" && <span className="tplay">▶</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              <div className="room-body">
                {project.overview && (
                  <motion.p className="room-overview" variants={sectionVariants}>
                    {project.overview}
                  </motion.p>
                )}
                <motion.div className="monoliths" variants={sectionVariants}>
                  {[
                    [ui.projects.problem, project.problem],
                    [ui.projects.solution, project.solution],
                    [ui.projects.result, project.result],
                  ]
                    .filter(([, body]) => body)
                    .map(([h, body]) => (
                      <div className="monolith" key={h} style={{ "--accent": project.accent }}>
                        <h4>{h}</h4>
                        <p>{body}</p>
                      </div>
                    ))}
                </motion.div>
                <motion.div className="pills" variants={sectionVariants}>
                  {project.stack.map((s) => (
                    <span className="pill" key={s}>
                      {s}
                    </span>
                  ))}
                </motion.div>
                {(project.github || project.live || project.social) && (
                  <motion.div className="room-links" variants={sectionVariants}>
                    {project.github && (
                      <a className="btn primary" href={project.github} target="_blank" rel="noopener noreferrer">
                        ◈ GitHub
                      </a>
                    )}
                    {project.live && (
                      <a className="btn primary" href={project.live} target="_blank" rel="noopener noreferrer">
                        {ui.projects.visitLive}
                      </a>
                    )}
                    {project.social?.facebook && (
                      <a
                        className="social-btn fb"
                        href={project.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on Facebook`}
                      >
                        <FacebookIcon />
                      </a>
                    )}
                    {project.social?.instagram && (
                      <a
                        className="social-btn ig"
                        href={project.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on Instagram`}
                      >
                        <InstagramIcon />
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
