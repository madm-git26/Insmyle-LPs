# Omni Dental McMurray: General Dentist Google Ads Landing Page

A standalone, conversion-focused landing page for **Omni Dental McMurray**
(3035 Washington Rd Suite 3, McMurray, PA 15317), built for Google Ads general-dentist and
"dentist near me" traffic.

| File | What it is |
|---|---|
| [`index.html`](index.html) | The landing page. One self-contained file: inline CSS and JS, no frameworks. |
| [`images/`](images/) | Optimised WebP images plus the logo SVG and favicon, all the practice's own photos. A visit only loads the sizes it needs. |
| [`video/`](video/) | The hero office-tour loop: `omni-office-960.mp4` (1.7 MB, desktop) and `omni-office-640.mp4` (0.95 MB, mobile) |
| [`VERIFIED-FACTS.md`](VERIFIED-FACTS.md) | The source for every claim on the page, plus what was deliberately left out and why |

> **Note on the brief.** It said *"Omni Dental Shadyside … 53035 Washington Rd"*. The Google
> Business Profile link you supplied resolves to **Omni Dental McMurray** at **3035** Washington
> Rd. Shadyside is a separate office at 5813 Centre Ave, Pittsburgh. This page is built for
> McMurray, to match the GBP and address.

---

## Page structure (conversion order)

1. **Top bar**: 4.9★ / 1,500+ Google reviews · new patients & emergencies welcome · address
2. **Sticky header**: logo, section links (desktop), click-to-call, **Book Online**
3. **Hero**: a large keyword H1, *"Best Dentist in McMurray, PA"*, plus Book and Call buttons, a Google rating badge, a
   live **"Open now · until 7 PM"** status, a Google review quote and the **office-tour video**:
   - A silent 30-second loop from the omnidentalpgh.com homepage hero video, trimmed to the sign,
     reception, fireplace lounge, coffee bar, treatment rooms and building exterior.
   - Compressed from **55 MB to 1.7 MB (desktop) / 0.95 MB (mobile)**.
   - A **"Watch our office tour"** button opens the full video with sound (YouTube `5wBm_JHx_30`,
     the same video the homepage's play button opens).
4. **Proof bar**: 4.9★ · 1,500+ reviews · same-day · Mon–Fri early & evening · most PPO plans
5. **Services**: 6 core general-dentistry cards, each with a CTA, plus "also available" chips (dentures, sedation, sealants, Invisalign, implants…)
6. **Why Omni**: 6 USPs taken from the site and the current LP
7. **Reviews**: a 4.9★ / 1,500+ Google rating bar, then a **continuously auto-scrolling** strip of 6
   verbatim reviews, plus 3 video testimonials. The strip:
   - always moves (40 px/s on desktop, 30 px/s on phones) and loops seamlessly;
   - slows to about a third while hovered so a review can be read;
   - can be dragged or swiped, or moved with the arrows and keyboard arrow keys;
   - has a pause button, and pauses while it has keyboard focus.
8. **CTA band**: "New Patients & Emergency Appointments Welcome!"
9. **Comfort**: amenities, an anxious-patient callout, office photo mosaic
10. **Dentists**: Drs. Hanlon, Bono and Petrie with credentials, a Hanlon video and a patient quote
11. **Technology**: cone beam CT, iTero®, digital X-rays, guided implants
12. **First visit**: 4 steps (with the New Patient Forms link) and "Are we a good fit?"
13. **Smile gallery**: 4 real before/afters
14. **Insurance & financing**: accepted plans, an **insurance check** pop-up (the practice's own
    Jotform), membership plan, CareCredit, Cherry, and a year-end "use your benefits" note
15. **Location & hours**: address, hours with today highlighted, Google map, exterior photo
16. **FAQ**: 4 booking-focused questions (new patients, same-day/emergency, insurance accepted, no insurance) in native `<details>`
17. **Final CTA** and a slim footer: © plus Privacy Policy and Terms links, kept for Google Ads policy
18. **Mobile sticky bar**: Call + Book Online, shown once the hero buttons scroll away

Booking CTAs: 17 · Click-to-call links: 12 · Directions links: 3 (plus 2 "read our Google reviews" links).

**Type & spacing:** the root size is 17px on phones and 17.6px from 700px up, about 6–10% larger
than the original 16px, and every rem-based size scales with it. Body text is 1.125rem. Phones
use tighter section padding (40px) and gaps.

## Brand match

- **Colours** from the live site and logo: navy `#02305A`, sky blue `#03A9F4`, pale `#AEE3FB`.
  CTA buttons use a slightly deeper `#0279B5` so white text passes WCAG AA (4.77:1).
- **Fonts**: body in **Josefin Sans** (the site's body font). Headings in **Belleza**, a near-exact
  open-licence match for the site's URW Classico. See "Heading font" below for why the original
  file isn't used.
- **Voice**: the practice's own phrases: *"Changing the way you feel about visiting the dentist"*,
  *"we listen"*, *"treatment starts, and stops, when you say so"*, *"dentist and comfort are complementary"*.

## Performance & checks run (Playwright, Chromium)

| Check | Result |
|---|---|
| Horizontal overflow at 320 / 390 / 768 / 1440 px | **0 px** at every width |
| Broken images | 0 (every image loads in a real scroll-through) |
| Throttled mobile (slow 4G, 4× CPU, 390 px @3x) | **LCP under 0.9 s · CLS ≈ 0 · ~48 KB before scrolling** (local server, GTM blocked) |
| Hero video | Desktop: plays after page load. Mobile: downloads only when scrolled into view. Pauses off-screen and while the full tour is open. |
| Reveal animations | Every animated block ends visible; the hero is never animated, so LCP isn't delayed |
| Reviews auto-scroll | Moves continuously at 1440 and 390 px, including with reduced motion on and while hovered (slower). Pause button, arrows, drag and the seamless loop all tested. |
| `gclid` / UTM pass-through to the booking link | Works |
| "Open now" status | Uses McMurray time (America/New_York) |

Speed choices: images are WebP with `srcset` and lazy-loaded below the fold. The hero video's
poster frame (18 KB) is the LCP image, preloaded with `fetchpriority="high"`, so the video never
slows the first paint. The loop starts only after the page has loaded. It's skipped for visitors
with reduced motion turned on, Data Saver or a 2G connection; they see the poster, and the play
button still works. YouTube players and the insurance form load only on click.
There are no jQuery, slider or icon-font libraries; icons are an inline SVG sprite.

---

## How to deploy

Upload `index.html` with the `images/` and `video/` folders, keeping the relative paths, to any host:
WordPress (as a blank-template page or static folder), Unbounce (paste into a custom HTML page and
upload the images), or a subfolder such as `omnidentalpgh.com/lp/mcmurray-dentist/`. Then point the
general-dentist ad groups at it.

**Before going live, check these:**

1. **Phone number.** The page uses **(724) 220-6862**, the number on the current McMurray Ads LP,
   which looks like a call-tracking number. The GBP and website use (724) 941-2200. If 220-6862
   isn't your Ads tracking number, change it. It appears in `tel:+17242206862` and `(724) 220-6862`.
2. **`noindex`.** The page has `<meta name="robots" content="noindex, follow">` so it never
   competes with omnidentalpgh.com in organic search. This doesn't affect Google Ads.
3. **Year-end benefits note.** It's in the insurance section (`class="season"`). Remove or reword it after 31 Dec.
4. **Conversion tracking.** GTM `GTM-T5MQFN9` (the same container as the site and current LP) is
   installed. The page also pushes these `dataLayer` events, ready for GTM triggers or Ads conversions:
   - `lp_cta_click` with `cta_type` = `book` | `call` | `directions` | `insurance_check` |
     `membership` | `financing` | `forms` | `reviews`, and `cta_location` = the section name
   - `lp_video_play` with `video_id` (the hero tour is `5wBm_JHx_30`)
5. **Test traffic.** Before I blocked tags in my tests, a few local test loads ran the GTM
   container: page views from `127.0.0.1` with `gclid=TEST123` and `utm_source=google`. If any
   show up in GA4 or Ads, filter them out.

---

## Problems found on the current live pages

These are worth fixing whether or not this page replaces the current LP.

**Current Ads LP (`/mcmurray-new-patient/`)**
1. The header reads **"New Patients IN New Union, NJ & Avenel, NJ Area"**, the wrong state entirely.
2. The embedded video is **"Welcome to Nelson Ridge Family Dental, New Lenox"**, another practice's video.
3. A **"Financial"** link goes to **pureholisticdentist.com**, another practice's website.
4. The heading says **Dr. Julie Petrie** but the bio below says **"Dr. Julie Nickman"**.
5. **"1280+ Google reviews"** is out of date; the GBP now shows **1,502**.
6. **"Are we a good fit for you?"** is repeated as the heading of the services list.
7. The second YouTube embed is a third-party video (Clerri) about membership plans.

**Main website (omnidentalpgh.com)**
1. **The home, location and service pages show testimonials from another practice.** Alyne B.,
   Libby B., Payton B. and Cory F. call Dr. Hanlon "she", and Cory's ends *"Thank you Life Smiles!"*.
   Two logo alt texts also read "dentist san antonio – life smiles dental studio logo". These came
   from a template and weren't used here.
2. **The heading font is broken for most visitors.** When a request asks for compression, as every
   browser's does, CloudFront serves its cached copy of the URW Classico file without the
   `Access-Control-Allow-Origin` header. Browsers then block the font and headings fall back to the
   default sans-serif. I confirmed this with curl and in Chromium on omnidentalpgh.com.
   Fix: in CloudFront, attach a CORS response-headers policy (or add `Origin` to the cache key and
   forward it). Until then, Belleza is a close stand-in.

## Want me to add these?

- **Dr. Anthony DeStefano**: listed on the team page but not on the McMurray location page or the
  current LP. If he sees McMurray patients, he can be added as a fourth dentist card.
- **Cherry**: mentioned without a link, because the site only embeds a widget. Send the practice's
  Cherry apply link and it becomes a button.
