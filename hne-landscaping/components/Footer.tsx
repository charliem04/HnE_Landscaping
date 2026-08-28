import Link from "next/link";
import { client } from "@/client.config";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Facebook", href: client.socials.facebook },
    { label: "Instagram", href: client.socials.instagram },
    { label: "Google reviews", href: client.socials.google },
  ].filter((s) => s.href);

  return (
    <footer className="bg-night pb-10 pt-16 text-[#98A79B]">
      <div className="wrap grid gap-9 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <img
            src={client.logoPath}
            alt={client.businessName}
            width={360}
            height={435}
            loading="lazy"
            className="h-[78px] w-auto"
          />
          <p className="mt-6 max-w-[34ch]">{client.footer.blurb}</p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-white">
            Services
          </h4>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.95rem]">
            {client.footer.services.map((s) => (
              <li key={s}>
                <a href="#services" className="text-[#C3CFC5] no-underline hover:text-sun active:text-white">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-white">
            Get in touch
          </h4>
          <ul className="m-0 grid list-none gap-2.5 p-0 text-[0.95rem]">
            <li>
              <a href={`tel:${client.phoneHref}`} className="text-[#C3CFC5] no-underline hover:text-sun active:text-white">
                {client.phone}
              </a>
            </li>
            <li>
              <a href="#quote" className="text-[#C3CFC5] no-underline hover:text-sun active:text-white">
                Request a free quote
              </a>
            </li>
            {client.email && (
              <li>
                <a href={`mailto:${client.email}`} className="text-[#C3CFC5] no-underline hover:text-sun active:text-white">
                  {client.email}
                </a>
              </li>
            )}
            <li>{client.serviceArea}</li>
            <li>Se habla español</li>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C3CFC5] no-underline hover:text-sun active:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap mt-12 flex flex-wrap justify-between gap-4 border-t border-[#D7E0D8]/[0.14] pt-6 text-[0.86rem]">
        <span>
          © {year} {client.legalName}. Family-owned and operated.
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/terms/" className="text-[#98A79B] no-underline hover:text-sun active:text-white">
            Terms
          </Link>
          <Link href="/privacy/" className="text-[#98A79B] no-underline hover:text-sun active:text-white">
            Privacy
          </Link>
          <span>{client.footer.signoff}</span>
        </span>
      </div>
    </footer>
  );
}
