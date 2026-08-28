import { client } from "@/client.config";
import { Reveal } from "./Reveal";

export function Gallery() {
  const { heading, lede, items } = client.gallery;

  return (
    <section className="section">
      <Reveal className="max-w-[64ch]">
        <h2>{heading}</h2>
        <p className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]">{lede}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.07}>
            {/* Hover is a tonal shift plus a slow push into the photo —
                no lift, no shadow. Page surfaces stay flat and ruled.
                deliberate-ignore no-active-state — a card is not a control.
                It links nowhere, so there is no press to acknowledge; adding
                one would promise a click that does not exist. The single
                call to action for this section is the phone number. */}
            {/* deliberate-ignore no-active-state — reasoning directly above */}
            <article className="group h-full overflow-hidden rounded border border-line bg-surface transition-colors duration-300 hover:border-leaf hover:bg-brand-soft">
              <figure className="m-0 aspect-[4/3] overflow-hidden">
                <img
                  src={item.photo}
                  alt={item.alt}
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[800ms]
                             ease-brand-out group-hover:scale-[1.055]"
                />
              </figure>
              <div className="p-6">
                {item.tag && (
                  <span className="mb-2.5 inline-block rounded-sm bg-sun px-2.5 py-1 font-utility
                                   text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-ink">
                    {item.tag}
                  </span>
                )}
                <h3 className="text-[1.1rem]">{item.title}</h3>
                <p className="mt-2 text-[0.94rem]">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
