import { client } from "@/client.config";
import { BeforeAfter } from "./BeforeAfter";
import { Reveal } from "./Reveal";

export function Work() {
  const { heading, lede, cta, pairs } = client.work;

  return (
    <section id="work" className="section">
      <Reveal className="max-w-[64ch]">
        <h2>{heading}</h2>
        <p className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]">{lede}</p>
      </Reveal>

      <div className="mt-14 grid gap-9 md:grid-cols-2">
        {pairs.map((pair, i) => (
          <Reveal key={pair.label} delay={i * 0.07}>
            {/* Staggered start points so the two sliders don't sweep in
                lockstep and read as one animation. */}
            <BeforeAfter pair={pair} sweepFrom={i === 0 ? 82 : 76} sweepDelay={220 + i * 180} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.14} className="mt-9">
        <a className="btn btn-ghost" href="#quote">
          {cta}
        </a>
      </Reveal>
    </section>
  );
}
