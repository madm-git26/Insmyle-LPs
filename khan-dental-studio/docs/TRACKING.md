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
| `kds_call` | any `tel:` link | `header`, `hero`, `form`, `intent`, `offer`, `services`, `crowns`, `reviews`, `location`, `final`, `sticky` |
| `kds_directions` | Google Maps links | `intent`, `location`, `final` |
| `kds_email` | either `mailto:` link | `intent`, `location` |

**Recommended primary conversion:** `kds_call`. Track `kds_email` and
`kds_directions` as secondary so they inform Smart Bidding without inflating CPA.

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

## 3. There is no form

The page was reduced to a single conversion path: the phone. There is no form,
no hidden fields and no `SUBMIT TARGET` to wire up. What that changes:

- `kds_form_submit` and `kds_generate_lead` **never fire**. Do not configure a
  Google Ads conversion against either.
- **`kds_call` is the conversion.** Import it as the primary action, and treat
  `kds_email` as secondary.
- `gclid`, `gbraid`, `wbraid` and the UTMs are still read from the query string
  and kept in `sessionStorage` under `kds_*`. A DNI script can read them at call
  time, which is what makes **offline conversion import** possible — the only way
  to feed Google Ads the appointments that actually showed up.

Because the practice is closed Monday to Thursday, a call-only page has no way to
capture a midweek lead. Either restrict ad scheduling to hours somebody answers,
or accept that weekday clicks convert only through the `mailto:` links.

## 4. Suggested campaign mapping

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
