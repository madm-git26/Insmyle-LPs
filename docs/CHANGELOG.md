# Changelog — section by section

`KEPT` = unchanged from live · `COPY` = wording enhanced, structure identical ·
`EXPANDED` = existing section grew · `NEW` = section added · `FIX` = defect repaired

---

## Landing Page 1 — `/lp/new-patient-dental-cleaning-exam/`

| # | Section | Status | Detail |
|---|---|---|---|
| 1 | `sat-bar` "Evening Hour Appointments" | KEPT | — |
| 2 | Sticky top bar | KEPT | Logo `alt` now names the keyword |
| 3 | `sat-bar` "Open on Saturdays" | KEPT | — |
| 4 | **Hero** | COPY + EXPANDED | H1 leads with "Dentist in Chicago" (same `<span>`/`<em>` hooks); badge → "Now Welcoming New Patients · Dentist in Chicago, IL"; sub-headline addresses the "dentist near me" search while keeping "Walk in as a stranger, leave as part of the In Smyle family"; trust items 4 → 6; trust card items 4 → 6 |
| 5 | **"Searching for a *Dentist Near Me*?"** | **NEW** | Quick-react block under the hero. Three `usp-card`s — Book Online in 60 Seconds / Call or Text / Visit Us on N Lincoln Ave — each with its own CTA |
| 6 | Offers banner | EXPANDED | 1 → **4** offer cards (Free Consultation · Free Cleanings, Exams & X-Rays · 15% Off Other Treatments · Evening & Saturday Visits). Second CTA added. The `offers-grid` was already `auto-fit minmax(220px,1fr)` — built for multiple cards but only ever had one |
| 7 | Cleaning & Exam | KEPT + CTA | Content untouched; click-to-call CTA added alongside the booking button |
| 8 | Why Choose Us (9 cards) | KEPT | — |
| 9 | **Complete Dental Care Under One Roof** | **NEW** | 15 service cards + dual CTA |
| 10 | Your First Visit (4 steps) | KEPT + EXPANDED | 4 steps untouched; **"What to Bring to Your First Appointment"** checklist added |
| 11 | Gallery strip | KEPT | — |
| 12 | Meet the Doctors | COPY | Intro opens "Three dentists, one Chicago location."; ADA membership added to Dr. Mariscal; `alt` text names the keyword |
| 13 | **"What to Look For in the Best Dentist Near You"** | **NEW** | Nine checkable credibility points — credentials, three doctors, in-office milling, full scope, conservative recommendations, upfront pricing, hours, sterilisation, live reviews |
| 14 | Payment & Insurance | EXPANDED | Insurance pills 3 → **15** (the full published list); one bullet added per card; section CTAs added |
| 15 | Patient Reviews | FIX + COPY | EmbedSocial widget kept; `google-badge` enabled on each card (style existed, was commented out); `author-label` enabled; **avatar initials corrected** (C/S/V → J/J/K); "karl" → "Karl"; "755+" claim removed pending verification |
| 16 | **Areas Served** | **NEW** | 15 neighbourhood `ins-pill`s + 7 ZIP codes + Directions/Book CTAs |
| 17 | Office Info & Location | KEPT | — |
| 18 | FAQ | EXPANDED | 6 → **14**. New: office location · accepting new patients · choosing the best dentist near you · early/evening/Saturday hours · which insurance plans · family care · "haven't been in years" · cost |
| 19 | Final CTA | COPY | "with a trusted dentist in Chicago" added |
| 20 | Google map | FIX | Made responsive inline (`width:100%`, fluid `clamp()` height); `title` added for accessibility. **CID verified** against the supplied GBP link |
| 21 | Copyright | KEPT | — |
| 22 | Floating mobile CTA | FIX | Stray invalid `ttar` attribute removed; `aria-label`s added |
| 23 | **JSON-LD** | **NEW** | `Dentist` + `FAQPage` |

Also fixed: `og:url` pointed at the homepage rather than this landing page; `og:title`
and `og:description` rewritten around the keyword set.

---

## Landing Page 2 — `/lp/emergency-dentist-chicago/`

| # | Section | Status | Detail |
|---|---|---|---|
| 1 | **Urgent alert strip** | **NEW** | Tappable emergency number above the fold. Uses `.alert-strip` — a style already in the stylesheet that the page never used |
| 2 | `sat-bar` "Open on Saturdays" | KEPT | — |
| 3 | Sticky top bar | FIX | **Logo `<a>` had no `href`** — now links home; `alt` names the keyword |
| 4 | **Hero** | COPY + EXPANDED | H1 leads with "Emergency Dentist in Chicago"; badge → "Urgent Dental Care · Walk-Ins Welcome · Chicago, IL"; sub-headline adds the address and "same-day urgent dental care"; **Call moved ahead of Book** (emergency intent); trust list 5 → 7 items |
| 5 | **"In Dental Pain? What to Do in the Next 5 Minutes"** | **NEW** | Seven numbered first-aid steps, consistent with the practice's own existing FAQ guidance. Highest-value block for emergency traffic |
| 6 | Emergency conditions | EXPANDED | 8 → **16** cards (added wisdom tooth pain, chipped front tooth, broken denture/bridge, post-extraction pain, hot/cold sensitivity, object stuck, loose tooth, broken braces wire). `cond-grid` is `repeat(4,1fr)` → four clean rows. Second CTA added |
| 7 | **Walk-In Dentist Chicago / Urgent Care Dental Clinic** | **NEW** | Answers two paid keywords the page previously ignored entirely. Includes an honest ER-vs-dentist safety note |
| 8 | Same-Day Appointments | KEPT + EXPANDED | One bullet added (sedation for anxious patients); second CTA added |
| 9 | Why Choose Us | EXPANDED | 6 → **9** cards (Walk-Ins Welcome · Open Early & Saturdays · Central North Side Location). `usp-grid` is `repeat(3,1fr)` → three clean rows. Section CTAs added |
| 10 | What Happens (4 steps) | KEPT + CTA | Second CTA added |
| 11 | **Urgent Dental Care We Provide In-House** | **NEW** | 12 emergency treatments so the visitor sees their problem is fixable today |
| 12 | Gallery strip | KEPT | — |
| 13 | Meet the Team | FIX + COPY | **Three `alt` attributes contained unrendered shortcodes** (`[sc name="doctor-name-1"][/sc]`) which also produced invalid HTML from nested quotes — replaced with real names; ADA membership added to Dr. Mariscal |
| 14 | **Emergency Dentist Near You** | **NEW** | 15 neighbourhood `ins-pill`s + 7 ZIPs + Call/Directions CTAs |
| 15 | Payment & Insurance | EXPANDED | Insurance pills 3 → **15**; one bullet added per card; section CTAs added |
| 16 | Reviews + Location | FIX + EXPANDED | EmbedSocial widget kept + labelled as live; **4th review added** (Karl M., the walk-in review — directly supports the new walk-in section); "755+" removed pending verification; **address made a link**; **click-to-call row added** (the panel previously showed hours but no tappable number); `min-width:0` applied inline to both grid columns to prevent a mobile overflow |
| 17 | FAQ | EXPANDED | 5 → **13**. New: walk-in without an appointment · office location · urgent-care-clinic vs hospital ER · how fast can I be seen · cost · children · what to bring · never been a patient before. The phone number inside FAQ 2 is now a `tel:` link |
| 18 | Final CTA | COPY | Keywords added; **Call promoted to the primary `btn-white`**, Book to `btn-outline` |
| 19 | Google map | FIX | **Was forcing 210 px of horizontal page overflow on mobile** (hard-coded `width="600"`). Made responsive inline; `title` added. CID verified |
| 20 | Copyright | KEPT | — |
| 21 | Floating mobile bar | **FIX (critical)** | **"Call Now" pointed at the booking URL, not `tel:`** — on an emergency landing page, the most damaging possible bug. Also **"Book Now" was missing `?referrer_id=3`**, losing attribution. Both fixed |
| 22 | **JSON-LD** | **NEW** | `Dentist` + `FAQPage` |

---

## Verification performed

| Check | Result |
|---|---|
| New CSS classes introduced | **0** on both pages — every class verified present in that page's own stylesheet |
| `<style>` blocks added | **0** |
| Link destinations | **4** total, all pre-existing (booking with `referrer_id=3`, `tel:7739156530`, Maps short link, homepage) |
| Original sections preserved | **All 11 per page** — verified via every original `aria-labelledby` anchor |
| Original copy preserved | Every original text block retained except 11 strings intentionally rewritten for keywords; each was reviewed to confirm the original meaning survives |
| `<div>` balance | 0 on both |
| JSON-LD | Parses as valid JSON on both |
| Rendered in Chromium at 390 / 768 / 1440 px | **0 px horizontal overflow on both pages at all three widths** (LP2 was 210 px before) |
| Visual regression | New sections screenshotted and confirmed to inherit theme colours, accent lines, card styling and button styles |
| FAQ accordion | Existing JS binds generically to `.faq-q` / `.faq-btn` — all new items work with no JS change |
| Scroll-reveal animation | Existing `IntersectionObserver` binds to `.usp-card` / `.cond-card` etc. — new cards animate automatically |
| Ads attribution | Existing GCLID script rewrites every `a[href*="book.allinone.dental"]` — all new booking CTAs inherit it |
