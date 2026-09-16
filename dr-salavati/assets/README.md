# Assets

Drop the practice's real image files here using exactly these filenames.
The page references them by name and falls back gracefully if one is missing,
so you can add them one at a time.

| Filename | What it is | Used where | Recommended |
|---|---|---|---|
| `logo-dr-roxanne-salavati.png` | Navy-text logo (gold tooth mark + "Dr. Roxanne Salavati" + "Your Smile, My Specialty") | Sticky header, on the ivory background | PNG/SVG with transparency, ~480×92 |
| `logo-white.png` | Reversed logo — white text, gold mark | Footer, on navy | PNG with transparency, ~480×92 |
| `smile-expert.png` | Gold "SMILE EXPERT" wordmark | Currently unused — see note below | PNG with transparency |
| `dr-salavati-operatory.jpg` | Dr. Salavati in coral scrubs beside the dental chair | **Hero photo** | Portrait 4:5, ≥800×1000, WebP or JPG ≤120 KB |
| `dr-salavati-lab.jpg` | Dr. Salavati in white coat in the dental laboratory | Prosthodontics section | Landscape 4:3, ≥960×720 |
| `dr-salavati-reception.jpg` | Reception desk with orchids | Doctor section | Landscape 4:3, ≥960×720 |
| `acp.png` | American College of Prosthodontists | Hero credential rail + affiliation cards | Transparent PNG, ~180px tall source |
| `iaomt.png` | IAOMT | same | same |
| `wlads.png` | Western Los Angeles Dental Society | same | same |

## Two things worth doing before you upload

**Compress the photos.** The hero image is the LCP element — it is the single
biggest lever on this page's load speed. Export it at roughly 800×1000 and aim
for under 120 KB. `squoosh.app` or `cwebp -q 78` both do the job.

**The credential logos need transparency.** In the hero they are rendered white
via `filter: brightness(0) invert(1)`, which only looks right on a transparent
or white background. A logo on a solid grey rectangle will show the rectangle.

## About `smile-expert.png`

The gold "SMILE EXPERT" wordmark is not currently placed on the page. The header
leads with **Dr. Roxanne Salavati** instead, because for emergency traffic the
named, credentialled individual is the stronger trust signal — people in pain are
deciding whether to trust a *person*. "Smile Expert" appears as the practice name
in the doctor section, the footer and the structured data.

If you would rather lead with the practice wordmark, say so and it is a small change.
