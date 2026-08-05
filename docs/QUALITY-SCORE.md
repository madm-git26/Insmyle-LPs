# Quality Score — what these changes can and cannot do

You asked for 8/10–10/10 on every keyword. Worth being straight about the mechanics
before the checklist, because it changes what you should expect and when.

## Quality Score has three components; a landing page drives one and a half

| Component | Weight in practice | Controlled by |
|---|---|---|
| **Expected CTR** | Largest single factor | Ad copy, extensions, historical CTR on the keyword. **A landing page cannot change this directly.** |
| **Ad Relevance** | Medium | How closely the *ad text* matches the keyword. Landing page copy influences this only indirectly. |
| **Landing Page Experience** | Medium | **This is what these edits control**, and it's where both pages had real, fixable problems. |

So: these changes should move Landing Page Experience from *"Average"* or
*"Below average"* to **"Above average"** on the keywords listed, which typically lifts
Quality Score by **1–3 points**. Getting to a consistent 8–10 across every keyword will
also need ad-group and ad-copy work — noted at the bottom. Scores also don't update
instantly; Google needs impression volume on the new page before the diagnostic columns
in `Keywords → Status` refresh, usually a couple of weeks at reasonable spend.

---

## Landing Page Experience — the actual checklist

### 1. Relevant, original, useful content

| Before | After |
|---|---|
| **LP1's H1 contained none of its five keywords.** The ad group bid on "dentist in chicago" / "best dentist near me"; the page was headlined "Your First Dental Cleaning & Exam". | H1 leads with "Dentist in Chicago". Every keyword now appears in headings and body copy — see [KEYWORD-MAP.md](KEYWORD-MAP.md). |
| **LP2 answered neither "walk-in dentist Chicago" nor "urgent care dental clinic near me" anywhere** — you were paying for those clicks against a page with no matching content. | Dedicated section with its own H2, a USP card, a trust-list item and an FAQ. |
| LP1 ~1,870 words / LP2 ~1,471 | ~3,640 / ~3,000 — all of it specific to the practice, none of it filler. |
| Single service described (a cleaning) | 15 services (LP1) and 12 emergency treatments (LP2) — matching the breadth a "dentist in Chicago" searcher expects. |
| 6 / 5 FAQs | 14 / 13, each aligned to a real query. |
| No structured data | `Dentist` + `FAQPage` JSON-LD with address, geo, hours, `areaServed`, services, named doctors and a `ReserveAction`. |

### 2. Transparency and trustworthiness

Google explicitly weighs how openly a page explains who you are and what happens next.

- Full 15-plan insurance list, with in-network vs accepted stated **precisely** rather than blurred.
- Costs handled honestly: no invented prices, but the *process* is explained (benefits verified in advance, membership plan, Cherry terms) and every cost FAQ ends in a phone number.
- Three doctors named with verifiable credentials; MICOI and FAGD spelled out.
- Published hours appear twice per page and in schema — including **"Closed Friday and Sunday"**. Stating the closures builds more trust than hiding them, and it prevents the "open 24/7" claim that would have been false.
- LP2's ER safety note tells visitors when *not* to come to you. That is a genuine trust signal, and it reduces liability rather than creating it.
- Unverifiable claims removed rather than kept — see [VERIFIED-FACTS.md](VERIFIED-FACTS.md).

### 3. Ease of navigation — and not making people hunt for the CTA

| | LP1 | LP2 |
|---|---|---|
| Booking CTAs | 9 → **15** | 8 → **14** |
| Click-to-call CTAs | 8 → **21** | 6 → **25** |
| Directions links | 1 → **4** | 0 → **4** |

Every new section ends in a CTA pair, so no visitor is ever more than one screen from an
action. On LP2 the **call** button is now the primary everywhere — for someone in pain,
a phone call converts far better than a booking form, and that ordering was previously
inverted in the hero and final CTA.

Three critical CTA defects were also repaired:

1. **LP2's mobile "Call Now" button called nobody** — it pointed at the booking URL.
   On an emergency page this was almost certainly costing you conversions every day.
2. **LP2's mobile "Book Now" was missing `?referrer_id=3`**, so those bookings weren't
   being attributed.
3. **LP2's location panel had no tappable phone number** — it showed hours and an address
   as plain text.

### 4. Mobile usability

This was the most concrete, measurable defect on the site.

**LP2's Google Map `<iframe>` was hard-coded to `width="600"`.** Measured in Chromium at a
390 px viewport: `scrollWidth 600` vs `clientWidth 390` — **210 px of horizontal overflow,
so the entire page scrolled sideways on every phone.** LP1 had the same iframe.

Verified after the fix, in a real browser, both pages:

| Viewport | LP1 | LP2 |
|---|---|---|
| 390 px | **0 px overflow** | **0 px overflow** (was 210 px) |
| 768 px | **0 px** | **0 px** |
| 1440 px | **0 px** | **0 px** |

Fixed with inline attributes on the iframe only — no stylesheet change. One further
mobile overflow (9 px, introduced by a new button row on LP2) was caught during testing
and fixed with an inline `min-width:0`.

Also: the map now has a `title` attribute, all new images use `loading="lazy"`, and no
render-blocking resources were added — JSON-LD is inert and the pages gained no new
scripts, fonts or stylesheets.

---

## What these edits will *not* fix

To reach 8–10 consistently across every keyword, the remaining levers are outside the
landing page:

1. **Split the ad groups.** LP1's five keywords span two different intents — brand-choice
   ("best dentist chicago") and proximity ("dentist near my area"). One ad group serving
   both means Ad Relevance is compromised for at least one. Splitting them, with ad copy
   echoing each keyword, is the single biggest remaining gain.
2. **Get the keyword into the ad headline.** Ad Relevance is scored on ad text, not page
   text. Headline 1 should contain the keyword for each group.
3. **`dentist near me` / `emergency dentist near me` are location-intent queries.** Ensure
   location extensions are enabled and the Google Business Profile is linked to the Ads
   account — that affects both CTR and relevance in ways no page edit can.
4. **`urgent dental care` is broad.** It pulls informational searchers who won't convert
   and will drag Expected CTR down. Consider tighter match types or a negative list.
5. **Expected CTR needs impression history.** Even a perfect page won't lift a keyword
   with a poor historical CTR overnight.

## After you publish

1. Purge the CDN and page cache, then re-crawl both URLs.
2. Test the JSON-LD in Google's Rich Results Test — both `Dentist` and `FAQPage` should validate.
3. **Confirm the mobile fix on a real phone** — LP2 should no longer scroll sideways.
4. **Tap the mobile "Call Now" button on LP2** and confirm it now dials.
5. In Google Ads, add the **Landing page experience**, **Ad relevance** and **Expected CTR**
   columns to your keyword view, note today's values, and check again in ~2 weeks.
6. Confirm the two open items in [VERIFIED-FACTS.md](VERIFIED-FACTS.md) — the review count
   and the "Best of 2026" award. Both are strong trust content once verified.
