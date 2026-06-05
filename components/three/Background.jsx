"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

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

  useFrame(() => {
    const f = fx.current;
    const t = clock.elapsedTime;
    px.current += (pointer.x - px.current) * 0.05;
    py.current += (pointer.y - py.current) * 0.05;

    const targetFov = f.mode === "door" ? f.camFov : 60;
    const fovDelta = (targetFov - camera.fov) * 0.1;
    camera.fov += fovDelta;
    // Reprojecting is only needed while the FOV is still settling.
    if (Math.abs(fovDelta) > 0.001) camera.updateProjectionMatrix();

    if (f.mode === "door") {
      camera.position.x = px.current * 0.6;
      camera.position.y = -py.current * 0.4;
      camera.position.z += (f.camZ - camera.position.z) * 0.2;
    } else {
      camera.position.x += (px.current * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-py.current * 0.8 - camera.position.y) * 0.04;
      camera.position.z += (8 - camera.position.z) * 0.04;
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

/** Drops render resolution briefly while the visitor scrolls, so the GPU can
 *  keep the smooth-scroll and blurred glass panels fluid, then restores full
 *  crispness once they stop. Pairs with <AdaptiveDpr/> + `performance.min`. */
function ScrollPerfGuard() {
  const regress = useThree((s) => s.performance.regress);
  useEffect(() => {
    const onActivity = () => regress();
    const opts = { passive: true };
    window.addEventListener("wheel", onActivity, opts);
    window.addEventListener("touchmove", onActivity, opts);
    window.addEventListener("scroll", onActivity, opts);
    return () => {
      window.removeEventListener("wheel", onActivity);
      window.removeEventListener("touchmove", onActivity);
      window.removeEventListener("scroll", onActivity);
    };
  }, [regress]);
  return null;
}

/** Post stack — Bloom makes the emissive veins glow, a subtle chromatic
 *  aberration adds a filmic lens fringe, and a vignette frames the void.
 *  NOTE: we deliberately do NOT pass a `ref` to any effect — in React 19 `ref`
 *  is a regular prop and @react-three/postprocessing's wrapEffect does
 *  `JSON.stringify(restProps)`, which throws on the circular effect instance. */
function Effects() {
  return (
    // multisampling 0: Bloom + chromatic aberration already soften edges, so MSAA
    // (which only AAs the base render target, not the post output) is wasted GPU.
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.25}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0006, 0.0006]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.3} darkness={0.85} />
    </EffectComposer>
  );
}

/**
 * The persistent WebGL backdrop. Renders the grand door during the intro, then
 * settles into an ambient drifting void behind the portfolio.
 */
export default function Background({ fx, onError }) {
  const [ok, setOk] = useState(true);

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

  if (!ok) return null;

  return (
    <Canvas
      className="bg-canvas"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2,
        display: "block",
      }}
      dpr={[1, 1.75]}
      performance={{ min: 0.5, max: 1, debounce: 200 }}
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
      <Lights />
      <Ground />
      <Nebula />
      <ShootingStars />
      <ParticleField fx={fx} />
      <GrandDoor fx={fx} />
      <Rig fx={fx} />
      <Effects />
      <ScrollPerfGuard />
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
