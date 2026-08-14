# English Landing Pages — Build Notes & Keyword Map

Two English Google Ads landing pages, built from the Spanish landing page in
`lp-spanish/` and then reworked to your v2 brief.

| # | Page | Ad group | File |
|---|---|---|---|
| 1 | General Dentist | near-me · Saturday · location | [`lp-english/general-dentist-chicago.html`](../lp-english/general-dentist-chicago.html) |
| 2 | Emergency Dentist | emergency · urgent · walk-in | [`lp-english/emergency-dentist-chicago.html`](../lp-english/emergency-dentist-chicago.html) |

Both are complete standalone HTML documents — open either in a browser and it renders as
the full styled page.

---

## Contact details

| | Value |
|---|---|
| Phone (everywhere, 10 links per page) | **(773) 915-6530** → `tel:7739156530` |
| Booking button (10 links per page) | `https://book.allinone.dental/in-smyle-dental?referrer_id=6` |

Verified: **zero** references to the old `6270` number remain on either page.

---

## v2 changes

### 1. Areas we serve — moved out of the footer into its own section

The location keywords used to sit in a 13-line footer list, which read as a keyword dump.
They now have a dedicated **"Areas we serve"** section directly above the footer:

- **10 neighbourhood cards** in a 5×2 grid (3-up on tablet, 2-up on mobile), each with a
  pin icon, the neighbourhood name and a short caption. Same hover-lift behaviour as the
  existing `.kw-card` components.
- A dark **"Finding us"** strip below them holding the street, cross-street, ZIP and
  transit phrases as pills.
- The footer's third column now carries **phone, address and social links** instead —
  filling the grid slot the Spanish page left empty (its social block was commented out).

### 2. Reviews — now live from the Google Business Profile

The invented testimonials are gone. Both pages now use the practice's **own EmbedSocial
Google-reviews widget**, `data-ref="66074ade90598c60353246c46094eb88ed145ab4"` — the same
one already running on `enhanced/new-patient-dental-cleaning-exam.html`. Reviews are pulled
straight from the Google Business Profile and update on their own.

> **To show different reviews per page** (general reviews on page 1, emergency-treatment
> reviews on page 2): create a second curated album in your EmbedSocial dashboard with only
> the reviews you want, then send me its `data-ref` and I'll swap it into the emergency
> page. One widget ID cannot filter itself by topic.

### 3. Live Google rating in the hero, wired to the schema

The hero carries a **"Live Google reviews"** badge using EmbedSocial widget
`data-ref="8110babf905578547c0f838a3dbb2d6780619936"`, plus a `Dentist` JSON-LD block
containing address, geo, opening hours, `areaServed` and a `ReserveAction`.

**The rating is never hardcoded.** A script reads whatever star rating and review count the
live widget renders, then injects a matching `aggregateRating` into the JSON-LD at runtime.
If the widget doesn't render, no rating is emitted at all — so the page can't publish a
stale or invented review score. This was checked with the widget deliberately blocked:

```
GEN  hero-badge hidden=true  reviews fallback shown=true  fake rating in schema=false  jsErrors=0
EMG  hero-badge hidden=true  reviews fallback shown=true  fake rating in schema=false  jsErrors=0
```

That is also the graceful-failure path: if an ad blocker or a network problem stops
EmbedSocial loading, the hero badge hides itself and the reviews section swaps in a
"Read Our Google Reviews" button linking to the Google profile — no empty boxes.

> Both pages are `noindex`, so this schema won't produce rich results in organic search as
> they stand. It's in place and correct for the moment you drop the noindex, and it gives
> Google an unambiguous entity match in the meantime.

### 4. Headings rewritten to read like sentences, not keywords

| | Before | After |
|---|---|---|
| **General H1** | "Dentist near you in Chicago, open today." | **"Need a dentist in Chicago? We can see you today."** |
| **Emergency H1** | "Emergency dentist near you, today." | **"Emergency dentist in Chicago — we'll see you today."** |

Every H2 was rewritten the same way — "Appointments that don't cost you a day off",
"What your first visit actually looks like", "Pain doesn't keep office hours",
"Walk out with the real crown, not a temporary one", "Spread the cost if you need to".

### 5. Meta titles and descriptions rewritten for intent

| Page | Title | Description |
|---|---|---|
| General | Dentist in Lakeview, Chicago — Same-Day, Evening & Saturday Visits | Leads with availability and insurance, closes on the one-minute booking. |
| Emergency | Emergency Dentist in Chicago — Seen Today, Walk-Ins Welcome | Opens on "in dental pain right now", names the symptoms, ends with the phone number. |

### 6. Bold removed from keyword phrases

`<strong>` count in the hero lead on both pages is now **0**. Bold survives only where it's
structural (the red urgency strip, the award badge) — never wrapped around a keyword.

### 7. Insurance section rebuilt

The bare logo marquee gained: a **3-card benefit row** (benefits checked first · we file the
claim · costs explained up front), a **gradient "Not sure if we take your plan?" CTA block**
with a call button, and hover accents on the logo tiles.

### 8. Hero backdrop

The hero now sits in a `.hero-wrap` with a layered backdrop: three slow-drifting blurred
colour blobs in the brand palette (cyan, orange, green), a masked dot-grid over the top, and
a gradient fade into the section below. All of it is `pointer-events:none` and
`aria-hidden`, and the drift animation is disabled under `prefers-reduced-motion`.

---

## Design integrity

| Check | Result |
|---|---|
| Original 545-line stylesheet | **Byte-identical** to the Spanish source (md5 `54da6962`). Not one line edited — every v2 rule lives in a **separate second `<style>` block**, so the original stays provably untouched. |
| Fonts | Unchanged — Bricolage Grotesque + Instrument Sans. |
| Colour variables | Unchanged — the v2 CSS only *consumes* `--ink`, `--amber`, `--mint`, `--bg`. |
| Original animations | Unchanged — rotator, marquee, `.rv` reveals, `floaty`, `pulseDot`, `ringPulse` all intact. |
| HTML validity | **0 unclosed, 0 mismatched tags** on both pages. |
| JSON-LD | Parses clean on both pages. |
| Horizontal overflow | **0 px** at 1440 px and 390 px on both pages. |
| Page parity | Both pages carry identical structure, CSS and component counts — only the copy differs. |

---

## Keyword coverage — 100% on both pages

Counted against visible copy plus `<title>` and meta description. Exact phrase or a close
variant Google treats as equivalent (hyphenation, minor function words).

| Group | General page | Emergency page |
|---|---|---|
| General keywords | **9/9** | — |
| Emergency keywords | — | **9/9** |
| Common keywords | **6/6** | **6/6** |
| Location keywords | **20/20** | **20/20** |

**Density dropped by roughly half** while coverage stayed complete, because the phrases are
now placed as natural search-query framing rather than repeated as headings:

| Page | Primary term | v1 density | v2 density | Words |
|---|---|---|---|---|
| General | `dentist near me` | 1.57% | **0.83%** | 1,818 |
| Emergency | `emergency dentist` | 1.44% | **0.85%** | 1,886 |

The technique: quote the query the way a person would describe it —
*"Most people find us by typing 'dentist near me' or 'dental clinic near me' into their
phone"*, *"Looking for a dentist open Saturday?"*, *"Most people find us searching
'emergency dentist near me' at the worst possible moment — a Saturday morning, or ten
minutes after everywhere else has shut."* Location phrases live in the Areas section
captions and pills, where place names belong anyway.

One deliberately humble placement worth flagging: the reviews sub-head reads *"Anyone can
call themselves the best dentist near me. We would rather you read what patients actually
wrote."* That covers the keyword without making a "best dentist" claim you'd have to defend.

---

## Still open

1. **Topic-filtered reviews** — needs a second EmbedSocial album `data-ref` from your
   dashboard (see §2 above).
2. **"Best of 2026 Award Winner"** — carried over from your Spanish page with your own CDN
   image. The awarding body was never confirmed; see `VERIFIED-FACTS.md`.
3. **Second emergency line (773) 900-5055** — published on the live
   `/treatments/dental-emergency/` page but deliberately not used here, since a second
   number splits call tracking. Say the word and it goes on the emergency page.
