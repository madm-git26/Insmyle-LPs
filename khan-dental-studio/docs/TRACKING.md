# Wiring the page up — conversions, form endpoint, Google Ads

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
| `kds_cta` | any scroll-to-form button | `header`, `hero`, `intent`, `offer`, `services`, `crowns`, `doctor`, `reviews`, `plan-child`, `plan-adult`, `plan-perio`, `firstvisit`, `location`, `final`, `sticky` |
| `kds_directions` | Google Maps links | `intent`, `location`, `final` |
| `kds_email` | the `mailto:` link | `location` |
| `kds_form_submit` | validated form submit | `lead_form` |
| `kds_generate_lead` | validated form submit | `lead_form` |

**Recommended primary conversions:** `kds_generate_lead` and `kds_call`.
Track the rest as secondary so they inform Smart Bidding without inflating CPA.

To report a value-bearing Google Ads conversion, add inside the submit handler
(marked `SUBMIT TARGET` in the page's script):

```js
gtag('event', 'conversion', {
  send_to: 'AW-XXXXXXXXX/YOUR_LABEL',
  value: 99.0,
  currency: 'USD'
});
```

### Call tracking

Two options, both compatible with the page as written:

- **Google forwarding numbers** — enable call reporting and add a call
  extension; Google swaps the number in `tel:` links automatically.
- **Third-party DNI (CallRail etc.)** — the number appears in 13 `tel:` links
  and as visible text in the header, hero, form, intent block, location block
  and final CTA. Point your DNI swap at `a[href^="tel:"]` and the text nodes;
  every visible instance is `(817) 839-7412` and every `href` is
  `tel:+18178397412`, so a single find/replace rule covers the page.

## 3. Form endpoint — required

The form validates, fires the conversion, then shows an in-place confirmation.
**It does not transmit anywhere yet.** Find the block marked
`SUBMIT TARGET` in the page script and replace it with one of:

**A — POST to a CRM / form handler**

```js
fetch('https://YOUR-ENDPOINT', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
})
.then(function(){ card.classList.add('is-sent'); })
.catch(function(){ window.location.href = 'tel:+18178397412'; });
```

**B — native form post**

```js
form.action = 'https://YOUR-ENDPOINT';
form.method = 'POST';
form.submit();
```

### Fields posted

`first_name`, `last_name`, `phone`, `email`, `reason`, `preferred_day`,
`insurance`, `message`, plus the attribution fields below and
`landing_page=dentist-mansfield-tx`.

### Attribution is already captured

On load the page reads `gclid`, `gbraid`, `wbraid`, `utm_source`, `utm_medium`,
`utm_campaign`, `utm_term` and `utm_content` from the query string, persists
them in `sessionStorage` (so they survive in-page navigation), and writes
`gclid` + the four main UTMs into hidden inputs. Store `gclid` against the lead
in your CRM — that is what makes **offline conversion import** possible, which
is how you feed Google Ads the appointments that actually showed up rather than
the raw form fills.

### Spam

A hidden `company` honeypot field is present; submissions that fill it are
silently dropped client-side. Add server-side validation too.

---

## 4. Suggested campaign mapping

The page is written for one tight ad group so the ad → keyword → page chain
stays literal, which is what Quality Score's *landing page experience* and
*ad relevance* components reward.

| Element | Value |
|---|---|
| Ad group | Dentist — Mansfield TX (general / new patient) |
| Core keywords | `dentist in mansfield tx`, `dentist near me mansfield`, `new patient dentist mansfield`, `dental office mansfield tx`, `weekend dentist mansfield`, `saturday dentist near me` |
| Headline echo on page | H1 "Dentist in Mansfield, TX", plus the "Looking for a dentist in Mansfield, TX?" section directly under the hero |
| Offer echo | `$99` appears in the hero badge, the offer section, the first-visit CTA, the FAQ and the sticky mobile bar |
| Final URL | `https://www.khandentalstudio.com/lp/dentist-mansfield-tx` |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&gclid={gclid}` |

Keep `noindex,follow` on the page (already set) so the ad landing page does not
compete with the main site in organic results.

### Ad extensions that match what the page proves

- **Sitelinks:** $99 new patient visit · Same-day crowns · Membership from $25/mo · Insurance accepted
- **Callouts:** Open Fri, Sat & Sun · Free second opinions · Mercury-free · Emergency slots daily
- **Structured snippet (Services):** Preventive Care, Dental Implants, Same-Day Crowns, Invisalign, Teeth Whitening, Root Canal Therapy
- **Call extension:** (817) 839-7412, scheduled to Fri 12:00–19:00 and Sat/Sun 10:00–15:00 so the extension is only live when someone answers

> Ad scheduling matters here more than usual: the practice is closed Monday to
> Thursday. Either bid down heavily outside clinic hours or lean on the form,
> which is answered "the next clinic day" — that expectation is set on the page
> so a Tuesday lead is not a broken promise.
