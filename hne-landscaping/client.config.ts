/**
 * ════════════════════════════════════════════════════════════════════
 *  CLIENT CONFIG — the ONLY file you should need to edit for content
 *  (plus swapping photos in /public/photos and setting .env.local).
 *
 *  Every component reads from this file. If you find yourself editing
 *  a component to change wording, a photo or a list item, that content
 *  belongs here. See README-DEPLOY.md for the go-live checklist.
 *
 *  Photos live in /public/photos and are pre-cropped to 4:3 — every
 *  slot on the page is a 4:3 well under object-fit:cover, so a new
 *  photo dropped in at that aspect lands exactly as intended.
 * ════════════════════════════════════════════════════════════════════
 */

/** A before/after pair for the drag slider. */
export type WorkPair = {
  /** Accessible name for the slider, e.g. "front flower bed". */
  label: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Bolded lead-in on the caption under the slider. */
  title: string;
  caption: string;
};

export type ProcessStep = {
  title: string;
  body: string;
  photo: string;
  alt: string;
};

export type ServiceGroup = {
  title: string;
  /** Which hex mark sits beside the heading in the storm block. */
  tone: "storm" | "leaf";
  items: string[];
};

export type GalleryItem = {
  photo: string;
  alt: string;
  title: string;
  body: string;
  /** Optional sun-yellow chip, e.g. "One available now". Omit for none. */
  tag?: string;
};

export const client = {
  // ── Identity ──────────────────────────────────────────────────────
  businessName: "H & E Landscaping",
  legalName: "H & E Landscaping",
  tagline: "Curb appeal, year round",
  logoPath: "/photos/logo.webp",

  // ── Domain / SEO ──────────────────────────────────────────────────
  siteUrl: "https://example.com", // TODO(client) — real domain, no trailing slash
  metaTitle:
    "H & E Landscaping — Curb appeal, year round | Polk County, AR",
  metaDescription:
    "Family-owned landscaping in Polk County, Arkansas. Lawn care, flower beds, tree work, fencing, sheds and custom builds. Free estimates. Se habla español. Call 479-234-5349.",
  ogImagePath: "/photos/og.jpg",

  // ── Contact ───────────────────────────────────────────────────────
  phone: "(479) 234-5349",
  phoneHref: "+14792345349", // E.164 — used for tel: links
  email: "", // TODO(client) — leave empty to keep it off the page entirely
  /**
   * A service-area business: crews travel, there is no storefront to
   * visit. This drives schema.org areaServed — no street address is
   * published, because publishing one that isn't a place customers can
   * walk into is worse than publishing none.
   */
  serviceArea: "Polk County, Arkansas",
  addressRegion: "AR",
  addressCountry: "US",

  // ── Socials (empty string hides the link) ─────────────────────────
  socials: {
    facebook: "", // TODO(client)
    instagram: "", // TODO(client)
    google: "", // TODO(client) — Google Business Profile review link
  },

  // ── Hero ──────────────────────────────────────────────────────────
  hero: {
    /**
     * The headline is split so `emphasis` can carry the sun-yellow
     * swipe that draws in behind it on load. Keep `emphasis` short —
     * it must not wrap.
     */
    headline: {
      lead: "There's nothing better than bringing a space ",
      emphasis: "back to life",
      trail: ".",
    },
    lede: "H & E Landscaping is a family-owned crew in Polk County. Lawn care, flower beds, tree work, fencing, and custom builds — all year, not just in spring.",
    /** Three short proofs, under a rule. Any more and none of them land. */
    trust: ["Free estimates", "Dependable scheduling", "Se habla español"],
    /** The hero's own before/after — the first thing a visitor touches. */
    pair: {
      label: "side yard walkway",
      before: "/photos/before-1.webp",
      after: "/photos/after-1.webp",
      beforeAlt:
        "A side yard stripped to bare dirt and gravel before work began.",
      afterAlt:
        "The same side yard with a finished paver walkway, timber edging, black gravel and new plantings.",
      title: "Side yard walkway",
      caption: "bare ground to finished path.",
    } as WorkPair,
  },

  /** The scrolling strip under the hero. Plain nouns, no punctuation. */
  marquee: [
    "Lawn mowing",
    "Flower bed installation",
    "Tree pruning",
    "Yard clean-up",
    "Mulch & gravel",
    "Fencing",
    "Storm cleanup",
    "Storage sheds",
    "Chicken coops",
    "Decks & porches",
  ],

  // ── Work (before / after) ─────────────────────────────────────────
  work: {
    heading: "Same yard. Hard to believe.",
    lede: "We've been busy finishing up some great projects. Here are a couple of our favorite recent transformations — drag each one across to see the difference.",
    cta: "Got a project in mind? Let's chat",
    pairs: [
      {
        label: "front flower bed",
        before: "/photos/before-2.webp",
        after: "/photos/after-2.webp",
        beforeAlt:
          "Patchy bare grass running along the front of a brick house.",
        afterAlt:
          "A curved stone-edged flower bed with fresh black mulch and new shrubs along the same wall.",
        title: "Front bed reset",
        caption: "healthy plants, defined edges, a polished look.",
      },
      {
        label: "front entry and walkway",
        before: "/photos/before-3.webp",
        after: "/photos/after-3.webp",
        beforeAlt:
          "Bare dirt, tarps and materials in front of a dome-roofed house mid-project.",
        afterAlt:
          "A finished flagstone entry with stone edging, mulch and planted shrubs at the same house.",
        title: "Flagstone entry",
        caption: "stone laid, beds cut in, everything hauled off.",
      },
    ] as WorkPair[],
  },

  // ── Process ───────────────────────────────────────────────────────
  process: {
    heading: "How a walkway actually gets built.",
    lede: "It starts with a phone call and a free estimate. Everything after that looks like this — one real job, from bare grass to a finished stone path.",
    steps: [
      {
        title: "Lay the base",
        body: "We mark the run and put gravel down first. A path is only as good as what's under it — skip this and it sinks by the second winter.",
        photo: "/photos/path-1.webp",
        alt: "Crushed gravel base spread along the marked route of a new walkway.",
      },
      {
        title: "Level the bed",
        body: "Screenings go on top and get raked flat and true, wheelbarrow by wheelbarrow, until the whole run sits even and drains the right way.",
        photo: "/photos/path-2.webp",
        alt: "A crew member leveling a bed of screenings along the path with a wheelbarrow alongside.",
      },
      {
        title: "Set the stone",
        body: "Every flagstone is hand-fit — turned, tried, and swapped until the joints line up and nothing rocks underfoot. This is the slow part, and it's the part you'll notice.",
        photo: "/photos/path-3.webp",
        alt: "Flagstone pieces hand-fitted in place along the length of the walkway.",
      },
      {
        title: "Edge and finish",
        body: "A black gravel border gets cut in clean along the grass line. It keeps the stone where it belongs and gives the whole thing a defined edge.",
        photo: "/photos/path-4.webp",
        alt: "Finished flagstone path with a crisp black gravel border cut in along the lawn.",
      },
      {
        title: "Walk it with you",
        body: "We haul off every scrap, then walk the finished path with you end to end. We're not done until you're happy with it.",
        photo: "/photos/path-5.webp",
        alt: "The completed stone walkway leading down to a pond and dock.",
      },
    ] as ProcessStep[],
  },

  // ── Services (the one dark section) ───────────────────────────────
  /**
   * Humour lives here and nowhere else. It's earned by the subject —
   * a storm took the treehouse out — and it would be wrong in a form
   * label or an error message.
   */
  services: {
    heading: {
      lead: "Call us before ",
      emphasis: "the trees",
      trail: " do.",
    },
    lede: "When you told that branch you'd deal with it later, the tree said bet. Fall's coming, and so are the storms — pruning now costs a lot less than cleanup later.",
    quip: "No husbands were harmed in the making of this photo. One treehouse didn't make it.",
    backdrop: "/photos/storm-damage-cta.webp",
    backdropAlt:
      "A large tree limb down across a wrecked wooden playset after a storm.",
    note: "Free estimates, year round. We'll come look at it.",
    groups: [
      {
        title: "Tree work",
        tone: "storm",
        items: [
          "Tree pruning and shaping",
          "Limb and deadwood removal",
          "Storm damage cleanup",
          "Brush hauling and lot clearing",
          "Firewood cut and stacked",
        ],
      },
      {
        title: "Lawn & yard care",
        tone: "leaf",
        items: [
          "Mowing, edging and trimming",
          "Seasonal yard clean-ups",
          "Flower bed installation and care",
          "Mulch or gravel installation",
          "Fencing and gravel yards",
        ],
      },
    ] as ServiceGroup[],
  },

  // ── Gallery ───────────────────────────────────────────────────────
  gallery: {
    heading: "We build things, too.",
    lede: "Metal or wood, we come to your property and build it on-site. Ask us for a free quote on any of it.",
    items: [
      {
        photo: "/photos/shed-2.webp",
        alt: "A red metal storage shed with white trim, newly built on skids in a back yard.",
        title: "Storage sheds",
        body: "Metal and wood, built on-site to the size you need. Doors and windows where you want them.",
      },
      {
        photo: "/photos/coop-2.webp",
        alt: "A newly built chicken coop with board-and-batten walls, a cedar-framed plank door and a long hinged shutter window.",
        title: "Chicken coops",
        body: "Nesting boxes, roosts and a run. Perfect addition to your chicken addiction. Message us to come see it.",
        tag: "One available now", // TODO(client) — drop this line once it sells
      },
      {
        photo: "/photos/porch-3.webp",
        alt: "A finished wooden deck with wire mesh railing and patio furniture.",
        title: "Decks & porches",
        body: "Framed, decked and railed. Another job done — ask us for a free quote.",
      },
      {
        photo: "/photos/lawn-1.webp",
        alt: "A cleared and mown yard with freshly trimmed trees around a small white house.",
        title: "Lawn maintenance",
        body: "On a schedule you can count on, or a one-time cleanup. Either works.",
      },
      {
        photo: "/photos/woodstack.webp",
        alt: "A long head-high stack of split firewood among pines and autumn oaks.",
        title: "Lot clearing",
        body: "Trees down, brush hauled, firewood split and stacked where you want it.",
      },
      {
        photo: "/photos/after-1.webp",
        alt: "A finished paver walkway with timber edging, black gravel and new plantings.",
        title: "Walkways & gravel",
        body: "Flagstone, pavers or gravel drives — laid on a proper base so they stay put.",
      },
    ] as GalleryItem[],
  },

  // ── About ─────────────────────────────────────────────────────────
  about: {
    heading: "Family-owned, and rooted right here.",
    body: [
      "H & E Landscaping is a family-owned, Hispanic-owned business serving the Polk County community. We believe in hard work, honest service, and treating every yard like it's our own.",
      "Whether you need regular maintenance or a one-time cleanup, we're here to help you keep your outdoor space looking its best. Thank you to everyone who has trusted us with their property — we can't wait to work with you.",
    ],
    photo: "/photos/path-5.webp",
    photoAlt:
      "A finished stone walkway leading down toward a pond at the end of a job.",
    /**
     * Stated once in the body above, then made useful here: a real
     * invitation to call in Spanish, not a badge. Set to null to hide.
     */
    spanish: {
      heading: "¿Prefiere hablar español?",
      body: "Llámenos al (479) 234-5349 — hablamos español y con gusto le damos un presupuesto gratis.",
    },
  },

  // ── Contact ───────────────────────────────────────────────────────
  contact: {
    heading: "Ready to book?",
    lede: "Give us a call, or send a few details and we'll get right back to you. Estimates are always free.",
    facts: [
      {
        label: "Where we work",
        body: "Polk County, Arkansas and the surrounding area. Not sure if you're in range? Just ask.",
      },
      {
        label: "What it costs to ask",
        body: "Nothing. We come out, look at the job, and give you a number in writing.",
      },
    ],
    /** The one <select> on the form. Ordered the way a caller would say it. */
    jobOptions: [
      "Lawn care or mowing",
      "Flower beds or mulch",
      "Tree work or storm cleanup",
      "Fencing or gravel",
      "Shed, coop, deck or custom build",
      "Something else",
    ],
    submitLabel: "Send it over",
    note: "We usually answer the same day. In a hurry? Calling is faster.",
    success: {
      heading: "Got it — thanks!",
      body: "We'll be in touch shortly. If you need us sooner, call",
    },
  },

  // ── Footer ────────────────────────────────────────────────────────
  footer: {
    blurb:
      "Reliable, year-round landscaping for the Polk County community. Thank you for supporting local.",
    services: [
      "Lawn & yard care",
      "Tree work & storm cleanup",
      "Flower beds & mulch",
      "Fencing & gravel",
      "Sheds, coops & decks",
    ],
    signoff: "Curb appeal, year round.",
  },

  // ── Section copy (nav + CTAs — usually fine as-is) ────────────────
  copy: {
    navLinks: [
      { href: "#work", label: "Our work" },
      { href: "#process", label: "How we work" },
      { href: "#services", label: "Services" },
      { href: "#about", label: "About us" },
    ],
    callCta: "Call",
    quoteCta: "Get a free quote",
    stickyCallLabel: "Call now",
    stickyQuoteLabel: "Free quote",
  },
} as const;

export type ClientConfig = typeof client;
