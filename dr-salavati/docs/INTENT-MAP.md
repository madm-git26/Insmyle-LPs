# Keyword intent → page decisions

The 19 supplied keywords, de-duplicated to 12 unique terms, and what each one
actually means for someone typing it.

## Clusters

| Cluster | Share | Keywords | What the person actually wants |
|---|---|---|---|
| **Emergency** | 58% | emergency dentist near me (×4), Emergency Dentist, emergency dentist beverly hills (×2), dentist open now emergency (×2), urgent care dentist (×2), urgent care dentist open now (×2) | Something is wrong *now*. Can you see me, can you fix this, how fast |
| **Open now** | 16% | dentist open near me, urgent care dentist open now, dentist open now emergency | Literally: are you open at this moment. Time-of-day sensitive |
| **Same-day** | 11% | same day dentist near me, same day dentist | Fixed in one visit, not booked out a week |
| **Local** | 16% | dentist near me, dentist west hollywood, dentist century city, emergency dentist beverly hills | Am I close enough to get there quickly |

Note how much overlap there is: `dentist open now emergency` sits in three
clusters at once. This is not a general-dentistry keyword list with some
emergency terms in it — it is an emergency list with a proximity qualifier.
The page is built accordingly.

## Visitor state

Likely in pain or alarmed, possibly one-handed on a phone, low patience,
comparing two or three clinics in adjacent tabs, and worried about cost in an
area where they expect it to be high. Not browsing. Not reading a doctor bio.

## Questions the page has to answer, in the order they are asked

1. Are you open right now? → **live status chip, hero, recomputed every 60s**
2. Can you see me today? → **H1, trust strip, FAQ 2**
3. Do you treat *my* problem? → **8-symptom triage module**
4. How far away are you? → **hero proximity line, location section, directions CTA**
5. What will it cost? → **cost section, FAQ 6 & 7**
6. Will I be fixed or sent elsewhere? → **prosthodontics section, FAQ 5 & 10**
7. Are you any good? → **DMD · Prosthodontics, ACP / IAOMT / WLADS**

## Objections, and where each is answered

| Objection | Answer on the page |
|---|---|
| "Every site says same-day — is it real?" | The page never promises same-day. Step 2: a real time *on the call*; FAQ 2 explains the 1–2-patients-a-day model honestly |
| "I'll get voicemail" | "What happens when you call" — the whole section exists for this |
| "I'll be upsold" | Cost before treatment starts, stated three times |
| "Beverly Hills = expensive" | Cost section, no-insurance card, staged treatment |
| "I'll wait two hours" | Call first, FAQ 3 explains why calling beats walking in |
| "Should I just go to the ER?" | FAQ 9 and the safety note — answered honestly, including when the ER *is* right |

## CTA hierarchy

**Primary — call.** On emergency traffic the phone call is the conversion, so
the call button is the gold one, it is the largest element in the hero, and it
appears in the top bar, header, hero, every triage panel, the process section,
the location block, the final section, and the sticky mobile bar.

**Secondary — request a slot.** A four-field form for people who can't talk:
at work, in a meeting, or too anxious to phone. It pre-fills with whichever
symptom they tapped.

## Section order

Hero → trust strip → symptom triage → what happens when you call → **location & hours** → prosthodontics → the doctor → reviews → cost → FAQ → final CTA. Location sits before the trust sections because for an emergency searcher "can I get there, and are you open" is a go/no-go decision; credentials are what make them choose this tab over the next one.

## What was kept off the page on purpose

No services grid, no cosmetic or veneer gallery, no blog links, no navigation
menu, no "our philosophy", no long bio. Every one of them is a route off the
page for someone whose next action should be a phone call. The only outbound
links are the phone number and the map directions.

## City

The office is at 436 N Roxbury Dr, **Beverly Hills**. `emergency dentist beverly hills` (×2) is therefore the exact-location term; West Hollywood and Century City are adjacent and appear as proximity ("minutes from…"), never as the office location.

## Keyword placement

Head terms appear where they read naturally and nowhere else — title, meta
description, H1, three H2s, the FAQ questions, and image alt text. Density is
roughly 0.4% across ~2,900 words. There is no "Emergency Dentist Beverly Hills
| Urgent Care Dentist Beverly Hills" stuffing, because that suppresses Landing
Page Experience rather than helping it.

The neighbourhood list is framed as *"patients travel in from"* with an
explicit line stating there is one practice at one address — proximity
relevance without implying locations that do not exist.

## Message match

```
"emergency dentist near me"  /  "dentist open now emergency"
        → ad: emergency dentist, Beverly Hills, board-certified prosthodontist
        → H1: Emergency Dentist in Beverly Hills — seen quickly, fixed properly
        → live status: Open now · until 5 PM
        → triage: tap your symptom
        → CTA: Call
        → conversion: click_to_call
```
