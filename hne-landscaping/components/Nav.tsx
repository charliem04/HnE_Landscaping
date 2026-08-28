"use client";

import { useEffect, useState } from "react";
import { client } from "@/client.config";
import { ScrollProgress } from "./ScrollProgress";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  // The bottom rule only appears once the page has moved — at rest the
  // nav is part of the hero, not a bar sitting on top of it.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] border-b bg-surface/90 backdrop-blur-[14px] backdrop-saturate-150
                  transition-colors duration-300 ${stuck ? "border-line" : "border-transparent"}`}
    >
      <div className="wrap flex h-[74px] items-center gap-6">
        <a href="#top" className="mr-auto flex items-center gap-2.5 no-underline">
          <img
            src={client.logoPath}
            alt={`${client.businessName} badge`}
            width={360}
            height={435}
            className="h-[46px] w-auto"
          />
          <span className="block">
            {/* deliberate-ignore flat-type-scale — a nav bar is legitimately a
                narrow range; the page scale runs 11px to 72px */}
            <b className="block font-display text-[1.02rem] font-black uppercase leading-none tracking-[-0.01em] text-ink [font-stretch:116%]">
              {client.businessName}
            </b>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-ink-faint">
              {client.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden gap-9 lg:flex" aria-label="Main">
          {client.copy.navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 font-display text-[0.95rem] font-bold text-ink no-underline active:text-brand"
            >
              {l.label}
              {/* Badge green is graphic-only — a rule underneath, never the word itself. */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-leaf
                           transition-transform duration-300 ease-brand-out
                           group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <a
          href={`tel:${client.phoneHref}`}
          className="btn hidden px-[18px] py-[11px] text-[0.94rem] sm:inline-flex"
        >
          {client.copy.callCta} {client.phone}
        </a>

        <button
          type="button"
          className="-mr-2 p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="nav-mobile"
          className="border-t border-line bg-surface lg:hidden"
          aria-label="Main, mobile"
        >
          <div className="wrap py-4">
            {client.copy.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 font-display text-lg font-bold text-ink no-underline last:border-b-0 active:text-brand"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${client.phoneHref}`}
              className="btn mt-4 w-full justify-center sm:hidden"
            >
              {client.copy.callCta} {client.phone}
            </a>
          </div>
        </nav>
      )}

      <ScrollProgress />
    </header>
  );
}
