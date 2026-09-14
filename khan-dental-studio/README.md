# Khan Dental Studio — Google Ads landing page

A conversion-focused landing page for **Khan Dental Studio**, Dr. Omair Khan's
practice at 725 U.S. 287 Frontage Rd, Suite 507, Mansfield, TX 76063.

| | |
|---|---|
| **File** | [`dentist-mansfield-tx.html`](dentist-mansfield-tx.html) — one standalone file, no build step |
| **Ad group** | Dentist — Mansfield, TX (general / new patient) |
| **Primary offer** | $99 new patient exam, digital X-rays, oral cancer screening & cleaning |
| **Conversions** | Lead form (above the fold) + click-to-call |
| **Page weight** | ~112 KB of HTML with all CSS and JS inlined; zero libraries, zero frameworks |

This page is built for **paid traffic only** and carries `noindex,follow` so it
never competes with the main site organically.

---

## Before you spend a dollar

Three things must be connected. Full instructions in [`docs/TRACKING.md`](docs/TRACKING.md).

1. **Add the Google tag** — the page fires all conversion events but ships no
   container, so you choose gtag or GTM.
2. **Connect the form endpoint** — the form validates and confirms in place but
   does not transmit yet. The handoff point is marked `SUBMIT TARGET` in the script.
3. **Publish a privacy policy and link it.** ⚠️ **Launch blocker.** Google Ads
   requires a reachable privacy policy on any page collecting personal data. The
   main site has none: its footer privacy and accessibility links are `href="#"`
   and both paths return 404. The footer here carries a commented-out placeholder
   rather than a link to a dead page.

One more thing to confirm: **no Google star rating appears anywhere on the page**,
because none could be verified — see [Social proof](#social-proof-is-real) below.

---

## How the page is built to convert

### The conversion path is never more than one thumb away

| Mechanism | Count |
|---|---|
| Click-to-call links (`tel:+18178397412`) | 13 |
| Scroll-to-form CTAs | 17 |
| "Get directions" links | 4 |
| Sticky mobile bar (Call / Book $99 visit) | always visible under 900px |

The hero is photo-led with call and "request an appointment" CTAs; the lead form
is the **first section under the hero**, so it is still the first thing a scroller
meets. Every CTA that isn't a phone call scrolls to that same form and focuses the
first field, so there is exactly one destination and no click-out to a third-party
booking tool.

### Structured for Quality Score

Google scores *landing page experience* and *ad relevance* separately. The page
addresses both deliberately:

- **Literal keyword echo.** The H1 reads "Dentist in Mansfield, TX", and the very
  first section below the hero is "Looking for a dentist in Mansfield, TX? Here
  are three ways to start" — so a searcher confirms intent within one scroll.
- **Offer echo.** `$55` appears in the hero badge, the final CTA, the FAQ, the
  form's reason list and the sticky bar, matching the ad's promotion.
- **Substance, not a splash page.** ~2,340 words covering all 16 services,
  technology, the dentist's credentials, insurance and payment, nine
  testimonials and 9 FAQs. Thin landing pages are the single most common cause
  of a poor landing page experience score — this has room to lose a little more
  and still read as a real page, but not much.
- **Transparency signals.** Real address, real hours, named dentist, named team
  member, a map, and links back to the main site's About, Contact and Insurance
  pages.
- **Structured data.** `Dentist` (with `makesOffer`) and `FAQPage` JSON-LD, both
  validated.

### Objection handling, in order

The sections answer the questions a Mansfield searcher actually has, in the
order they occur: *Are you open when I'm free?* → *What does the first visit
cost?* → *Why you and not the chain down the road?* → *Do you do what I need?* →
*Will it take three appointments?* → *Who is the dentist?* → *Do other people
trust you?* → *Do you take my plan?* → *Where are you?* → *Everything else.*

### Built for mobile first

- Verified zero horizontal overflow at **320, 360, 390, 414, 600, 768, 834, 1024,
  1280 and 1600px**.
- Every interactive target is at least 44px tall.
- Single-column stacking below 640px; the three-up pricing grid holds to 760px.
- `env(safe-area-inset-bottom)` respected on the sticky bar for notched phones.

### Built for speed

- **One HTTP request for the document.** All CSS and JS are inlined; there is no
  framework, no jQuery, no icon font — all 123 icons are inline SVG.
- **Fonts load non-blocking** via `media="print"` swap, with a `<noscript>`
  fallback and a full system-font stack behind DM Sans.
- **LCP protected.** The largest element above the fold is the H1 *text*, so
  nothing competes with it: no image is preloaded, and the only above-the-fold
  image is a 52px avatar. Every other image is `loading="lazy"`, and all carry
  explicit `width`/`height` so cumulative layout shift stays at zero.
- **One easy win left.** The site only publishes full-size images, so the 52px
  avatar currently downloads a 1127px WebP (55 KB) and the two in-page photos are
  served about 2× their displayed size. Generating a 104px avatar crop and
  ~1100px and ~900px variants of `reception.jpg` and `dr-khan-hero.jpg` would cut
  roughly 150 KB with no visible change.
- **The map iframe is lazy-loaded**, so it costs nothing until scrolled near.
- Reveal animations are a **progressive enhancement** — the `.js` class gates
  them, so if scripting fails the page renders fully visible rather than blank.
  On paid traffic a blank page is a wasted click.
- The trust marquee under the hero is **pure CSS** — three duplicated copies and
  one `translate3d` keyframe, no JavaScript and no library. It pauses on hover,
  and the duplicate copies are `aria-hidden` so screen readers read the claims
  once.
- `prefers-reduced-motion` is honoured throughout, including the marquee, which
  falls back to the original static centred row.

### Accessibility

Skip link, one `<h1>`, ordered headings, labels on every input, `aria-live` on
the confirmation, `:focus-visible` rings in the brand gold, `aria-hidden` on
decorative SVG, a titled map iframe, and a native `<details>` FAQ that works
without JavaScript.

---

## Hero photo — one file to add

The hero sits behind the studio's own exterior photograph. The page expects it at:

```
https://www.khandentalstudio.com/assets/img/clinic-exterior.jpg
```

Upload the photo there and it appears — no code change. To point somewhere else,
edit the single line near the top of the stylesheet:

```css
:root{--hero-photo:url("…")}
```

If the file is missing the layer renders nothing and the navy hero shows through,
so the page never looks broken while you are getting the photo hosted.

**Do not use the site's existing `clinic.jpg` or `reception.jpg` here.** Both are
stock: `clinic.jpg` is an operatory in a high-rise, and `reception.jpg` is a
Spanish-language hospital lobby (`BANCO DE SANGRE`, `TERAPIA NEONATAL`). Running
either under a "this is our practice" headline is a misrepresentation risk on a
paid page, quite apart from being obvious to a local.

Shoot or supply a wide landscape frame (≈2000×1200), and keep the subject to the
right — the left ~60% carries the headline behind a navy scrim.

## Brand fidelity

Nothing here is an approximation. The design tokens were read directly from the
live site's `:root` block:

| | |
|---|---|
| Navy | `#000342` |
| Gold | `#f6b756` |
| Canvas | `#f4f4f5` · hairline `#ececee` · muted `#52525b` |
| Type | DM Sans 400/500/600/700 — the site is deliberately single-font |
| Radii | 36px surfaces · 14px controls · 12px chips |
| Elevation | hairline borders doing the work, `0 18px 48px -28px rgba(0,3,66,.28)` |

The gold logo mark is the site's own `logo-mark.svg`, inlined. Photography is
served from the live site (`dr-omair-khan.webp`, `reception.jpg`,
`dr-khan-hero.jpg`), all confirmed reachable. The gold-underline emphasis
(`.mark`) reproduces the site's `.serif-i` treatment, and the navy band with its
single radial gold wash reproduces `.section-dark`.

The voice matches too — plain, specific, faintly dry, and never salesy. Lines
like "No rotating locum dentists, no corporate quotas" and "There is no lecture
waiting for you here" are the practice's own words, not invented copy.

## Social proof is real

All 9 testimonials are quoted verbatim from the practice's own
[patient reviews page](https://www.khandentalstudio.com/patient-reviews), with
names and cities unchanged. The three figures — **186 published reviews, 96%
would recommend, 12 years** — are the counters published on that page.

**No star rating is shown.** The Google Business Profile is live (entity
`/g/11mpcg_rfj`), but Google blocks automated reads of the knowledge panel and no
third-party aggregator carries the listing, so the rating could not be verified.
Publishing an unverified rating is a Google Ads misrepresentation risk, so it was
left off rather than guessed. Once confirmed, add it to the `.rev-stats` block
and to `aggregateRating` in the `Dentist` JSON-LD.

Every other claim on the page is traced to a source in
[`docs/VERIFIED-FACTS.md`](docs/VERIFIED-FACTS.md).

---

## Deploying

The file is self-contained — open it in any browser and it renders complete.

1. Publish it at `https://www.khandentalstudio.com/lp/dentist-mansfield-tx`
   (the `canonical` and the suggested Final URL both already point there).
2. Complete the three connection steps above.
3. Set the Final URL suffix from [`docs/TRACKING.md`](docs/TRACKING.md) so
   `gclid` and UTMs reach the hidden form fields and, from there, the CRM.

### Worth testing after launch

- **Hero headline** — the weekend/evening angle versus a pain/urgency angle.
- **Form length** — dropping "insurance" and "preferred day" trades lead quality
  for volume; worth measuring rather than assuming.
- **Offer framing** — "$99 new patient visit" versus leading with the free
  second opinion, which is the sharper differentiator against a chain.
- **Ad scheduling** — the practice is closed Monday to Thursday. Either bid down
  outside clinic hours or lean on the form; the page already sets the
  expectation of a next-clinic-day reply so a Tuesday lead isn't a broken promise.
