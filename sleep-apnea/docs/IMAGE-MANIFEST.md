# Image manifest

The build ships **on-brand SVG placeholders** so nothing renders broken during
build-out. Each slot is wired to load the production photograph first and fall
back to its placeholder if the file is not there yet
(`src/components/ui/Img.jsx`), so dropping the real files into
`public/images/` is the entire swap — no code change.

## Slots

| File to add | Slot | Crop / aspect | Rendered at | Notes |
|---|---|---|---|---|
| `hero-restful-sleep.jpg` | Hero | Square (1:1) — subject centred, it is masked to a circle | 520px desktop / 320px mobile | **Supplied by client:** man asleep on his side, grey bedding. Crop square around the head and shoulders. This is the LCP image. |
| `tired-morning.jpg` | Problem recognition | Portrait ~4:5, full-bleed left column | ~600 × 460+ | **Supplied by client:** woman pressing a pillow over her ears. Leave headroom — the column crops with `object-fit: cover`. |
| `airway-open.jpg` | Airway — normal | 4:3 | ~300px wide | Illustration, not a photo. No blood, no extreme obstruction (spec 13). |
| `airway-restricted.jpg` | Airway — interrupted | 4:3 | ~300px wide | Same illustration, narrowed airway. Must stay non-alarming. |
| `oral-appliance.jpg` | Treatment + appliance viewer | Portrait ~4:5, full-bleed | ~700 × 500+ | Clear appliance held in hand, clean background. |
| `provider.jpg` | Provider trust | Portrait 4:5 | ~560 × 700 | Real provider photograph. Do not use stock here. |
| `well-rested-couple.jpg` | Final CTA | Landscape 5:4 | ~600 × 480 | Warm, awake, sunlit — the payoff shot. |

The two client-supplied photographs arrived in the brief conversation rather
than as files, so they are **not** in the repo. Save them as
`public/images/hero-restful-sleep.jpg` and `public/images/tired-morning.jpg`
and they appear immediately — the alt text is already written for them.

## Formats and sizes (spec 33)

Generate AVIF + WebP + a JPG fallback at these widths: **320, 640, 960, 1280, 1600**.
Name derivatives `<base>-<width>.<ext>` — `Img` builds the `srcset` from that
pattern when you pass `widths`:

```jsx
<Img src="/images/hero-restful-sleep.jpg" widths={[320, 640, 960]} sizes="(max-width: 767px) 320px, 520px" priority />
```

A one-liner with `sharp` or `squoosh-cli`:

```bash
for w in 320 640 960 1280 1600; do
  npx sharp -i public/images/hero-restful-sleep.jpg \
            -o public/images/hero-restful-sleep-$w.jpg resize $w
done
```

## Rules

* The hero image is **preloaded** in `index.html` and is the only eager image.
  Everything else is `loading="lazy"`.
* Always set an intrinsic `width`/`height` (or rely on the CSS aspect ratios
  already in place) so CLS stays at 0.
* Alt text is written per slot in `src/content/copy.js` — update it there, not
  in the components, and keep it descriptive of the photograph rather than the
  keyword.
* Decorative visuals (the breathing wave, the timeline traces) are inline SVG
  with `aria-hidden`; they need no alt text and no files.
