"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uSize;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vColor = aColor;
    // each star breathes on its own phase
    float tw = 0.55 + 0.45 * sin(uTime * 1.4 + aPhase);
    vTw = tw;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // perspective attenuation, but clamped so stars near the camera can never
    // balloon into screen-filling quads.
    float sz = uSize * aScale * tw * (26.0 / max(-mv.z, 1.5));
    gl_PointSize = clamp(sz, 1.0, 46.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    // soft circular falloff with a small bright centre
    float glow = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);
    float alpha = glow * glow * (0.32 + vTw * 0.34) + core * 0.25;
    gl_FragColor = vec4(vColor * (0.45 + vTw * 0.4), alpha);
  }
`;

/** The void dust: thousands of additive stars that twinkle and drift, then rush
 *  the camera in a warp tunnel when fx.warp ramps up. */
export default function ParticleField({ fx, count }) {
  const pointsRef = useRef(null);
  const matRef = useRef(null);

  const { positions, aColor, aScale, aPhase, N } = useMemo(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = count ?? (reduced ? 1600 : 5600);
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
      positions[i * 3 + 2] = (Math.random() - 0.5) * 36 - 4;
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
    }),
    []
  );

  useFrame((state, delta) => {
    const f = fx.current;
    const pts = pointsRef.current;
    const mat = matRef.current;
    if (!pts || !mat) return;

    mat.uniforms.uTime.value = state.clock.elapsedTime;

    pts.rotation.y += 0.0006 + f.warp * 0.01;
    if (f.mode !== "door") pts.rotation.x += 0.0002;

    if (f.warp > 0.001) {
      const arr = pts.geometry.attributes.position.array;
      const speed = f.warp * 95 * Math.min(delta, 0.05);
      const camZ = state.camera.position.z;
      for (let i = 0; i < N; i++) {
        arr[i * 3 + 2] += speed;
        if (arr[i * 3 + 2] > camZ) arr[i * 3 + 2] -= 72;
      }
      pts.geometry.attributes.position.needsUpdate = true;
      mat.uniforms.uSize.value = 4.5 + f.warp * 22;
    } else {
      mat.uniforms.uSize.value += (4.5 - mat.uniforms.uSize.value) * 0.1;
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
