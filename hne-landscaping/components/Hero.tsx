"use client";

import { motion, useReducedMotion } from "framer-motion";
import { client } from "@/client.config";
import { BeforeAfter, DragHint } from "./BeforeAfter";

export function Hero() {
  const reduce = useReducedMotion();
  const { headline, lede, trust, pair } = client.hero;

  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="wrap py-[52px] pb-[72px] md:py-[76px] md:pb-[104px]">
      <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <motion.h1 {...anim(0)}>
            {headline.lead}
            <em className="relative isolate whitespace-nowrap not-italic text-brand">
              {headline.emphasis}
              {/* Sun is a fill, never ink: it swipes in *behind* the word. */}
              <span
                aria-hidden
                className="swipe-underline absolute -inset-x-[1%] bottom-[0.06em] -z-10 h-[0.16em]
                           origin-left scale-x-0 rounded-[2px] bg-sun"
              />
            </em>
            {headline.trail}
          </motion.h1>

          <motion.p {...anim(0.08)} className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]">
            {lede}
          </motion.p>

          <motion.div {...anim(0.16)} className="mt-9 flex flex-wrap gap-4">
            <a className="btn" href={`tel:${client.phoneHref}`}>
              {client.copy.callCta} {client.phone}
            </a>
            <a className="btn btn-ghost" href="#quote">
              {client.copy.quoteCta}
            </a>
          </motion.div>

          <motion.ul {...anim(0.24)} className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line pt-6">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink-soft">
                <span aria-hidden className="hex h-[9px] w-[9px] shrink-0 bg-leaf" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...anim(0.12)}>
          <BeforeAfter pair={pair} priority sweepFrom={88} sweepDelay={620} />
          <DragHint />
        </motion.div>
      </div>
    </section>
  );
}
