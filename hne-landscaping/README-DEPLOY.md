# Go-Live Checklist — H & E Landscaping

The site is a static export. `npm run build` emits `./out`; deploy that
folder. Content lives in `client.config.ts` and photos in
`/public/photos` — you should not need to edit a component to change
wording, a list item or a picture.

## 1. `client.config.ts` — the remaining `TODO(client)` fields
- [ ] `siteUrl` — the real production domain, https, no trailing slash.
      Nothing else can be right until this is: it feeds the OG tags,
      the sitemap and the JSON-LD.
- [ ] `email` — leave `""` if the business only takes calls. Empty is
      handled everywhere (footer, legal pages, JSON-LD all adapt); a
      wrong address is worse than none.
- [ ] `socials` — Facebook / Instagram / Google Business Profile. Empty
      string hides the link.
- [ ] `gallery.items[].tag` — the "One available now" chip on the
      chicken coop. Delete the line once it sells.
- [ ] Everything else (phone, service area, copy, service lists,
      process steps) is real and current — re-read it, don't assume.

## 2. Photos — `/public/photos`
Every photo slot on the page is a **4:3 well** under `object-fit: cover`,
and the files ship pre-cropped to that aspect, so a replacement dropped
in at 4:3 lands exactly as intended.

- [ ] Sizes are per-slot, not one-size-fits-all: hero / before-after /
      process / about are 1360px wide, gallery cards 900px, the storm
      backdrop 1500px at lower quality because it sits at 34% opacity.
      Match those when swapping, or the page gets heavier for nothing.
- [ ] WebP at quality ~72 is the format. `og.jpg` stays JPEG — social
      scrapers are unreliable with WebP.
- [ ] **Alt text lives in `client.config.ts`, beside the photo path.**
      Change one and change the other. Describe the photo that ships,
      after cropping — not the one that came off the phone.
- [ ] The before/after pairs must share a crop. If you re-crop a
      "before", re-crop its "after" the same way or the slider stops
      reading as one place.
- [ ] `app/icon.png` / `app/apple-icon.png` are the badge on
      transparency. Regenerate both together if the logo changes.

## 3. Environment — `.env.local` (copy from `.env.example`)
- [ ] `NEXT_PUBLIC_FORM_ENDPOINT` — Formspree URL or Cloudflare Worker.
      **Unset = the form silently succeeds in demo mode. DO NOT SHIP
      UNSET** — every lead would vanish with a thank-you message.
- [ ] `NEXT_PUBLIC_LEAD_WEBHOOK_URL` — only for Speed-to-Lead clients
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — or leave empty for no analytics
- [ ] Mirror these in Cloudflare Pages → Settings → Environment variables

The form posts `{ name, phone, job, message }`. If you add a field to
the form, add it to `ContactPayload` in `lib/submitContact.ts` too.

## 4. Legal — ⚠️ both pages ship with REPLACE BEFORE LAUNCH banners
- [ ] `app/terms/page.tsx` — review/replace text, set effective date,
      remove the warning banner block
- [ ] `app/privacy/page.tsx` — same, and confirm disclosures match what
      actually runs (analytics on/off, lead webhook on/off)

## 5. Brand — rules that are load-bearing
Tokens live in `app/globals.css`. Three of them carry usage constraints
the type system cannot enforce, and breaking them breaks accessibility:

| Token | Value | Rule |
|---|---|---|
| `brand` | `#2C6E1B` | 6.3:1 — every button, link and green word |
| `leaf` | `#50A629` | 3.1:1 — **graphic only**: hex marks, rails, rules. Never text |
| `sun` | `#FF9F00` | 2.1:1 — **fill only**, under dark ink. Never ink itself |
| `storm` | `#F2440F` | graphic, plus the one word set in it on the night ground |
| `storm-deep` | `#DA3D0E` | 4.5:1 under white — anything carrying white text |

The hexagon (`--hex`) appears in exactly three places: the slider
handle, the process step numbers, and bullet marks. It keeps its weight
because everywhere else stays quiet.

Type is Archivo (variable, `wdth` axis) for display and Karla for body,
both self-hosted via Fontsource — see the imports in `app/layout.tsx`.
Headings set `font-stretch: 112%`; that width is what makes the type
match the badge wordmark, so don't drop it when editing.

## 6. Verify before DNS cutover
- [ ] `npm run build` clean
- [ ] `npm run check` clean (0 errors, 0 warnings)
- [ ] Form submits end-to-end (check inbox AND lead webhook if enabled)
- [ ] Drag a before/after slider on a real touch device; tab to it and
      check arrow keys, Home and End move the split
- [ ] Cookie banner: decline → no analytics request in Network tab;
      accept → script loads
- [ ] Lighthouse mobile ≥ 90 performance
- [ ] Rich Results Test on the JSON-LD (it declares a service-area
      business with no street address — that is deliberate)
- [ ] tel: links work from a real phone
- [ ] Grep the repo for `TODO(client)` — must return zero results

## Deploy
```bash
npm run build            # emits ./out (static export)
npx wrangler pages deploy out
```
Then Cloudflare Pages → Custom domains → attach the domain, and submit
the sitemap (`{siteUrl}/sitemap.xml`) in Google Search Console.
