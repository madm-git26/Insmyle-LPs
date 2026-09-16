# Setup — what must be filled in before this page goes live

Everything below was **not supplied**, so it was left as a clearly-marked
placeholder rather than invented. The page will not let you forget: while any
placeholder remains, a gold banner across the top of the page lists exactly
what is still missing, and it disappears by itself once the values are real.

Two things are also suppressed while placeholders remain, deliberately:

- **The JSON-LD structured data is not emitted at all.** Publishing a
  `Dentist` schema with a fake phone number and no street address is worse than
  publishing none — Google reads it as the practice's canonical contact details.
- **The live "Open now" status never claims to be open.** Until
  `hoursConfirmed` is `true`, every status reads *"Call to check today's
  availability"*. The page will not assert opening hours it cannot vouch for.

---

## 1. Edit `SITE_CONFIG`

It is a single object at the top of the `<script>` block near the bottom of
`emergency-dentist-west-hollywood.html`. Nothing else needs touching.

```js
var SITE_CONFIG = {
  practiceName : "Smile Expert",
  doctorName   : "Dr. Roxanne Salavati, DMD",

  phone        : "(310) 555-0142",        // ← the real tracking number
  address      : {
    street     : "8500 Sunset Blvd, Suite 200",
    city       : "West Hollywood",        // ← CONFIRM, see §2
    region     : "CA",
    postal     : "90069",
    country    : "US"
  },
  mapQuery     : "8500 Sunset Blvd, West Hollywood, CA 90069",
  formEndpoint : "https://…",             // ← where the form POSTs JSON

  hoursConfirmed : true,                  // ← flip once hours below are real
  timeZone       : "America/Los_Angeles",
  hours: {
    mon:[["09:00","18:00"]],
    tue:[["09:00","18:00"]],
    wed:[["09:00","18:00"]],
    thu:[["09:00","18:00"]],
    fri:[["09:00","17:00"]],
    sat:[],                               // [] means closed
    sun:[]
  }
};
```

Hours are 24-hour, and a day can have more than one block if the practice
closes for lunch: `mon:[["09:00","13:00"],["14:00","18:00"]]`.

## 2. Confirm the office city — this one changes the copy

The keyword list covers **West Hollywood**, **Beverly Hills** and **Century
City**, which does not say which one the office is actually *in*. The page
currently assumes **West Hollywood** and says so in the H1, the meta title, the
location section and the FAQ.

If the practice is physically in Beverly Hills or Century City, that is a
five-minute find-and-replace, but it must be done — claiming the wrong city is
both a trust problem and a Google Ads policy problem. Tell me the real address
and I will make the change properly, including the neighbourhood list.

## 3. Add the images

See [`../assets/README.md`](../assets/README.md) for filenames and sizes.

## 4. Wire up conversion tracking

The page already fires events on every call button and CTA — it pushes to
`gtag()` and to `dataLayer` if either exists, and does nothing if neither does.
You only need to add your Google Ads / GA4 tag to the page and import the
events:

| Event | Fires on |
|---|---|
| `click_to_call` | every `tel:` link — header, hero, triage panel, sections, sticky bar |
| `cta_click` | every non-call CTA, with a `cta_id` naming which one |

`cta_id` values: `hero-call`, `hero-form`, `how-call`, `how-form`, `loc-call`,
`loc-directions`, `final-call`, `sticky-call`, `sticky-form`, `form-submit`,
and `triage-call-<symptom>` / `triage-form-<symptom>` for each of the eight
symptoms — which will tell you which dental emergencies actually convert.

**Set `click_to_call` as a conversion in Google Ads.** On an emergency page the
phone call *is* the conversion; counting only form submissions will undercount
this page by a wide margin and mislead your bidding.

## 5. Form endpoint

The form POSTs JSON to `formEndpoint`:

```json
{ "name":"…", "phone":"…", "issue":"crown", "when":"asap",
  "since":"today", "notes":"…", "page":"…", "submittedAt":"…" }
```

`issue` is one of the eight symptom ids (`knocked`, `pain`, `cracked`, `crown`,
`swelling`, `filling`, `denture`, `bleeding`) or `other`, and it is
**pre-filled from whichever symptom the visitor tapped** in the triage module —
so the front desk knows what they are calling back about before they dial.

Any endpoint that accepts a JSON POST works. If you would rather it went to an
existing booking system or a form plugin, tell me which and I will wire it up.

---

## Claims on the page you should sanity-check

These are reasonable for an emergency dental practice and none of them assert a
specific number, but they describe how the practice *operates*, so confirm they
are true before publishing:

| Claim | Where |
|---|---|
| Same-day slots are genuinely worked into the schedule for emergencies | Hero, trust strip, FAQ 2 |
| Insurance is verified **before** the appointment | Trust strip, step 3, cost section, FAQ 6 |
| Patients are given a cost estimate before treatment starts | Trust strip, cost section, FAQ 6 |
| Dr. Salavati personally treats emergency patients | Hero card, trust strip, doctor section |
| Crowns are re-cemented in-house rather than referred out | FAQ 5, prosthodontics section |
| Callers get a time on the call rather than a callback | Hero, step 2 |

## What was deliberately left out

No review count, no star rating, no "X years of experience", no patient
testimonials, no awards, no specific prices, no "open 24/7", no claim of board
certification. None of it was supplied, and on a page whose whole job is to be
trusted by someone in pain, an invented number is the fastest way to lose that.

Three of these are worth adding **if** you can supply them, because they are
among the strongest trust elements available:

1. **Google rating and review count** — would go in the hero, next to the status chip.
2. **Two or three real patient reviews**, ideally from emergency patients — a short section after the doctor.
3. **Whether Dr. Salavati is a board-certified prosthodontist**, and where she trained. The page currently says only "DMD — Prosthodontics", which is what her scrubs and the ACP affiliation support. Board certification, if it applies, is a materially stronger claim and belongs in the doctor section.
