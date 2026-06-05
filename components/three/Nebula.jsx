"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Soft radial sprite, drawn once to a canvas and reused for every cloud. */
function useNebulaTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,0.5)");
    g.addColorStop(0.4, "rgba(255,255,255,0.16)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, []);
}

const CLOUDS = [
  { pos: [-13, 6, -26], scale: 22, color: 0x1e4fff, opacity: 0.05, speed: 0.012 },
  { pos: [15, -5, -30], scale: 26, color: 0x9a6bff, opacity: 0.045, speed: -0.009 },
  { pos: [5, 10, -34], scale: 30, color: 0x00a6c0, opacity: 0.04, speed: 0.007 },
  { pos: [-9, -9, -24], scale: 18, color: 0xe5c16f, opacity: 0.028, speed: -0.014 },
];

/** Slow, parallaxed gas clouds far behind everything — pure atmosphere/depth. */
export default function Nebula() {
  const tex = useNebulaTexture();
  const refs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const c = CLOUDS[i];
      m.rotation.z = t * c.speed;
      // gentle breathing scale + drift
      const s = c.scale * (1 + Math.sin(t * 0.12 + i) * 0.04);
      m.scale.set(s, s, 1);
      m.position.x = c.pos[0] + Math.sin(t * 0.05 + i) * 1.5;
      m.position.y = c.pos[1] + Math.cos(t * 0.04 + i) * 1.0;
    });
  });

  if (!tex) return null;

  return (
    <group>
      {CLOUDS.map((c, i) => (
        <mesh key={i} position={c.pos} ref={(el) => (refs.current[i] = el)}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            color={c.color}
            transparent
            opacity={c.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
