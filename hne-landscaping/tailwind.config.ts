import type { Config } from "tailwindcss";

/**
 * ── BRAND SWAP ──────────────────────────────────────────────────────
 * All colors resolve to CSS variables defined in app/globals.css.
 * To re-skin the site you edit the variable values there — this file
 * should not need to change.
 *
 * Two colors here carry usage rules the palette depends on, and the
 * type system cannot enforce them:
 *   `leaf`  #50A629 — 3.1:1 on white. GRAPHIC ONLY: hex marks, rails,
 *                     rules. Never text, never a fill behind text.
 *   `sun`   #FF9F00 — 2.1:1 on white. FILL ONLY, under dark ink.
 * For text and interactive green, use `brand` (6.3:1 both directions).
 * ────────────────────────────────────────────────────────────────────
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          strong: "rgb(var(--brand-strong) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
        },
        leaf: "rgb(var(--leaf) / <alpha-value>)",
        sun: "rgb(var(--sun) / <alpha-value>)",
        storm: {
          DEFAULT: "rgb(var(--storm) / <alpha-value>)",
          deep: "rgb(var(--storm-deep) / <alpha-value>)",
          press: "rgb(var(--storm-press) / <alpha-value>)",
        },
        night: "rgb(var(--night) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          alt: "rgb(var(--surface-alt) / <alpha-value>)",
          sunk: "rgb(var(--surface-sunk) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        utility: "var(--font-utility)",
      },
      borderRadius: {
        // One radius for the whole site: 14px on every surface, button
        // and field. `sm` is the chip step — tags and image badges only.
        DEFAULT: "14px",
        sm: "8px",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "brand-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
