"use client";

import { useEffect, useRef } from "react";

/** Custom dual-element cursor: a crisp dot + a lagging ring that swells on
 *  interactive elements. Disabled on touch devices via CSS. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf;

    // Position via transform (compositor-only) instead of left/top (which force
    // layout + paint every frame). The -50% keeps it centred on the pointer.
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };
    const onOver = (e) => {
      const hot = e.target.closest(
        "a,button,.door,.orb,input,textarea,[data-hot]"
      );
      ring.classList.toggle("hot", !!hot);
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
