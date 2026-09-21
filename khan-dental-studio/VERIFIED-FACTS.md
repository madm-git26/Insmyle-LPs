# Verified facts — Khan Dental Studio emergency landing page

Every claim on `emergency-dentist-mansfield.html` traces to one of these sources.
Nothing was invented. Where something could not be verified it was left out and is
listed at the bottom.

**Sources**
- **[SITE]** `https://www.khandentalstudio.com/` and its subpages, crawled 2026-09-21
  (home, `/services/emergency-dentistry`, `/about-us`, `/dr-omair-khan`, `/meet-our-team`,
  `/patient-reviews`, `/financials-insurances`, `/membership-plan`, `/new-patients`, `/contact-us`)
- **[GBP-LINK]** the Google Business Profile share link supplied by the client
  (`https://share.google/S1Mx0VYddi8wyhAZ5`, which resolves to knowledge-graph id `/g/11mpcg_rfj`)
- **[GENERAL]** standard dental first-aid guidance, not a claim about the practice
- **[DERIVED]** geography derived from the verified address

## Practice identity

| Fact | Value | Source |
|---|---|---|
| Name | Khan Dental Studio | [SITE] |
| Address | 725 U.S. 287 Frontage Rd, Suite 507, Mansfield, TX 76063 | [SITE] (header, footer, contact page) |
| Phone | (817) 839-7412 → `tel:+18178397412` | [SITE] (same link used 150× across the site) |
| Email | reception@khandentalstudio.com | [SITE] |
| Directions link | `https://maps.google.com/?q=725+US-287+Frontage+Rd+Suite+507+Mansfield+TX+76063` | [SITE] — the site's own "Get directions" link |
| Google profile link | `https://share.google/S1Mx0VYddi8wyhAZ5` | [GBP-LINK] |
| Instagram | @dromairkhan | [SITE] |
| Ground floor, step-free, free surface parking outside the door | [SITE] (home "Find us", about, contact) |
| Mercury-free practice | [SITE] (home trust ticker) |

## Hours — used verbatim and in JSON-LD

| Day | Hours | Source |
|---|---|---|
| Monday – Thursday | Closed | [SITE] footer, contact page |
| Friday | 12:00 pm – 7:00 pm | [SITE] |
| Saturday | 10:00 am – 3:00 pm | [SITE] |
| Sunday | 10:00 am – 3:00 pm | [SITE] |

The page never claims 24/7 or walk-in availability. The live "Open now / Next open"
status is computed from these hours in America/Chicago time.

## Emergency-specific claims

| Claim on the page | Source wording |
|---|---|
| "Call before 2 pm and we will do everything we can to see you the same day" | [SITE] emergency page, verbatim |
| "We keep protected slots open every morning specifically for emergencies" | [SITE] emergency page, verbatim |
| "Emergency slots held open on every clinic day, all year" | [SITE] about page; home ticker "Emergency slots every clinic day" |
| "Toothache, abscess, swelling and trauma care" | [SITE] emergency page bullet |
| "Re-cementing lost crowns, fillings and bridges" | [SITE] emergency page bullet |
| "After-hours phone triage with Dr. Khan" | [SITE] emergency page bullet |
| "picks up the phone when someone calls on a Saturday evening with a swollen jaw" | [SITE] about page |
| "Emergencies — call first, do not use the form" | [SITE] contact page |
| "If something is urgent we will usually treat it the same day" | [SITE] new-patients FAQ |
| "Same-day relief for broken teeth, lost crowns, swelling and pain that will not wait" | [SITE] emergency page sub-headline |
| Four-step visit (Consultation / Plan and price / Treatment / Follow-up) | [SITE] emergency page, verbatim |
| Four emergency FAQs (visits, hurt, insurance, longevity) | [SITE] emergency page, verbatim |
| "Members of our in-house plan receive 15–20% off emergency dentistry" | [SITE] emergency page FAQ |
| Jaw pain / TMD card | [SITE] TMD / TMJ Treatment service |
| Root canal: "rotary endodontics, faster, quieter, most finished in one sitting" | [SITE] home "The rest of the kit" |

## Technology

Digital scanners, 3D cone-beam imaging, in-house milling unit, same-day ceramic crowns
(~2 hours; milling 12–15 minutes), low-dose digital radiography (up to 80% less
radiation, on screen in two seconds), intraoral cameras in every room, rotary
endodontics — all [SITE] home page.

## Comfort

Topical before every injection ("numbing before the numbing"), blankets,
noise-cancelling headphones, hand signal that stops everything, longer appointments
for anxious patients — [SITE] home, about, emergency pages.

## Dr. Omair Khan, DMD

DMD with honours and academic distinction · advanced implant surgery (guided placement,
sinus lifts, bone grafting) · digital restorative certification · occlusion & TMD
training · ADA and Texas Dental Association member · English, Urdu, Spanish · lives in
Mansfield · "over a decade in practice" / 12+ years · well over 100 CE hours a year
(site counter: 120+) — all [SITE] `/dr-omair-khan` and `/about-us`.

## Team members named on the page

Dr. Hannah Cole (Associate Dentist, restorative and paediatric focus), Dr. Owen Pratt
(Visiting Endodontist, microscope-assisted root canals), Kelsey Barnes (Treatment
Coordinator, written out-of-pocket figure) — [SITE] `/meet-our-team`.

## Statistics

| Figure | Source |
|---|---|
| 186 published reviews | [SITE] `/patient-reviews` counter and header ("186 reviews") |
| 96% would recommend | [SITE] `/patient-reviews` counter |
| 12+ years | [SITE] about and reviews counters |
| 6,000+ patients cared for | [SITE] about counter |

## Reviews — six, verbatim from `/patient-reviews`

Daniel W. (Arlington), Erin K., Chris L., Marissa H., Amanda J. (Mansfield), Priya N.
(Keller). No review text was edited. Five stars are shown because the site presents
every sampled review as a five-star review; if any of these were not five-star on
Google, remove the stars row.

## Insurance and payment

- In-network (9): Delta Dental, Cigna, Aetna, MetLife, Guardian, United Concordia,
  United Healthcare, Humana, GEHA Connection — [SITE] home FAQ and financials FAQ.
- Also accepted / filed: Ameritas, Principal, Anthem BCBS, Careington, Dental Select,
  Assurant; "we accept and file for almost every PPO plan" — [SITE] `/financials-insurances`.
- Membership plan: child $25/mo, adult $29/mo, perio $49/mo; each includes 1 emergency
  exam & X-ray; 15% (child) / 20% (adult, perio) off other treatment — [SITE] `/membership-plan`.
- CareCredit and Sunbit, 6/12/24-month plans, several interest-free, approval in
  minutes — [SITE] `/financials-insurances`.
- Cash, card, check, HSA, FSA; 5% courtesy discount for paying in full on the day — [SITE].
- Free second opinion; written itemised estimate; benefits verified before booking;
  claims filed in- or out-of-network — [SITE].

## First-aid steps

The six "next five minutes" steps are standard dental first-aid guidance [GENERAL]
(salt-water rinse, no aspirin on the gum, keep a knocked-out tooth moist in milk, cold
compress, keep the pieces, OTC pain relief as directed) plus the ER warning. They are
not presented as practice policy.

## Areas served

"Patients reach us from" lists Mansfield plus neighbouring cities — Arlington,
Kennedale, Midlothian, Burleson, Grand Prairie, Cedar Hill, South Fort Worth
[DERIVED from the address] — and Keller and Benbrook, which appear as reviewer
home towns on the site. They are described as places patients travel from, never as
additional locations.

## Deliberately NOT included

| Item | Why |
|---|---|
| Google star rating and Google review count | The Google Business Profile could not be rendered from this environment (Google blocks non-browser fetches and the sandbox cannot trust the proxy certificate in Chromium). The page therefore shows the site's own "186 reviews / 96% would recommend" and links to the profile rather than stating a star rating. **Add the live Google rating to the `.rev-stats` block once confirmed.** |
| Victor S. review ("fit me in on a Thursday morning with an abscess") | Contradicts the published Monday–Thursday closure; left out to avoid confusing emergency visitors. |
| Tooth extractions / wisdom teeth | Not listed as a service anywhere on the site. |
| Walk-ins welcome | The site says call first; never says walk-ins. |
| 24/7 or "open every day" | False; hours are Fri/Sat/Sun only. |
| Emergency exam price | Not published on the site. |
| Nitrous / sedation | Not mentioned on the site. |
| Office photos | The site's interior photos (`clinic.jpg`, `reception.jpg`, `operatory.jpg`) are stock images, one showing Spanish-language hospital signage. Only the Dr. Khan photos and the scan-on-tablet image are used. |
