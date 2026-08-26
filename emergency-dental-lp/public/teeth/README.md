# Tooth artwork

Drop files here using the exact names below and they appear on the page automatically —
no code changes. Any file that is missing (or fails to load) falls back to the built-in
vector tooth, so the page never shows a broken image and always looks finished.

Paths are declared once in `src/data/content.js` via the `tooth()` helper, which respects
Vite's `base` setting so they survive a sub-path deploy.

## Supplied so far

Extracted from the reference images the client sent, background-keyed and resized:

| File | Source | Notes |
|---|---|---|
| `hero-molar.webp` | glossy molar on dark ground | dark background keyed out by border flood-fill |
| `service-root-canal.webp` | cross-section with endo file | arrived with real alpha, resized only |
| `orbit-root-canal.webp` | same | small variant |
| `service-extraction.webp` | forceps + extracted tooth | transparency checkerboard was baked in as flat pixels and had to be keyed back out |
| `orbit-extraction.webp` | same | small variant |
| `service-infection.webp` | inflamed tooth with red roots | arrived with real alpha, resized only |
| `orbit-infection.webp` | same | small variant |
| `service-crown.webp` | crown lifted above a prepared tooth | checkerboard baked in; alpha recovered by unmixing (below) |
| `orbit-crown.webp` | same | small variant |
| `service-broken.webp` | cracked molar | same, and the harder of the two |
| `orbit-broken.webp` | same | small variant |

The remaining slots resolve to `undefined` in `content.js` and render the vector tooth, so there
are no failed requests for artwork that doesn't exist yet. Add a file and point its entry at it.

## Recovering the two checkerboard screenshots

The emergency crown and the cracked tooth arrived as **screenshots of an editor's transparency
preview**: the grey/white checkerboard is baked into the pixels as ordinary colour, with no alpha
channel left. They are in anyway, and the method is worth recording.

The first approach was to *segment* the tooth — classify each pixel as subject or background and
flood-fill. That always left a ragged halo, because it works in **colour space**, where the
render's soft cast shadow and the tooth genuinely overlap: a grey shadow pixel at 228 and a shaded
tooth pixel at 228 are the same number, and no threshold separates them.

The working method reads alpha out of the image instead. A checkerboard composite is
`observed = a*S + (1-a)*B` with `B` alternating between two known tones on a known grid, so the
**local amplitude of the checker pattern is `(1-a)*CONTRAST`** — the alpha channel, directly. It
measures full contrast in open background, ~0 across the tooth, and a smooth ramp between, which
also shows the fringe is semi-transparent rather than opaque artwork. In **alpha space** the
shadow (~0.3) and the tooth (~1.0) then separate with an ordinary threshold.

Four things had to be right:

- **The grid is fractional and anisotropic** — 13.155 x 13.038 for the crown, 19.332 x 19.093 for
  the cracked tooth, since both frames were resized. An integer period slips phase across the image
  and every reading fails in the far corners. It is fitted by least squares to sub-pixel edge
  positions, to under a pixel of residual.
- **Pair each pixel with the same point one full period away**, rather than comparing the two grid
  parities by their means over a window. A window's parity means are phase-biased — which parity
  the tooth covers more of swings with the grid phase — and where the subject's colour coincides
  with one of the tones (the cracked tooth's specular rim is the same 255 as the light square) that
  swing scallops the silhouette into a gear. Pairs are self-balanced by construction, and taking the
  forward and backward partner together also cancels the tooth's own shading gradient.
- **Average each parity separately, then weight the two halves equally.** The residual swing
  cancels only if the two parities are represented equally, and a plain window average is merely as
  balanced as the pixel counts that happen to fall in it.
- **Un-premultiply: `S = (v - (1-a)*B) / a`.** Not optional. Without it every partly transparent
  edge pixel keeps the light checker colour baked in and the halo returns the moment the image is
  composited onto a near-black panel.

Enclosed background — the gap between crown and prepared tooth, the gap between the two roots —
needs no special handling, because a local amplitude reading is full-contrast there. Strong subject
structure (the crack's dark interior, the occlusal grooves) does fake an amplitude and punch holes,
but every one of those is enclosed by tooth while the real gaps open onto the border, so
reachability separates them exactly.

The averaging width is per image (`win`, in checker periods): wider is smoother but closes narrow
gaps. The crown frame carries only 17 levels of checker contrast against a near-white subject, so
it needs 2 periods and can afford them; the cracked tooth uses 1.5.

Even so, a re-export carrying a real alpha channel would beat both of these. If those files turn
up, dropping them in needs no code change.

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
