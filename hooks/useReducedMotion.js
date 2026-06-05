"use client";

import { useEffect, useState } from "react";

/** Returns true when the user prefers reduced motion. SSR-safe (false first). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Returns true on coarse-pointer (touch) devices. SSR-safe. */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer:coarse)").matches);
  }, []);
  return touch;
}
