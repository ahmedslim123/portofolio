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
    // The ring eases toward the pointer, so it only needs to animate while it
    // is still catching up. This loop used to run forever: it rewrote
    // `ring.style.transform` on every frame of the entire visit, which meant a
    // style recalculation every frame even with the mouse sitting still — and
    // that cost is paid out of the same main thread the scroll needs. Now it
    // parks itself once it has arrived, and the pointer wakes it.
    const loop = () => {
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      // Under a tenth of a pixel from the target: nothing left to animate.
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMoveAndWake = (e) => {
      onMove(e);
      wake();
    };

    window.addEventListener("mousemove", onMoveAndWake);
    window.addEventListener("mouseover", onOver);
    wake();
    return () => {
      window.removeEventListener("mousemove", onMoveAndWake);
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
