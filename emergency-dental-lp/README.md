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

```
src/
  App.jsx                  page shell + static ambient background
  data/content.js          ALL copy, service list and orbit angles
  components/
    Header.jsx             logo, nav, phone pill
    Hero.jsx               three-column hero, orbit ring, connector web
    OrbitNode.jsx          one glass node; position derived from its angle
    ToothPlaceholder.jsx   the swappable tooth slot
    StatCards.jsx          the four floating widgets
    EkgLine.jsx  ProgressRing.jsx  ToothMark.jsx
    Services.jsx  ServiceCard.jsx
```

**All copy lives in `src/data/content.js`.** Edit it there rather than in the JSX.

## Swapping in real 3D tooth assets

Photoreal teeth can't be generated from code, so every tooth slot renders a glowing radial
gradient with a vector silhouette on top. `ToothPlaceholder` takes an optional `src`:

```jsx
<ToothPlaceholder src="/teeth/root-canal.png" alt="" className="size-full" />
```

Dimensions are identical with or without an image, so dropping assets in causes no layout shift.
Use transparent-background PNG or WebP. For the service cards, add a `src` to each entry in
`services.items` and pass it through — `ServiceCard` already accepts it.

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

- Production build clean, no console errors or page errors at any breakpoint
- No horizontal overflow; no content clipped outside the viewport
- All 68 text nodes meet WCAG AA contrast (lowest 5.25:1)
- 16 focusable elements, all reachable by keyboard, with a visible focus ring
- All 34 decorative SVGs hidden from assistive tech
- `prefers-reduced-motion` disables the orbit float and ring rotation

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
