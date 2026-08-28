"use client";

/**
 * The quote form. Four fields, because every extra one is a reason to
 * close the tab — and the phone number beside it is the faster path
 * for anyone who'd rather just talk, which is most of them.
 *
 * The voice stays flat here on purpose. Humour belongs to the storm
 * block; a form label or an error message is never the place for it.
 */
import { useState, type FormEvent } from "react";
import { client } from "@/client.config";
import { submitContact } from "@/lib/submitContact";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = {
  name: "",
  phone: "",
  job: client.contact.jobOptions[0],
  message: "",
  company: "", // honeypot
};

export function Contact() {
  const { heading, lede, facts, jobOptions, submitLabel, note, success } = client.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);

  const set =
    (key: keyof typeof EMPTY) =>
    (e: { target: { value: string } }) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const result = await submitContact(form);
    if (result.ok) {
      setStatus("sent");
      setForm(EMPTY);
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="section">
      <Reveal className="max-w-[64ch]">
        <h2>{heading}</h2>
        <p className="mt-6 max-w-[60ch] text-[clamp(1.06rem,1.7vw,1.28rem)]">{lede}</p>
      </Reveal>

      <div className="mt-12 grid gap-9 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="u-label m-0 mb-2.5">Call or text</p>
          <a
            href={`tel:${client.phoneHref}`}
            className="inline-block font-display text-[clamp(2rem,5.4vw,3.1rem)] font-black
                       leading-none tracking-[-0.03em] text-ink no-underline [font-stretch:118%]
                       transition-colors duration-200 hover:text-brand active:text-brand-strong"
          >
            {client.phone}
          </a>

          <div className="mt-9 grid gap-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="u-label m-0 mb-1.5">{fact.label}</p>
                <p className="m-0">{fact.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          {status === "sent" ? (
            <div role="status" className="rounded border border-leaf bg-brand-soft p-6 text-ink">
              <strong className="font-display text-xl font-extrabold">{success.heading}</strong>
              <p className="mt-2">
                {success.body}{" "}
                <a href={`tel:${client.phoneHref}`} className="font-semibold">
                  {client.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label className="mb-4 block">
                <span className="mb-[7px] block text-[0.84rem] font-bold text-ink">Your name</span>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={set("name")}
                  className="field-input"
                />
              </label>

              <label className="mb-4 block">
                <span className="mb-[7px] block text-[0.84rem] font-bold text-ink">Phone number</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="(479) 000-0000"
                  value={form.phone}
                  onChange={set("phone")}
                  className="field-input"
                />
              </label>

              <label className="mb-4 block">
                <span className="mb-[7px] block text-[0.84rem] font-bold text-ink">
                  What do you need?
                </span>
                <select
                  name="job"
                  value={form.job}
                  onChange={set("job")}
                  className="field-input cursor-pointer"
                >
                  {jobOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mb-4 block">
                <span className="mb-[7px] block text-[0.84rem] font-bold text-ink">
                  Tell us about it
                </span>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="A few sentences is plenty. Photos help too — you can text them to us."
                  value={form.message}
                  onChange={set("message")}
                  className="field-input min-h-[110px] resize-y"
                />
              </label>

              {/* Honeypot — off-screen, never announced. Bots fill it. */}
              <label className="absolute -left-[9999px]" aria-hidden tabIndex={-1}>
                Company
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={set("company")}
                />
              </label>

              {status === "error" && (
                <p role="alert" className="mb-4 border-l-2 border-storm pl-3 text-sm font-semibold text-storm-deep">
                  {error}
                </p>
              )}

              <button type="submit" disabled={status === "sending"} className="btn w-full justify-center">
                {status === "sending" ? "Sending…" : submitLabel}
              </button>
              <p className="mt-4 text-[0.86rem] text-ink-faint">{note}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
