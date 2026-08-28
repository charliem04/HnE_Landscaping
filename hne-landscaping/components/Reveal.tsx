"use client";

/**
 * Scroll-reveal wrapper: a 22px rise and fade over 620ms, the first
 * time content enters the viewport. Pass `delay` (seconds) to stagger
 * siblings, or use <RevealGroup> for a cascade over a list or grid.
 * Renders static under prefers-reduced-motion.
 */
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Cascade children with a fixed stagger step. */
export function RevealGroup({
  children,
  step = 0.07,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
