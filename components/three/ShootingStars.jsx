"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 3;
const rand = (a, b) => a + Math.random() * (b - a);

/** A few comets that streak across the void at random intervals. Each is a thin
 *  stretched additive sprite that fades in, flies, and fades out, then re-arms. */
export default function ShootingStars() {
  const refs = useRef([]);
  const meta = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      next: 2 + i * 3 + Math.random() * 6, // first launch time
      t: 0,
      dur: 0,
      active: false,
      from: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      angle: 0,
    }))
  );

  const tex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = 128;
    const h = 16;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.75, "rgba(190,230,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,1)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // round the bright head
    const rg = ctx.createRadialGradient(w - 8, h / 2, 0, w - 8, h / 2, 8);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(w - 16, 0, 16, h);
    const t = new THREE.CanvasTexture(c);
    t.minFilter = THREE.LinearFilter;
    return t;
  }, []);

  const launch = (m) => {
    m.active = true;
    m.t = 0;
    m.dur = rand(0.7, 1.3);
    // start somewhere upper area, fly down-across
    m.from.set(rand(-18, 6), rand(4, 12), rand(-14, -6));
    const dirx = rand(0.6, 1.2);
    const diry = rand(-0.5, -0.9);
    m.dir.set(dirx, diry, 0).normalize();
    m.angle = Math.atan2(m.dir.y, m.dir.x);
    m.len = rand(8, 16);
  };

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    meta.current.forEach((m, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;

      if (!m.active) {
        mesh.visible = false;
        if (time >= m.next) launch(m);
        return;
      }

      m.t += delta;
      const p = m.t / m.dur;
      if (p >= 1) {
        m.active = false;
        m.next = time + rand(4, 11);
        mesh.visible = false;
        return;
      }

      mesh.visible = true;
      const travel = m.len * p;
      mesh.position.set(
        m.from.x + m.dir.x * travel,
        m.from.y + m.dir.y * travel,
        m.from.z
      );
      mesh.rotation.z = m.angle;
      // fade in fast, fade out slow
      const fade = Math.sin(Math.min(p * 1.15, 1) * Math.PI);
      mesh.material.opacity = fade * 0.9;
      const stretch = 2.2 + p * 1.5;
      mesh.scale.set(stretch, 0.16, 1);
    });
  });

  if (!tex) return null;

  return (
    <group>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} visible={false}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={0}
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
