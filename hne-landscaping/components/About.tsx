import { client } from "@/client.config";
import { Reveal } from "./Reveal";

export function About() {
  const { heading, body, photo, photoAlt, spanish } = client.about;

  return (
    <section id="about" className="bg-surface-alt">
      <div className="section grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[72px]">
        <Reveal>
          <h2>{heading}</h2>
          {body.map((p, i) => (
            <p
              key={p.slice(0, 24)}
              className={i === 0 ? "mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]" : "mt-6"}
            >
              {p}
            </p>
          ))}

          {/* Hispanic-owned is stated once, in the paragraph above. Here
              it is made useful: a real invitation to call, in Spanish,
              not a badge. */}
          {spanish && (
            <div className="mt-9 rounded border border-l-[3px] border-line border-l-leaf bg-surface p-6">
              <p className="m-0 font-bold text-ink">{spanish.heading}</p>
              <p className="m-0 mt-1">{spanish.body}</p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.07} className="overflow-hidden rounded border border-line">
          <img
            src={photo}
            alt={photoAlt}
            width={1360}
            height={1020}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
