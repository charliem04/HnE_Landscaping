import { client } from "@/client.config";

/**
 * The service list as a moving strip: it names ten things the crew does
 * in the space a heading would take, immediately under the hero. Purely
 * decorative repetition of copy that appears in full further down, so
 * it is hidden from assistive tech rather than read out twice.
 *
 * The track holds the list twice and translates half its own width, so
 * the loop has no seam. Paused on hover; off entirely under reduced
 * motion (see globals.css).
 */
export function ServiceStrip() {
  const items = [...client.marquee, ...client.marquee];

  return (
    <div
      aria-hidden
      className="marquee overflow-hidden border-y border-line bg-surface py-[18px]"
    >
      <div className="marquee-track flex w-max">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-[22px] whitespace-nowrap px-[22px]
                       font-display text-[1.02rem] font-extrabold text-ink [font-stretch:108%]"
          >
            {label}
            <span className="hex h-2.5 w-[9px] shrink-0 bg-leaf" />
          </span>
        ))}
      </div>
    </div>
  );
}
