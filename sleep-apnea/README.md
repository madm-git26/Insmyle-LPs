# Sleep Apnea Landing Page

A Google Ads landing page for a dental sleep medicine practice — full copy and
a running React scaffold, built to the approved design specification and the
reference comp (light clinical navy / ice-blue system).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

Nothing to configure to see it run: placeholder photography and placeholder
practice details ship with the repo.

---

## What's here

| Path | What it is |
|---|---|
| [`copy/landing-page-copy.md`](copy/landing-page-copy.md) | **The full page copy**, section by section, with the ad-group variants, alt text, event names and a pre-launch checklist. |
| `src/content/` | The same copy as data — `copy.js`, `practice.js` (the only file with client details), `adGroups.js` (message match). |
| `src/components/` | One component per section, mirroring the specified architecture. |
| `src/styles/` | `tokens.css` → `base.css` → `components.css` → `sections.css`, in that cascade order. |
| `src/hooks/`, `src/lib/` | Reveal / scroll / sticky behaviour, analytics, UTM persistence. |
| [`docs/IMAGE-MANIFEST.md`](docs/IMAGE-MANIFEST.md) | Every image slot, its crop, and how to generate the responsive derivatives. |

## Swapping in the client

Almost everything lives in **one file**: `src/content/practice.js` — name,
phone, address, hours, provider, booking URL, social links. Copy tokens
(`{{PRACTICE}}`, `{{CITY}}`, `{{PHONE}}`, `{{DOCTOR}}`) resolve from it, so
there is no find-and-replace through the components.

Three things must be reviewed by a human before launch:

1. **Testimonials** are placeholders and are marked as such in code. Replace
   with real, permissioned reviews or delete the section.
2. **Credentials** in `practice.doctor.highlights` must match what the practice
   actually holds.
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
shared. Try `?variant=snoring` and `?variant=cpap_alternative`.

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

Production build: **66.8 kB gzip JS** (React included), **6.6 kB gzip CSS**,
zero horizontal overflow at 390px and 1440px, no console errors.

Section heights at 1440px, measured in Chromium:

| Section | Height | | Section | Height |
|---|---:|---|---|---:|
| Hero | 889px | | Candidate | 788px |
| Problem | 809px | | CPAP | 726px |
| Symptoms | 1162px | | Provider | 922px |
| Airway | 814px | | Technology | 773px |
| Education | 736px | | Testimonials | 826px |
| Why it matters | 834px | | FAQ | 1009px |
| Treatment | 906px | | Local SEO | 526px |
| Appliance steps | 1033px | | Trust band | 171px |
| Journey | 763px | | Final CTA | 701px |

**Total: ~14,700px desktop / ~22,500px mobile.** That is meaningful content
every ~830px, which meets the spec's density rule — but it is roughly double the
spec's stated page-height target of 7,000–9,000px. The two cannot both hold: the
specified component architecture is 18 sections, and the reference comp is 9.
Nothing has been dropped, so the decision stays with you. For a page that lands
inside the stated target (~8,300px), cut the four sections that carry the least
conversion weight — **Education, Why It Matters, Appliance Steps, Technology** —
by removing their four lines from `src/App.jsx`. The conversion spine (hero →
problem → symptoms → airway → treatment → journey → trust → final CTA) is
untouched by that cut.

## Framework notes

Plain React + Vite, no UI library, no CSS framework — so it ports cleanly. For
Next.js: components are already client-safe (every `window` access is guarded),
so move `src/app/page.jsx` → `App.jsx`'s tree, swap `Img` for `next/image`, and
move the JSON-LD in `StructuredData.jsx` into the route's metadata export.
