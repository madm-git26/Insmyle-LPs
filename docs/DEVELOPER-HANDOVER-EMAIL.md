# Developer handover — ready-to-send email

Copy everything between the lines into your mail client. Attach the two HTML files, or
point the team at the repo branch `claude/dentist-page-english-seo-mk9n29`.

---

**Subject:** Two new Google Ads landing pages to publish — In Smyle Dental (Lakeview & Roscoe Village)

Hi team,

Please publish the two landing pages attached. They are for our Google Ads campaigns only —
one for the General Dentist ad group, one for Emergency Dentist. Everything you need is
below.

---

## 1. Practice details (already baked into both pages — please do not change)

| | |
|---|---|
| Business name | In Smyle Dental – Lakeview & Roscoe Village |
| Address | 3514 N Lincoln Ave, Chicago, IL 60657 |
| Phone shown on both pages | **(773) 915-6530** |
| Booking button destination | `https://book.allinone.dental/in-smyle-dental?referrer_id=6` |
| Opening hours | Mon 7:00 am–7:00 pm · Tue 8:00 am–6:00 pm · Wed 7:00 am–6:00 pm · Thu 7:00 am–7:00 pm · Fri closed · Sat 7:00 am–3:00 pm · Sun closed |

---

## 2. Pages, slugs and meta

**Page 1 — General Dentist**

- File: `general-dentist-chicago.html`
- Proposed slug: `/lp/dentist-lakeview-chicago/`
- Meta title: `Dentist in Lakeview, Chicago — Same-Day, Evening & Saturday Visits`
- Meta description: `Need a dentist in Chicago? In Smyle Dental in Lakeview & Roscoe Village sees new patients the same day, opens evenings and Saturdays, and accepts most major insurance. Book online in under a minute.`

**Page 2 — Emergency Dentist**

- File: `emergency-dentist-chicago.html`
- Proposed slug: `/lp/emergency-dentist-lakeview-chicago/`
- Meta title: `Emergency Dentist in Chicago — Seen Today, Walk-Ins Welcome`
- Meta description: `In dental pain right now? In Smyle Dental in Lakeview & Roscoe Village treats toothache, broken teeth and swelling the same day. Walk-ins welcome, evenings and Saturdays. Call (773) 915-6530.`

The title and description tags are already written into each file — you do not need to set
them anywhere else. If the CMS has its own SEO fields, please make sure it does not override
what is in the file.

**These are new pages.** They do not replace `/lp/new-patient-dental-cleaning-exam/` or
`/lp/emergency-dentist-chicago/` — please leave both of those live and untouched. If you
would prefer different slugs, that is fine, just send them back to us so we can point the ads
at the right URLs.

---

## 3. How to publish them — important

**Each file is a complete, standalone HTML document.** It has its own `<!DOCTYPE>`, `<head>`,
stylesheet and scripts.

- Please serve each file **as-is**, at its own URL.
- Please do **not** paste the body into a page builder block, a Cornerstone element, or a
  theme template. The site's own stylesheet would then load on top of these pages and break
  the layout.
- If the platform needs a template, use a blank/canvas one with no header, footer or theme CSS.
- HTTPS is required — the review widget and the map will not load over HTTP.

---

## 4. Things that will silently break the pages if changed

1. **Do not run a global find-and-replace on the phone number.** (773) 915-6530 is our
   CallTrackingMetrics number for Google Ads. If it gets swapped for the main practice
   number, we lose all call attribution for these campaigns.
2. **Do not strip or rewrite the `?referrer_id=6` on the booking links.** That parameter is
   the only way we identify Google Ads leads in the All-in-One CRM. Some plugins and link
   managers strip query strings — please check that nothing does.
3. **`<meta name="robots" content="noindex, follow">` is intentional.** These are paid-traffic
   pages and must stay out of organic search. Please do not remove it, and do not add these
   URLs to the sitemap.
4. **Do not minify or strip the `<script type="application/ld+json">` blocks.** There are two
   per page (business details and FAQ). Some optimisation plugins remove them.
5. **The pages use inline `<style>` and inline `<script>`.** If the site sends a
   Content-Security-Policy header, it must allow `'unsafe-inline'` for both on these URLs, or
   the pages will render unstyled.
6. **The map is meant to load only when clicked.** You will see an address panel with a "Show
   map" button instead of an embedded map. That is deliberate — it keeps the page fast. It is
   not a bug.

---

## 5. Live Google reviews — one thing we need you to confirm

Both pages pull live Google reviews from our EmbedSocial account — a rating badge in the hero
and a full reviews section further down. They use these two widgets:

- Hero rating badge: `data-ref="8110babf905578547c0f838a3dbb2d6780619936"`
- Reviews section: `data-ref="66074ade90598c60353246c46094eb88ed145ab4"`

These are the same widgets already running on `/lp/new-patient-dental-cleaning-exam/`, so
they work on our domain.

**Please confirm the domain you publish to is authorised in the EmbedSocial account.**
EmbedSocial widgets only render on domains registered to the account and stay blank
everywhere else. If you publish to a staging or preview domain first, the reviews will
appear blank there — that is expected, and not a fault in the page.

The page handles this gracefully: if the widget cannot load, the hero badge shows a "Read our
reviews on Google" link instead of an empty box, and the reviews section shows a link to our
Google profile. So a blank widget is easy to miss — **please check the reviews are actually
rendering on the live URL before signing off.**

`embedsocial.com` must not be blocked by any firewall, ad-blocker rule or CSP on the site.

---

## 6. Domains that must not be blocked

| Host | Used for |
|---|---|
| `embedsocial.com` | Live Google reviews and rating badge |
| `d11iwgb7g2683x.cloudfront.net` | Our own images (award badge, insurance logos, dentist photos) |
| `fonts.googleapis.com`, `fonts.gstatic.com` | Page fonts |
| `book.allinone.dental` | Booking button |
| `www.google.com` | Map embed (loads only on click) |
| `maps.app.goo.gl` | Google reviews link |

---

## 7. Quick check after publishing

Please confirm on the live URLs:

- [ ] Both pages load with full styling, no site header or footer wrapped around them
- [ ] The Google rating badge in the hero shows a real star rating and review count
- [ ] The reviews section further down shows actual review cards
- [ ] Every "Call" button dials **(773) 915-6530**
- [ ] Every "Book" button lands on the booking page **with `?referrer_id=6` still in the URL**
- [ ] The FAQ items open and close when clicked
- [ ] The "Show map" button loads the map
- [ ] No sideways scrolling on a phone
- [ ] View source shows `noindex, follow` still present
- [ ] CDN and page cache purged

Once they are live, please send us the two final URLs so we can point the ads at them.

Thanks,
Ritesh

---

## Note for our own records (not part of the email)

The two meta descriptions are 198 and 191 characters. That is longer than the ~155 characters
Google shows in organic results — but these pages are `noindex`, so the description is never
displayed in search and the length has no effect. If the `noindex` is ever removed, trim them
to roughly 155 characters first. Shorter versions, ready to swap in:

- **General:** `Dentist in Lakeview & Roscoe Village, Chicago. Same-day appointments, evening and Saturday hours, most insurance accepted. Book online in under a minute.` (153)
- **Emergency:** `Emergency dentist in Lakeview & Roscoe Village, Chicago. Toothache, broken teeth and swelling treated the same day. Walk-ins welcome. Call (773) 915-6530.` (154)
