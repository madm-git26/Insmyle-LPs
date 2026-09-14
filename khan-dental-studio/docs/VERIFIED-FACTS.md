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

> ⚠️ **The $55 new patient offer is client-supplied and contradicts the live site.**
> The website advertises **$99** for exam + digital X-rays + oral cancer screening
> + standard cleaning (`HOME` FAQ, `NEW`). The agency specified **$55 for exam and
> X-rays only**, so that is what the landing page carries. Google Ads requires the
> offer on the landing page to be the one actually honoured, and a mismatch between
> the ad landing page and the main site is a disapproval and trust risk.
> **Update khandentalstudio.com to $55, or confirm the $55 price, before the
> campaign is enabled.**

| Claim | Source |
|---|---|
| $55 new patient exam and X-rays | **Client-supplied** (agency instruction, 2026-09-14) — not on the live site |
| Comprehensive exam with Dr. Khan | `NEW`, `HOME` |
| Full set of low-dose digital X-rays | `NEW`, `HOME` |
| Intraoral photographs | `NEW` ("minute by minute"), `HOME` |
| Written estimate with insurance applied before you leave | `NEW`, `FIN` |
| Benefits verified before treatment is scheduled | `FIN`, `NEW` |
| CareCredit and Sunbit, 6/12/24-month plans, several interest-free | `FIN` |
| Cash, card, check, HSA and FSA accepted | `FIN` |
| Roughly a third of new patients have not been in five years or more | `HOME` FAQ, `NEW` |

### Removed from the page on instruction

These are all true and still on the practice's own site, but the agency asked for
a single-offer page, so they were taken off the landing page entirely:

| Removed | Where it lived on the site |
|---|---|
| $99 new patient package (replaced by the $55 exam + X-rays) | `HOME` FAQ, `NEW` |
| Free second opinion (and the $65 new-images caveat) | `HOME` FAQ, `FIN` |
| Membership plans — Child $25/mo, Adult $29/mo, Perio $49/mo, 15–20% off | `HOME` |
| 5% courtesy discount for payment in full on the day | `FIN` |

Claims about appointment **duration** were also dropped. The site's "about ninety
minutes" covers a visit that includes a cleaning; the $55 visit does not, and no
verified length for the shorter visit exists. The page now says the length is
confirmed at booking rather than inventing a number. **Confirm the actual length
of the $55 visit** and it can go back in.

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

The "Free second opinions" and "Membership plan from $29/mo" items were removed
from the marquee along with the offers themselves.

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
2. **Confirm the $55 price and the visit length** — see the warning at the top of
   "Offer & pricing". The live site still says $99.
3. **Form endpoint.** The page currently confirms submission in place. Wire it
   to the practice's real handler before spending — see `docs/TRACKING.md`.
4. **Conversion labels.** `AW-XXXXXXXXX` / `SEND_TO_ID` placeholders must be
   replaced with the account's real IDs — see `docs/TRACKING.md`.
5. **Privacy policy — LAUNCH BLOCKER.** Google Ads requires a reachable privacy
   policy on any page that collects personal data, and this page has a lead form.
   The main site has no privacy policy: its footer "Privacy policy" and
   "Accessibility" links are both `href="#"`, and `/privacy-policy` and
   `/accessibility` each return **404** (checked 2026-09-11). Rather than ship a
   link to a dead page, the landing page footer carries a commented-out
   placeholder. **A privacy policy page must exist and be linked before the
   campaign is enabled.** All other footer links were fetched and return 200:
   `/`, `/about-us`, `/contact-us`, `/financials-insurances`, `/patient-reviews`.
