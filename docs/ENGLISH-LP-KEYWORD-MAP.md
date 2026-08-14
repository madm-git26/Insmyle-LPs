# English Landing Pages — Build Notes & Keyword Map

Two English Google Ads landing pages built as **exact structural clones** of the Spanish
landing page you supplied (`lp-spanish/dentista-cerca-de-ti-chicago.html`).

| # | Page | Ad group | File |
|---|---|---|---|
| 1 | General Dentist | General / near-me / Saturday | [`lp-english/general-dentist-chicago.html`](../lp-english/general-dentist-chicago.html) |
| 2 | Emergency Dentist | Emergency / urgent / walk-in | [`lp-english/emergency-dentist-chicago.html`](../lp-english/emergency-dentist-chicago.html) |

Both pages are **complete standalone HTML documents** — open either in a browser and it
renders as the full styled page.

---

## Design parity — verified, not assumed

| Check | Result |
|---|---|
| `<style>` block | **Byte-identical** to the Spanish source (md5 `54da6962…` on all three files). Zero CSS edits, zero additions. |
| `<script>` block | **Byte-identical** (md5 `ec11986d…`). Rotator, marquee duplication and scroll-reveal all unchanged. |
| Fonts | Unchanged — Bricolage Grotesque + Instrument Sans, same Google Fonts URL. |
| Colours / theme | Unchanged — same `:root` variables (`--amber #04b2dd`, `--orange #ff7a00`, `--urgent #e0472f`). |
| Animations | Unchanged — `floaty`, `pulseDot`, `ringPulse`, `fadeUp`, `scrollX`, `.rv` reveals, hero `f1`–`f5` stagger. |
| Section count & order | **14 blocks, identical order** on all three pages. |
| Heading structure | `h1`×1, `h2`×9, `h3`×18 — identical on all three. |
| Component counts | 8 keyword cards, 15 insurance logos, 3 membership plans, 3 reviews — identical. |
| CTA counts | 8 `tel:` links, 9 booking links — identical. |
| Line endings | CRLF throughout, matching the source file. |
| Horizontal overflow | **0 px** at 1440 px and 390 px on both pages. |

### The only two deliberate markup differences

Both are in the footer's **third column**, which was empty on the Spanish page:

1. **`foot-social` removed (1 → 0).** On the Spanish page the entire social-icon column sits
   inside an HTML comment — it never rendered. That dead block was replaced with a live
   "Areas we serve" column, which fills the third grid slot the CSS already reserves
   (`.foot-grid{grid-template-columns:1.4fr 1fr 1fr}`).
2. **`foot-hours` reused (1 → 2).** The new areas list reuses the existing dashed-divider
   list style so it matches the office-hours column beside it. **No new CSS** — it is an
   existing class applied to a second element.

### Bug fixed (present in the Spanish original)

The Spanish source never closes the `<div class="wrap">` inside the same-day-crowns
section, leaving `html`, `body`, `section` and `div` unclosed at EOF. Browsers auto-recover,
so it renders — but it is invalid markup. **Both English pages close every tag correctly**
(verified: 0 unclosed, 0 mismatched).

---

## Phone number & booking link — why they were kept

The Spanish page uses `(773) 915-6270` and `referrer_id=6`. Both were **kept unchanged**
after confirming against the live site: `insmyledental.com/general-dentistry/` and
`/treatments/dental-emergency/` both publish **(773) 915-6270** as the practice number.

> Note: the live emergency page also lists a separate line, **(773) 900-5055**. It is *not*
> used on these pages — adding a second number would split call-tracking. Say the word and
> it can be swapped in on the emergency page.

---

## Keyword coverage — 100% of the supplied list

Counted against visible copy + `<title>` + meta description. "Close variant" means the
phrase is present with a hyphen or minor function word difference that Google treats as
equivalent (e.g. *walk-in* vs *walk in*).

### Page 1 — General Dentist (1,525 words)

**General keywords — 9/9**

| Keyword | Where it lives |
|---|---|
| `dentist near me` ×8 | **H1 area**, hero lead, kw-card 1 H3, kw-card 2 H3, section sub-head, evening lead, reviews sub-head, meta |
| `dentist open saturday` ×3 | **H1 rotator**, hero lead (bold), kw-card 4 H3 |
| `dental clinic near me` | Hero lead (bold) |
| `best dentist near me` | Reviews section sub-head |
| `dentist in chicago` | **H1**, title tag |
| `dentist chicago il` | Footer areas list, title tag |
| `dentist lincoln park` | Footer areas list |
| `dentist roscoe village` | Footer areas list |
| `roscoe village dentist` | Section sub-head, footer areas list |

**Common keywords — 6/6**
`dentist near me` ×8 · `dental office near me` (evening lead) · `dentist near me open now`
(kw-card 2 H3) · `best dentist near me` (reviews sub) · `family dentist near me`
(kw-card 7 H3) · `emergency dentist near me` (kw-card 5 H3)

**Location keywords — 20/20** — all in the footer "Areas we serve" column plus the
keyword-section sub-head (`Lakeview dentist`, `Roscoe Village dentist`, `Lincoln Park dentist`)
and kw-cards 1 & 6 (`3514 N Lincoln Ave, Chicago, IL 60657`, `dentist on Lincoln Ave, Chicago`,
Belmont / Addison / Wrigley Field).

### Page 2 — Emergency Dentist (1,667 words)

**Emergency keywords — 9/9**

| Keyword | Where it lives |
|---|---|
| `emergency dentist` ×12 | **H1**, hero card H3, eyebrow, kw-cards 1 & 2, evening lead, crown eyebrow, footer |
| `urgent dental care` ×7 | Hero lead, section H2, kw-cards 3/4/7, evening lead, insurance sub |
| `emergency dentist in chicago` ×4 | **Hero lead (bold)**, kw-card 2, title tag, meta |
| `emergency dentist near me` ×3 | **Section sub-head**, kw-card 1 H3, meta |
| `emergency dentist chicago` | Crown section eyebrow label |
| `chicago emergency dentist` | Section copy |
| `dentist emergency near me` | Red urgency strip |
| `urgent care dental clinic near me` | **Section sub-head** |
| `walk in dentist chicago` | **kw-card 3 H3** (`Walk-in dentist Chicago`), hero lead |

**Common keywords — 6/6** · **Location keywords — 20/20** (same footer column + final CTA
tagline carrying `Lakeview dentist · Roscoe Village dentist · Lincoln Park dentist`)

### Density check

| Page | Primary term | Count | Density |
|---|---|---|---|
| General | `dentist near me` | 8 | 1.57% |
| Emergency | `emergency dentist` | 12 | 1.44% |

Every placement is a grammatical sentence a patient would actually read. Nothing is hidden,
white-on-white, or stuffed into `alt` text.

> **One judgement call to review:** the footer "Areas we serve" column is 13 lines of
> place-name phrases. It is the conventional, lowest-risk home for location keywords, but it
> is the densest block on either page. If you would rather trade a little coverage for a
> lighter footprint, cut it to the top 6–8 neighbourhoods — everything else on the page is
> unaffected.

---

## Content sources

All factual claims trace to the Spanish source page you supplied, or to the live site
(`insmyledental.com`), consistent with [`VERIFIED-FACTS.md`](VERIFIED-FACTS.md):

- **Hours** — Mon 7–7, Tue 8–6, Wed 7–6, Thu 7–7, Fri closed, Sat 7–3, Sun closed.
- **Membership pricing** — Child $44/mo ($528/yr), Adult $48/mo ($576/yr), Perio $73/mo
  ($876/yr), carried over verbatim from the Spanish page.
- **Insurance** — the same 15 carrier logos, same CDN URLs.
- **Emergencies treated** — chipped/cracked teeth, lost fillings, lost crowns, knocked-out
  teeth, toothache and nerve pain, swelling, bleeding, infections (from the live
  `/treatments/dental-emergency/` page).
- **Same-day crowns** — the practice's own "Your Crown. Same Day. No Waiting, No Temps"
  positioning.

### Two things to confirm before launch

1. **Reviews.** The three testimonials on each page mirror the Spanish page's format —
   anonymised ("— Lakeview patient") and illustrative rather than pulled from a specific
   Google review. Swap in real verbatim Google reviews before spending on these pages.
2. **"Best of 2026 Award Winner".** Carried over from your Spanish page, including the same
   CDN image. Kept because it is your own published asset — but the awarding body was never
   confirmed (see `VERIFIED-FACTS.md`).

---

## Emergency-page safety note

The "What to do right now" box gives standard dental first aid (knocked-out tooth handling,
swelling guidance) and carries an explicit escalation line: *facial trauma, uncontrolled
bleeding, or trouble breathing or swallowing → nearest hospital ER or 911.* This reduces
liability exposure rather than creating it, and matches the approach already used on
`enhanced/emergency-dentist-chicago.html`.
