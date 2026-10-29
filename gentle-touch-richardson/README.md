# Gentle Touch Dentistry Richardson: New Patient Google Ads Landing Page

A new, conversion-focused landing page built for Google Ads traffic, replacing the current Opencare-style page at
**`https://dentistrichardsontx.org/lp/new-patient-lp/`**.

**Practice:** Gentle Touch Dentistry Richardson · 1750 Alma Rd #110, Richardson, TX 75081 · Dr. Anuritha Chepyala
**Google:** 4.8 ★ · 127 reviews (checked 2026-10-29)

| File | What it is |
|---|---|
| [`new-patient-lp.html`](new-patient-lp.html) | **The landing page.** A complete standalone HTML file: open it in a browser to preview. The paste-ready block for WordPress is marked inside. |
| [`docs/VERIFIED-FACTS.md`](docs/VERIFIED-FACTS.md) | The source for every claim, and what was left out because it couldn't be verified |
| [`docs/CRO-AND-QUALITY-SCORE.md`](docs/CRO-AND-QUALITY-SCORE.md) | Section-by-section CRO / Quality Score rationale, keyword coverage, tracking, tech checks, and **defects on the current live LP** |
| `original/new-patient-lp.full-page.html` | Snapshot of the current live LP, taken before any change, for diffing or rollback |
| `screenshots/` | Desktop (1440 px) and mobile (390 px) renders: above the fold and full page |

---

## Brand fidelity: taken from mygentletouchdentistry.com, nothing invented

- **Colours:** the site's own tokens: ink `#132a4a`, brand `#1f4e8c`, sky `#5bb8e8`, gold `#e7b567`,
  ivory `#fbfaf7`, linen `#f2eee7`, mist `#eaf4fb`, slate `#56636f`.
- **Type:** Plus Jakarta Sans (headings), Figtree (body), Fraunces italic (accent words), the site's exact trio.
- **Signature details:** the sky "smile" swoosh under an accent word, the highlighter band behind "Richardson, TX",
  numbered eyebrows (`01 · …`), pill buttons, gold stars, Lucide-style line icons.
- **Voice:** warm, plain-language, unhurried ("We listen first… and never rush you"), plus the practice's tagline
  *"We practice dentistry from the heart!"*
- **Photos:** only the practice's real office, doctor and patient photos and its two video testimonials. No stock imagery.

## How to deploy (WordPress / Cornerstone, Pro theme)

The LP site runs the same Pro/Cornerstone stack as before.

1. Open `new-patient-lp.html` and copy everything between
   `<!-- GTD LP BLOCK START -->` and `<!-- GTD LP BLOCK END -->`.
2. Edit `/lp/new-patient-lp/` in Cornerstone. Remove the existing sections, add **one Raw Content element**
   in a full-width section with no padding, and paste the block into it.
3. Keep the page on its current blank / no-header template (the block has its own header, footer and
   mobile call bar).
4. Save, then purge the page / CDN cache.

**Don't paste the `<head>` attribution script.** It's already global on the live site, and it's only in
the standalone file so the preview behaves like production. Every booking link contains
`book.allinone.dental`, so that script tags them with `source` / `gclid` / `fbclid` automatically.

Everything is scoped under `.gtd`, so it can't restyle the theme, and the theme's own styles are neutralised
inside it. No plugins, no build step, no external JS libraries.

**Optional speed step:** images and videos are served from `mygentletouchdentistry.com/images/…`. If you
upload them to the LP site's media library and swap the URLs, you save one DNS/TLS connection.

## What updates itself (vanilla JS, ~2 KB)

- **Live open/closed status** in Richardson time (America/Chicago): "Open now · until 4 pm", "Opens today at
  10 am", "Closed now · Opens Wed at 10 am · Book online anytime". Shown in the header, the router card and the
  final CTA, and today's row is highlighted in the hours table.
- **October–December:** the top strip and the insurance section switch to "unused benefits don't roll over"
  messaging, using the current year. It switches off automatically on January 1.
- **Conversion events** pushed to `dataLayer`: `lp_call_click`, `lp_book_click`, `lp_directions_click`, each with
  `cta_location`. See the CRO doc for the GTM setup.

## What to update by hand

- **Google rating / review count:** search for `4.8` and `127` (header, hero chip, hero card, reviews block,
  meta description).
- **Offers:** the two free-consultation coupons use the current LP's exact terms ("New patients only. Must present
  coupon. Limited time offer."). Remove those cards when the offers end.

## Please confirm before publishing

1. **Practice name.** The brief said "Khan Dental Studio", but every source (website, GBP, current LP, office
   signage) says Gentle Touch Dentistry Richardson, and no "Khan Dental Studio" listing exists anywhere.
   **Built as Gentle Touch Dentistry Richardson, as you confirmed.**
2. **The free Invisalign and Implant/Full-Arch consultations** come from the current LP. The website separately
   confirms the free implant consult. Make sure both are still running, and decide how an online visitor
   "presents the coupon" (e.g. by mentioning it when they book).
3. **"We do not accept Medicaid, HMO or state insurance plans"** comes from the practice's own benefits LP. It
   filters out unqualified clicks, but confirm it's still the policy.
4. **Phone numbers.** The page uses the LP's tracking number **(469) 336-3069** for every call CTA. The website and
   GBP use (469) 947-3963, which is kept in the JSON-LD only.
5. **The main website still says "5.0 from 107 reviews"**, but Google shows 4.8 from 127. Worth updating the
   site too.
6. **Fix the live LP now, even before this goes up:** its featured "Most Helpful Review" is a *negative* review
   that names a competitor. Details are in the CRO doc.
7. **Not added because they only appear in the stale Opencare block:** Spanish spoken, free parking, free Uber
   rides, massage chair, laser dentistry and similar extras. Confirm any of them (free parking and Spanish
   especially) and they can be added in minutes.
8. **No community-involvement or award content** exists on the website, so none was added.
