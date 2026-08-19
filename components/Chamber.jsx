"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Lenis from "lenis";

import Atmosphere from "@/components/Atmosphere";
import Cursor from "@/components/Cursor";
import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import DotNav from "@/components/DotNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { useReducedMotion, useIsTouch } from "@/hooks/useReducedMotion";

// three + @react-three/* + postprocessing is 1.35 MB of JavaScript — bigger
// than everything else on the site combined. Imported statically it sat in the
// first-paint bundle, so the browser had to download and parse all of it before
// it could draw a single word of the intro. Split out, the overlay paints
// immediately and the WebGL door streams in behind it (`ssr: false` because the
// canvas is client-only anyway, and the whole site is a static export).
const Background = dynamic(() => import("@/components/three/Background"), {
  ssr: false,
});

/**
 * Chamber — the experience orchestrator.
 *  • Owns the shared `fx` ref read by the WebGL scene every frame.
 *  • Plays the grand-door intro (GSAP), then reveals the portfolio.
 *  • Sets up Lenis smooth scrolling once entered.
 */
export default function Chamber() {
  const [entered, setEntered] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  // Shared animation state — mutated by GSAP, read by <Background/> useFrame.
  const fx = useRef({
    mode: "door", // 'door' | 'ambient'
    glow: 0, // vein emissive multiplier
    warp: 0, // particle warp amount (0..1)
    open: 0, // door unfold progress (0..1)
    seam: 0, // light leaking through the central crack (0..1.6)
    shake: 0, // handheld camera shake amount (0..1)
    rumble: 0, // pre-open door vibration (0..1)
    camZ: 8,
    camFov: 60,
    doorVisible: true,
  });

  const [manualMode, setManualMode] = useState(false);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const flashRef = useRef(null);
  const lenisRef = useRef(null);
  const enteredRef = useRef(false);
  const introStartedRef = useRef(false);

  // Smooth-scroll helper handed to nav components.
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const enter = () => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    fx.current.mode = "ambient";
    // Retire the door instantly — it happens under the full whiteout, so the
    // 3D door can never bleed through behind the portfolio as it paints in.
    fx.current.doorVisible = false;
    setEntered(true);
    document.body.style.overflow = "";
    // ease the warp back down
    gsap.to(fx.current, {
      warp: 0,
      glow: 0.5,
      seam: 0,
      shake: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  /* ----------------------------- Intro sequence ----------------------------- */
  // Runs EXACTLY once on mount. It must never restart: the deciding inputs
  // (reduced motion / touch / WebGL support) are read synchronously here instead
  // of from async React state, so a late state flip can no longer revert and
  // re-fire the in-flight GSAP door timeline (the old cause of the intro
  // occasionally "going everywhere" — two timelines fighting over fx.current).
  useEffect(() => {
    if (introStartedRef.current || enteredRef.current) return;
    introStartedRef.current = true;

    // Always begin at the very top: a browser-restored scroll position from a
    // previous visit made the reveal paint mid-page and look broken on reload.
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    // Reduced motion / touch / no-WebGL → show a manual "Enter" affordance.
    // Probed synchronously so the decision is correct on the very first run.
    const manual = (() => {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
        if (window.matchMedia("(pointer:coarse)").matches) return true;
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        return !gl;
      } catch {
        return true;
      }
    })();
    setManualMode(manual);

    let tl;
    const ctx = gsap.context(() => {
      if (manual) {
        gsap.to(titleRef.current, { opacity: 1, duration: 1 });
        gsap.to(hintRef.current, { opacity: 1, duration: 1, delay: 0.4 });
        fx.current.glow = 1.1;
        return;
      }

      // NOTE: no `gsap.set(titleRef, { opacity: 0 })` here any more, and that
      // omission is deliberate. The title's entrance is now a CSS animation
      // (`.intro-title` in globals.css) so it paints without waiting for this
      // bundle to download and execute — it was the LCP element and it was
      // costing twelve seconds on a throttled phone. Hiding it again from
      // JavaScript would undo exactly that: on a slow device the timeline
      // starts *after* the CSS animation has finished, so this line would
      // blank a title the visitor is already reading and re-fade it.
      //
      // The two opacity tweens below are kept, not because the title needs
      // them — it is already at 1 by the time they run, so they are a no-op —
      // but because they hold the timeline's shape. Every later beat is
      // positioned relative to them.
      tl = gsap.timeline({ delay: 0.6 });

      // ── PHASE 1 · SENSING — title resolves, the veins draw their first breath
      tl.to(titleRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" })
        .to(hintRef.current, { opacity: 0.85, duration: 0.9 }, "<0.3")
        .to(fx.current, { glow: 1, duration: 1.1, ease: "sine.inOut" }, ">-0.2")
        // a slow dolly closer — we lean toward the door, drawn in
        .to(fx.current, { camZ: 6.2, duration: 2.4, ease: "sine.inOut" }, "<")

        // ── PHASE 2 · UNLATCH — a blade of light splits the seam; the door shudders
        .addLabel("unlatch")
        .to(fx.current, { rumble: 1, duration: 0.5, ease: "power2.in" }, "unlatch")
        .to(fx.current, { seam: 1.5, duration: 0.9, ease: "power3.out" }, "unlatch+=0.15")
        .to(fx.current, { glow: 1.5, duration: 0.9, ease: "power2.out" }, "unlatch+=0.15")
        // the mechanical "clunk" — a short shake spike that settles
        .to(fx.current, { shake: 0.5, duration: 0.12, ease: "power3.in" }, "unlatch+=0.7")
        .to(fx.current, { shake: 0.12, duration: 0.5, ease: "power2.out" }, ">")
        // anticipation beat before the leaves give way
        .to(fx.current, { rumble: 0.4, duration: 0.4 }, ">-0.2")

        // ── PHASE 3 · OPENING — heavy leaves unfold, light floods, camera pushes through
        .addLabel("open", ">-0.1")
        .to(fx.current, { glow: 1.9, duration: 1.6 }, "open")
        .to(fx.current, { seam: 1.0, duration: 1.6, ease: "power1.out" }, "open")
        .to(fx.current, { rumble: 0, duration: 0.6 }, "open")
        // weighty swing: slow to start, then surrenders (power4 feels like mass)
        .to(fx.current, { open: 1, duration: 1.9, ease: "power4.inOut" }, "open")
        .to(
          fx.current,
          { camZ: -1.8, camFov: 100, duration: 1.9, ease: "power2.in" },
          "open"
        )
        // shake builds as we accelerate through the threshold
        .to(fx.current, { shake: 0.9, duration: 1.3, ease: "power2.in" }, "open+=0.5")
        .to(fx.current, { warp: 1, duration: 0.95, ease: "power2.in" }, "open+=0.95")
        .to(titleRef.current, { opacity: 0, duration: 0.4 }, "open+=0.7")
        .to(hintRef.current, { opacity: 0, duration: 0.4 }, "open+=0.7")

        // ── PHASE 4 · WARP → WHITEOUT → REVEAL
        // The white peaks to hide the swap, the portfolio paints in fast BENEATH
        // it, then the white dissolves to reveal the finished, animating scene —
        // so there's never a blank white gap.
        .to(flashRef.current, { opacity: 1, duration: 0.3, ease: "power2.in" }, "open+=1.45")
        .add(enter)
        // hold the whiteout fully opaque a beat so the portfolio is completely
        // painted (and the door fully gone) before the light dissolves — a clean
        // cut to the finished scene, never a muddy overlap.
        .to(
          flashRef.current,
          { opacity: 0, duration: 1.0, ease: "power2.out" },
          ">0.4"
        );
    });

    // Safety net: never trap the visitor behind the door.
    const safety = setTimeout(enter, 9000);

    return () => {
      clearTimeout(safety);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual enter (reduced motion / touch / fallback button).
  const manualEnter = () => {
    gsap.to(flashRef.current, { opacity: 1, duration: 0.3 });
    gsap.delayedCall(0.3, () => {
      enter();
      gsap.to(flashRef.current, { opacity: 0, duration: 0.6 });
    });
  };

  /* ------------------------------- Lenis scroll ----------------------------- */
  useEffect(() => {
    if (!entered || reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [entered, reduced]);

  /* ------------------- Lock the page while a project room is open ----------- */
  // When a door opens, freeze the underlying page so it can NEVER move or bleed
  // behind the room. Projects fires these events.
  //
  // NOTE: replacing `body{overflow:hidden}` with wheel/touchmove swallowing was
  // tried here and reverted — on a phone it changed nothing measurable (the
  // full-document Layout when a room opens dirties the same ~720 boxes either
  // way, because a phone has no scrollbar for the overflow change to remove).
  useEffect(() => {
    const lock = () => {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
      // The room covers the viewport completely, but every decorative
      // animation behind it kept running — fourteen door arrows pulsing under an
      // opaque panel nobody can see through. `data-room-open` parks them (see
      // globals.css); the IntersectionObserver above cannot, because the hall
      // is still, technically, intersecting.
      document.documentElement.setAttribute("data-room-open", "");
    };
    const unlock = () => {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-room-open");
    };
    window.addEventListener("chamber:modal-open", lock);
    window.addEventListener("chamber:modal-close", unlock);
    return () => {
      window.removeEventListener("chamber:modal-open", lock);
      window.removeEventListener("chamber:modal-close", unlock);
    };
  }, []);

  /* ----------------- Pause animations in off-screen sections ---------------- */
  // A CSS animation keeps running when its element is scrolled out of view, and
  // these are all `infinite`: fourteen door arrows pulsing, the skill orbs
  // drifting, the contact ring spinning — all of it ticking while the visitor
  // is still reading the hero. Measured at idle, the always-on animations were
  // the whole main-thread cost of the page: 40% busy with them, 10% without.
  // Pausing whatever is off-screen leaves only what is actually being looked at.
  useEffect(() => {
    if (!entered) return;
    const sections = Array.from(document.querySelectorAll("main.scene .section"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // `data-idle` drives `animation-play-state: paused` in globals.css.
          e.target.toggleAttribute("data-idle", !e.isIntersecting);
        }
      },
      // Was "100% 0px" — a full screen of margin either side. That is wide
      // enough that a section *adjacent* to the visible one always counts as
      // intersecting, so it never went idle. Measured: standing in #projects,
      // #skills stayed awake and span its twelve orb haloes off-screen the
      // whole time, while the sections further away were correctly paused.
      // 25% is still a comfortable quarter-screen of lead, and pausing is
      // resumption, not a restart: an arrow picks its pulse back up mid-cycle,
      // so there is nothing to "catch starting".
      { rootMargin: "25% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [entered]);

  /* ------------------- Click-and-drag scrolling (grab to scroll) ------------ */
  // Grab anywhere on the page (except real interactive elements) and move up or
  // down to scroll — makes navigating and lining up hovers effortless on
  // desktop. Routed through Lenis so it stays buttery-smooth.
  useEffect(() => {
    if (!entered || isTouch) return;
    const SKIP =
      "a, button, input, textarea, select, label, video, iframe, canvas, [role='button'], .modal";
    let downEl = null;
    let down = false;
    let dragging = false;
    let startY = 0;
    let startScroll = 0;
    let pid = null;

    const curScroll = () => (lenisRef.current ? lenisRef.current.scroll : window.scrollY);
    const scrollToY = (y) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const clamped = Math.max(0, Math.min(y, max));
      if (lenisRef.current) lenisRef.current.scrollTo(clamped, { immediate: true, force: true });
      else window.scrollTo(0, clamped);
    };

    const onDown = (e) => {
      if (e.button !== 0 || (e.target.closest && e.target.closest(SKIP))) return;
      downEl = e.target;
      down = true;
      dragging = false;
      startY = e.clientY;
      startScroll = curScroll();
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
      scrollToY(startScroll - dy);
      e.preventDefault();
    };
    const onUp = () => {
      down = false;
      if (dragging) {
        dragging = false;
        document.body.classList.remove("dragging");
      }
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.classList.remove("dragging");
    };
  }, [entered, isTouch]);

  // True while the door is parked waiting for a tap rather than playing itself.
  // This is the normal path on any touch device (see the `pointer:coarse` probe
  // in the intro effect above), so it is not an edge case — it is what most
  // phone visitors see, for as long as they take to press the button.
  const showEnterBtn = (manualMode || webglFailed) && !entered;

  return (
    <LanguageProvider>
      <Atmosphere />
      <Background
        fx={fx}
        entered={entered}
        // Waiting is not playing. Told this, the canvas paces itself at 30fps
        // on demand instead of running the full door animation at 60.
        awaitingEntry={showEnterBtn}
        onError={() => setWebglFailed(true)}
      />
      <Cursor />

      <IntroOverlay
        titleRef={titleRef}
        hintRef={hintRef}
        showEnter={showEnterBtn}
        onEnter={manualEnter}
        hidden={entered}
      />
      <div ref={flashRef} className="flash" />

      <main
        className="scene"
        style={{
          opacity: entered ? 1 : 0,
          visibility: entered ? "visible" : "hidden",
          // Pure opacity — no scale settle. The scene is fully in place beneath
          // the whiteout, so when the white lifts it reveals a finished, static
          // portfolio (the hero's own entrance animations do the elegant part).
          transition: "opacity 0.5s ease",
        }}
        aria-hidden={!entered}
      >
        <Navbar scrollTo={scrollTo} revealed={entered} />
        <DotNav scrollTo={scrollTo} revealed={entered} />
        <Hero revealed={entered} scrollTo={scrollTo} />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
