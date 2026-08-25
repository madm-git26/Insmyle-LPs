# Peak Dentistry — Google Ads Landing Page

**File:** [`dentist-lockport-lp.html`](dentist-lockport-lp.html) — one self-contained page, no build step.
**Ad groups:** `dentist lockport` · `dentist near me`
**Client:** Peak Dentistry, 16347 W. 159th Street, Lockport, IL 60441 · (815) 660-5880

---

## 1. Page structure and why each block is there

Direction: **bold DTC-brand energy**, per the drinkcollider.com reference — saturated full-bleed
colour blocking, oversized display type, moving marquee bands, benefit chips, product-style offer
cards and a pinned scroll sequence. Brand gold is promoted from an accent to a block colour.

| # | Section | Job it does for a high-intent local search |
|---|---------|--------------------------------------------|
| 1 | Sticky header | Phone visible at every scroll depth. **No site navigation** — an ads LP should have no exit paths. |
| 2 | **Marquee band** (dark) | The signature device. Puts the offer, the hours and the phone into motion before you've read a word. |
| 3 | Hero | Oversized three-line headline with a gold highlight, live open/closed pill, benefit chips, dual CTA, framed photo with a hard gold offset shadow. |
| 4 | Trust strip | Four credential pills — the "as seen in" slot, translated to insurance / savings plan / all ages / emergencies. |
| 5 | Offers | Product-card treatment: hard borders, offset shadow on hover, a gold "most booked" hero card. |
| 6 | **Marquee band** (gold, reversed) | Second pass, opposite direction — service names. |
| 7 | Benefit grid | Six differentiators in a hairline-divided block. |
| 8 | **Pinned scroll sequence** | The centrepiece. Four first-visit steps advance as you scroll a pinned viewport, with a clickable progress rail. Falls back to a stacked list on mobile and under reduced motion. |
| 9 | Tech section (dark) | The "ingredients" block: CEREC, CBCT, scanner, 3D printing, VELscope, DiagnoDent as labelled cards. |
| 10 | Doctor | Named, credentialed, with a 2018 Michigan badge. |
| 11 | Reviews | Four real patient quotes in bordered cards. |
| 12 | Insurance (full gold block) | Removes the #1 objection, on the loudest surface on the page. |
| 13 | Location | Building exterior, hours table with today highlighted, embedded map. |
| 14 | Request section (dark) | The form, with a three-step explainer. All eight `#request` CTAs land here. |
| 15 | FAQ | Uppercase display accordion + FAQPage schema. |
| 16 | Final CTA (gold) + marquee + footer | Last conversion window and the policy links Google Ads expects. |
| 17 | Sticky mobile call/book bar | Appears once the hero scrolls away. |

**The form is not in the hero** — it has its own dark band at #14, and every `#request` CTA scrolls to it.

**Keyword coverage** — `dentist lockport` is in the title, H1, an H2, the schema and the address block.
`dentist near me` is served by proximity signals: the building exterior photo, landmarks (Crumbl
Cookie, Noodles & Co), free parking, embedded map, `areaServed` for Lockport / Homer Glen / Lemont,
and a Homer Glen / Lemont FAQ.

---

## 1a. Hero video, waves and the review badge

### The background video

Uses the practice's **own hosted clip** — `/wp-content/uploads/2026/05/video-banner.webm`
(5.91 MB) with their existing poster `img-banner-video-poster.webp` (0.27 MB). Nothing new to
upload. The clip is the building exterior, which is the single most useful shot for "near me"
traffic: it is what the patient will actually recognise when they pull into the plaza.

**It is gated, deliberately.** 5.91 MB is fine on desktop wifi and indefensible on paid mobile
traffic, so the video only loads when *all* of these hold: viewport ≥900px, motion allowed,
no `Save-Data`, and the connection is not 2G. Everyone else gets the poster, which is the same
frame. Loading is deferred to `requestIdleCallback` so it never competes with the hero's paint.

**The scrim is sized from measurement, not taste.** Sampling 36 frames across playback, the copy
zone averages 137/255 luma, peaks at 164, and in the worst frame **42.6% of pixels sit above 200**
with pure white present. Against a worst-case 255 pixel, white text needs ≥0.55 black to reach AA.
The scrim never drops below ~0.66 where the copy sits (6.2:1 or better) and reaches 0.86 at the
left edge.

**A pause control is required, not optional.** WCAG 2.2.2 covers auto-playing motion that runs
past five seconds; the clip is 20.65s and loops. A labelled pause/play toggle appears once
playback starts, and reduced-motion turned on mid-session stops it immediately.

**Gap to close:** there is no MP4 alongside the WebM (the URL 404s). VP8-in-WebM covers Safari
14.1+/iOS 14.1+, so older iOS gets the poster rather than the video. Generating an MP4 and adding
a second `<source>` is a ten-minute job on their side.

### Waves

Their brand signature is the curve dividing colour blocks. Rather than reuse their 205 KB
decorative SVG, the divider is authored inline (~200 bytes, `fill: currentColor`) so it recolours
per transition: hero→trust, benefits→pin, reviews→insurance, FAQ→final. The hero wave carries a
thin offset stroke above the fill, matching the double-line treatment on their homepage.

### Google review badge — check this before launch

The hero shows **5.0 from 103 Google reviews**, taken from a screenshot of the practice's site.
**I could not verify it independently:** the live HTML this page was built from contains no rating
or review count anywhere, so the screenshot appears to be a newer build than the public page
returns. Review counts also drift. Confirm the current figures before spending, and treat the
numbers in the hero as the one place to edit.

---

## 1b. The design system

| Element | Choice | Why |
|---|---|---|
| Display type | **Archivo** (variable, weight 800, `wdth` 108), uppercase, `-0.035em` tracking | Heavy grotesk at poster scale is what gives the page its DTC punch. |
| Body type | **Work Sans** | The practice's own brand font — keeps the LP continuous with the main site. |
| Colour | Gold `#C98609` as a **block** colour, espresso `#0E0D0C`, cream `#FFF6EA` | Full-bleed alternation: dark marquee → cream hero → white → cream → dark pin → dark tech → cream → white → **gold** insurance → dark form → cream FAQ → **gold** close. |
| Borders | 2px hard borders and offset "hard shadows" (`8px 8px 0`) instead of soft blur | The single biggest driver of the bold-brand feel; cards lift into their own shadow on hover. |
| Buttons | Chunky pills with a solid colour underhang that compresses on press | Reads as physical rather than flat. |
| Contrast | All 12 core pairs verified | Gold blocks use near-black text at 6.08:1; nothing on the page relies on a low-contrast pairing. |

---

## 1c. The motion layer

Transform/opacity only, batched into **one shared rAF loop** — the sole exception is the FAQ's
`grid-template-rows`, which is what makes an auto-height accordion animate at all.

| Effect | How it works |
|---|---|
| Masked headline | Three lines slide up out of `overflow:hidden` boxes, staggered 100/200/300ms. |
| Gold highlight wipe | An inline gradient with `box-decoration-break: clone` wipes in left-to-right — so when the phrase wraps, **each line gets its own band** rather than one giant slab. |
| **Pinned sequence** | A 440vh section with a `position:sticky` viewport; scroll progress selects the live step and drives the rail. Clicking a rail item scrolls to that step's slice. Mobile and reduced-motion get a plain stacked list. |
| Marquee ×3 | Each set is cloned in JS so `translateX(-50%)` loops seamlessly; middle band runs reversed; pauses on hover. |
| Image reveals | `clip-path` wipes open while the photo eases from `scale(1.12)` to 1; hero and doctor photos also drift on parallax. |
| Staggered reveals | Cards in a `[data-stagger]` grid get incremental `--d` delays (70ms each, capped). |
| Cursor spotlight | Gold radial gradient tracks the pointer inside cards. Fine pointers only. |
| Magnetic CTAs | Hero and final primary buttons lean up to 14px toward the cursor, rAF-batched. |
| Press ripple | Material-weight ripple from the press point on every button. |
| Progress bar, header shrink, tag rules, icon tilts | Small transitions that make the page feel built rather than assembled. |

**Live "Open now" pill** — reads the real schedule in **`America/Chicago`**, not the visitor's
timezone, so a Chicago Saturday is correct from anywhere. Closed states name the next opening. If
`Intl` throws, the pill stays hidden rather than showing a status that might be wrong.

**Reduced motion** collapses the entire layer — no entrances, parallax, marquee, ripples or
spotlights, the pin unpins into a stacked list, everything visible immediately. Honoured
mid-session too.

**Reveals do not use IntersectionObserver.** A browser test caught it missing elements on fast
scrolls, and a missed reveal means permanently invisible content. They run off the rAF loop,
draining a pending list as elements cross the fold, plus a `<noscript>` block that forces
everything visible if JS never runs.

---

## 2. Before it goes live — 3 things to wire up

### a) The form endpoint (required)

Open the `CONFIG` block near the bottom of the file:

```js
var CONFIG = {
  FORM_ENDPOINT: "",   // <-- set this
  BOOKING_URL:   "https://www.dental4.me/peakdentistry/1",
  PHONE_E164:    "+18156605880"
};
```

`FORM_ENDPOINT` should be a URL that accepts a JSON `POST` — a WPForms/Gravity Forms webhook,
a Zapier catch hook, or a small `admin-ajax.php` handler.

Payload shape:

```json
{ "name":"", "phone":"", "email":"", "reason":"", "preferred_time":"",
  "page":"/lp/dentist-lockport/", "gclid":"", "utm_source":"", "utm_campaign":"" }
```

**Left empty, the form still works** — it validates, then hands the patient to the online booking
tool with attribution parameters attached. It never silently drops a lead. But a real endpoint is
better: it captures people who won't finish a booking flow.

### b) Conversion tracking

Every CTA already pushes to `dataLayer` and calls `gtag` if present. Paste your GA4 / Google Ads
tag in the `<head>` and map these events as conversions:

| Event | Fires on |
|-------|----------|
| `click_to_call` | any tap on a phone number (`location` = header, hero, ribbon, sticky bar, …) |
| `generate_lead` | successful form submit — **this is your primary conversion** |
| `click_book_online` | Book Now → dental4.me |
| `click_directions` | Google Maps link |
| `click_offer` | a specific offer card |
| `form_error` / `form_fallback_to_booking` / `faq_open` | diagnostics, not conversions |

`gclid`, `wbraid`, `gbraid` and all five UTMs are captured from the URL, stored in `sessionStorage`
and appended to every booking link — so bookings completed on dental4.me stay attributable.

### c) Optional: keyword-matched headline

Append `?kw=` to the final URL and the H1 swaps:

| Value | Headline |
|-------|----------|
| `?kw=lockport` | Dentist in Lockport, IL *(default)* |
| `?kw=nearme` | Looking for a dentist near you? |
| `?kw=emergency` | Emergency dentist in Lockport, IL |
| `?kw=family` | Family dentist in Lockport, IL |
| `?kw=implants` | Dental implants in Lockport, IL |

It's a **strict whitelist** — arbitrary query text is never written into the DOM, so there's no
injection surface (the usual failure mode of DKI-style headline swaps).

Suggested final URLs:
- "dentist lockport" ad group → `…/lp/dentist-lockport/?kw=lockport`
- "dentist near me" ad group → `…/lp/dentist-lockport/?kw=nearme`

---

## 3. Deploying to the WordPress site

The site runs WordPress with the **Pro / Cornerstone** theme (same stack as the In Smyle pages).
The `/lp/` page already exists and is currently an empty stub — it's the natural home.

Two options:

1. **Standalone (recommended for ads):** upload the file as a page template or a static file at
   `/lp/dentist-lockport/`. Nothing inherits the site header/nav, which is what you want — the page
   is already `noindex, follow`.
2. **Inside Cornerstone:** paste everything between `<body>` and `</body>` into a raw-HTML element
   and move the `<style>` block into the page's CSS panel. Set the page template to *Blank — No
   Container* so the site nav doesn't reappear.

Either way, set the page to `noindex` in Rank Math (the meta tag is already in the file) so this
page can't compete with the homepage for the same query.

---

## 4. Quality checks that were actually run

| Check | Result |
|---|---|
| WCAG AA contrast | **Pass** — body 17.6:1, gold CTA 5.8:1, dark-band body 8.0:1, footer 5.9:1. Two fixes during review: star icons darkened to `#A56C05` (4.42:1) and the outline-on-dark button border raised from 2.95:1 to 5.45:1, both to clear the 3:1 non-text minimum. |
| Touch targets | All CTAs ≥ 58px, header/footer links ≥ 44px, form inputs 54px |
| Heading order | Single `<h1>`, no skipped levels |
| Labels / ARIA | 6 visible labels bound by `for`, all `aria-controls` and `aria-describedby` resolve, no duplicate IDs |
| Form errors | `role="alert"`, validated on **blur** not keystroke, first invalid field auto-focused |
| Reduced motion | `prefers-reduced-motion` disables reveals, spinners and smooth scroll |
| CLS | Every image has explicit dimensions or `aspect-ratio`; fonts use `display=swap` |
| Layout | Mobile-first, no horizontal scroll at 320px, sticky bar respects `env(safe-area-inset-bottom)` |
| JS | No dependencies. One bug caught in review: `form.name` returns the form's *name attribute*, not the input — rewritten to `form.elements[…]`. |
| Structured data | `Dentist` + `FAQPage` JSON-LD, hours matching the real schedule |
| Fonts | Google Fonts URL fetched and confirmed 200, serving both Fraunces italic and upright plus Work Sans |
| **Rendered-DOM audit** | Contrast measured on **every visible text node against its real composited background**, not on hand-picked token pairs. Caught 6 failures the paper check missed — see below |
| Heading order | No skipped levels (H1 → 11×H2 → 32×H3) |
| ARIA | No invalid patterns; every control has an accessible name; every image has alt |
| Touch targets | All ≥44px except the honeypot (hidden) and inline in-sentence links (WCAG 2.5.8 exempt) |
| **Browser-tested** | Rendered in headless Chromium at 320 / 360 / 375 / 390 / 768 / 1024 / 1280 / 1920 **and phone landscape** — no horizontal overflow at any width |
| Reveal coverage | Full-page scroll test: **0** elements left hidden at desktop and mobile, in both normal and reduced-motion modes |
| Keyboard | Tab order verified logical from skip-link through the CTAs; 3px focus ring present on every stop |
| Accordion a11y | Verified `aria-expanded` flips and closed panels go `visibility:hidden` (out of the a11y tree) |
| Form | Empty submit flags exactly the 3 required fields, focuses the first, and shows 3 `role="alert"` messages |
| Attribution | `?gclid=…&utm_campaign=…` verified carried onto the dental4.me link; `?kw=nearme` verified swapping the H1 |
| Console | Zero JavaScript errors across every test run |

Only outbound hosts: Google Fonts, Google Maps, the practice's own CDN, and dental4.me. No trackers
bundled, no CDN scripts.

---

## 5. Every claim on the page, and where it came from

All copy is traceable to peakdentistrylockport.com. Nothing was invented.

| Claim | Source page |
|---|---|
| $99 new patient exam · $79 emergency exam · free implant/denture, cosmetic and second-opinion consults | `/specials/` |
| Mon 8–5 · Thu 8–8 · Sat 8–2 · Tue/Wed/Fri/Sun closed | homepage footer |
| Strip mall near Crumbl Cookie & Noodles & Co · free parking | homepage |
| Serving Lockport, Homer Glen, Lemont | homepage / `/saturday-dentist/` |
| Dr. Stevan Djordjevic, University of Michigan 2018; surgical extractions, implants, cosmetic, clear aligners, family dentistry | `/dr-stevan-djordjevic/` |
| Doctor quote | `/dr-stevan-djordjevic/` |
| CEREC same-day crowns · CBCT 3D imaging · intraoral scanning · in-office 3D printing | `/our-technology/` |
| Comfort menu: blankets, pillows, wireless headphones, in-room TVs, warm towels, lobby beverage bar | `/new-patients/` |
| Judgment-free, no lecturing about time since last visit | `/faqs/`, `/new-patients/` |
| PPO plans, completing credentialing, benefits verified, claims filed electronically | `/insurance-financing/` |
| In-house membership: no deductibles, no claims, member discounts | `/insurance-financing/` |
| Cash, major credit cards, financing on request | `/insurance-financing/` |
| Checkup ≈ 45–60 min; X-rays, gum check, oral cancer screening, cleaning | `/faqs/` |
| Same-day emergencies when possible; laughing gas when appropriate | `/faqs/` |
| In-house specialty care, no referrals needed | `/how-we-are-different/` |
| Child's first visit by first birthday / first tooth | `/faqs/` |
| Clear aligners typically 12–18 months | `/faqs/` |
| All four patient testimonials, verbatim with initials | homepage / `/reviews/` |

**Deliberately left off the page:** any star rating or review count. The site publishes testimonials
but no verified aggregate rating, and inventing one would be both false and a Google Ads misrepresentation
risk. Individual review cards show 5 stars because each quoted review is a 5-star review; there is no
site-wide "4.9 from 87 reviews" claim anywhere. **If the practice's real Google rating and count are
confirmed, add them under the H1 — that is the single highest-leverage addition to this page.**

---

## 5b. Bugs caught by auditing the built page

Worth recording, because each was invisible to inspection and only showed up when the page was
measured in a real browser.

| Bug | Why it happened |
|---|---|
| **4 contrast failures** — `.pin .lede` at **2.50:1**, `.final .lede`, `.final__meta` and `.offer--star p` at 3.6–3.8:1 | Earlier passes verified colour *tokens I had chosen*, not colours *as composed on the page*. `.pin` never set a `.lede` colour, so dark-grey body text inherited onto a near-black band. Fixed to 4.85–10.40:1. |
| **Heading levels skipped** (H2 → H4 in offer, benefit and tech cards) | Card titles were `<h4>` for their visual size while the section heading was `<h2>`. Converted to `<h3>` with CSS preserving the original look. |
| **Invalid ARIA** — `role="tablist"`/`role="tab"` on the pin rail | It is not a tabset: no tabpanels, no `aria-controls`, no arrow-key handling. The rail is navigation, so the roles were dropped in favour of `aria-current="step"`. |
| **20px-tall touch targets** on the address and phone links | They sit on their own lines inside `<address>`, so the WCAG inline-link exemption doesn't apply. Given vertical padding to clear 44px. |

---

## 6. Issues found on the live site while researching

Worth fixing regardless of this landing page.

1. **Wrong phone number in the homepage schema.** The `Dentist` JSON-LD publishes
   `+1-815-597-5330`, while every visible element on the site says **(815) 660-5880**. Search
   engines and AI assistants read the schema. This is a live lead leak.
2. **Wrong hours in the same schema.** It declares `Mon–Sat 08:00–17:00` and `Sun 09:00–17:00`.
   The real hours are Mon 8–5, Thu 8–8, Sat 8–2, and closed Tue/Wed/Fri/Sun. Patients are being
   shown a Sunday opening that doesn't exist.
3. **Expired coupons still displayed.** Every offer on `/specials/` reads *"Expires on 06/02/2026"* —
   over two months ago. Either refresh the dates or drop them.
4. **`/lp/` is an empty published page** in the XML sitemap with no content. It should be
   `noindex` or hold this landing page.
5. **Closed Friday, open Saturday** is an unusual pattern and is stated correctly everywhere —
   just confirm it's still accurate before this page runs traffic, since the whole
   "hours that fit real life" angle rests on it.

Items 1 and 2 are the urgent ones.

---

## 7. What would push this from strong to unbeatable

1. **Verified Google rating + review count** under the H1 (see §5).
2. **A real photo of the office exterior** in the location section — "near me" traffic converts on
   recognising the building. Photos exist on `/office-tour/`.
3. **Call tracking number** with a dynamic-number-insertion snippet, so call conversions attribute
   to keyword, not just to the campaign.
4. **A second variant** for the emergency ad group — same shell, hero swapped to pain-first
   messaging and the $79 exam promoted to the primary offer. The `?kw=emergency` headline is
   already wired for this.
