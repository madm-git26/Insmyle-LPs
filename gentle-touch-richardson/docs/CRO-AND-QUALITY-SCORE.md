# CRO and Quality Score notes

How each part of the page serves Google Ads, plus the problems found on the current live LP.

## Problems on the current live LP (`/lp/new-patient-lp/`)

These are real defects on the page that's receiving ad traffic today:

1. **The featured "MOST HELPFUL REVIEW" is negative.** It's the first review a visitor reads, and it ends:
   *"My veneer popped off again the very next day… I decided to go back to Rose Aesthetics."* It names
   a competitor. Remove it from the live page even if this new LP isn't deployed yet.
2. **Wrong doctor education blocks.** Under Dr. Chepyala, "Education" says *"**He** graduated from New
   York University…"* and lists "Certification: University of California, San Francisco". Dr. Quamar
   gets the identical block, which is wrong for him (Hamdard / NYU / Temple). This is an Opencare template carry-over.
3. **Stale rating.** "5.0 / 95+ Reviews" from Opencare doesn't match the 4.8 / 127 on Google. Ad
   viewers see the Google figure in location and seller-rating assets, so the mismatch looks inconsistent.
4. **A broken shortcode in the markup:** `href="<!-- Shortcode [request-appointment-link-lp] does not exist -->"`.
5. **No headline that matches search intent.** The H1 is the practice name. Nothing says "dentist in
   Richardson", "new patients", or "accepting new patients".
6. **Opencare marketplace framing** ("Super Practice", "Preferred Booking", "Reliable Responder") reads as a
   directory listing, not the practice's own page.

## Page structure → what each section does

| # | Section | Job | QS component |
|---|---|---|---|
| — | Top strip | Q4: year-end benefits urgency (auto, Oct–Dec only). Rest of year: "Now accepting new patients · same-day emergencies" | Relevance |
| — | Sticky header | Logo, live Google rating, **live open/closed status**, tap-to-call, Book Online. No nav links leading off the page | LP experience |
| 1 | Hero | H1 "Your *Gentle* Dentist in Richardson, TX", "Now welcoming new patients", brand tagline, 2 CTAs, proof chips, Dr. Chepyala's photo | Ad relevance + expected CTR |
| 2 | "How can we help you today?" | **Intent router:** checkup / emergency (→ call) / free consult / family. Gets visitors to commit to a choice early, and emergency traffic goes straight to the phone | Conversion |
| 3 | Insurance ribbon | The #1 new-patient objection, answered in the first scroll | Conversion |
| 4 | 01 · New-patient offers | 2 free-consult coupons, membership plan, financing | Conversion |
| 5 | 02 · First visit | 3 steps, an "included" checklist, visit length. Removes fear of the unknown | LP experience |
| 6 | 03 · Why Gentle Touch | The site's 6 USPs. Card 06 answers the GBP "pricing" theme with "cost estimate before treatment" | Trust |
| 7 | 04 · Reviews | 4.8 / 127 on Google + **GBP topic chips** + 6 verbatim reviews + 2 video testimonials | Trust |
| 8 | 05 · Doctors | 3 doctors, real photos, credentials | Trust / E-E-A-T |
| 9 | 06 · Comfort & tech | Real office photos, comfort amenities, sedation, technology | Anxiety reduction |
| 10 | 07 · Services | 12 services. Confirms it's a full general/family practice | Relevance |
| 11 | 08 · Insurance & payment | All 29 plans, membership, financing, **"no Medicaid/HMO/state plans" lead filter** | Lead quality |
| 12 | 09 · Visit us | Address, landmark, hours table with **today highlighted**, areas served, live map | Local relevance |
| 13 | 10 · FAQ | 11 new-patient questions (native `<details>`, works without JS) + FAQPage JSON-LD | LP experience |
| 14 | Final CTA | "Better oral health starts here" (the practice's own LP line) + live status | Conversion |
| — | Mobile sticky bar | **Call Now** + **Book Online**, always visible on phones | Conversion |

**CTA count:** 16 booking links, 15 tap-to-call links, 5 directions/GBP links. Every booking link includes
`book.allinone.dental`, so the site's existing global attribution script appends `source` / `gclid` / `fbclid`
automatically (verified in-browser: all 16 rewrite to `…&source=direct` on a direct visit).

## Keyword coverage (new-patient / general-dentist ad groups)

| Search theme | Where it appears |
|---|---|
| dentist richardson tx / dentist in richardson | H1, title, meta description, section 09 H2, FAQ, services H2 |
| new patient dentist / accepting new patients | Hero badge, router, offers H2, first-visit H2, FAQ 1, final CTA |
| dentist near me | Section 09 H2 "A dentist near you in Richardson, TX", address, map, areas |
| family dentist / kids dentist | Hero chips, router, services, FAQ "Do you see children?" / "whole family" |
| dental cleaning and exam / checkup | Router tile 1, first-visit checklist, services |
| ppo dentist / [carrier] dentist | Insurance ribbon, full 29-plan list, FAQ |
| emergency / same-day dentist | Hero chip and card, router (call), why card 05, services, FAQ |
| dentist plano / garland | Hero lead, section 09, areas chips, FAQ |
| gentle / anxious / sedation dentist | H1 "Gentle", comfort section, FAQ "nervous" |
| invisalign / implant consultation | Router "Free", 2 coupons, services |

## Ads-side recommendations

1. **Sitelinks can deep-link into the page** using anchors: `#gtd-offers`, `#gtd-insurance`,
   `#gtd-reviews`, `#gtd-doctors`, `#gtd-visit`, `#gtd-faq`. Sections have `scroll-margin-top`, so the sticky
   header doesn't cover them.
2. **Headlines that mirror the page:** "Gentle Dentist in Richardson, TX" · "Now Welcoming New Patients" ·
   "In-Network With 29+ PPO Plans" · "Rated 4.8 on Google" · "Free Invisalign Consultation" ·
   "Free Implant Consultation" · "Same-Day Emergency Visits".
3. **Conversion tracking:** the page pushes `dataLayer` events: `lp_call_click`, `lp_book_click`,
   `lp_directions_click`, each with `cta_location` (e.g. `hero-book`, `mobile-bar-call`) and
   `page_type: new_patient_lp`. Create GTM Custom Event triggers on these in the containers already on the
   site (`GTM-K5NBNR7`, `GTM-W9LDL3V`) and import them as Google Ads conversions. `cta_location` shows which
   CTAs actually convert.
4. **Medicaid exclusions:** the page now states it. Add negatives like `medicaid dentist`, `chip dental`,
   `free dental clinic` to keep spend clean.
5. **Q4:** the page switches to year-end benefits messaging automatically from October 1 to December 31. This
   is a good time to add a "Use Your 2026 Benefits" headline in the ads too.

## Technical verification performed

| Check | Result |
|---|---|
| Horizontal overflow | **0 px** at 390 px and 1440 px |
| Console / page errors | None |
| Failed network requests | None (12 images, fonts, map, videos all 200) |
| CLS (throttled mobile) | **0.001** after adding the main site's metric-matched fallback fonts (was 0.124 from the font swap) |
| LCP (throttled mobile, local) | ~0.9 s |
| Initial transfer | ~367 KB (videos `preload="none"`, all below-fold images `loading="lazy"`, map lazy) |
| HTML | 110 KB raw / 25 KB gzipped; tags balanced; no duplicate IDs |
| JSON-LD | `Dentist` + `FAQPage` parse; all 11 FAQ questions match the visible FAQ exactly |
| Accessibility | Skip link, landmarks, `aria-label`s on icon-only buttons, `alt` on every image, visible focus ring, `prefers-reduced-motion` respected, hours as a real `<table>` |
| No-JS fallback | Static hours text, all content visible (the reveal animation only applies after JS adds `.gtd-js`) |
