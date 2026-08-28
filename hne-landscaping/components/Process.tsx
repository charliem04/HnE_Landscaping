"use client";

/**
 * One real job, start to finish. The steps scroll; the photo beside
 * them is sticky and cross-fades to match — so the claim and its
 * evidence are on screen together instead of the reader holding a
 * description in their head until they reach the picture.
 *
 * Below 960px the sticky column can't work, so each step carries its
 * own photo inline instead and the sticky panel is dropped entirely.
 */
import { useEffect, useRef, useState } from "react";
import { client } from "@/client.config";
import { Reveal } from "./Reveal";

export function Process() {
  const { heading, lede, steps } = client.process;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = Number((en.target as HTMLElement).dataset.step);
          if (!Number.isNaN(i)) setActive(i);
        });
      },
      { threshold: 0.45, rootMargin: "-15% 0px -30% 0px" }
    );
    stepRefs.current.forEach((n) => n && obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="bg-surface-alt">
      <div className="section">
        <Reveal className="max-w-[64ch]">
          <h2>{heading}</h2>
          <p className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]">{lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-start lg:gap-[72px]">
          <div className="flex flex-col">
            {steps.map((step, i) => {
              const on = i <= active;
              const isLast = i === steps.length - 1;
              return (
                <article
                  key={step.title}
                  data-step={i}
                  ref={(n) => {
                    stepRefs.current[i] = n;
                  }}
                  className="relative border-t border-line py-9 pl-16 first:border-t-0 first:pt-0"
                >
                  <span
                    aria-hidden
                    className={`u-num hex absolute left-0 grid h-[50px] w-11 place-items-center
                                text-[0.95rem] transition-colors duration-500 ease-brand
                                top-9 [article:first-of-type>&]:top-0
                                ${on ? "bg-brand text-white" : "bg-surface-sunk text-ink-faint"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* The rail draws downward as you pass each step — the
                      job progressing, not a decorative divider. */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[21px] top-[calc(2.25rem+50px)] w-0.5 bg-line
                                 [article:first-of-type>&]:top-[50px]"
                    >
                      <span
                        className={`absolute inset-0 origin-top bg-leaf transition-transform duration-700 ease-brand-out
                                    ${i < active ? "scale-y-100" : "scale-y-0"}`}
                      />
                    </span>
                  )}

                  <h3>{step.title}</h3>
                  <p className="mt-2.5 max-w-[46ch] text-[0.99rem]">{step.body}</p>

                  <div className="mt-6 overflow-hidden rounded border border-line lg:hidden">
                    <img
                      src={step.photo}
                      alt={step.alt}
                      width={1360}
                      height={1020}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div
            aria-hidden
            className="sticky top-[104px] hidden aspect-[4/3] overflow-hidden rounded
                       border border-line bg-surface-sunk lg:block"
          >
            {steps.map((step, i) => (
              <img
                key={step.photo}
                src={step.photo}
                alt=""
                width={1360}
                height={1020}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover
                            transition-[opacity,transform] duration-[550ms,1100ms] ease-brand-out
                            ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
