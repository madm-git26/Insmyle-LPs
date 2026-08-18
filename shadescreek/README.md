# Shades Creek Dental — implants LP, V2 of three sections

`dental-implants-homewood.html` is a complete, standalone page. Open it in a browser and it
renders as the full landing page.

This is an evolution of the existing design, not a redesign. The design system is untouched:
same `:root` variables, same Instrument Serif / Instrument Sans, same `.stage` / `.pin` / `.rv`
reveal classes, same rAF scroll engine. No animation library was added — there wasn't one, and
there still isn't.

## What changed, and why

### 1. Anatomy (`#what`) — Part 01 and Part 02 were placeholders

Both chapters rendered as crude inline SVG wireframes (a rounded rectangle with four lines; a
trapezoid) while Part 03 used a real render — hence the imbalance.

Each chapter now has **its own render**, cross-faded by the `.on` class the existing chapter
engine already toggles. A first pass used one image with a moving camera; it read as a single
drifting view rather than three components, so it was replaced:

| Chapter | Render | Framing |
|---|---|---|
| 01 The post | bare threaded post, crown lifted away | `scale(2.3)` @ `55% 56%` |
| 02 The abutment | two abutments seated on healed posts, no crowns | `scale(2.4)` @ `52% 44%` |
| 03 The restoration | completed tooth, crown seated | `scale(1.30)` @ `54% 52%` |

All three renders were already in the file. Chapters 01 and 02 borrow the Solutions gallery's
single-tooth and bridge renders, framed on the component rather than the whole jaw; 03 keeps the
hero render. The post → abutment → restoration progression is now legible as three different
things.

Cross-fade is pure CSS off the class the chapter engine already sets — no new JavaScript. Also
added: a persistent section head, a chapter rail that
replaces the old `.anat__prog` dots (and doubles as the brief's "active label brightens" state),
oversized atmospheric chapter numerals, and hairline annotation callouts using `scaleX` on 1px
rules rather than SVG dash offsets, which repaint every frame. Callouts carry their own
text-shadow and line shadow — they sit over ground ranging from dark gum to white enamel, so they
cannot rely on what happens to be behind them.

The left column was rebuilt from a single centred absolute stack into a three-row grid, removing
roughly 45% dead vertical space at every breakpoint.

### 2. `.sig` → `.dec` — the decision sequence

The old section had a real bug: the `clip-path` reveal opened from the vertical centre of a
682×827 portrait set to `object-position:50% 20%`, so for most of the scroll the visible band was
the doctor's torso with his head cropped off. The caption was also overlapped by the photo at full
reveal. Both are gone by construction — there is no `clip-path` anywhere now, and the caption is a
`figcaption` in normal flow.

It is replaced by a four-node clinical decision sequence. The beats come from the existing
`[data-chapters]` engine (`n=4`, so node *k* lights at `p = k/4`); the travelling marker rides
`--p` continuously in CSS.

**The marker/node sync is deliberate.** Dots sit at `k/3` of the rail, so the marker is driven at
4/3 speed and clamped: `1.3334p = k/3` exactly when `p = k/4`. Without that factor the question
would light *before* the marker arrived, inverting the intended order. Verified by measurement.

Hidden answers are `visibility:hidden`, not just transparent, so the node-4 CTA is not reachable
by keyboard until its node is active.

Every factual clause traces to copy already on the page (the "leave the gap" consequences, the
advantages list, FAQ 01/06/07/09, the candidacy paragraph). It is framed throughout as how the
dentist reasons — no inputs, no branches, no results, and an explicit "not a self-assessment"
line. It is a storytelling device, not a diagnostic tool.

### 3. Team — a real layout bug, then density

`.team__fig` combined `aspect-ratio:1800/1203` with `max-height:78svh`. A max-height on a ratio'd
block **transfers through the ratio into a max-width** (CSS Sizing 4, "transferred size
suggestion"), so the figure's width was pinned at `78svh × 1.4963` regardless of viewport:

```
0.78 × 900 × 1800/1203 = 1050.36px
```

Measured 1050.36px at both 1440 and 1920 — a 390px and 870px dead band of `--deeper` to the right
of the photo. Mobile was unaffected because there the viewport width was the binding constraint.

The fix is to stop expressing the box as ratio + height cap on the same element. The height is
now stated directly (`height:min(74svh,66.83vw)`); the `<img>` was already `object-fit:cover`, so
it fills whatever box it is given. Verified full-bleed at 1920/1440/1280/1024 × 1080/900/700.

Content density then came from an editorial spread beneath the photo: Dr. Ron MacBeth, DMD with
four capability lines (implant planning / 3D cone beam imaging / implant placement / restoration —
all four already supported by existing page copy) and a secondary crop of the practice-exterior
photo that was already embedded in the file.

**No credentials, awards, years, counts or success rates were invented.** No staff photography was
fabricated — there are no individual portraits in the source, so none are shown.

## Also fixed

**Text on dark surfaces was unreadable in four places.** `.prec`, `.gal`, `.cin` and the footer set
their own dark backgrounds but carry neither `.dark` nor `.on-img`, so the shared `.lbl` / `.lede` /
`.sm` / `.body` utilities resolved to their dark-on-light colours. Worst case was the Precision
section's body copy at **1.00:1** — `rgba(2,49,61,.82)` on `rgb(2,49,61)`, the same colour as its
background. Also affected: the Precision label (2.34:1), the Solutions label (2.91:1) and the footer
fine print (2.91:1). Fixed at the four shared selectors rather than per section, which also made the
`.team` overrides from the previous round redundant. The Precision heading's opacity floor was
raised from `.34` to `.62`, and the decorative "1045" watermark went from 1.17:1 to 1.94:1.

**Solutions gallery items 01 and 02 had their images swapped** — "Single tooth dental implant with
crown" showed a two-implant bridge and "Implant-supported bridge" showed a single tooth. The two
`src` values were exchanged; headings and alt text were already correct.

**Decision node 02** overflowed its panel: the supporting crop extended 6px past the box and was
clipped mid-image. Panel min-height raised, crop resized, and the copy tightened.

The `prefers-reduced-motion` block unpinned `.pin` but never reset the inline `height:NNNsvh` on
the stage sections, so reduced-motion users scrolled through several screens of empty space with
nothing pinned inside them. One line (`.stage{height:auto!important}`) drops total document height
from 28,560px to 21,028px at 1440×900.

## Deliberately not done

- **No global `max-width:1440px`.** The page has no container max-width anywhere; adding one
  re-flows every section, and the horizontal gallery computes its travel as
  `galTrack.scrollWidth - window.innerWidth`, which a max-width container would break. Line length
  is capped per element in `ch` instead, which is how this page already does it.
- **No component-by-component assembly animation.** Each render is a single flat layer; an abutment
  cannot descend onto a post without layered source art, and faking it by masking a photograph
  looks wrong at 2.3×. Three distinct renders plus the annotation system carry the progression
  instead. Supply layered art and true assembly becomes possible.
- **No macro photography of a titanium post or abutment.** No such asset exists in the file, and
  generic stock was not substituted.

## Parallax driver

`.team` is not pinned, so `--p` is the wrong mapping for it — `.stage` progress only starts once a
section's top passes the viewport top. A generic `[data-para]` hook was added to the existing
`frame()` loop (5 lines) exposing `--q`, running 0 as the element enters at the viewport bottom to
1 once it has fully passed the top.

## Verification

Headless Chromium, 1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375, plus a reduced-motion pass:

- `.team__fig` width equals viewport width at every size (the regression test for the bug above)
- no horizontal overflow, no duplicate IDs, no missing anchors
- no page errors; no broken images (14/14 load)
- all 15 tracking hooks intact — 7 existing `tCall`, 7 existing `tBook`, plus one new
  `tBook('approach')` on the node-4 CTA
- marker/node sync confirmed by measurement at p = 0.25 / 0.50 / 0.75
- reduced motion: every answer, chapter, pillar and the CTA visible and correctly sized

The one console error in the harness is the page's pre-existing Google Fonts request failing in a
sandbox without outbound network. It is unrelated to these changes.

**Page weight: 2,412,605 → 2,539,364 bytes (+124KB, +5.3%)** — three renders for the anatomy
chapters, an 800w crop for decision node 02, and the 480w exterior crop for the team. Base64 does
not deduplicate, so the two anatomy renders shared with the Solutions gallery are second copies.
The team crop (36KB) and the node-02 crop (10KB) are the optional ones.
