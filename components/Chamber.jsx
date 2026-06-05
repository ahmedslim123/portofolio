"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";

import Atmosphere from "@/components/Atmosphere";
import Cursor from "@/components/Cursor";
import Background from "@/components/three/Background";
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
import { useReducedMotion, useIsTouch } from "@/hooks/useReducedMotion";

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

  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const flashRef = useRef(null);
  const lenisRef = useRef(null);
  const enteredRef = useRef(false);

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
    setEntered(true);
    document.body.style.overflow = "";
    // ease the warp back down and retire the door
    gsap.to(fx.current, {
      warp: 0,
      glow: 0.5,
      seam: 0,
      shake: 0,
      duration: 1.5,
      ease: "power2.out",
    });
    // Retire the door with a plain timer (NOT gsap.delayedCall) so it survives a
    // gsap.context revert if the intro effect re-runs (e.g. a late WebGL flag).
    setTimeout(() => {
      fx.current.doorVisible = false;
    }, 600);
  };

  /* ----------------------------- Intro sequence ----------------------------- */
  useEffect(() => {
    // Once we're through the door, never re-run the intro — a late dependency
    // change (e.g. WebGL flag flipping) must not relock scroll or revive the door.
    if (enteredRef.current) return;

    document.body.style.overflow = "hidden";

    // Reduced motion / touch / no-WebGL → show a manual "Enter" affordance.
    const manual = reduced || isTouch || webglFailed;

    let tl;
    const ctx = gsap.context(() => {
      if (manual) {
        gsap.to(titleRef.current, { opacity: 1, duration: 1 });
        gsap.to(hintRef.current, { opacity: 1, duration: 1, delay: 0.4 });
        fx.current.glow = 1.1;
        return;
      }

      gsap.set(titleRef.current, { opacity: 0 });
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
        .to(
          flashRef.current,
          { opacity: 0, duration: 0.9, ease: "power2.out" },
          ">0.12"
        );
    });

    // Safety net: never trap the visitor behind the door.
    const safety = setTimeout(enter, 9000);

    return () => {
      clearTimeout(safety);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, isTouch, webglFailed]);

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

  const showEnterBtn = (reduced || isTouch || webglFailed) && !entered;

  return (
    <>
      <Atmosphere />
      <Background fx={fx} onError={() => setWebglFailed(true)} />
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
          transform: entered ? "scale(1)" : "scale(1.045)",
          transformOrigin: "center 38%",
          // opacity snaps in quickly beneath the whiteout; the scale gives a
          // gentle cinematic settle as the white dissolves to reveal it.
          transition:
            "opacity 0.5s ease, transform 1.2s cubic-bezier(0.165,0.84,0.44,1)",
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
    </>
  );
}
