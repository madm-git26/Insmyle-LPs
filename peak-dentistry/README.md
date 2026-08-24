# Peak Dentistry — Google Ads Landing Page

**File:** [`dentist-lockport-lp.html`](dentist-lockport-lp.html) — one self-contained page, no build step.
**Ad groups:** `dentist lockport` · `dentist near me`
**Client:** Peak Dentistry, 16347 W. 159th Street, Lockport, IL 60441 · (815) 660-5880

---

## 1. Page structure and why each block is there

| # | Section | Job it does for a high-intent local search |
|---|---------|--------------------------------------------|
| 1 | Sticky header — logo, phone, Book Now | Phone visible at every scroll depth. **No site navigation** — an ads LP should have no exit paths. |
| 2 | Urgency ribbon | Answers the unspoken "are they even open when I can go?" above the fold. |
| 3 | Hero + lead form side by side | H1 carries the exact keyword; the form is above the fold on desktop, and one tap away on mobile. |
| 4 | New-patient offers ($99 / $79 / free consults) | The single strongest reason to pick this practice over the other 30 in a 10-mile radius. |
| 5 | Services grid | Covers the long tail that also matches these two ad groups (implants, aligners, emergency). |
| 6 | Why-us (dark band) | Differentiators, not adjectives: CEREC, in-house specialty, comfort menu, extended hours. |
| 7 | Dr. Djordjevic | Named, credentialed human being. E-E-A-T and trust in one block. |
| 8 | Reviews | Four real patient quotes pulled from the live site. |
| 9 | Insurance & financing | Removes the #1 objection before the click-to-call. |
| 10 | Location, hours table, embedded map | This is the "near me" payload — proximity, parking, landmarks, today's hours highlighted. |
| 11 | FAQ accordion | Pre-call objection handling + FAQPage schema. |
| 12 | Final CTA + footer | Last conversion window, plus the policy links Google Ads expects. |
| 13 | Sticky mobile call/book bar | Appears once the hero scrolls away. Most of this traffic is mobile. |

**Keyword coverage** — `dentist lockport` lives in the title, H1, H2 ("A dentist near you in Lockport"),
schema and the address block. `dentist near me` is served by proximity signals rather than
keyword stuffing: landmarks (Crumbl Cookie, Noodles & Co), free parking, an embedded map,
areaServed for Lockport / Homer Glen / Lemont, and the FAQ "Is Peak Dentistry convenient from
Homer Glen or Lemont?"

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
| WCAG AA contrast, all 21 colour pairs | **Pass** — body text 16.9:1, gold CTA 5.6:1, dark-band body 8.2:1. Star icons darkened from `#E0A21C` (2.24:1) to `#A56C05` (4.42:1) to clear the 3:1 non-text minimum. |
| Touch targets | All CTAs ≥ 54px, header/footer links ≥ 44px, form inputs 52px |
| Heading order | Single `<h1>`, no skipped levels |
| Labels / ARIA | 6 visible labels bound by `for`, all `aria-controls` and `aria-describedby` resolve, no duplicate IDs |
| Form errors | `role="alert"`, validated on **blur** not keystroke, first invalid field auto-focused |
| Reduced motion | `prefers-reduced-motion` disables reveals, spinners and smooth scroll |
| CLS | Every image has explicit dimensions or `aspect-ratio`; fonts use `display=swap` |
| Layout | Mobile-first, no horizontal scroll at 320px, sticky bar respects `env(safe-area-inset-bottom)` |
| JS | No dependencies. One bug caught in review: `form.name` returns the form's *name attribute*, not the input — rewritten to `form.elements[…]`. |
| Structured data | `Dentist` + `FAQPage` JSON-LD, hours matching the real schedule |

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
