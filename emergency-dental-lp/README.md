# Dental Emergency Care — landing page

A responsive single-page React app built from the supplied mockup: dark midnight-blue theme,
glassmorphic panels, a central tooth visual with six orbiting service nodes, floating status
cards, and a five-card service grid.

## Running it

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the build
```

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4** via `@tailwindcss/vite` — no `tailwind.config.js`; theme extensions live in
  the `@theme` block at the top of `src/index.css`. Every utility used (`bg-[#070b14]`,
  `bg-white/5`, `backdrop-blur-md`, `text-blue-400`) behaves identically in v3 if you move it.
- **lucide-react** for icons. Lucide has no tooth glyph, so `ToothMark.jsx` supplies one.
- **Inter** is bundled via `@fontsource-variable/inter` rather than a Google Fonts link — no
  render-blocking external request, and it works offline.

## Design tokens

| Token | Value |
|---|---|
| Page background | `#070b14` |
| Primary text | white |
| Accent | `text-blue-400` |
| Secondary text | `text-gray-400` |
| Glass surface | `bg-white/5` + `backdrop-blur-md` + `border-white/10` + soft shadow |

## Structure

Sections in order: Hero → Services → Treatments → Why Us → About → Reviews → Contact → Footer.

```
src/
  App.jsx                  page shell, skip link, static ambient background
  data/content.js          ALL copy, service list and orbit angles
  hooks/useActiveSection.js  IntersectionObserver scrollspy for nav highlighting
  components/
    Header.jsx             logo, desktop nav, mobile menu, phone pill
    Hero.jsx               three-column hero, orbit ring, connector web
    OrbitNode.jsx          one glass node; position derived from its angle
    ToothPlaceholder.jsx   the swappable tooth slot
    StatCards.jsx          the four floating widgets
    EkgLine.jsx  ProgressRing.jsx  ToothMark.jsx
    Section.jsx            shared section shell (eyebrow / heading / rhythm)
    Services.jsx  ServiceCard.jsx
    Treatments.jsx  WhyUs.jsx  About.jsx  Reviews.jsx
    Contact.jsx            form + hours + address
    Footer.jsx             safety notice, nav columns, legal
```

## The contact form

No backend is wired up — `onSubmit` simulates a send. Replace that one `setTimeout` with a real
request. The form already handles the surrounding UX:

- Visible labels, required markers, and an "Optional" marker on optional fields
- Validation on **blur**, not on keystroke; typing only clears an existing error
- Errors render below their field with `role="alert"`, `aria-invalid` and `aria-describedby`
- The message line under each input is a **reserved 16px slot**. Without it, showing an error
  reflows the form — and if that happens between mousedown and mouseup, the submit button moves
  and the click is silently dropped.
- The multi-error summary only appears **after a submit attempt** (same reason, and you shouldn't
  be told to "fix 2 fields" before you've tried to submit)
- On a failed submit, focus moves to the first invalid field — from an effect, so it runs after
  React commits rather than racing it
- Submit disables and shows a spinner; success replaces the form with a confirmation that points
  at the phone number for urgent cases

**All copy lives in `src/data/content.js`.** Edit it there rather than in the JSX.

## Swapping in real 3D tooth assets

Every tooth slot is already wired to a file path. **Drop your renders into `public/teeth/`
using the names in [`public/teeth/README.md`](public/teeth/README.md) and they appear — no code
changes.** Anything missing falls back to the built-in vector tooth, so the page never shows a
broken image.

Verified layout-identical across all three states (page height and every section box byte-for-byte
the same, zero broken images, zero console errors):

| Assets present | `<img>` rendered | Vector fallbacks | Page height |
|---|---|---|---|
| 0 | 0 | 13 | 5467px |
| 11 | 11 | 2 | 5467px |
| 13 | 13 | 0 | 5467px |

Paths are declared once in `src/data/content.js` via the `tooth()` helper, which respects Vite's
`base` so they survive a sub-path deploy. To use WebP instead of PNG, change the extensions there.

## Orbit positions

Node placement is computed from the `angle` (degrees) on each entry in `orbitNodes`, not from
hand-tuned offsets — so the ring stays even and symmetric. To move a node, change its angle. The
ring radii are CSS custom properties on the orbit container in `Hero.jsx`
(`--orx` / `--ory`), set per breakpoint so nothing gets clipped on small screens.

## Responsive

Three-column hero at `lg` and up; below that it stacks copy → status cards → visual. Service grid
runs 5 → 3 → 2 → 1 across `xl` / `lg` / `sm` / base. Verified at 1600, 1440, 1280, 1024, 768, 430
and 375 with no horizontal overflow and nothing clipped.

## Verified

Checked at 1600 / 1440 / 1280 / 1024 / 768 / 430 / 375:

- Production build clean; zero console errors and zero page errors at every width
- No horizontal overflow; no content clipped outside the viewport
- **All 159 text nodes meet WCAG AA contrast** (lowest 3.93:1, on 32px step numerals which need 3:1)
- 31 focusable elements, all keyboard-reachable, with a visible focus ring
- Skip link to `#main`; one `h1`, nine `h2`, no skipped levels
- Every input, select and textarea has an associated `<label for>`
- All decorative SVGs hidden from assistive tech
- Mobile menu: 48px tap targets, `aria-expanded`, closes on Escape, scroll locked while open
- `prefers-reduced-motion` leaves **zero** running animations, with the phone CTA still present

Contrast was measured by resolving every colour through a canvas — Tailwind 4 emits `oklch()`,
which a naive RGB parser misreads badly (it reported 35 false failures before this was fixed).

## Before this goes live

These values came from the mockup and are **illustrative, not verified**. Replace them in
`src/data/content.js` before running real traffic:

| Value | Where |
|---|---|
| `205-123-4567` | `brand.phone` / `brand.phoneHref` |
| `4.9` and `500+ Patient Reviews` | `rating` |
| `72 BPM` | `statCards.patientStatus` |
| `98%` patient satisfaction | `statCards.careQuality` |
| `24/7` emergency availability | `statCards.emergency` |
| `500+` happy patients | `statCards.patients` |

Two of these carry real risk on a healthcare page running paid traffic:

- **`24/7`** — if this page is for the Homewood practice in this repo, its recorded hours are
  Monday–Thursday 8:00am–4:00pm with Friday closed. Advertising round-the-clock emergency care
  against those hours is both a Google Ads misrepresentation exposure and a patient who turns up
  to a locked door.
- **The `72 BPM` patient-status card** reads as a live vital sign. It isn't measuring anything.
  Consider relabelling it to something factual before launch.

Nav links, the "Learn More" links and "View All Services" are in-page anchors — point them at real
destinations when the rest of the site exists.
