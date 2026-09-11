# Verified facts — Khan Dental Studio landing page

Every factual claim on `dentist-mansfield-tx.html` is traced to a source below.
Nothing on the page was invented. Where a fact could not be verified, it was
**left off the page** rather than guessed — see "Open items" at the bottom.

Sources harvested 2026-09-11:

| Key | Source |
|---|---|
| `HOME` | https://www.khandentalstudio.com/ |
| `REVIEWS` | https://www.khandentalstudio.com/patient-reviews |
| `NEW` | https://www.khandentalstudio.com/new-patients |
| `FIN` | https://www.khandentalstudio.com/financials-insurances |
| `ABOUT` | https://www.khandentalstudio.com/about-us |
| `TEAM` | https://www.khandentalstudio.com/meet-our-team |
| `LD` | `Dentist` JSON-LD block embedded in the site homepage |
| `CSS` | https://www.khandentalstudio.com/assets/css/styles.css (`:root` tokens) |

---

## Practice identity

| Claim on page | Source |
|---|---|
| Khan Dental Studio | `HOME`, `LD` |
| 725 U.S. 287 Frontage Rd, Suite 507, Mansfield, TX 76063 | `HOME`, `LD` |
| (817) 839-7412 / `tel:+18178397412` | `HOME`, `LD` |
| reception@khandentalstudio.com | `HOME`, `LD` |
| Friday 12:00pm–7:00pm; Saturday & Sunday 10:00am–3:00pm; Mon–Thu closed | `HOME` footer + FAQ, `LD` `openingHoursSpecification` |
| Independent, single location, "no rotating locum dentists, no corporate quotas" | `HOME`, `ABOUT` |
| Ground floor, step-free access, free surface parking | `HOME` ("Find us"), `ABOUT` |
| 12+ years in practice | `ABOUT` ("12+ Years in practice"), `HOME` counter `data-count="12"` |

## Doctor

| Claim | Source |
|---|---|
| Dr. Omair Khan, DMD | `HOME`, `LD` `founder` |
| Doctor of Dental Medicine, graduated with honours | `HOME` credentials list |
| Advanced implant surgical training — guided placement & grafting | `HOME` |
| Member, American Dental Association & Texas Dental Association | `HOME` |
| Speaks English, Urdu and Spanish | `HOME` |
| Well over 100 hours of continuing education a year | `HOME` |
| Three clinical team members also speak Spanish | `TEAM` |

## Offer & pricing

| Claim | Source |
|---|---|
| $99 new patient visit | `HOME` FAQ + offer strip, `NEW` |
| Includes comprehensive exam, full set of digital X-rays, oral cancer screening, standard cleaning | `HOME` FAQ, `NEW` |
| ~90 minutes for the first appointment | `NEW` FAQ |
| Free second opinion on a plan quoted elsewhere | `HOME` FAQ, `FIN` |
| $65 charge if new images are needed for a second opinion | `FIN` FAQ |
| Six-point gum charting, intraoral photographs, ultrasonic + hand scaling, polish and fluoride | `NEW` ("minute by minute") |
| Written estimate with insurance applied before you leave | `NEW`, `FIN` |
| 5% courtesy discount for treatment paid in full on the day | `FIN` |

## Membership plans

| Claim | Source |
|---|---|
| Child plan $25/mo — 2 cleanings, 2 exams & X-rays, fluoride, 1 emergency exam, 15% off | `HOME` |
| Adult plan $29/mo (most popular) — 2 cleanings, 2 exams & X-rays, oral cancer screening, 1 emergency exam & X-ray, 20% off | `HOME` |
| Perio plan $49/mo — 4 perio maintenance visits, 2 exams & X-rays, localised antibiotic therapy, 1 emergency exam, 20% off | `HOME` |
| No deductible, no annual maximum, no claim forms; not insurance | `HOME`, `HOME` FAQ |

## Insurance & payment

| Claim | Source |
|---|---|
| In-network: Delta Dental, Cigna, Aetna, MetLife, Guardian, United Concordia, United Healthcare, Humana, GEHA Connection | `HOME` FAQ, `FIN` |
| Also accepted/filed: Ameritas, Principal, Anthem BCBS, Careington, Dental Select, Assurant | `FIN` ("Accepted plans") |
| Files out-of-network claims on your behalf | `HOME`, `FIN` |
| CareCredit and Sunbit, 6/12/24-month plans, several interest-free | `FIN` |
| Cash, card, check, HSA and FSA accepted | `FIN` |
| Benefits verified before booking | `FIN`, `NEW` |

## Services (16)

All sixteen names and one-line descriptions are taken from the `HOME`
"Sixteen treatments. One address." grid. No service was added or renamed.

## Technology

| Claim | Source |
|---|---|
| Same-day ceramic crowns: digital scan → design on screen → milled on site (12–15 min) → fitted and polished | `HOME` ("A crown finished before Saturday lunch") |
| Around two hours start to finish | `HOME` FAQ |
| Low-dose digital radiography, up to 80% less radiation than film | `HOME` |
| Intraoral cameras in every room | `HOME` |
| 3D cone-beam imaging with printed surgical guides | `HOME` |
| Rotary endodontics | `HOME` |
| Mercury-free practice | `HOME` marquee strip |
| Emergency slots on every clinic day | `HOME` marquee strip, `ABOUT` |

### Trust marquee

The eight claims scrolling under the hero are the site's own marquee, in the
site's own order: Open Friday evenings & weekends · Delta Dental, Cigna, Aetna,
MetLife in-network · Mercury-free practice · Same-day ceramic crowns · Digital
low-dose X-rays · Free second opinions · Membership plan from $29/mo ·
Emergency slots every clinic day. Source: `HOME`.

## Social proof

| Claim | Source |
|---|---|
| 186 published patient reviews | `REVIEWS` counter `data-count="186"` |
| 96% would recommend us | `REVIEWS` counter `data-count="96"` |
| 12 years of word of mouth | `REVIEWS` counter `data-count="12"` |
| All 9 named testimonials (Marissa H., Daniel W., Erin K., Priya N., Chris L., Tanya B., Robert F., Amanda J., Victor S.) | `REVIEWS` — quoted verbatim, names and cities unchanged |
| "Roughly a third of our new patients have not seen a dentist in five years or more" | `HOME` FAQ, `NEW` |

> The tenth testimonial on the source page (Nicole T., Invisalign) was dropped
> only to keep the grid to a clean 3×3. Nothing was edited.

## Brand system

Sampled directly from `CSS` `:root` — not approximated:

| Token | Value |
|---|---|
| Navy (primary / ink) | `#000342` |
| Gold (accent) | `#f6b756` |
| Accent deep | `#d9973a` |
| Accent soft | `#fdf4e4` |
| Canvas band | `#f4f4f5` |
| Hairline | `#ececee` |
| Muted text | `#52525b` |
| Body text | `#18181b` |
| Typeface | DM Sans 400/500/600/700 (single-font system — the site uses no serif) |
| Radii | 36px surfaces, 14px controls, 12px chips |
| Shadow | `0 18px 48px -28px rgba(0,3,66,.28)` |

The logo mark is the site's own `logo-mark.svg`, inlined so it costs no request.
Photography is served from the live site (`reception.jpg`, `dr-khan-hero.jpg`,
`dr-omair-khan.webp`) — all three confirmed reachable (HTTP 200).

---

## Open items — confirm before launch

1. **Google star rating.** The Google Business Profile
   (`share.google/S1Mx0VYddi8wyhAZ5`, entity `/g/11mpcg_rfj`, "Khan Dental
   Studio") is live, but Google blocks automated reads of the knowledge panel
   and no third-party aggregator carries the listing. **No star rating appears
   anywhere on the page**, because none could be verified. The review block
   uses only figures published on the practice's own site (186 reviews, 96%
   would recommend). If the real rating is confirmed, add it to the
   `.rev-stats` block and to `aggregateRating` in the `Dentist` JSON-LD.
   Do not publish a rating that has not been checked against the live profile —
   Google Ads misrepresentation policy treats unverifiable review claims as a
   disapproval risk.
2. **Form endpoint.** The page currently confirms submission in place. Wire it
   to the practice's real handler before spending — see `docs/TRACKING.md`.
3. **Conversion labels.** `AW-XXXXXXXXX` / `SEND_TO_ID` placeholders must be
   replaced with the account's real IDs — see `docs/TRACKING.md`.
4. **Privacy policy — LAUNCH BLOCKER.** Google Ads requires a reachable privacy
   policy on any page that collects personal data, and this page has a lead form.
   The main site has no privacy policy: its footer "Privacy policy" and
   "Accessibility" links are both `href="#"`, and `/privacy-policy` and
   `/accessibility` each return **404** (checked 2026-09-11). Rather than ship a
   link to a dead page, the landing page footer carries a commented-out
   placeholder. **A privacy policy page must exist and be linked before the
   campaign is enabled.** All other footer links were fetched and return 200:
   `/`, `/about-us`, `/contact-us`, `/financials-insurances`, `/patient-reviews`.
