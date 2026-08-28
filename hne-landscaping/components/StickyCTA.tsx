"use client";

/**
 * Mobile call bar. It stays down through the hero — where the same two
 * buttons are already on screen — and slides up once they've scrolled
 * past, so it arrives when it's the only way to act rather than
 * covering the page from the first paint.
 *
 * Elevation policy exception, same as the slider handle: this floats
 * over content rather than sitting in the page, so it casts a shadow.
 */
import { useEffect, useState } from "react";
import { client } from "@/client.config";

export function StickyCTA() {
  const [up, setUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setUp(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick contact"
      className={`fixed inset-x-0 bottom-0 z-[70] flex gap-2.5 border-t border-line bg-surface
                  px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5
                  shadow-[0_-8px_28px_rgba(14,22,17,0.10)]
                  transition-transform duration-[380ms] ease-brand-out md:hidden
                  ${up ? "translate-y-0" : "translate-y-[110%]"}`}
    >
      <a className="btn flex-1 justify-center px-3 py-3.5" href={`tel:${client.phoneHref}`}>
        {client.copy.stickyCallLabel}
      </a>
      <a className="btn btn-ghost flex-1 justify-center px-3 py-3.5" href="#quote">
        {client.copy.stickyQuoteLabel}
      </a>
    </div>
  );
}
