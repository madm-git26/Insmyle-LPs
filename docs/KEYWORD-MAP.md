# Keyword Map — where each Google Ads keyword now appears

Counts are occurrences in **visible page copy** (HTML comments, JSON-LD and script
content excluded). "Before" is the current live page.

---

## Landing Page 1 — General Dentist
`/lp/new-patient-dental-cleaning-exam/`

| Keyword | Match type | Before | After | Placement |
|---|---|---|---|---|
| `dentist in chicago` | phrase | **0** | **9** | **H1**, hero badge, new near-me H2 section label, services H2, credibility list, FAQ 7 & 9, final CTA |
| `dentist near me` | phrase | **0** | **5** | **H1 area / hero sub**, new section H2 *"Searching for a 'Dentist Near Me'?"*, areas-served section label, FAQ 9 |
| `best dentist near me` | phrase | **0** | **1** | FAQ 9: *"How do I choose the best dentist near me in Chicago?"* (credibility section removed at client request) |
| `dentist near my area` | phrase | **0** | **1** | Near-me section intro paragraph (bolded), FAQ 7 |
| `best dentist chicago` | exact | **0** | **0** | Covered indirectly via FAQ 9 only — the dedicated credibility section was removed at client request. If Quality Score on this keyword stays low, consider re-adding a lighter version |

### The core problem this fixes

The live H1 was **"Your First Dental Cleaning & Exam — Done Right, From Day One"** —
it contained **none** of the five keywords in the ad group. A visitor arriving on
"best dentist near me" saw a page about a cleaning appointment, and Google saw no
term-level relevance between query, ad and landing page. That is a direct hit on the
**Landing Page Experience** and **Ad Relevance** components of Quality Score.

The H1 is now:

> Looking for a **Dentist in Chicago**? Your First Cleaning & Exam — *Done Right,* From Day One

It keeps the original promise and the original `<span>` (blue) / `<em>` (orange)
styling hooks, and leads with the money keyword.

---

## Landing Page 2 — Emergency Dentist
`/lp/emergency-dentist-chicago/`

| Keyword | Match type | Before | After | Placement |
|---|---|---|---|---|
| `emergency dentist` | phrase | 1 | **8** | **H1**, alert strip context, conditions H2, areas H2, FAQ 7 & 9, final CTA |
| `urgent dental care` | phrase | 2 | **8** | Hero badge, hero sub, first-aid section, walk-in H2, treatments H2, areas intro, final CTA |
| `emergency dentist chicago` | phrase | **0** | **2** | Treatments section label, FAQ section label |
| `emergency dentist near me` | phrase | **0** | **1** | Areas-served section label + H2 *"An Emergency Dentist Near You"* |
| `emergency dentist in chicago` | phrase | **0** | **4** | **H1**, conditions H2, FAQ 7, final CTA |
| `chicago emergency dentist` | phrase | 1 | **1** | Conditions H2 *"Chicago Emergency Dentist — Same-Day Relief, No Waiting"* |
| `urgent care dental clinic near me` | exact | **0** | **2** | Walk-in section **H2**, areas intro *"our urgent dental care clinic"*, FAQ 8 |
| `walk-in dentist chicago` | phrase | **0** | **1** *(plus 3× "walk-in dentist" / "walk-ins welcome")* | Walk-in section label, hero badge, trust list, USP card, FAQ 3 |

### The core problems this fixes

1. **"Walk-in dentist Chicago" and "urgent care dental clinic near me" had no answer
   anywhere on the page.** You were paying for clicks on queries the landing page never
   addressed — the clearest possible Quality Score drag. There is now a dedicated section
   with its own H2, a USP card, a trust-list item, a hero badge mention and an FAQ.
2. The H1 said "Dental Emergency in Chicago?" — close, but it never contained the actual
   head term **"emergency dentist"**. It now reads:

   > **Emergency Dentist in Chicago** — We'll See You *Today.*

---

## Supporting relevance signals added to both pages

| Signal | Why it matters for Quality Score |
|---|---|
| **FAQ entries: 6 → 14 (LP1), 5 → 13 (LP2)** | Each new FAQ is a keyword-aligned question in natural language. Depth of genuinely useful content is the strongest Landing Page Experience input. |
| **`FAQPage` JSON-LD** | Makes the Q&A machine-readable and eligible for FAQ rich results, reinforcing topical relevance. |
| **`Dentist` JSON-LD** with address, geo, hours, `areaServed`, 15 `availableService` entries, three named `employee` records, `ReserveAction` | Gives Google an unambiguous entity match between "dentist in chicago" / "emergency dentist chicago" and this page. |
| **Neighbourhood + ZIP coverage** | The only honest way to serve "near me" / "near my area" intent — proximity content, not a fake location. |
| **Full 15-plan insurance list** | Transparency is an explicit Landing Page Experience factor, and it captures long-tail "dentist that takes \<plan\>" relevance. |
| **Published hours twice per page + in schema** | Answers "is it open now", the top emergency-intent question. |
| **Mobile overflow fixed (LP2: 210 px → 0 px)** | Mobile usability is a direct Landing Page Experience input. A page that scrolled sideways on every phone was actively suppressing the score. |

---

## Keyword-stuffing check

Density was kept deliberately moderate — stuffing *lowers* Landing Page Experience.
Across ~3,640 words (LP1) and ~3,000 words (LP2), primary keyword density sits at
roughly **0.3–0.5%**. Every placement is a grammatical sentence a patient would read
naturally; none are hidden, repeated in lists, or crammed into `alt` text.
