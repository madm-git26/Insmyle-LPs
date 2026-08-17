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

All three chapters are now a single locked-off camera over the 1600×900 implant render that was
already in the file, which contains the post, the abutment collar and the crown in one frame:

| Chapter | Camera | Note |
|---|---|---|
| 01 The post | `translate(-5.85%,-39%) scale(2.3)` | threaded post fills the frame |
| 02 The abutment | `translate(-5.85%,-11.05%) scale(2.3)` | **same scale** — a pan, not a zoom |
| 03 The restoration | `translate(-1.26%,-2.24%) scale(1.28)` | pulls back to the whole tooth |

Zoom is capped at ~2.4×; the source is a 20KB webp and visibly breaks up above that (3.6× was
tested and rejected). Chapters 01→02 share a scale so resolution never changes across the pan.

The camera is driven purely by CSS off the `data-cur` attribute the existing chapter engine
already writes — no new JavaScript. Also added: a persistent section head, a chapter rail that
replaces the old `.anat__prog` dots (and doubles as the brief's "active label brightens" state),
oversized atmospheric chapter numerals, and hairline annotation callouts using `scaleX` on 1px
rules rather than SVG dash offsets, which repaint every frame.

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

The `prefers-reduced-motion` block unpinned `.pin` but never reset the inline `height:NNNsvh` on
the stage sections, so reduced-motion users scrolled through several screens of empty space with
nothing pinned inside them. One line (`.stage{height:auto!important}`) drops total document height
from 28,560px to 20,397px at 1440×900.

`.team` carries neither `.dark` nor `.on-img`, so the shared `.lbl` / `.lede` utilities were
resolving to their dark-on-light colours on a dark ground. Scoped overrides added.

## Deliberately not done

- **No global `max-width:1440px`.** The page has no container max-width anywhere; adding one
  re-flows every section, and the horizontal gallery computes its travel as
  `galTrack.scrollWidth - window.innerWidth`, which a max-width container would break. Line length
  is capped per element in `ch` instead, which is how this page already does it.
- **No component-by-component assembly animation.** The render is a single flat layer; an abutment
  cannot descend onto a post without layered source art, and faking it by masking a photograph
  looks wrong at 2.3×. The camera move plus the annotation system carries the precision reading
  instead. Supply layered art and this becomes possible.
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

**Page weight: 2,412,605 → 2,481,074 bytes (+68KB, +2.8%)** — the 1600w render for the anatomy
camera, an 800w crop for decision node 02, and the 480w exterior crop for the team. The team crop
is the only optional one; drop it to recover 36KB.
