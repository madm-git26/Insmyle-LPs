# Verified Facts: the source for every claim on the page

Every factual statement in `new-patient-lp.html` traces to one of the sources below.
Nothing was invented. Claims I couldn't verify were left out and are listed at the bottom.
Research date: **2026-10-29**.

**Sources**
- **[SITE]**: `https://mygentletouchdentistry.com/` and all 65 pages in its sitemap (home, services,
  doctors, insurance, office tour, reviews, every service page, and the 29 insurance pages)
- **[SCHEMA]**: the JSON-LD embedded on the main site
- **[GBP]**: the Google Business Profile (`maps.app.goo.gl/ifnAPodqCiuwTUx89`), CID `0x953b804baadd3a8f`,
  rendered in a headless browser on 2026-10-29
- **[LP-NOW]**: the current live page at `dentistrichardsontx.org/lp/new-patient-lp/`
  (snapshot in `original/new-patient-lp.full-page.html`)
- **[LP-BENEFITS]**: `dentistrichardsontx.org/` (the practice's live "Use it or Lose it" LP)

---

## Practice identity

| Fact | Value | Source |
|---|---|---|
| Name | Gentle Touch Dentistry Richardson | [SITE] [SCHEMA] [GBP] [LP-NOW] |
| Address | 1750 Alma Rd #110, Richardson, TX 75081 | [SITE] [GBP] |
| Landmark | Near Prairie Creek Park | [SITE] |
| Coordinates | 32.970316, −96.7164333 | [SCHEMA] |
| Phone on page | **(469) 336-3069** → `tel:+14693363069` | [LP-NOW]: the LP's existing tracking number, kept everywhere |
| Phone in JSON-LD | (469) 947-3963 | [SITE] [GBP]: main number, kept in schema only (same pattern as the current LP) |
| Booking URL | `https://book.allinone.dental/gentle?referrer_id=3` | [LP-NOW]: Ads referrer ID, kept |
| Directions / GBP | `https://maps.app.goo.gl/ifnAPodqCiuwTUx89` | Supplied by you; resolves to the same CID as the site's own Maps link |
| Map embed | Same `pb=` embed the main site uses | [SITE] |
| Founded | September 2016 | [SITE] [SCHEMA] |
| Areas served | Richardson, Plano, Garland, nearby North Dallas communities | [SITE] [SCHEMA] |
| Tagline | "We practice dentistry from the heart!" | [SITE] |
| Payment | Cash, credit card, debit card, check, dental insurance | [SCHEMA] `paymentAccepted` |

## Hours (also driven live by JS in America/Chicago time)

| Day | Hours | Source |
|---|---|---|
| Monday | 8 am – 5 pm | [SITE] [SCHEMA] [LP-NOW] |
| Tuesday | Closed | ” |
| Wednesday | 10 am – 6:30 pm | ” |
| Thursday | 10 am – 4 pm | ” |
| Friday | 7 am – 4:30 pm | ” |
| Saturday | 10 am – 2 pm (by appointment only) | ” |
| Sunday | Closed | ” |

GBP showed "Closed · Opens 10 AM" on Thursday morning, which matches.

## Google rating and review themes

| Fact | Value | Source |
|---|---|---|
| Rating | **4.8** | [GBP], also shown inside the Google map embed |
| Review count | **127** | [GBP] |
| Themes shown | Caring staff (16), Comfortable atmosphere (7), Kind doctors (4), Quick procedure (3), Wisdom teeth removal (3), Gentle touch (2) | [GBP] "Sort by topic" chips |

> ⚠️ The main site still says **"5.0 from 107 reviews"** and the current LP says **"5.0 / 95+ Reviews"**
> (Opencare data). Both are out of date. The page uses the live Google figure. **Update it when the count
> changes**: search the file for `4.8` and `127` (header, hero chip, hero card, reviews block).

## Reviews quoted (verbatim; nothing reworded)

| Reviewer | Where it came from | Notes |
|---|---|---|
| Martha R. | [SITE] home + reviews page | "first visit … dental fear". The best match for new-patient intent |
| Shabnam A. | [GBP] (Shabnam Abdullah, 5★, 5 months ago) | Excerpt: first two sentences, exactly as written |
| Jill S. | [SITE] | "appointment scheduled within a week" |
| Sheilicha S. | [GBP] (5★, Local Guide) | Excerpt: first three sentences; covers the insurance theme |
| Ravi W. | [SITE] | Crown review. "Dr Anirutha" misspelling kept because it's a quote |
| Opencare patient | [LP-NOW] Opencare review, "1 Week Ago" | Excerpt; leading "…" marks the omitted opening sentence |

Surnames are shortened to an initial, the same way the main site shows them.

## Doctors

| Doctor | Claims used | Source |
|---|---|---|
| Dr. Anuritha Chepyala | Founder & Lead Dentist; NYU College of Dentistry; 8 years as an associate in the Dallas area; opened September 2016; "gentle and creative touch"; specially trained in pediatric dentistry; personally oversees every Invisalign case | [SITE] doctor page, family & Invisalign pages |
| Dr. Nauman Quamar | Board-certified periodontist; BDS Hamdard University (2005); Periodontology, NYU (2009); MS Oral Biology, Periodontology & Oral Implantology, Temple University Kornberg School of Dentistry (2012) | [SITE] doctor page |
| Dr. Usha Kolli | General dentist with a surgical focus (wisdom tooth extractions); NYU College of Dentistry (2010); practicing in DFW since 2010; "gentle touch and calming chairside manner" | [SITE] doctor page |

Photos are the site's own doctor images (`/images/…`). No staff, hygienists or assistants are named on the
site, so none are named on the page.

## Offers

| Offer | Exact terms on page | Source |
|---|---|---|
| FREE Invisalign consultation | "New patients only. Must present coupon. Limited time offer." | [LP-NOW] (verbatim terms) |
| FREE Implant & Full-Arch consultation | Same terms | [LP-NOW]; [SITE] implants page also offers a free implant consultation |
| In-office membership plan | 12 months of coverage from the day you enroll, immediate benefits | [SITE] insurance page |
| Financing | "Flexible financing for implants and other major care" | [SITE] implants & insurance FAQs; [LP-NOW] "Financing Plans Available" |

No prices or dollar discounts appear anywhere because the practice doesn't publish any.

## Insurance

- "In-network with 29+ PPO plans": [SITE] (hero chip and insurance FAQ).
- All 29 plan names, exactly as listed on [SITE] `/insurance/` and in [SCHEMA] `paymentAccepted`.
- "Most PPO plans cover exams, cleanings and x-rays at or near 100%": [SITE] insurance FAQ.
- Coordinator verifies benefits, estimates costs before treatment, files claims: [SITE].
- "If your plan isn't listed, call us; we may still be able to accept it": [SITE].
- **"We do not accept Medicaid, HMO or state insurance plans"**: [LP-BENEFITS] ("*We Do Not Accept
  Medicaid, HMO or State Insurances"). This screens out unqualified Ads clicks. Confirm it's still current.
- Year-end card ("Most dental plans renew at the end of the year… don't roll over"): [LP-BENEFITS] and
  [SITE] insurance page. JS shows it **only October–December**.

## Comfort, technology, first visit

| Claim | Source |
|---|---|
| TVs with cable in exam rooms; blankets, pillows, neck pillows; headphones & sunglasses | [SITE] office tour, cleanings, family pages |
| Nitrous oxide, oral sedation, local anesthetic; personalized sedation plans for children | [SITE] home, emergency, pediatric pages |
| Digital x-rays, intraoral cameras, photos on a 40-inch screen, 3D imaging for Invisalign, same-day CEREC crowns | [SITE] home, office tour, crowns pages |
| Front desk greets you by name | [SITE] office tour |
| First-visit steps (book, bring insurance card, complete forms; x-rays, photos, gum exam on 40" screen; options + estimate; cleaning same visit when time allows) | [SITE] home "What to expect at your first visit" |
| "Usually about an hour; first visit may take a little longer" | [SITE] cleanings FAQ |
| Oral cancer screening at every cleaning visit | [SITE] cleanings page |
| Same-day emergency appointments "whenever possible", call first | [SITE]; always qualified this way on the page |
| Back-to-back family appointments "when possible" | [SITE] family FAQ |
| AAPD first visit by first birthday / within 6 months of first tooth | [SITE] family & pediatric pages |
| LGBTQ+ friendly | [GBP] attribute. **Not used on the page**; listed here only so you know it exists |

## Photos

All from [SITE] `/images/`: the waiting room, treatment-room hallway, front desk, panoramic x-ray, two
kid-friendly office photos, the three doctor portraits, the two video-testimonial posters and videos
(`/videos/testimonial-1.mp4`, `-2.mp4`), and the white logo. The header logo comes from the LP's own WordPress
uploads. No stock photos are used.

---

## Deliberately NOT included (couldn't verify, or found only in the stale Opencare block)

| Claim | Why it was left out |
|---|---|
| **"Khan Dental Studio"** | The brief named this practice, but no public listing exists. The website, GBP, current LP and office signage all say Gentle Touch Dentistry Richardson. You confirmed: use Gentle Touch. |
| "5.0 stars / 107 reviews" (site) and "95+ reviews" (LP) | Out of date. GBP shows 4.8 / 127. |
| "Super Practice", "Patient's Choice", "33 new patients in last 7 days" | Opencare marketplace badges and counters. They're third-party and time-sensitive. |
| Spanish spoken, free parking, free Uber rides, massage chair, aromatherapy, hot towels, laser dentistry, Wi-Fi, free coffee | Only in the current LP's Opencare "Practice features" block, not on the website. Confirm any you want added; free parking and Spanish would be worth having. |
| "Low-interest" financing | Only in the Opencare block. The page says "flexible financing", which the website supports. |
| "Receive a discount when paid in full" | Only on the 2024 benefits LP. Confirm before using. |
| Community involvement / awards | Nothing is published on the website. The `/partners/` page lists the ADA and TDA as *partners*, not memberships, so no membership badge was added. |
| Texting the office | Not stated anywhere, so the page says "Call us", not "Call or text". |
| "Open 24/7" / walk-ins | False. Emergency copy always says "whenever possible" and "call first". |
