"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { approach } from "@/lib/frame";

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uSize;
  uniform float uMaxSize;
  varying vec3 vColor;
  varying float vTw;
  varying float vNear;
  void main() {
    vColor = aColor;
    // each star breathes on its own phase
    float tw = 0.55 + 0.45 * sin(uTime * 1.4 + aPhase);
    vTw = tw;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float viewZ = -mv.z;

    // Perspective attenuation with a floor on the DIVISOR, not just a clamp on
    // the answer: 26.0/viewZ runs away as a star approaches the camera, and
    // the cloud is a box that CONTAINS the camera, so stars really do get
    // to viewZ = 0.01. Clamping afterwards did not prevent the blow-up, it just
    // parked the result at a fixed 46px disc; measured on the live site, 46 of
    // 1800 stars sat pinned at that size, drifting across the hero as the field
    // rotated. Flooring the divisor bounds the size before it is ever computed.
    float sz = uSize * aScale * tw * (26.0 / max(viewZ, 7.0));
    gl_PointSize = clamp(sz, 1.0, uMaxSize);

    // ...and this bounds how VISIBLE a star is while it is that close, so one
    // passing through the camera dissolves instead of flaring. Together the two
    // mean there is no distance at which a star can become a blob.
    vNear = smoothstep(1.5, 9.0, viewZ);

    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vTw;
  varying float vNear;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    // soft circular falloff with a small bright centre
    float glow = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);
    float alpha = glow * glow * (0.32 + vTw * 0.34) + core * 0.25;
    gl_FragColor = vec4(vColor * (0.45 + vTw * 0.4), alpha * vNear);
  }
`;

// The cloud's depth, as one definition instead of two magic numbers that have
// to be kept in step. Positions are generated inside [Z_BACK, Z_FRONT] and the
// warp recycles inside the same span.
const Z_FRONT = 14;
const Z_BACK = -22;
const Z_SPAN = Z_FRONT - Z_BACK;

/** The void dust: thousands of additive stars that twinkle and drift, then rush
 *  the camera in a warp tunnel when fx.warp ramps up. */
export default function ParticleField({ fx, count }) {
  const pointsRef = useRef(null);
  const matRef = useRef(null);

  const { positions, aColor, aScale, aPhase, N } = useMemo(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The void renders continuously at a fixed quality (no runtime throttling),
    // so the point count is kept modest to hold a rock-steady frame rate on its
    // own. Additive points are fill-rate heavy; these counts still read as a
    // dense starfield. Touch devices get fewer (weaker GPUs).
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer:coarse)").matches;
    const N = count ?? (reduced ? 1200 : coarse ? 1800 : 3200);
    const positions = new Float32Array(N * 3);
    const aColor = new Float32Array(N * 3);
    const aScale = new Float32Array(N);
    const aPhase = new Float32Array(N);
    const palette = [
      [0.12, 0.62, 1], // blue
      [0.0, 0.97, 1], // cyan
      [0.9, 0.76, 0.43], // gold
      [0.6, 0.42, 1], // violet
      [0.85, 0.9, 1], // near-white
    ];
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = Z_BACK + Math.random() * Z_SPAN;
      // weight palette toward blue/cyan, occasional gold/violet/white sparkle
      const r = Math.random();
      const c =
        r < 0.4 ? palette[0] : r < 0.7 ? palette[1] : r < 0.82 ? palette[2] : r < 0.92 ? palette[3] : palette[4];
      aColor[i * 3] = c[0];
      aColor[i * 3 + 1] = c[1];
      aColor[i * 3 + 2] = c[2];
      aScale[i] = 0.4 + Math.random() * Math.random() * 2.6; // many small, few large
      aPhase[i] = Math.random() * Math.PI * 2;
    }
    return { positions, aColor, aScale, aPhase, N };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.5 },
      // The ceiling on a single point. Low enough at rest that no star can read
      // as a blob, raised during the warp because the tunnel IS big stars.
      uMaxSize: { value: 22 },
    }),
    []
  );

  useFrame((state, delta) => {
    const f = fx.current;
    const pts = pointsRef.current;
    const mat = matRef.current;
    if (!pts || !mat) return;

    mat.uniforms.uTime.value = state.clock.elapsedTime;

    // Radians per SECOND, not per frame. See lib/frame.js — this drift used to
    // run 3x faster during the intro than behind the portfolio (measured:
    // 2.064 deg/s against 0.686 deg/s in one visit) purely because the canvas
    // draws at different rates in the two phases.
    //
    // The two rates are deliberately different, and the ambient one is NOT the
    // arithmetic conversion of the old constant. The old constant assumed 60
    // fps; behind the portfolio the pacer was really delivering 20, so the
    // calm backdrop everyone has actually seen drifts at a third of the
    // nominal speed. Converting by arithmetic would have made the portfolio
    // three times busier than the one on screen today — the opposite of the
    // complaint that started this. So the ambient rate is pinned to the
    // measured shipped value and the intro keeps the sweep it always had.
    const dt = Math.min(delta, 0.05);
    const yaw = f.mode === "door" ? 0.036 : 0.012;
    pts.rotation.y += (yaw + f.warp * 0.6) * dt;
    if (f.mode !== "door") pts.rotation.x += 0.004 * dt;

    if (f.warp > 0.001) {
      const arr = pts.geometry.attributes.position.array;
      const speed = f.warp * 95 * Math.min(delta, 0.05);
      // Recycle inside the cloud's own depth. This used to wrap relative to the
      // camera and subtract a hard-coded 72 — nearly twice the cloud's depth —
      // so every star that streamed past during the six-second intro was filed
      // back somewhere much further away than it started. Measured: the field
      // began at z [-22, 14] and ended the intro at [-61, -25], permanently.
      // The visible consequence was that the portfolio's starfield was almost
      // empty on any device that played the intro, while it looked correct on
      // any device that skipped it (touch, reduced motion) — two different
      // backgrounds for the same site. Wrapping by the span leaves the
      // distribution exactly where it was, so the warp is now a thing that
      // happens rather than a thing that is left behind.
      for (let i = 0; i < N; i++) {
        if ((arr[i * 3 + 2] += speed) > Z_FRONT) arr[i * 3 + 2] -= Z_SPAN;
      }
      pts.geometry.attributes.position.needsUpdate = true;
      mat.uniforms.uSize.value = 4.5 + f.warp * 22;
      mat.uniforms.uMaxSize.value = 22 + f.warp * 44;
    } else {
      // The settle after a warp is a DURATION, not a frame count.
      const a = approach(0.1, delta);
      mat.uniforms.uSize.value += (4.5 - mat.uniforms.uSize.value) * a;
      mat.uniforms.uMaxSize.value += (22 - mat.uniforms.uMaxSize.value) * a;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[aColor, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[aScale, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[aPhase, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
