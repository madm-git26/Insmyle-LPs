# Sleep Apnea Landing Page

A Google Ads landing page for a dental sleep medicine practice — full copy and
a running React scaffold, built to the approved design specification and the
reference comp (light clinical navy / ice-blue system).

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # React build → dist/
npm run build:standalone # single-file HTML → dist-standalone/
npm run preview
```

**Just want to look at the page?** Run `npm run build:standalone` and open
`dist-standalone/sleep-apnea-landing-page.html` in any browser. It is one
self-contained file — no server, no build, no framework, images inlined — and
it is the paste-ready deliverable for a WordPress or CMS block, matching the
convention of the other landing pages in this repo.

Nothing to configure to see it run: placeholder photography and placeholder
practice details ship with the repo.

---

## What's here

| Path | What it is |
|---|---|
| [`copy/landing-page-copy.md`](copy/landing-page-copy.md) | **The client-approved copy**, sections 01–28 verbatim, with the ad-group variants, alt text, SEO keywords, event names and a pre-launch checklist. |
| `src/content/` | The same copy as data — `copy.js`, `practice.js` (the only file with client details), `adGroups.js` (message match). |
| `src/components/` | One component per section, mirroring the specified architecture. |
| `src/styles/` | `tokens.css` → `base.css` → `components.css` → `sections.css`, in that cascade order. |
| `src/hooks/`, `src/lib/` | Reveal / scroll / sticky behaviour, analytics, UTM persistence. |
| `tools/build-standalone.mjs` | Emits the single-file HTML build from the same content modules, so it can never drift from the React app. `tools/runtime.js` is its vanilla-JS behaviour layer. |
| [`docs/IMAGE-MANIFEST.md`](docs/IMAGE-MANIFEST.md) | Every image slot, its crop, and how to generate the responsive derivatives. |

## Swapping in the client

Almost everything lives in **one file**: `src/content/practice.js` — name,
phone, address, hours, provider, booking URL, social links. The copy deck's own
tokens (`[PRACTICE NAME]`, `[CITY]`, `[PHONE]`, `[DOCTOR NAME]`…) resolve from
it, so there is no find-and-replace through the components.

Three things must be reviewed by a human before launch:

1. **Testimonials** render the deck's bracketed placeholders verbatim, so they
   are impossible to miss in review. Replace with verified, permissioned
   reviews or delete section 16.
2. **Section 14's trust points** must describe the practice accurately.
3. **The booking endpoint** — `submitLead()` in `src/components/BookingForm.jsx`
   currently logs in dev and POSTs to `/api/leads` in production.

## How the page is wired

**CTAs.** Every CTA is the same `Button`, and every click fires an analytics
event tagged with `cta_location`. Primary CTAs open the booking modal in place —
no page reload, no lost attribution. UTMs, GCLID, GBRAID and WBRAID are captured
on landing, kept for the session, and re-appended to outbound links
(`src/lib/utm.js`).

**Message match.** `?variant=oral_appliance` (or a matching `utm_content` /
`utm_term`) swaps the hero eyebrow, H1, body and CTA. Everything below stays
shared. Try `?variant=snoring` and `?variant=cpap_alternative`. Variant body
copy is drawn from the approved sections it maps to, so no new claims are
introduced.

**Motion.** One reveal utility (`Reveal`), one IntersectionObserver contract,
`600ms` / `cubic-bezier(.22,1,.36,1)`, fires once. Scroll-linked work is
rAF-throttled and disabled under `prefers-reduced-motion`, which also forces
every revealed element visible so no content can be hidden by a preference.

**3D.** The oral appliance viewer is a **static image by default**. The 3D
module (`src/lib/applianceScene.js`) is a deliberate stub that returns `null`,
is only imported when the section is ~250px from the viewport, and is code-split
into its own chunk. Until a real optimised GLB exists, the page carries no 3D
cost at all — which is the correct trade on paid mobile traffic.

**Accessibility.** Semantic landmarks, one H1, skip link, visible focus rings,
a real focus-trapped dialog, `aria-expanded` accordions, and the mobile sticky
bar is `inert` while hidden so it never traps a tab.

## Measured

Production build: **68.2 kB gzip JS** (React included), **7.2 kB gzip CSS**,
zero horizontal overflow at 390px and 1440px, no console errors, one H1.
Verified in Chromium: booking modal (open, validate, submit, success), the
journey step CTA, FAQ expansion, sticky-bar show/hide, header sticky state and
all four hero variants.

The page runs the client copy deck's 19 sections in order, 01–19, with 20–23
(sticky bar, booking form, success state, footer) layered on top.

Section heights at 1440px:

| # | Section | Height | | # | Section | Height |
|---|---|---:|---|---|---|---:|
| 01 | Hero | 1092px | | 11 | Journey | 943px |
| 02 | Problem | 825px | | 12 | Candidate | 802px |
| 03 | Symptoms | 911px | | 13 | CPAP | 842px |
| 04 | Breathing timeline | 983px | | 14 | Provider | 1204px |
| 05 | Airway | 726px | | 15 | Technology | 894px |
| 06 | What is OSA | 1025px | | 16 | Testimonials | 1144px |
| 07 | Why it matters | 1077px | | 17 | FAQ | 1301px |
| 08 | Treatment intro | 822px | | 18 | Local SEO | 722px |
| 09 | Oral appliance | 1001px | | 19 | Final CTA | 849px |
| 10 | How it works | 811px | | — | Footer | 691px |

**Total: ~18,700px desktop / ~27,900px mobile.** That is meaningful content
every ~930px, which meets the density rule from the original spec — but it is
roughly double that spec's stated 7,000–9,000px page-height target. The two
cannot both hold: the approved copy deck is 19 sections and the reference comp
is 9. Nothing has been cut, so the call is yours.

If you want a shorter page, these four carry the least conversion weight and
overlap with sections that stay — remove their lines from `src/App.jsx`:

| Cut | Saves | Overlaps with |
|---|---:|---|
| 06 What is OSA | 1025px | 04 + 05 already explain the mechanism |
| 07 Why it matters | 1077px | 02 covers the felt experience |
| 15 Technology | 894px | 14's "Modern Technology" trust point |
| 10 How it works | 811px | 09's three features |

That lands around **14,900px** while leaving the conversion spine intact
(hero → problem → symptoms → breathing → airway → treatment → appliance →
journey → candidate → CPAP → provider → testimonials → FAQ → local → final).

## Two builds, one source

Both builds import the same `src/content/` modules — copy, practice details,
icon paths and ad-group variants — so the wording, the icons and the hero
variants cannot drift between them.

| | React (`dist/`) | Standalone (`dist-standalone/`) |
|---|---|---|
| Use for | a React or Next.js site | a CMS paste, a client preview, an email-able file |
| Needs a build | yes | no — one file, opens anywhere |
| Weight | 68 kB gzip JS + 7 kB CSS | 157 kB single file, images inlined |
| Behaviour | React components | `tools/runtime.js`, vanilla, ~350 lines |

Everything behaves identically in both: sticky header, mobile menu, scroll
reveals, breathing loop, airway state machine, step activation, FAQ accordion,
booking dialog with validation and success state, mobile sticky bar, scroll
depth and CTA tracking, UTM/GCLID capture and link decoration, and the four
hero variants.

To wire the standalone form to a real endpoint, set
`window.SLEEP_APNEA_LEAD_ENDPOINT` before the runtime script; without it the
form runs the demo path and shows the success state.

## Framework notes

Plain React + Vite, no UI library, no CSS framework — so it ports cleanly. For
Next.js: components are already client-safe (every `window` access is guarded),
so move `src/app/page.jsx` → `App.jsx`'s tree, swap `Img` for `next/image`, and
move the JSON-LD in `StructuredData.jsx` into the route's metadata export.
