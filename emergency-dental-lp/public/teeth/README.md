# Tooth artwork

Drop files here using the exact names below and they appear on the page automatically —
no code changes. Any file that is missing (or fails to load) falls back to the built-in
vector tooth, so the page never shows a broken image and always looks finished.

Paths are declared once in `src/data/content.js` via the `tooth()` helper, which respects
Vite's `base` setting so they survive a sub-path deploy.

## Files needed (13)

| File | Used for | Rendered at (1440px) | Suggested export |
|---|---|---|---|
| `hero-molar.png` | the large central tooth | ~255 × 255 | 1024 × 1024 |
| `orbit-root-canal.png` | orbit node — Root Canal Therapy | ~50 × 50 | 256 × 256 |
| `orbit-crown.png` | orbit node — Emergency Crown | ~50 × 50 | 256 × 256 |
| `orbit-infection.png` | orbit node — Infection Treatment | ~50 × 50 | 256 × 256 |
| `orbit-pain-relief.png` | orbit node — Pain Relief Care | ~50 × 50 | 256 × 256 |
| `orbit-broken.png` | orbit node — Broken Tooth Repair | ~50 × 50 | 256 × 256 |
| `orbit-extraction.png` | orbit node — Tooth Extraction | ~50 × 50 | 256 × 256 |
| `service-root-canal.png` | service card | ~150 × 185 | 600 × 780 |
| `service-crown.png` | service card | ~150 × 185 | 600 × 780 |
| `service-extraction.png` | service card | ~150 × 185 | 600 × 780 |
| `service-broken.png` | service card | ~150 × 185 | 600 × 780 |
| `service-infection.png` | service card | ~150 × 185 | 600 × 780 |
| `about.png` | About section panel | ~330 × 330 | 1024 × 1024 |

## Specs

- **Transparent background.** The page is near-black with glowing panels behind each slot;
  a baked-in background will show as a visible rectangle.
- **PNG or WebP.** WebP is roughly 30% smaller at the same quality — rename the entries in
  `src/data/content.js` if you use it.
- Export at **roughly 2× the rendered size** (the table's suggestions already are). Larger
  wastes bandwidth on a page whose job is a phone call.
- Every slot uses `object-fit: contain`, so **aspect ratio is preserved** and nothing is
  cropped. Square exports work fine for the orbit and hero; the service cards read best
  slightly taller than wide.
- Keep the subject **centred with a little padding** — the orbit nodes are circular and will
  clip a subject that runs to the edge.
- Light the subject from the **upper left** to match the rest of the page.

## Behaviour

- The hero tooth loads eagerly (it is above the fold); everything else is `loading="lazy"`.
- Slots keep their exact box size whether they hold an image or the vector fallback, so
  adding assets causes **no layout shift** — verified: page height and every section box are
  byte-identical with 0, 11 and 13 assets present.
- Until you add files, the browser will request them and fall back silently. That is
  harmless, but it does log failed requests in the console — they disappear once the files
  are in place.
