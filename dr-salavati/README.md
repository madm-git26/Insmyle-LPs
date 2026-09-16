# Dr. Roxanne Salavati — Emergency Dentist landing page

A Google Ads landing page for **Smile Expert**, the practice of Dr. Roxanne
Salavati, DMD (Prosthodontics), built for the emergency / urgent / same-day
keyword set in the West Hollywood – Beverly Hills – Century City area.

**[`emergency-dentist-west-hollywood.html`](emergency-dentist-west-hollywood.html)** — one
self-contained file. Open it in a browser and it renders.

> ⚠️ **Not publishable yet.** Phone number, address, hours and form endpoint
> were not supplied and are placeholders. The page shows a banner listing what
> is missing, withholds its structured data, and refuses to display an "open
> now" status until the hours are confirmed. See [`docs/SETUP.md`](docs/SETUP.md).

## Why it looks the way it does

13 of the 19 supplied keywords are emergency, urgent, same-day or open-now
terms — but the practice is a navy-and-gold prosthodontic office on the
Westside. So the page resolves urgency with composure: maroon is reserved
exclusively for urgency signals, gold carries the actions, navy is the ground.
Fast and immediately actionable without looking like a walk-in clinic.

Full reasoning in [`docs/INTENT-MAP.md`](docs/INTENT-MAP.md).

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
| Schema | `Dentist` + `FAQPage` JSON-LD, generated at runtime and **suppressed while any placeholder remains** |

## Structure

```
emergency-dentist-west-hollywood.html   the page
assets/README.md                        which image goes where
docs/SETUP.md                           what to fill in before publishing
docs/INTENT-MAP.md                      keyword intent → page decisions
```
