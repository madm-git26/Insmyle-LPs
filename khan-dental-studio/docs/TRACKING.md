# Wiring the page up — call tracking, conversions, Google Ads

Three things must be connected before the campaign is enabled. The page is
built so each is a small, isolated edit.

---

## 1. Google tag (gtag.js)

The page fires conversion events but does **not** load a tag — so it stays fast
in preview and you control which container ships. Paste your tag immediately
before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

If you use GTM instead, drop the GTM snippet in and read the `dataLayer`
events listed below — no page edit is needed.

## 2. Events the page already fires

Every CTA carries `data-track` and `data-loc`. A delegated listener pushes to
`dataLayer` **and** calls `gtag('event', ...)` if a tag is present.

| `dataLayer` event | Fires on | `cta_location` values |
|---|---|---|
| `kds_call` | any `tel:` link | `intent`, `sticky` |
| `kds_book` | any Book Online button | `header`, `hero`, `services`, `crowns`, `doctor`, `reviews`, `location`, `final`, `sticky` |
| `kds_directions` | Google Maps links | `intent`, `location`, `final` |
| `kds_email` | either `mailto:` link | `intent`, `location` |

**Recommended primary conversion:** `kds_call` today; `kds_book` once the
booking destination captures leads. Track `kds_email` and `kds_directions` as secondary so they inform Smart Bidding without inflating CPA.

To report a value-bearing Google Ads conversion, fire it alongside the call event
— add this inside `track()` in the page's script, guarded to the call action:

```js
if (action === 'call' && typeof window.gtag === 'function') {
  window.gtag('event', 'conversion', {
    send_to: 'AW-XXXXXXXXX/YOUR_LABEL',
    value: 55.0,
    currency: 'USD'
  });
}
```

A tap on a `tel:` link is an *intent* signal, not a completed call. If you want
the conversion to mean "someone actually spoke to the front desk", drive it from
the call-tracking provider's connected-call webhook instead of the click.

### Call tracking

Two options, both compatible with the page as written:

- **Google forwarding numbers** — enable call reporting and add a call
  extension; Google swaps the number in `tel:` links automatically.
- **Third-party DNI (CallRail etc.)** — the number appears in 13 `tel:` links
  and as visible text in the header, hero, form, intent block, location block
  and final CTA. Point your DNI swap at `a[href^="tel:"]` and the text nodes;
  every visible instance is `(817) 839-7412` and every `href` is
  `tel:+18178397412`, so a single find/replace rule covers the page.

## 3. ⚠️ "Book Online" currently leads to a dead end — fix before spending

Every CTA now reads **Book Online** and points at
`https://www.khandentalstudio.com/contact-us`. That page returns 200, but its
form says, in its own words:

> "demo form does not transmit data — for real bookings please call (817) 839-7412."

**So a visitor who taps Book Online fills in a form that goes nowhere, and the
practice never hears about it.** Every click is paid for and every lead is lost.
One of these has to happen before the campaign is enabled:

1. **Make the contact-us form live** (wire it to the practice's inbox or CRM).
   Best outcome: the label is true and the click-out works.
2. **Point the buttons back at `tel:+18178397412`** and rename them — booking by
   phone is still booking, but a `tel:` link labelled "Book Online" is a false
   affordance: it opens the dialler when the visitor expected a form.
3. **Put a form back on this landing page** and point Book Online at it. Best
   for conversion rate — no click-out, and it captures Monday-to-Thursday
   traffic when the practice is closed.

Until one is done, the honest conversion path on this page is the phone number
in the header, the intent block and the sticky mobile bar.

## 4. Event names changed with the buttons

There is still no form on this page — no hidden fields, no `SUBMIT TARGET`.

- `kds_form_submit` and `kds_generate_lead` **never fire**. Do not configure a
  Google Ads conversion against either.
- **`kds_book` is new** — it fires on the nine Book Online buttons. It is an
  outbound click, not a booking, so it only becomes a real conversion once the
  destination actually captures the lead (see the warning above).
- **`kds_call` still fires** from the header, the intent block's phone card and
  the sticky bar's Call button. While Book Online is a dead end, this is the
  only event that corresponds to a lead the practice actually receives.
- `gclid`, `gbraid`, `wbraid` and the UTMs are still read from the query string
  and kept in `sessionStorage` under `kds_*`. A DNI script can read them at call
  time, which is what makes **offline conversion import** possible — the only way
  to feed Google Ads the appointments that actually showed up.

Because the practice is closed Monday to Thursday, a call-only page has no way to
capture a midweek lead. Either restrict ad scheduling to hours somebody answers,
or accept that weekday clicks convert only through the `mailto:` links.

## 5. Suggested campaign mapping

The page is written for one tight ad group so the ad → keyword → page chain
stays literal, which is what Quality Score's *landing page experience* and
*ad relevance* components reward.

| Element | Value |
|---|---|
| Ad group | Dentist — Mansfield TX (general / new patient) |
| Core keywords | `dentist in mansfield tx`, `dentist near me mansfield`, `new patient dentist mansfield`, `dental office mansfield tx`, `weekend dentist mansfield`, `saturday dentist near me` |
| Headline echo on page | H1 "Dentist in Mansfield, TX", plus the "Looking for a dentist in Mansfield, TX?" section directly under the hero |
| Offer echo | `$55` appears in the hero badge, the final CTA, the FAQ, the form's reason list and the sticky mobile bar |
| Final URL | `https://www.khandentalstudio.com/lp/dentist-mansfield-tx` |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&gclid={gclid}` |

Keep `noindex,follow` on the page (already set) so the ad landing page does not
compete with the main site in organic results.

### Ad extensions that match what the page proves

- **Sitelinks:** $55 new patient exam & X-rays · Same-day crowns · Emergency appointments · Insurance accepted
- **Callouts:** Open Fri, Sat & Sun · Same-day crowns · Mercury-free · Emergency slots daily
- **Structured snippet (Services):** Preventive Care, Dental Implants, Same-Day Crowns, Invisalign, Teeth Whitening, Root Canal Therapy
- **Call extension:** (817) 839-7412, scheduled to Fri 12:00–19:00 and Sat/Sun 10:00–15:00 so the extension is only live when someone answers

> Ad scheduling matters here more than usual: the practice is closed Monday to
> Thursday. Either bid down heavily outside clinic hours or lean on the form,
> which is answered "the next clinic day" — that expectation is set on the page
> so a Tuesday lead is not a broken promise.
