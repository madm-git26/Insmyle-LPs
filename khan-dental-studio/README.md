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
| 1 | **Urgent strip** with tappable number and a live *Open now / Next open* status (Central Time) | Emergency intent converts on the phone; showing real-time hours avoids wasted calls and builds trust |
| 2 | **Sticky header** — hours, address, call + request buttons | CTA never more than one tap away |
| 3 | **Hero** — H1 "Emergency Dentist in Mansfield, TX", same-day promise, call-first CTA, 4 trust checks, Dr. Khan photo, after-hours triage card | Keyword-to-headline relevance, message match with ad copy |
| 4 | **Trust ticker** — the site's own trust points | Reinforces USPs without adding scroll depth |
| 5 | **Open when other offices are closed** — full weekly hours, "call before 2 pm" rule | Honest hours (Fri/Sat/Sun only) stated plainly; sets expectations |
| 6 | **8 emergencies we see the same day** | Visitor confirms their problem is treatable here |
| 7 | **What to do in the next five minutes** + ER safety note | Genuinely useful original content = Landing Page Experience; the ER note is a trust signal |
| 8 | **How your visit runs** (4 steps, verbatim from the site) | Transparency: written price before treatment |
| 9 | **Why Khan Dental Studio** (6 USPs) | Differentiation: same-day slots, weekend hours, one-visit tech, gentle, clear numbers |
| 10 | **Same-day technology** | Proof that a broken tooth can be fixed in one visit |
| 11 | **Dr. Omair Khan, DMD** + 3 named team members | Credentials, languages, accountability |
| 12 | **Reviews** — 186 reviews / 96% recommend / 12+ years / 6,000+ patients, 6 verbatim reviews, link to Google profile | Social proof; emergency-relevant review first (Daniel W., Friday-evening crown) |
| 13 | **Cost & insurance** — 9 in-network plans, 6 more accepted, 4 ways to pay, membership plan, free second opinion | Removes the #1 objection for emergency visitors |
| 14 | **Location** — address, hours, parking, areas served, embedded map, directions | "Near me" intent and local relevance |
| 15 | **FAQ** (10) — includes the honest "what if it happens Monday–Thursday" answer | Answers the searcher's next question on-page |
| 16 | **Final CTA + request form** (call-first messaging) | Second conversion path for people who cannot call |
| 17 | **Mobile sticky bar** — Call now / Request slot | Thumb-reach CTA on every phone screen |
| — | JSON-LD `Dentist` + `FAQPage`, Open Graph tags | Structured data for the Ads landing page crawler |

Every factual claim is traced in [`VERIFIED-FACTS.md`](VERIFIED-FACTS.md).

## Design

Matches the main site exactly: navy `#000342`, gold `#f6b756` / `#d9973a`, soft grey
`#f4f4f5`, DM Sans (400–700), 36px / 20px / 14px radii, pill buttons, the site's own
tooth favicon as the logo mark. Photos are loaded from `khandentalstudio.com/assets/img/`
(Dr. Khan hero, Dr. Khan portrait, 3D scan on tablet).

## Verified before delivery

| Check | Result |
|---|---|
| Rendered in headless Chromium at 390 / 768 / 1440 px | 0 px horizontal overflow at all widths |
| JavaScript console errors | none |
| JSON-LD | parses; `Dentist` + `FAQPage` |
| Tag balance (div / section / ul / li / a / form / details …) | all balanced |
| Click-to-call links | 14 · request-form anchors: 8 |
| Word count | ~2,800 |
| Live open/closed status | verified for closed day (shows "Next open Friday at 12 pm") |

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
