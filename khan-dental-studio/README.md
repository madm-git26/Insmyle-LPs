# Khan Dental Studio — Emergency Dentist Google Ads landing page

**Practice:** Khan Dental Studio · Dr. Omair Khan, DMD · 725 U.S. 287 Frontage Rd, Suite 507, Mansfield, TX 76063 · (817) 839-7412
**Service page it mirrors:** https://www.khandentalstudio.com/services/emergency-dentistry
**File:** [`emergency-dentist-mansfield.html`](emergency-dentist-mansfield.html) — a single, self-contained HTML page (inline CSS + JS, no frameworks, no build step).

This is a paid-traffic landing page, not an SEO page: it is `noindex, nofollow`, has no
site navigation, and every section ends in a call or request action.

---

## What is on the page, and why

| # | Section | Conversion / Quality Score purpose |
|---|---|---|
| 1 | **Sticky header** — hours, address, request + call buttons | CTA never more than one tap away |
| 2 | **Dark hero** — H1 "Emergency Dentist in Mansfield, TX", one gold call button, four trust points, Dr. Khan chip, and the **request form** (3 required fields) | Keyword-to-headline relevance; both conversion paths above the fold on desktop |
| 3 | **Stats strip** — 12+ years, 6,000+ patients, 186 reviews / 96% recommend, same-day slots | Instant credibility |
| 4 | **What we fix the same day** — 8 icon tiles | Visitor confirms their problem is treatable today |
| 5 | **How it works** — 4 numbered steps | Transparency: written price before treatment |
| 6 | **Dr. Omair Khan** — treatment photo, his own quote, credential chips, 3 named team members | Accountability and trust |
| 7 | **Same-day technology** — navy band, 3D-scan photo with "~2 hrs" badge, 4 feature cards | Proof a broken tooth can be fixed in one visit |
| 8 | **Reviews** — star pills + 3 verbatim reviews + link to Google profile | Social proof, emergency-relevant review first |
| 9 | **Insurance** — "In-network with most major carriers" grid of 15 carrier cards (mirrors the main site), plus estimate / financing / pay-in-full / second opinion row | Removes the #1 objection |
| 10 | **Location** — address, hours, parking, areas served, map, directions | "Near me" intent and local relevance |
| 11 | **FAQ** (5) | Answers the next question without a long scroll |
| 12 | **Final CTA** — big phone number, call + request buttons | Last-chance conversion |
| 13 | **Mobile sticky bar** — Call now / Request slot | Thumb-reach CTA on every phone screen |
| — | JSON-LD `Dentist` + `FAQPage`, Open Graph tags | Structured data for the Ads landing page crawler |

Every factual claim is traced in [`VERIFIED-FACTS.md`](VERIFIED-FACTS.md).

## Design

Matches the main site exactly: navy `#000342`, gold `#f6b756` / `#d9973a`, soft grey
`#f4f4f5`, DM Sans (400–700), 36px / 20px / 14px radii, pill buttons, the site's own
tooth favicon as the logo mark. Photos are loaded from `khandentalstudio.com/assets/img/`
(Dr. Khan portrait, 3D scan on tablet).

## Verified before delivery

| Check | Result |
|---|---|
| Rendered in headless Chromium at 390 / 768 / 1440 px | 0 px horizontal overflow at all widths |
| JavaScript console errors | none |
| JSON-LD | parses; `Dentist` + `FAQPage` |
| Tag balance (div / section / ul / li / a / form / details …) | all balanced |
| Click-to-call links | 11 · request-form anchors: 6 |
| Word count | ~1,450 |

## Before you go live — 4 things to do

1. **Google Tag Manager.** Paste the site's GTM snippet where the comment in `<head>`
   says. Buttons already push `lp_call_click`, `lp_form_submit` and `lp_directions_click`
   to `dataLayer`; map those to Google Ads conversions.
2. **Form endpoint.** Set `FORM_ENDPOINT` at the top of the inline script to your form
   handler / CRM webhook (JSON POST). Until it is set, the form opens a pre-filled email
   to reception@khandentalstudio.com so no lead is lost. The main site's own forms are
   demo forms that do not transmit, so this page does not rely on them. `gclid` and UTM
   parameters are captured and included in the submission.
3. **Google rating.** I could not read the Google Business Profile from this environment
   (see VERIFIED-FACTS). The reviews block shows the site's own 186 reviews / 96%
   figures and links to the profile. Add the live star rating and Google review count to
   the `.rev-stats` block once confirmed — a specific verified rating converts better.
4. **Call tracking.** If you use a tracking number for Ads, replace every
   `tel:+18178397412` and the displayed `(817) 839-7412` (a single find-and-replace).

## Campaign notes specific to this practice

- **The office is closed Monday–Thursday.** Emergency searchers on those days can only
  reach after-hours phone triage. Recommend an ad schedule weighted to Friday–Sunday
  (with Thursday evening for "tomorrow" intent), and ad copy that says
  "Open Fri evenings & weekends" rather than "open now".
- The page's "call before 2 pm" rule comes straight from the site; keep ad copy
  consistent with it.
- No walk-in, 24/7, extraction or sedation claims should be added to ad copy — none
  appear on the site.
