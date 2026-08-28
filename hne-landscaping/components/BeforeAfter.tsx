"use client";

/**
 * THE SIGNATURE ELEMENT — the drag handle *is* the badge. You pull the
 * H&E hexagon across a yard and the yard changes behind it: the mark
 * doing the thing the business does. Nothing else on the page competes
 * with this, which is why the hexagon appears in only two other places
 * (process step numbers, bullet marks).
 *
 * The split is a CSS custom property (--p) on the container, written
 * imperatively during the drag. React state would re-render the whole
 * subtree on every pointermove; a style property write does not.
 */
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import type { WorkPair } from "@/client.config";

export function BeforeAfter({
  pair,
  /** Where the auto-sweep starts, in percent. */
  sweepFrom = 84,
  /** Delay before the sweep, in ms — stagger siblings so they don't sync. */
  sweepDelay = 500,
  /** The hero pair is above the fold: load it eagerly, not lazily. */
  priority = false,
  className = "",
}: {
  pair: WorkPair;
  sweepFrom?: number;
  sweepDelay?: number;
  priority?: boolean;
  className?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const set = useCallback((pct: number) => {
    const node = el.current;
    if (!node) return;
    const p = Math.max(0, Math.min(100, pct));
    node.style.setProperty("--p", `${p}%`);
    node.setAttribute("aria-valuenow", String(Math.round(p)));
  }, []);

  const fromEvent = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const node = el.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    },
    [set]
  );

  // The thesis, animated: the first time each slider comes into view it
  // sweeps itself once, then hands control over. A static split makes
  // people wonder what they're looking at; a moving one explains itself.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    set(50);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timer = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        obs.disconnect();
        set(sweepFrom);
        timer = window.setTimeout(() => {
          let t0 = 0;
          const dur = 1100;
          const frame = (t: number) => {
            if (!t0) t0 = t;
            const k = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - k, 3);
            // A drag that started here would be fought by the animation.
            if (dragging.current) return;
            set(sweepFrom + (50 - sweepFrom) * eased);
            if (k < 1) raf = requestAnimationFrame(frame);
          };
          raf = requestAnimationFrame(frame);
        }, sweepDelay);
      },
      { threshold: 0.45 }
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [set, sweepFrom, sweepDelay]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const cur = Number(el.current?.getAttribute("aria-valuenow") ?? 50);
    const step = e.shiftKey ? 10 : 4;
    const moves: Record<string, number> = {
      ArrowLeft: cur - step,
      ArrowRight: cur + step,
      Home: 0,
      End: 100,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    set(moves[e.key]);
  }

  return (
    <div className={className}>
      <div
        ref={el}
        role="slider"
        tabIndex={0}
        aria-label={`Before and after: ${pair.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.classList.add("is-dragging");
          e.currentTarget.setPointerCapture?.(e.pointerId);
          fromEvent(e);
        }}
        onPointerMove={(e) => dragging.current && fromEvent(e)}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.classList.remove("is-dragging");
        }}
        onPointerCancel={(e) => {
          dragging.current = false;
          e.currentTarget.classList.remove("is-dragging");
        }}
        onLostPointerCapture={(e) => {
          dragging.current = false;
          e.currentTarget.classList.remove("is-dragging");
        }}
        className="group relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden
                   rounded border border-line bg-surface-sunk touch-pan-y
                   focus-visible:outline-3 focus-visible:outline-offset-4"
      >
        <img
          src={pair.before}
          alt={pair.beforeAlt}
          width={1360}
          height={1020}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={pair.after}
          alt={pair.afterAlt}
          width={1360}
          height={1020}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover
                     [clip-path:inset(0_0_0_var(--p,50%))]"
        />

        {/* Tags fade back while you drag — they're orientation, not chrome
            to read mid-gesture. */}
        <span
          className="pointer-events-none absolute left-3.5 top-3.5 z-[3] rounded-sm bg-night/70 px-3 py-[7px]
                     font-utility text-[0.68rem] font-extrabold uppercase tracking-[0.13em] text-white
                     backdrop-blur-[6px] transition-opacity duration-300 [.is-dragging_&]:opacity-25"
        >
          Before
        </span>
        <span
          className="pointer-events-none absolute right-3.5 top-3.5 z-[3] rounded-sm bg-brand px-3 py-[7px]
                     font-utility text-[0.68rem] font-extrabold uppercase tracking-[0.13em] text-white
                     transition-opacity duration-300 [.is-dragging_&]:opacity-25"
        >
          After
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-[4] w-[3px] -translate-x-[1.5px] bg-white
                     shadow-[0_0_0_1px_rgba(14,22,17,0.18)] left-[var(--p,50%)]"
        />

        {/* deliberate-ignore no-active-state — the press state here is
            `.is-dragging`, set on pointerdown below and driving the handle's
            scale(0.94) and the tags' fade. `:active` would be wrong: the
            gesture continues after the pointer leaves this element. */}
        {/* Elevation policy: page surfaces separate tonally, with a
            1px rule and no shadow. Chrome you physically drag is the
            stated exception — it floats above the page, so it casts. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-[5] h-16 w-[58px] -translate-x-1/2 -translate-y-1/2
                     drop-shadow-[0_6px_18px_rgba(14,22,17,0.35)] left-[var(--p,50%)]"
        >
          {/* The `!` is load-bearing: `.group:hover .x` carries three
              specificity levels (`:hover` counts) against two for
              `.is-dragging .x`, so without it the hover scale outranks the
              press no matter which rule comes last. */}
          <span
            className="hex grid h-full w-full place-items-center bg-brand text-white
                       transition-transform duration-200 ease-brand
                       group-hover:scale-[1.06] group-focus-visible:scale-[1.06]
                       [.is-dragging_&]:!scale-[0.94]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </span>
      </div>

      <p className="mt-4 text-[0.95rem]">
        <strong className="font-semibold text-ink">{pair.title}</strong> — {pair.caption}
      </p>
    </div>
  );
}

/** The drag affordance, spelled out once under the hero slider. */
export function DragHint() {
  return (
    <span className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-ink-faint">
      <svg
        viewBox="0 0 24 24"
        className="hint-nudge h-[15px] w-[15px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
      </svg>
      Drag the badge across
    </span>
  );
}
