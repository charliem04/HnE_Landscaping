import { client } from "@/client.config";
import { Reveal } from "./Reveal";

/**
 * The one dark section, and the only place --storm orange is spent.
 * Rationing it is what makes it read as urgency here rather than as
 * decoration; a second appearance anywhere else would cost it that.
 *
 * The humour is also rationed to this block. A downed limb across a
 * wrecked playset can carry a joke. A form label cannot.
 */
export function Services() {
  const { heading, lede, quip, backdrop, backdropAlt, note, groups } = client.services;

  return (
    <section id="services" className="relative isolate overflow-hidden bg-night text-[#D7E0D8]">
      <div className="absolute inset-0 -z-20">
        <img
          src={backdrop}
          alt={backdropAlt}
          width={1500}
          height={1125}
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-105 object-cover opacity-[0.34]"
        />
      </div>
      {/* Two washes: one carries the text side to full contrast, one
          throws a storm-coloured glow into the far corner. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10
                   bg-[linear-gradient(102deg,rgb(var(--night))_22%,rgb(var(--night)/0.86)_52%,rgb(var(--night)/0.5)_100%),radial-gradient(120%_90%_at_88%_8%,rgb(var(--storm)/0.30),transparent_62%)]"
      />

      <div className="section">
        <Reveal className="max-w-[64ch]">
          <h2 className="text-white">
            {heading.lead}
            <mark className="bg-transparent text-storm">{heading.emphasis}</mark>
            {heading.trail}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)] text-[#C3CFC5]">
            {lede}
          </p>
          <p className="mt-6 max-w-[44ch] border-l-2 border-storm pl-4 text-[0.92rem] italic text-[#8FA093]">
            {quip}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-9 sm:grid-cols-2 sm:gap-x-14">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <h3 className="flex items-center gap-2.5 text-[1.08rem] text-white">
                <span
                  aria-hidden
                  className={`hex h-3 w-[11px] shrink-0 ${
                    group.tone === "storm" ? "bg-storm" : "bg-leaf"
                  }`}
                />
                {group.title}
              </h3>
              <ul className="mt-4 list-none p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[#D7E0D8]/[0.13] py-2.5 text-[0.97rem] text-[#C3CFC5]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14} className="mt-12 flex flex-wrap items-center gap-4">
          <a className="btn btn-storm" href={`tel:${client.phoneHref}`}>
            {client.copy.callCta} {client.phone}
          </a>
          <p className="m-0 text-[0.9rem] text-[#8FA093]">{note}</p>
        </Reveal>
      </div>
    </section>
  );
}
