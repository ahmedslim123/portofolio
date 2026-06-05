"use client";

import { motion } from "framer-motion";

/** Fades + lifts children into view on scroll. A thin wrapper over Framer
 *  Motion's whileInView so every section reveals consistently. */
export default function Reveal({
  children,
  delay = 0,
  y = 42,
  className,
  as = "div",
  style,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
