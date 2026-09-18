# Prosthodontist page — keyword intent → page decisions

Second landing page for the same office, built for the specialist / cosmetic
keyword set. Companion to [`INTENT-MAP.md`](INTENT-MAP.md) (emergency page).

## Clusters

| Cluster | Share | Keywords | What the person actually wants |
|---|---|---|---|
| **Prosthodontist** | ~55% | prosthodontist beverly hills (×9), beverly hills prosthodontist, prosthodontist(s) near me, prosthodontist in my area, dental prosthodontics near me, top rated prosthodontist near me, **female prosthodontist near me** | Already knows they want a *specialist*. Likely a complex or high-value case: missing teeth, failing crowns, worn bite, a smile they want done properly. Comparing, researching, not in pain |
| **Cosmetic** | ~25% | cosmetic dentistry near me, cosmetic dentistry beverly hills ca, cosmetic dentist beverly hills, best cosmetic dentistry near me | Wants a better-looking smile and evidence of aesthetic judgement |
| **Specific treatments** | ~15% | teeth whitening appointment, dental bonding near me, composite veneers near me | Has a treatment in mind; needs to know whether this office does it |
| **Comprehensive** | ~10% | comprehensive dentist near me (×2) | One dentist for everything, to a high standard |

Nine repetitions of `prosthodontist beverly hills` make the priority obvious:
this page's job is to make the case that a **board-certified prosthodontist**
is a materially different thing from a dentist who calls themselves cosmetic,
and that this one is worth the drive.

## Visitor state

Considered purchase. Researching across tabs, possibly holding a referral or a
quote from elsewhere, weighing expertise against cost. Low urgency, high
stakes, sensitive to over-selling. Wants proof, process and a low-pressure
first step.

## Questions the page answers, in order

1. Is this actually a specialist, and what does that mean? → **hero eyebrow, specialist strip, FAQ 1–2**
2. Do you handle *my* situation? → **five-goal selector**
3. What happens if I book — will I be sold to? → **consultation process, "decide after" CTA**
4. Who is she, and is she any good? → **doctor section, affiliations, reviews**
5. What goes in my mouth, and is it planned properly? → **materials & technology**
6. Is she a woman? → **FAQ 3, and "she" throughout**
7. Where, when, cost, insurance? → **location, FAQ 9**

## CTA hierarchy — reversed from the emergency page

**Primary — book a consultation.** For a considered purchase the call is not
the conversion; the *consultation* is. The navy "Book a consultation" button
leads everywhere, framed as diagnosis-and-plan with no obligation.

**Secondary — call.** Ghost button, for people who want to ask a question
first. Still tap-to-call everywhere on mobile.

Because no form endpoint is configured, the consultation CTA opens the
practice's own request form in a new tab; the on-page panel explains that
before the click.

## What was verified before writing

| Claim | Source |
|---|---|
| Board-certified prosthodontist; DMD Louisville; 3-yr UIC residency; ~10 yrs | About page |
| Porcelain and no-prep veneers, crowns, bridges, smile design, digital preview | Cosmetic dentistry page |
| Implants, All-on-X, full-mouth reconstruction, digital dentures, TMJ, sedation (nitrous → IV), laser | Services page |
| CBCT, Waterlase, PRF, ozone, SDS Swiss ceramic implants, SMART | Services / home pages |
| 6+ veneers include smile-design consult, night guard, whitening of untreated teeth | Services page ("Special offer") |
| Five review quotes, attributed | About page |

## Two keyword groups confirmed by the client, not by the website

**`dental bonding near me`**, **`composite veneers near me`** and
**`teeth whitening appointment`** — none of these treatments appears on
drroxannesalavati.com (the veneers listed there are porcelain and no-prep;
whitening is published only as part of the 6+ veneer package). The client
confirmed on 2026-09-17 that the practice offers composite bonding, composite
veneers and standalone whitening, so the page now claims them: in the smile
goal's treatment tags and consultation step, in FAQs 6 and 7, and in the
schema `availableService` list.

Worth doing on the website too: a searcher who clicks through to the main
site from this page will not find bonding or whitening there, which is a
small trust gap and a missed organic opportunity.

## Section order and why (v2 relayout)

Hero (portrait bleeds right) → bento proof band → **prosthodontist vs general
dentist comparison** → goal selector (chip tabs, two-column panel) → veneer
offer band → consultation timeline → doctor (dark, portrait bleeds left) →
materials bento → featured review + grid → location (map left) → FAQ
(two-column) → final CTA. Proof of specialty comes first because it is the keyword; the goal
selector converts the abstract specialty into "my situation"; the offer sits
directly under it where smile-design searchers will have just self-selected;
process before doctor because "will I be sold to" is the bigger objection
for this audience than "is she qualified".
