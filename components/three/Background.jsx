"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import { approach } from "@/lib/frame";
import GrandDoor from "@/components/three/GrandDoor";
import ParticleField from "@/components/three/ParticleField";
import Nebula from "@/components/three/Nebula";
import ShootingStars from "@/components/three/ShootingStars";

/** Cinematic lighting rig — single key spot + warm rim + cool core. */
function Lights() {
  return (
    <>
      <ambientLight color={0x223055} intensity={0.6} />
      <spotLight
        color={0xbfe6ff}
        intensity={3.2}
        distance={60}
        angle={Math.PI / 5}
        penumbra={0.4}
        decay={1.2}
        position={[-6, 8, 6]}
      />
      <pointLight color={0xe5c16f} intensity={1.4} distance={40} position={[6, -2, 4]} />
      <pointLight color={0x1e9fff} intensity={2.2} distance={30} position={[0, 0, 1.2]} />
    </>
  );
}

/** Reflective obsidian ground plane that mirrors the door's glow. */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color={0x05060f} metalness={0.9} roughness={0.35} />
    </mesh>
  );
}

/** Drives the camera: GSAP tweens fx.* values, we ease the camera toward them
 *  and add pointer parallax. */
function Rig({ fx }) {
  const { camera, pointer, clock } = useThree();
  const px = useRef(0);
  const py = useRef(0);

  useFrame((_, delta) => {
    const f = fx.current;
    const t = clock.elapsedTime;

    // Every easing below is a DURATION, not a number of frames. Before this,
    // the camera reached the door in a fixed 15 frames — a quarter of a second
    // at 60 Hz, a tenth at 144 Hz — so the whole approach through the doorway
    // played at the speed of whatever display it landed on. See lib/frame.js.
    const aPtr = approach(0.05, delta);
    const aFov = approach(0.1, delta);
    const aDoor = approach(0.2, delta);
    const aAmb = approach(0.04, delta);

    px.current += (pointer.x - px.current) * aPtr;
    py.current += (pointer.y - py.current) * aPtr;

    const targetFov = f.mode === "door" ? f.camFov : 60;
    const fovDelta = (targetFov - camera.fov) * aFov;
    camera.fov += fovDelta;
    // Reprojecting is only needed while the FOV is still settling.
    if (Math.abs(fovDelta) > 0.001) camera.updateProjectionMatrix();

    if (f.mode === "door") {
      camera.position.x = px.current * 0.6;
      camera.position.y = -py.current * 0.4;
      camera.position.z += (f.camZ - camera.position.z) * aDoor;
    } else {
      camera.position.x += (px.current * 1.2 - camera.position.x) * aAmb;
      camera.position.y += (-py.current * 0.8 - camera.position.y) * aAmb;
      camera.position.z += (8 - camera.position.z) * aAmb;
    }
    camera.lookAt(0, 0, 0);

    // Handheld shake — layered sines (no two frequencies share a period) give an
    // organic, non-repeating tremor that swells as we charge the threshold.
    const sh = f.shake || 0;
    if (sh > 0.0001) {
      const a = sh * 0.06;
      camera.position.x += (Math.sin(t * 31.0) + Math.sin(t * 47.3) * 0.6) * a;
      camera.position.y += (Math.cos(t * 27.7) + Math.sin(t * 53.1) * 0.6) * a;
      camera.rotation.z += Math.sin(t * 23.3) * sh * 0.01;
    }
  });

  return null;
}

/** Post stack — Bloom makes the emissive veins glow and a vignette frames the
 *  void. (We dropped the chromatic-aberration pass: it was a full-screen pass
 *  every frame for a barely-visible fringe.)
 *
 *  This runs during the DOOR INTRO ONLY. Bloom's mipmap blur is several
 *  full-screen passes per frame; keeping it alive behind the scrolling
 *  portfolio measured as the single most expensive thing on the page. The
 *  intro is six seconds with nothing else on screen, so it can afford it —
 *  the ambient void afterwards cannot, and doesn't need it: the star shader
 *  draws its own glow, and the vignette is already a static CSS layer
 *  (`.vignette` in <Atmosphere/>) that costs nothing.
 *
 *  NOTE: we deliberately do NOT pass a `ref` to any effect — in React 19 `ref`
 *  is a regular prop and @react-three/postprocessing's wrapEffect does
 *  `JSON.stringify(restProps)`, which throws on the circular effect instance. */
function Effects() {
  return (
    // multisampling 0: Bloom already softens edges, so MSAA (which only AAs the
    // base render target, not the post output) is wasted GPU.
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.25}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <Vignette eskil={false} offset={0.3} darkness={0.85} />
    </EffectComposer>
  );
}

/**
 * Paces the ambient void at 30 fps instead of 60.
 *
 * Behind the portfolio the scene is slow drift — clouds breathing over ~9s,
 * stars twinkling, a gentle pointer parallax. Half the frames are
 * indistinguishable there, and every one we skip is a full additive
 * repaint of the viewport handed back to the scroll.
 *
 * Also used for the door while it waits for a tap, which is a still scene for
 * the same reason. Only the door's PLAYING animation is left at full rate: it
 * is fast camera motion with nothing else competing for the frame, and it lasts
 * seven seconds.
 */
function AmbientFrameRate({ fps = 30 }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    let stopped = false;
    let last = 0;
    const interval = 1000 / fps;

    // The previous version called requestAnimationFrame every frame and threw
    // half of them away. That still asked the browser for sixty frames a second
    // to use thirty, and a requested frame is not free even when we draw
    // nothing in it: the browser runs the whole pipeline for it, and style
    // recalculation is billed for every running CSS animation on the page.
    // Measured on the idle portfolio, the frame cadence — not the WebGL draw —
    // was what set the main thread's workload.
    //
    // So the rAF is now only *pending* when a frame is actually wanted: sleep
    // on a timer, wake, ask for one frame, draw, sleep again. The wait is
    // measured from the last draw so the cadence does not drift slower as the
    // work in each frame grows.
    // requestAnimationFrame does not run when it is called, it runs at the next
    // screen refresh — so "sleep 33 ms, then ask for a frame" delivers 33 ms
    // PLUS up to a whole refresh interval. Measured on the shipped build: this
    // pacer advertised 30 fps and drew 19.95, a third slow, which is a large
    // part of why the ambient backdrop did not feel smooth.
    //
    // Rather than guess the refresh interval (120 Hz and 144 Hz panels are
    // common, so 16.7 ms is not a safe constant), the sleep corrects itself:
    // each frame compares the period it actually achieved against the one it
    // wanted and moves the correction halfway toward the error. It converges in
    // a few frames, on any display, and re-converges by itself if the machine
    // gets busy.
    let bias = 0;

    const draw = (now) => {
      if (last) bias = Math.min(Math.max(bias + (now - last - interval) * 0.5, 0), interval);
      last = now;
      invalidate();
      timer = setTimeout(() => {
        if (!stopped) raf = requestAnimationFrame(draw);
      }, Math.max(0, interval - bias));
    };
    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [invalidate, fps]);

  return null;
}

/**
 * The persistent WebGL backdrop. Renders the grand door during the intro, then
 * settles into an ambient drifting void behind the portfolio.
 */
export default function Background({ fx, entered, awaitingEntry, onError }) {
  const [ok, setOk] = useState(true);
  // The ambient void draws steadily while the visitor navigates, so it never
  // freezes, jumps or restarts on a click or a scroll. It stops only when
  // nobody can see it: a hidden tab, or a project room covering the screen.
  const [visible, setVisible] = useState(true);
  // A project room is an opaque full-screen panel. Everything behind it —
  // including this canvas — is being drawn for nobody, so the loop stops for as
  // long as the room is up. Same events that stop the scroll and park the CSS
  // animations (see Chamber.jsx).
  const [covered, setCovered] = useState(false);
  // Read once, at the very first render, and never changed afterwards — which
  // is the whole point. A phone does not need 1.5x device pixels for a soft
  // glowing door: it is the same argument already made for the ambient void
  // below, and on a phone it is 2.25x the fill for something nobody can see.
  //
  // Deliberately NOT derived from `awaitingEntry`, even though that is the
  // state it is really about. That prop arrives one render after mount, so the
  // canvas would be built at 1.5x and immediately rebuilt at 1x — and the
  // resize lands in the same frame as the Enter button's first paint. Measured:
  // it pushed LCP from 3.4s to 5.7s across three runs. Probing here instead
  // costs nothing, because this component is loaded `ssr: false` and therefore
  // never renders anywhere `window` is missing.
  const [coarse] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches
  );

  useEffect(() => {
    const cover = () => setCovered(true);
    const uncover = () => setCovered(false);
    window.addEventListener("chamber:modal-open", cover);
    window.addEventListener("chamber:modal-close", uncover);
    return () => {
      window.removeEventListener("chamber:modal-open", cover);
      window.removeEventListener("chamber:modal-close", uncover);
    };
  }, []);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) {
        setOk(false);
        onError?.();
      }
    } catch {
      setOk(false);
      onError?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!ok) return null;

  return (
    <Canvas
      className="bg-canvas"
      // Portfolio: render on demand, driven at 30 fps by <AmbientFrameRate/>.
      // Intro: every frame, it is the whole show.
      //
      // Deliberately never "never". Flipping frameloop to "never" and back does
      // stop the canvas, but it does not reliably start again — measured: after
      // closing a project room the backdrop stayed frozen for the rest of the
      // visit, on every section. Stopping is instead expressed by not asking
      // for frames at all: `demand` only draws when something calls invalidate,
      // and <AmbientFrameRate/> — the only caller — is unmounted while the tab
      // is hidden or a room is covering the screen. Same saving, and resuming
      // is just React mounting a component again.
      //
      // `awaitingEntry` is the other half of that idea, and it is the common
      // case on phones. Chamber.jsx sends every coarse-pointer device down the
      // manual path: the door does not play itself, it parks and waits for a
      // tap. While it waits nothing is moving except the shader drift — but
      // this was still the single most expensive state on the site, running at
      // sixty frames a second with the full Bloom stack, on the weakest
      // hardware, for as long as the visitor took to decide. Measured under
      // Lighthouse's mid-range phone, which never taps: thirty seconds of
      // blocked main thread. Waiting is paced like the ambient void instead.
      //
      // The intro is on `demand` too now. It used to be "always", which means
      // the display's refresh rate — and on a 144 Hz panel that is 144 full
      // Bloom stacks a second, 2.4x the work, for an animation that (now it is
      // time-based) looks exactly the same at 60. The pacer below caps it.
      frameloop="demand"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2,
        display: "block",
      }}
      // Two fixed steps, switched exactly once — under the whiteout, where the
      // change is invisible. The door is a detailed lit object and deserves the
      // pixels; the ambient void is soft additive glows where DPR 1 is
      // indistinguishable, and costs 2.25x less fill on a 1.5x display.
      dpr={entered || coarse ? 1 : [1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      onError={() => {
        setOk(false);
        onError?.();
      }}
    >
      <fogExp2 attach="fog" args={[0x070a1e, 0.045]} />

      {/* Door phase only. Once the visitor is through, ALL of this is
          unmounted — it is the entire lit half of the scene. The door and the
          ground are the only MeshStandardMaterials here, so retiring them
          retires the four-light rig with them (the nebula, the shooting stars
          and the starfield are unlit basic/shader materials). What is left
          behind the portfolio is an unlit scene with no post-processing. */}
      {!entered && (
        <>
          <Lights />
          <Ground />
          <GrandDoor fx={fx} />
          <Effects />
        </>
      )}

      <Nebula />
      <ShootingStars />
      <ParticleField fx={fx} />
      <Rig fx={fx} />
      {/* One pacer for every phase: 60 while the door plays (fast camera work,
          nothing else on screen), 30 once it is a slow ambient drift or a still
          door waiting for a tap. Unmounted when nobody can see it. */}
      {visible && !covered && <AmbientFrameRate fps={entered || awaitingEntry ? 30 : 60} />}
    </Canvas>
  );
}
