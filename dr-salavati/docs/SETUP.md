# Setup — what is real, what is still yours to decide

Every fact on the page now comes from **drroxannesalavati.com** (the emergency-dentistry, about, new-patients and home pages) or from the assets you supplied. The setup banner that used to sit across the top of the page has gone because nothing on it is a placeholder any more.

## What is set

| Value | Set to | Source |
|---|---|---|
| Phone (every `tel:` link, header, schema) | **(424) 292-8732** | You — call-tracking number for this page |
| Address | 436 N Roxbury Dr, Penthouse A, Beverly Hills, CA 90210 | Site footer / contact |
| Hours | Mon–Fri 8:00 AM – 5:00 PM · Sat/Sun closed | Site |
| `hoursConfirmed` | `true` — the live status chip is on | — |
| Map / directions | Google Maps, pointed at the address above | — |
| Request-form fallback | `https://www.drroxannesalavati.com/request-appointment/` | Site |
| Website link (footer, schema `sameAs`) | `https://www.drroxannesalavati.com/` | — |
| Doctor | DMD, University of Louisville · 3-yr Advanced Implant & Prosthodontics residency, UIC · board-certified prosthodontist · ~10 yrs in practice | About page |
| Practice model | "One Patient. One Focus. One Standard." — 1–2 appointments/day | About + New Patients pages |
| Affiliations | ACP, IAOMT (SMART-certified), WLADS, ADA, CDA | Home page |
| Payment | Most major PPO plans, claim filed for you; CareCredit; major cards; personal checks | Emergency + home pages |
| Reviews | Four verbatim snippets (Sam, Suzanne W., Kripa J., Bahareh R.) | About page |

### The tracking number vs. the practice number

The practice's public number is **(310) 276-8897**. This page uses **(424) 292-8732** everywhere, including in the JSON-LD `telephone` field, because Google requires structured data to match what is visible on the page. That is the correct choice for a paid landing page. Just be aware the LP's NAP will differ from the main site's — it is expected, and not a problem for a page that is not competing for organic local rankings.

## Still optional

**`formEndpoint`** — empty. While empty, every "Request a time" CTA opens the practice's own request form in a new tab. If you would rather keep visitors on this page, give me a URL that accepts a JSON POST and the built-in four-field form (with the triage symptom pre-filled) switches on automatically.

**Images** — see [`../assets/README.md`](../assets/README.md). The page degrades gracefully without them, but the hero photo is the LCP element and the single biggest lever on load speed, so compress it.

**Hosting URL** — I removed the empty `<link rel="canonical">`. Add one pointing at the page's final URL once it is hosted, and set `og:url` to the same.

**Conversion tracking** — the page pushes `click_to_call` (every phone tap) and `cta_click` (every other CTA, with a `cta_id`) to `gtag()` and `dataLayer` if either exists. Add your Google Ads / GA4 tag and import the events. **Set `click_to_call` as the primary conversion** — on this page the phone call *is* the conversion; counting only form submissions will undercount it badly and mislead the bidding.

`cta_id` values: `hero-call`, `hero-form`, `how-call`, `how-form`, `loc-call`, `loc-directions`, `final-call`, `sticky-call`, `sticky-form`, `form-external`, `form-panel-call`, and `triage-call-<symptom>` / `triage-form-<symptom>` for each of the eight symptoms — which will tell you which dental emergencies actually convert.

## Claims worth a two-minute sanity check with the practice

All of these are consistent with what the site says, but they describe how the office *operates*, so a quick "yes, that's how it works" from the front desk is worth having:

| Claim | Where it appears |
|---|---|
| Emergency patients are prioritised and told a real time on the phone | Hero, trust strip, step 2, FAQ 2 |
| Insurance claims are filed on the patient's behalf | Strip, step 3, cost section |
| Sedation is available for emergency visits, not only planned ones | Strip, step 4, FAQ |
| A voicemail is checked when the office is closed | Closed-state hero note ("call and leave a message") |

## Deliberately not on the page

No star rating or review count (none verified — the four quotes are attributed and verbatim), no "open 24/7" (false: closed weekends), no specific prices, no parking claims, no "same-day guaranteed" (with 1–2 patients a day it would be dishonest). If you can confirm a Google rating and count, it is the strongest remaining trust element and belongs next to the status chip in the hero.
