"use client";

/**
 * Reading-progress hairline, pinned to the nav's bottom edge so it
 * reads as the bar filling rather than a stripe floating over the page.
 * Badge green — graphic only, which is exactly what this is.
 */
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 -bottom-px z-[1] h-0.5 origin-left bg-leaf"
      style={{ scaleX }}
    />
  );
}
