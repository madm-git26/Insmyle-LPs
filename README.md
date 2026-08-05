# In Smyle Dental — Google Ads Landing Page Enhancements

Enhanced, paste-ready versions of the two live Google Ads landing pages for
**In Smyle Dental – Lakeview & Roscoe Village** (3514 N Lincoln Ave, Chicago, IL 60657).

| # | Landing page | Ad group | Enhanced file |
|---|---|---|---|
| 1 | `/lp/new-patient-dental-cleaning-exam/` | General Dentist | [`enhanced/new-patient-dental-cleaning-exam.html`](enhanced/new-patient-dental-cleaning-exam.html) |
| 2 | `/lp/emergency-dentist-chicago/` | Emergency Dentist | [`enhanced/emergency-dentist-chicago.html`](enhanced/emergency-dentist-chicago.html) |

---

## The hard constraints — and how they were met

| Your requirement | Status |
|---|---|
| Do **not** change the CSS | ✅ **Zero** stylesheet edits. Zero `<style>` blocks added. Verified: every one of the 111 / 95 classes used already exists in each page's own stylesheet. |
| Keep the same colours, theme & fonts | ✅ Nothing touched. Still DM Sans / DM Serif Display, still `--brand-blue #04b2dd` / `--brand-orange #F87132`. New sections reuse existing section, grid and card classes so they inherit the theme automatically. |
| Keep **all** existing sections | ✅ All 11 original sections present on both pages, in the same order. Verified programmatically — every original `aria-labelledby` anchor still exists. |
| Use the **same existing links** | ✅ Only 4 link destinations across both pages, all pre-existing: the booking URL (with `referrer_id=3`), `tel:7739156530`, the Google Maps short link, and the homepage. No new destinations invented. |
| No wrong / false information | ✅ Every claim traced to a source — see [`docs/VERIFIED-FACTS.md`](docs/VERIFIED-FACTS.md). Unverifiable claims were **removed, not invented** (see "Two things to confirm" below). |

---

## How to deploy

The files in `enhanced/` are **complete standalone HTML pages** — open one in any
browser and it renders as the full, styled landing page (the site's own stylesheet is
embedded verbatim, unmodified).

**For the live WordPress site** (Cornerstone / Pro theme), the deployable content block
is clearly marked inside each file:

1. Open the enhanced file and copy everything between
   `<!-- CORNERSTONE BLOCK START -->` and `<!-- CORNERSTONE BLOCK END -->`.
2. Edit the page in Cornerstone and select the raw-HTML / Text element that currently
   holds the page markup — the one inside `<div class="x-div e6446-e1 m4z2-0">`
   (page 1) or `<div class="x-div e6449-e1 m4z5-0">` (page 2).
3. Replace its **entire contents** with the copied block.
   Do **not** paste the outer `cs-content` / `x-div` wrappers — those stay as they are.
4. Save and purge the CDN / page cache.

Nothing else needs changing: no CSS panel edits, no new media uploads, no plugin changes.

> The existing inline JS is untouched and keeps working. The FAQ accordion binds
> generically to `.faq-q` (page 1) / `.faq-btn` (page 2), so all new FAQ items open
> and close with no extra code. The scroll-reveal `IntersectionObserver` binds to
> `.usp-card`, `.cond-card`, `.review-card` etc., so new cards animate too. The
> GCLID/traffic-source script rewrites every `a[href*="book.allinone.dental"]`,
> so all new booking CTAs inherit Google Ads attribution automatically.

---

## What changed, in numbers

| Metric | LP1 before → after | LP2 before → after |
|---|---|---|
| Sections | 11 → **15** | 11 → **15** |
| Word count | ~1,870 → **~3,640** | ~1,471 → **~3,000** |
| `<h2>` / `<h3>` | 10 / 15 → **14 / 36** | 10 / 12 → **14 / 15** |
| FAQ entries | 6 → **14** | 5 → **13** |
| Booking CTAs | 9 → **15** | 8 → **14** |
| Click-to-call CTAs | 8 → **21** | 6 → **25** |
| "Get Directions" links | 1 → **4** | 0 → **4** |
| Structured data | none | none → **Dentist + FAQPage JSON-LD** |
| Mobile horizontal overflow | 0 px | **210 px → 0 px** (fixed) |

Full detail: [`docs/CHANGELOG.md`](docs/CHANGELOG.md)

---

## New sections added

**Landing Page 1 — General Dentist**
1. **"Searching for a *Dentist Near Me*? You're in the Right Place."** — the quick-react
   block directly under the hero. Confirms keyword intent within the first scroll and
   gives three ways to act (book online / call & text / visit), each with its own CTA.
2. **"Complete Dental Care Under One Roof"** — all 15 services. Proves this is a
   full general practice, which is what a "dentist in Chicago" searcher wants.
3. **"A Dentist Near You — Serving Lakeview, Roscoe Village & Chicago's North Side"** —
   15 neighbourhoods + 7 ZIP codes for the "near me" / "near my area" queries.

**Landing Page 2 — Emergency Dentist**
1. **Urgent alert strip** at the very top — a tappable emergency number above the fold
   on every device. Uses the `.alert-strip` style that already existed in the
   stylesheet but was never used on the page.
2. **"In Dental Pain? Here's Exactly What to Do in the Next 5 Minutes"** — seven
   first-aid steps. The single highest-value block for emergency traffic: genuinely
   useful, original content, which is exactly what Landing Page Experience rewards.
3. **"Looking for a Walk-In Dentist or Urgent Care Dental Clinic Near You?"** — the
   page previously answered neither "walk-in dentist Chicago" nor "urgent care dental
   clinic near me" anywhere. Includes an honest ER-vs-dentist safety note.
4. **"Urgent Dental Care We Provide In-House"** — 12 emergency treatments, so the
   visitor can see their specific problem is fixable here today.
5. **"An Emergency Dentist Near You on Chicago's North Side"** — neighbourhood and
   ZIP coverage for "emergency dentist near me".

---

## Bugs found in the live pages and fixed

These were real defects in the current live pages:

1. **LP2 — the mobile "Call Now" button did not call anyone.** The floating mobile bar's
   `Call Now` pointed at the *booking* URL, not `tel:`. On an emergency landing page this
   is the most damaging possible bug. Fixed.
2. **LP2 — the mobile "Book Now" button dropped attribution.** It used
   `book.allinone.dental/in-smyle-dental` without `?referrer_id=3`. Fixed.
3. **LP2 — 210 px of horizontal overflow on mobile.** The Google Map `<iframe>` was
   hard-coded to `width="600"`, forcing the whole page to scroll sideways on every
   phone. Measured in a real browser at 390 px: `scrollWidth 600` vs `clientWidth 390`.
   Fixed with inline attributes only — now 0 px at 390 / 768 / 1440 px. **This alone is
   a meaningful Landing Page Experience gain**, since mobile usability is a direct input.
   (LP1 had the same iframe; also fixed.)
4. **LP2 — unrendered shortcodes in doctor image alt text.** Three images had
   `alt="[sc name="doctor-name-1"][/sc] DDS – ..."`, which also produced invalid HTML
   from the nested quotes. Replaced with the real doctor names.
5. **LP2 — the header logo was not a link.** `<a aria-label="In Smyle Dental Home">`
   had no `href`. Fixed.
6. **LP1 — invalid stray attribute.** `<a href='tel:...' ttar class="btn-call">`. Removed.
7. **LP1 — wrong review avatar initials.** "Jen P." showed **C**, "Julia R." showed **S**,
   "Karl M." showed **V**. Corrected to J / J / K, and "karl" capitalised.
8. **LP1 — `og:url` pointed at the homepage** instead of the landing page. Fixed on both.
9. **Map iframes had no `title`** — an accessibility failure. Added on both.

---

## Reviews and the map are dynamic (already, and still)

Worth knowing, because it changes nothing you need to do:

- **Reviews are already live.** Both pages embed the **EmbedSocial** widget
  (`data-ref="8110babf…"`, and `66074ade…` on LP1) which pulls your Google reviews
  automatically. Nothing hardcoded needs updating. I kept these widgets and added a
  line of copy telling visitors the reviews are live from your Google Business Profile.
  The static review cards are retained alongside them so crawlers see review text even
  before the widget's JavaScript runs.
- **The map is already your real Google Business Profile.** The embed's CID is
  `0xe42df9181f5fbe5a` = **16442071696600448602** — an exact match for the GBP link you
  supplied. It was already correct; I only made it responsive and gave it a title.

---

## Two things to confirm before you publish

Neither blocks deployment, but both are your call:

1. **The "755+ reviews" claim was removed.** The original pages said *"Join 755+ Happy
   Patients"*, and a commented-out block asserted *4.9 / 755 reviews*. I could not
   verify that count from any source I could reach (third-party directories showed very
   different numbers — 46 on Yelp, 669 on PatientConnect365 — and the Google Maps CID
   page would not render for scraping). Because you asked for no false information, the
   new copy reads **"Join Our Happy Chicago Patients"** and lets the live EmbedSocial
   widget display the real rating and count. **If you confirm the current Google figure,
   put it back** — a specific verified number converts better than a vague phrase.
2. **A "Best of 2026 Award Winner" badge was *not* added.** A crawl of the homepage
   surfaced that phrase, but I could not confirm the awarding body, so I left it out
   rather than publish an unverifiable award. If you can name the award and year, it is
   a strong trust element worth adding to LP1.

Also flagged: no parking or CTA-transit claims were added, because I could not verify
them. If you confirm details (nearest Brown Line stop, street/lot parking), that is
high-value content for "dentist near me" intent — say the word and I'll add it.

Finally, note the landing pages use the call-tracking number **(773) 915-6530**, while
the main site's schema uses **(773) 929-4140** and its homepage shows **(773) 915-6270**.
I kept the landing pages' existing tracking number everywhere, exactly as instructed.

---

## Repository layout

```
enhanced/    ← PASTE THESE. Enhanced, paste-ready Cornerstone blocks.
original/    ← Pristine snapshots of the live pages (full page + extracted block),
               captured before any edits, so you can diff or roll back.
docs/
  CHANGELOG.md        Section-by-section record of every change
  KEYWORD-MAP.md      Each ad keyword → exactly where it now appears on the page
  QUALITY-SCORE.md    How each change maps to Google's Quality Score components
  VERIFIED-FACTS.md   Source for every factual claim on both pages
  *.css               Reference copies of each page's stylesheet (NOT modified —
                      extracted only so class availability could be verified)
```
