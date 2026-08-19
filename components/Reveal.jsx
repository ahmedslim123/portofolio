"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + lifts children into view on scroll, once.
 *
 * This used to be a Framer Motion `whileInView`. There are ~40 of these on the
 * page (every heading, paragraph, stat and all fourteen doors), and Framer
 * animates on the main thread: each one wrote inline styles every frame for a
 * full second, and they fire in overlapping bursts as you scroll. That measured
 * as 1.5s of style recalculation over a single pass down the page — the biggest
 * remaining cost after the images.
 *
 * The CSS version does the same thing with one class toggle per element, ever.
 * `opacity` and `transform` transitions are handled by the compositor, so the
 * reveal no longer competes with the scroll for the main thread. The curve is
 * the identical cubic-bezier, so it looks exactly as it did.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 42,
  className,
  as: Tag = "div",
  style,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Reduced motion is handled entirely in CSS (globals.css forces .reveal
    // visible under the media query), so there is nothing to branch on here.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect(); // once
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
