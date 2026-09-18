# Assets

Every image on both landing pages is **embedded in the HTML as a data URI**, so
each page is a single self-contained file that renders anywhere. The files in
this folder are the sources, kept for reference and for a future hosted build
(switching back to `src="assets/…"` lets the browser cache them across pages).

## Sources

| File | Source | Used |
|---|---|---|
| `logo-dr-roxanne-salavati.png` | supplied by client (= site `dr-roxanne-salavati.png`) | header, both pages |
| `logo-white.png` | drroxannesalavati.com `img-roxanne-salavati-logo.png` | footer, both pages |
| `dr-salavati-lab.webp` | supplied by client (= site `img-Meet-Dr-Roxanne-Salavati.webp`) | prosthodontist hero; emergency prosthodontics section |
| `dr-salavati-operatory.webp` | site `img-One-Patient-One-Focus-One-Standard.webp`, re-encoded 480w | emergency hero; prosthodontist doctor section |
| `dr-salavati-reception.webp` | site `img-Smile-Expert-home.webp` | prosthodontist materials tile; emergency doctor section |
| `roxbury-medical-building.webp` | site `img-roxbury-medical-building.webp` | location wayfinding card, both pages |
| `result-veneers.webp` · `result-whitening.webp` · `result-gap-closure.webp` | site `img-smile-transformation-*.webp` (watermarked before/after) | prosthodontist results section |
| `acp.png` · `iaomt.png` · `wlads.png` · `ada.svg` · `cda.png` · `smart.png` | site affiliation logos | affiliation tile / rail / cards |

Photos were re-encoded through the browser canvas (WebP, q0.8, ≤480px wide)
to keep the embedded weight down; logos are the originals. `smart.png` is
downloaded but not yet placed on a page.

## Not used, but available on the site

`img-Patient-Reviews.webp` (1920×1012, doctor showing a patient a mirror),
`img-dentist-and-patient*.webp`, `img-services-Cone-Beam/Laser/Ozone/
Piezoelectric.webp` (equipment photos), `img-banner-poster.webp` (Beverly Hills
sign), and the stock-style condition photos. All are in the site's
`/wp-content/uploads/2026/0{6,7}/` folder if you want any of them added.
