"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

const EASE = [0.165, 0.84, 0.44, 1];

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
  // openIdx → the door is physically swung open.
  // modalIdx → the case-study room is mounted (revealed a beat later).
  const [openIdx, setOpenIdx] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const timer = useRef();

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

  return (
    <section id="projects" className="section" data-name="Projects">
      <div className="wrap">
        <Reveal className="eyebrow">Hall of Creations</Reveal>
        <Reveal className="h-title" as="h2">
          Open a Door
        </Reveal>
        <Reveal className="lead">
          Every door is a real project I designed or built. Step inside for the story,
          the visuals and the live work.
        </Reveal>

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
                  <div className="enter">Step Inside</div>
                  <div className="arrow">→</div>
                </div>
                <div className="leaf">
                  {p.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="door-cover" src={p.cover} alt="" loading="lazy" />
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
                        key={current.src}
                        className="gallery-frame"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {current.type === "video" ? (
                          <video
                            src={current.src}
                            poster={current.poster}
                            controls
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={current.src} alt={project.name} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {media.length > 1 && (
                    <div className="gallery-thumbs">
                      {media.map((m, i) => (
                        <button
                          key={m.src}
                          className={`thumb${i === activeMedia ? " active" : ""}`}
                          style={{ "--accent": project.accent }}
                          onClick={() => setActiveMedia(i)}
                          aria-label={`View ${m.type} ${i + 1}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.type === "video" ? m.poster : m.src} alt="" loading="lazy" />
                          {m.type === "video" && <span className="tplay">▶</span>}
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
                    ["Problem", project.problem],
                    ["Solution", project.solution],
                    ["Result", project.result],
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
                {(project.github || project.live) && (
                  <motion.div className="room-links" variants={sectionVariants}>
                    {project.github && (
                      <a className="btn primary" href={project.github} target="_blank" rel="noopener noreferrer">
                        ◈ GitHub
                      </a>
                    )}
                    {project.live && (
                      <a className="btn primary" href={project.live} target="_blank" rel="noopener noreferrer">
                        Visit Live Site →
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
