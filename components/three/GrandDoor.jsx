"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const W = 2.6;
const H = 4.2;
const D = 0.22;
const FRONT = D / 2 + 0.01;

/** Veins relative to a leaf's slab centre (thin emissive bars). */
function Veins({ matBlue, matCyan, matGold }) {
  return (
    <group position={[0, 0, D / 2 + 0.01]}>
      {/* central spine */}
      <mesh material={matBlue}>
        <boxGeometry args={[0.05, H * 0.82, 0.04]} />
      </mesh>
      {/* branch verticals */}
      <mesh material={matCyan} position={[-0.34, 0.7, 0]}>
        <boxGeometry args={[0.04, H * 0.3, 0.04]} />
      </mesh>
      <mesh material={matGold} position={[0.34, -0.6, 0]}>
        <boxGeometry args={[0.04, H * 0.28, 0.04]} />
      </mesh>
      {/* branch horizontals */}
      <mesh material={matCyan} position={[-0.1, 0.7, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
      </mesh>
      <mesh material={matGold} position={[0.12, -0.6, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.04]} />
      </mesh>
      <mesh material={matBlue} position={[-0.18, 1.45, 0]}>
        <boxGeometry args={[0.04, H * 0.18, 0.04]} />
      </mesh>
    </group>
  );
}

/** Forged metal studs running down a leaf — small spheres catch the key light.
 *  Rendered inside the slab's local frame (slab spans x ∈ [-W/4, W/4]); the
 *  inner edge (toward the seam) sits at local x = -side * W/4. */
function Studs({ side, material }) {
  const ys = [1.55, 0.9, 0.25, -0.4, -1.05, -1.7];
  const inner = -side * (W / 4 - 0.16); // column just in from the seam edge
  const outer = side * (W / 4 - 0.16); // column near the hinge edge
  const z = D / 2 + 0.006;
  return (
    <group>
      {ys.map((y, i) => (
        <mesh key={`in-${i}`} material={material} position={[inner, y, z]}>
          <sphereGeometry args={[0.05, 14, 14]} />
        </mesh>
      ))}
      {ys
        .filter((_, i) => i % 2 === 0)
        .map((y, i) => (
          <mesh key={`out-${i}`} material={material} position={[outer, y, z]}>
            <sphereGeometry args={[0.045, 14, 14]} />
          </mesh>
        ))}
    </group>
  );
}

/** A single hinged leaf: pivot at the outer edge, slab + veins span inward. */
function Leaf({ side, pivotRef, mats }) {
  return (
    <group ref={pivotRef} position={[side * (W / 2), 0, 0]}>
      <group position={[-side * (W / 4), 0, 0]}>
        <mesh material={mats.metal}>
          <boxGeometry args={[W / 2, H, D]} />
        </mesh>
        {/* recessed inner panel for depth */}
        <mesh material={mats.panel} position={[0, 0, D / 2 + 0.002]}>
          <boxGeometry args={[W / 2 - 0.22, H - 0.3, 0.03]} />
        </mesh>
        <Veins {...mats} />
        <Studs side={side} material={mats.stud} />
      </group>
    </group>
  );
}

/**
 * The grand clockwork door. Two heavy leaves unfold (driven by fx.open), a blade
 * of light splits the seam (fx.seam), the veins pulse (fx.glow), the door shudders
 * before it gives way (fx.rumble), and light floods from the threshold beyond.
 */
export default function GrandDoor({ fx }) {
  const groupRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const haloRef = useRef(null);
  const seamRef = useRef(null);
  const coreRef = useRef(null);
  const raysRef = useRef(null);

  const mats = useMemo(() => {
    const emissive = (hex, intensity = 1.2) => {
      const m = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: new THREE.Color(hex),
        emissiveIntensity: intensity,
        metalness: 0,
        roughness: 1,
      });
      m.toneMapped = false; // let emissive exceed 1 so Bloom catches it
      return m;
    };
    return {
      metal: new THREE.MeshStandardMaterial({
        color: 0x0e0e12,
        metalness: 0.95,
        roughness: 0.2,
      }),
      panel: new THREE.MeshStandardMaterial({
        color: 0x0a0b14,
        metalness: 0.85,
        roughness: 0.45,
      }),
      frame: new THREE.MeshStandardMaterial({
        color: 0x16182c,
        metalness: 0.8,
        roughness: 0.4,
      }),
      stud: new THREE.MeshStandardMaterial({
        color: 0x9c7d3a,
        metalness: 1,
        roughness: 0.3,
        emissive: new THREE.Color(0xe5c16f),
        emissiveIntensity: 0.25,
      }),
      matBlue: emissive(0x1e9fff),
      matCyan: emissive(0x00f7ff),
      matGold: emissive(0xe5c16f),
    };
  }, []);

  // God-ray blades fanning out from the threshold.
  const rays = useMemo(
    () => [-0.5, -0.28, -0.1, 0.1, 0.28, 0.5].map((r) => r),
    []
  );

  useFrame((state, delta) => {
    const f = fx.current;
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.visible = f.doorVisible;
    if (!f.doorVisible) return;

    // Pulsing emissive veins — faster + hotter as glow rises.
    const pulse = Math.sin(t * (2 + f.glow * 3)) * 0.5 + 0.5;
    const inten = (1.0 + pulse * 1.6) * (1 + f.glow * 2.2);
    mats.matBlue.emissiveIntensity = inten;
    mats.matCyan.emissiveIntensity = inten * 1.1;
    mats.matGold.emissiveIntensity = inten * 0.85;
    mats.stud.emissiveIntensity = 0.2 + f.glow * 0.5 + pulse * 0.1;

    // Heavy leaves unfold; they also pull back slightly as they swing (mass).
    const open = f.open;
    const rumble = f.rumble || 0;
    // high-frequency shudder before the door gives way
    const jitter = rumble * 0.012 * Math.sin(t * 60);
    if (leftRef.current) {
      leftRef.current.rotation.y = open * 2.0 + jitter;
      leftRef.current.position.z = -open * 0.35;
    }
    if (rightRef.current) {
      rightRef.current.rotation.y = -open * 2.0 - jitter;
      rightRef.current.position.z = -open * 0.35;
    }

    // The blade of light in the seam: brightens as it unlatches, then is
    // swallowed by the flood once the leaves part.
    if (seamRef.current) {
      const s = f.seam || 0;
      const m = seamRef.current.material;
      m.opacity = Math.min(1, s * (1 - open * 0.8));
      seamRef.current.scale.x = 1 + s * 1.4 + Math.sin(t * 18) * 0.06 * s;
      seamRef.current.scale.y = 1 + open * 0.05;
    }

    // The light core beyond the door — floods out as the leaves open.
    if (coreRef.current) {
      const m = coreRef.current.material;
      m.opacity = Math.min(1.0, (f.seam || 0) * 0.18 + open * 0.95 + f.glow * 0.08);
      const sc = 1 + open * 0.6 + (0.04 + (f.seam || 0) * 0.04) * pulse;
      coreRef.current.scale.set(sc, sc, 1);
    }

    // Volumetric god-rays — only resolve once the threshold cracks open.
    if (raysRef.current) {
      const vis = Math.max(f.seam ? f.seam * 0.25 : 0, open);
      raysRef.current.children.forEach((ray, i) => {
        ray.material.opacity = vis * (0.22 + 0.12 * Math.sin(t * 1.5 + i)) * (0.6 + open);
        ray.scale.y = 1 + open * 1.4;
      });
      raysRef.current.rotation.z = Math.sin(t * 0.3) * 0.04;
    }

    if (haloRef.current) {
      haloRef.current.material.opacity =
        0.05 + pulse * 0.08 + f.glow * 0.35 + open * 0.25;
    }

    // subtle parallax sway driven by pointer (settles to centre as it opens)
    const sway = 1 - open;
    groupRef.current.rotation.y = state.pointer.x * 0.18 * sway;
    groupRef.current.rotation.x = state.pointer.y * 0.08 * sway;
  });

  return (
    <group ref={groupRef}>
      {/* arch frame */}
      <mesh material={mats.frame} position={[-(W / 2 + 0.18), 0, -0.1]}>
        <boxGeometry args={[0.28, H + 0.5, 0.5]} />
      </mesh>
      <mesh material={mats.frame} position={[W / 2 + 0.18, 0, -0.1]}>
        <boxGeometry args={[0.28, H + 0.5, 0.5]} />
      </mesh>
      <mesh material={mats.frame} position={[0, H / 2 + 0.3, -0.1]}>
        <boxGeometry args={[W + 0.9, 0.32, 0.5]} />
      </mesh>

      {/* light core beyond the threshold (behind the leaves) */}
      <mesh ref={coreRef} position={[0, 0, -0.7]}>
        <planeGeometry args={[W * 1.05, H * 1.04]} />
        <meshBasicMaterial
          color={0xeaf6ff}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* god-rays fanning from the doorway */}
      <group ref={raysRef} position={[0, 0, -0.55]}>
        {rays.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, x * 0.5]}>
            <planeGeometry args={[0.16, H * 1.5]} />
            <meshBasicMaterial
              color={0xbfe6ff}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* leaves */}
      <Leaf side={-1} pivotRef={leftRef} mats={mats} />
      <Leaf side={1} pivotRef={rightRef} mats={mats} />

      {/* the blade of light splitting the central seam */}
      <mesh ref={seamRef} position={[0, 0, FRONT + 0.02]}>
        <planeGeometry args={[0.08, H * 0.92]} />
        <meshBasicMaterial
          color={0xffffff}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* halo glow behind the door */}
      <mesh ref={haloRef} position={[0, 0, -0.6]}>
        <planeGeometry args={[W * 2.4, H * 1.6]} />
        <meshBasicMaterial
          color={0x1e9fff}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
