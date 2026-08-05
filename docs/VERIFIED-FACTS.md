# Verified Facts — source for every claim on both landing pages

Every factual statement in `enhanced/` traces to one of the sources below.
Nothing was invented. Where a claim could not be verified it was **removed**,
not softened — those cases are listed at the bottom.

**Sources**
- **[LIVE-LP]** the existing live landing pages (already published by the practice)
- **[SITE]** `https://www.insmyledental.com/` and its subpages (`/meet-us/`)
- **[SCHEMA]** JSON-LD embedded in the live pages (`Dentist`, `LocalBusiness`)
- **[GBP]** the Google Business Profile embed CID on the pages
- **[DERIVED]** arithmetic or geography derived from a verified fact

---

## Practice identity

| Fact | Value | Source |
|---|---|---|
| Legal / listing name | In Smyle Dental – Lakeview & Roscoe Village | [SCHEMA] |
| Street address | 3514 N Lincoln Ave, Chicago, IL 60657 | [SCHEMA] [SITE] [LIVE-LP] |
| Neighbourhood | Lakeview / Roscoe Village | [LIVE-LP] [SITE] |
| Coordinates | 41.9455745, −87.6731069 | [SCHEMA] |
| Landing-page phone | (773) 915-6530 → `tel:7739156530` | [LIVE-LP] — call-tracking number, kept unchanged |
| Booking URL | `https://book.allinone.dental/in-smyle-dental?referrer_id=3` | [LIVE-LP] |
| Maps short link | `https://maps.app.goo.gl/sUPeoaTKH5ykK63m6` | [LIVE-LP] |
| GBP CID | `0xe42df9181f5fbe5a` = 16442071696600448602 | [GBP] — **exact match** to the GBP link supplied |
| Price range | $–$$$ | [SCHEMA] |

## Office hours — used verbatim, and in JSON-LD

| Day | Hours | Source |
|---|---|---|
| Monday | 7:00 AM – 7:00 PM | [SCHEMA] [SITE] [LIVE-LP] |
| Tuesday | 8:00 AM – 6:00 PM | ” |
| Wednesday | 7:00 AM – 6:00 PM | ” |
| Thursday | 7:00 AM – 7:00 PM | ” |
| Friday | Closed | ” |
| Saturday | 7:00 AM – 3:00 PM | ” |
| Sunday | Closed | ” |

Derived statements used in copy, all sound:
- "Open early from 7:00 AM" — true for Mon, Wed, Thu **and Sat**. Copy says exactly that.
- "Open until 7:00 PM Monday and Thursday" — [DERIVED], correct.
- "Open Saturdays" — [SCHEMA]; also the site's own `sat-bar` banner.
- "Evening hour appointments for new patients" — [SITE] and the LP1 `sat-bar`.

## Doctors — three, and only three

| Name | Title | Credentials | Source |
|---|---|---|---|
| Dr. Jose M. Mariscal | Lead Dentist & Founder | DDS, MICOI, FAGD | [LIVE-LP] [SITE] |
| Dr. Carolina Boege | General & Restorative Dentist | DMD | [LIVE-LP] [SITE] |
| Dr. Nicolas Flores-Hutton | General Dentist | DMD | [LIVE-LP] [SITE] |

- "American Dental Association member" (Dr. Mariscal) — [SCHEMA] `founder.memberOf`.
- "MICOI = International Congress of Oral Implantologists", "FAGD = Fellow, Academy of
  General Dentistry" — standard expansions of the credentials the practice publishes.
- "Three dentists on staff" / "3 Dentists · One Location" — [DERIVED] from the three above.
- `/meet-us/` also lists **Dr. Frank L. Munoz, DDS (deceased 2016)**. Deliberately **not**
  included as current staff.
- **No hygienists, assistants or front-desk staff are named anywhere on the site**, so no
  such names were invented. Copy refers to them generically ("our hygienists",
  "our front-desk team") exactly as the live pages already did.

## Services — every one is published by the practice

Preventative dentistry · professional cleanings & comprehensive exams · digital X-rays ·
dental sealants · tooth fillings · extractions · **same-day crowns (in-office milling)** ·
dental implants · Invisalign · braces · porcelain veneers · dental bonding · root canal
treatment · dentures · dental bridges · Zoom whitening · gum disease laser therapy ·
sedation dentistry · dental emergency care · inlays & onlays · bruxism treatment.
**Source:** [SITE] service navigation. "Your Crown. Same Day. No Waiting, No Temps" is the
practice's own homepage wording — the basis for the same-day-crown claims.

## Insurance

- **In-network:** Delta Dental, Aetna, Cigna — [LIVE-LP] (both pages already stated this).
- **Accepted (15 total, listed on the site):** Aetna, AlwaysCare, Ameritas, Anthem, Cigna,
  Delta Dental, Dental Network of America, GEHA, Guardian, Humana, United Concordia,
  United Healthcare, Lincoln Financial, MetLife, Principal — [SITE].
- The expanded `ins-pill` rows use exactly these 15 names and nothing else.
- Wording is careful: only Delta/Aetna/Cigna are called **in-network**; the rest are
  described as **accepted**, matching the source.

## Membership plan & financing

| Claim | Source |
|---|---|
| In Smyle Membership Plan — free cleanings, exams and X-rays | [SITE] [LIVE-LP] |
| 15% off all other treatments | [SITE] [LIVE-LP] |
| One affordable annual rate | [LIVE-LP] |
| Cherry financing: 3, 6, 12, 18, 24 monthly payments | [SITE] [LIVE-LP] |
| No hard credit check · no paperwork · fast approval | [SITE] [LIVE-LP] |

## Reviews

- All four quoted reviews are **verbatim from the live pages** — Jen P., Julia R.,
  Karl M. (LP1) and Christian D., Elvia D. (LP2). No review text was written, edited or
  paraphrased. Only two corrections were made: the avatar initials (which showed C/S/V
  for Jen/Julia/Karl) and the capitalisation of "karl" → "Karl".
- Karl M.'s review is the documented basis for the **walk-in** claims: *"I was able to
  get a walk-in appointment for a very painful dental issue early morning."*
- Live ratings and counts come from the practice's own **EmbedSocial** Google-reviews
  widgets, which were kept in place. No rating or review count is hardcoded anywhere.

## Neighbourhoods and ZIP codes

Listed as areas patients **travel from**, never as additional office locations.
All are Chicago north-side neighbourhoods adjacent to 3514 N Lincoln Ave [DERIVED]:
Lakeview, Roscoe Village, North Center, Lincoln Square, Lincoln Park, Wrigleyville,
Ravenswood, Uptown, Bucktown, Logan Square, Avondale, Irving Park, Old Irving Park,
Northalsted, Southport Corridor. ZIPs: 60657, 60613, 60618, 60614, 60625, 60640, 60641.

## Emergency first-aid guidance (LP2)

Consistent with the practice's **own existing FAQ answer** on the live page (handle the
tooth by the crown only, rinse gently, keep it moist in milk, 30–60 minute window), plus
standard dental first aid. The "never place aspirin directly on the gum" and salt-water
rinse points are conventional guidance, not practice-specific claims. An explicit safety
note directs facial trauma, uncontrolled bleeding, or breathing/swallowing difficulty to
a hospital ER or 911 — this **reduces** liability exposure rather than creating it.

---

## Deliberately NOT included — could not be verified

| Claim | Why it was left out |
|---|---|
| **"755+ reviews" / "4.9 rating"** | Present in the original copy, but unverifiable from any reachable source. Third-party directories disagreed sharply (Yelp 46, PatientConnect365 669), and the Google Maps CID page would not render for extraction. Replaced with "Join Our Happy Chicago Patients"; the live widget shows the real numbers. **Restore the exact figure once you confirm it.** |
| **"Best of 2026 Award Winner"** | A homepage crawl surfaced this phrase, but the awarding body could not be confirmed, and a later direct fetch of the homepage was blocked. Publishing an unattributable award is a real risk. Omitted pending confirmation. |
| **Parking / CTA transit details** | Not published anywhere on the site. Guessing the nearest Brown Line stop or claiming free parking would be exactly the false information you ruled out. Omitted — happy to add once confirmed. |
| **Years in practice** | A patient review mentions "about 25 years", which is patient recollection, not a practice statement. Not turned into a "25+ years" badge. |
| **Named hygienists / assistants** | No such names appear on the site. None invented. |
| **Specific prices** | The site publishes no fee schedule. Cost FAQs explain the *process* (benefits verified in advance, membership plan, Cherry financing) and direct the visitor to call — no dollar figures asserted. |
| **"Emergency dentist open 24/7"** | Would be false: the practice is closed Friday and Sunday. Copy consistently says "same-day" and "every day we're open", and the published hours appear twice per page. |
