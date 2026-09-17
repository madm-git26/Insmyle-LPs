# Design System — Dr. Roxanne Salavati, DMD (Beverly Hills)

> Produced with the ui-ux-pro-max workflow (Step 1 analyse → Step 2 design
> system → Step 3 domain rules → Step 4 stack rules), persisted in the skill's
> Master + Overrides format. The skill's search engine (`scripts/search.py` +
> `data/`) is not present in this environment, so the selections below were
> made by hand against the skill's Quick Reference and reasoning rules, and
> constrained by the practice's real brand assets. Dials: variance 5 ·
> motion 4 · density 3 (spacious — marketing page).

## Step 1 — Analysis

| | |
|---|---|
| Product type | Healthcare service · local specialist practice · lead-gen landing pages (Google Ads) |
| Audience | Adults 30–65, Westside LA, high disposable income, researching on mobile; two intents: **emergency** (urgent, call) and **specialist/cosmetic** (considered, consult) |
| Style keywords | premium, editorial, calm, precise, trustworthy, medical-appropriate, *not* tech/crypto/gaming |
| Stack | Static HTML + CSS + vanilla JS (no framework). `--stack html-tailwind` guidance applied conceptually: utility-scale tokens, mobile-first breakpoints |
| Brand inputs | Navy wordmark, gold tooth mark, maroon rule, "SMILE EXPERT" Didone wordmark, tagline "Your Smile, My Specialty", real doctor/office photography |

## Step 2 — Design system

### Pattern
**Hero-centric → proof → self-selection → process → authority → social proof → logistics → FAQ → CTA.**
One primary CTA per page (`primary-action`), repeated at natural decision points, never after every paragraph.

### Style
**Luxury Editorial Minimalism** — ivory surfaces, navy ground, gold used as a precision accent (rules, numerals, italics), one restrained glass surface (hero fact cards), depth from layered photography rather than effects. Anti-patterns avoided: neon, heavy gradients, particle motion, emoji icons, dashboard/HUD framing, template 3-column grids.

### Colour — semantic tokens (map to brand raw values)

| Token | Value | Role |
|---|---|---|
| `--surface` | `#FBF8F3` ivory | page ground (light) |
| `--surface-2` | `#FFFFFF` | cards on light |
| `--surface-3` | `#F3EDE4` sand | alternating sections |
| `--surface-dark` | `#0B1430` navy-900 | dark sections, hero (emergency) |
| `--surface-dark-2` | `#101C42` navy-800 | cards on dark |
| `--primary` | `#16255A` navy-700 | primary action on light, headings |
| `--primary-hover` | `#1E3270` navy-600 | |
| `--on-primary` | `#FFFFFF` | |
| `--accent` | `#DCB94F` gold-400 | primary action on dark; numerals; italics on dark |
| `--accent-strong` | `#7E6114` gold-700 | small gold text on light (≥5.5:1) |
| `--accent-line` | `#C9A227` gold-500 | rules, icon strokes (≥3:1 non-text) |
| `--urgent` | `#7B1E28` maroon | urgency signals **only** — never decoration |
| `--on-surface` | `#12182B` | body text on light (≥13:1) |
| `--on-surface-muted` | `#57607A` | secondary text on light (5.9:1) |
| `--on-dark` | `#E6E9F2` | body on navy |
| `--on-dark-muted` | `#AFB7CE` | secondary on navy (≥7:1) |
| `--line` / `--line-dark` | `rgba(18,24,43,.13)` / `rgba(235,208,138,.20)` | dividers, both themes |

Rules: every text pair measured ≥ 4.5:1 (small) / 3:1 (large); gold never used for small text on light except `--accent-strong`; functional colour always paired with text/icon (`color-not-only`).

### Typography — roles

| Role | Face | Size (mobile → desktop) | Weight / tracking |
|---|---|---|---|
| Display (h1) | Playfair Display | 31 → 54px, lh 1.06 | 400, −0.018em, gold italic emphasis |
| Headline (h2) | Playfair Display | 28 → 43px, lh 1.11 | 400, −0.016em |
| Title (h3) | Inter | 15.5–25px, lh 1.3 | 650, −0.015em |
| Body | Inter | 17px, lh 1.62 | 400 |
| Body-sm | Inter | 14–15.5px, lh 1.55 | 400–500 |
| Label | Inter | 11.5–12.5px, tracking .13–.16em, uppercase | 700 |
| Numerals (hours, stats) | Inter tabular | — | `font-variant-numeric: tabular-nums` |

Pairing rationale: Playfair's high-contrast Didone forms echo the SMILE EXPERT wordmark; Inter carries UI and body without competing. Body never below 14px; mobile body 17px (`readable-font-size`). Measure 45–75ch everywhere (`line-length`).

### Spacing — density 3 (spacious)

| Token | px | Use |
|---|---|---|
| `--space-1` | 8 | icon gaps, chip padding |
| `--space-2` | 16 | component internal |
| `--space-3` | 24 | card padding, list gaps |
| `--space-4` | 32 | component ↔ component |
| `--space-5` | 48 | section header ↔ content |
| `--space-6` | 64 | section padding (mobile) |
| `--space-7` | 96 | section padding (desktop) |

Container 1180px; gutters 20px mobile → 32px tablet+ (`adaptive gutters`).

### Effects
Radius scale 8 / 12 / 18 / 26. Shadow scale sm / md / lg only (`elevation-consistent`). Blur used once per page, on hero fact cards, as a surface not decoration. Borders 1px, visible in both themes.

### Motion tokens
Ease `cubic-bezier(.16,1,.3,1)`. Micro 200–280ms; entrance 450ms; stagger 45ms; ambient hero drift 34–36s (sub-perceptual, disabled under reduced-motion). Transform/opacity only. Every reveal fires once then unobserves.

### Landing structure rules (Step 3, `--domain landing`)
- Hero answers what / for whom / why trust / what next in ≤3s; primary CTA above the fold at 390×667 and 1280×720.
- A **proof ribbon** of verified facts sits directly under the hero CTAs (numbers > adjectives).
- Section headers use the **editorial two-column** layout at ≥900px (headline left, lede right) — no empty half-columns.
- Self-selection module (symptom / goal) replaces generic service grids.
- Social proof is verbatim and attributed; no invented ratings.
- Location + hours carry a live open/closed state.
- One sticky mobile bar: primary + secondary, 44px+ targets, safe-area padded.

### Anti-patterns (from the skill's list, all avoided)
Emoji icons · hover-only interactions · animating width/height for layout · placeholder-only labels · fixed px containers · disabled zoom · gray-on-gray · raw hex in components · >500ms animations · decorative parallax · nav that leaks Ads traffic.

## Page overrides
See `pages/prosthodontist.md` and `pages/emergency.md`.
