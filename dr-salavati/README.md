# Dr. Roxanne Salavati — Emergency Dentist landing page

A Google Ads landing page for the practice of **Dr. Roxanne Salavati, DMD**,
board-certified prosthodontist, 436 N Roxbury Dr, Beverly Hills — built for the
emergency / urgent / same-day keyword set across Beverly Hills, West Hollywood
and Century City.

Two pages, one design system, each built for its own keyword set:

| Page | Ad group | Primary CTA |
|---|---|---|
| **[`emergency-dentist-beverly-hills.html`](emergency-dentist-beverly-hills.html)** | Emergency / urgent / same-day / open now | Call |
| **[`prosthodontist-beverly-hills.html`](prosthodontist-beverly-hills.html)** | Prosthodontist / cosmetic / veneers / comprehensive | Book a consultation |

Both are single self-contained files — open one in a browser and it renders.

Every fact on it is sourced from drroxannesalavati.com or the supplied assets.
The only thing between it and publication is dropping the image files into
`assets/` — see [`docs/SETUP.md`](docs/SETUP.md).

## Why it looks the way it does

13 of the 19 supplied keywords are emergency, urgent, same-day or open-now
terms — but the practice is a navy-and-gold prosthodontic office on the
Westside. So the page resolves urgency with composure: maroon is reserved
exclusively for urgency signals, gold carries the actions, navy is the ground.
Fast and immediately actionable without looking like a walk-in clinic.

Full reasoning in [`docs/INTENT-MAP.md`](docs/INTENT-MAP.md).

One fact reshaped the copy more than any other: she sees **one patient at a
time, 1–2 appointments a day**. So the page never promises "same-day" — it says
emergencies are prioritised, the day's time is genuinely limited, and you get
a real time on the call. Honest, and in Beverly Hills a stronger proposition
than a crowded urgent-care waiting room.

## The two things that make it different

**A live opening-status engine.** Three keyword clusters literally ask "open
now". The status chip computes against the practice's real hours in
`America/Los_Angeles`, regardless of the visitor's timezone, refreshes every 60
seconds, and switches to urgency styling in the last 90 minutes before closing
("Closing at 6 PM — 55 min left to call today"). If hours aren't confirmed it
says so rather than guessing.

**A symptom triage module** in place of a services grid. Eight real dental
emergencies; tapping one gives what it usually means, what to do in the next
ten minutes, how urgently to be seen, and a CTA — and pre-fills the form so the
front desk knows what the callback is about. Genuinely useful content, which is
what Landing Page Experience actually rewards.

## Build notes

| | |
|---|---|
| Size | 88 KB raw, **25.7 KB gzipped**, images excluded |
| Dependencies | **None.** No framework, no animation library, no jQuery |
| Requests | 1 stylesheet (Google Fonts), then images. Map iframe lazy-loads on scroll |
| 3D | CSS `perspective` only — no WebGL, no canvas. Pointer-only, disabled on touch |
| Motion | One entrance gesture, `IntersectionObserver` fires once then unobserves |
| Verified | 390 / 768 / 1440 px — 0 px horizontal overflow, no console errors |
| a11y | One `h1`, no heading skips, all inputs labelled, all tap targets ≥44 px, visible focus, full `prefers-reduced-motion` support |
| Schema | `Dentist` + `FAQPage` JSON-LD with the real NAP, hours, specialty and payment methods |
| Closed state | When the office is closed the hero tells the visitor when it opens and what to do, without moving the call button |

## Structure

```
emergency-dentist-beverly-hills.html    emergency page (call-first)
prosthodontist-beverly-hills.html       prosthodontist / cosmetic page (consult-first)
assets/README.md                        which image goes where
docs/SETUP.md                           what to fill in before publishing
docs/INTENT-MAP.md                      keyword intent → page decisions (emergency)
docs/INTENT-MAP-prosthodontist.md       keyword intent → page decisions (prosthodontist)
```
