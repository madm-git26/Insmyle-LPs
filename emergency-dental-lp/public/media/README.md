# About-section video

Drop two files here and point `aboutMedia` in `src/data/content.js` at them:

```js
export const aboutMedia = {
  video: media('about.mp4'),
  poster: media('about-poster.webp'),
  label: '',
}
```

That is the whole change — no component edits. Until then the panel keeps its current
look (the vector tooth), so the page is never broken mid-swap.

## What to supply

| File | What it is | Spec |
|---|---|---|
| `about.mp4` | the loop | **16:9**, H.264 (`avc1`), **no audio track**, 6–12s, seamless loop |
| `about-poster.webp` | first frame | same 16:9 framing, ~1280 × 720 |

- **1280 × 720 is plenty.** The panel renders about 560px wide at 1440, so 720p is
  already 2× and 1080p only costs bandwidth.
- **Keep it under ~2MB.** This is a paid-traffic page and the clip is decorative; it
  should never compete with the phone number for bandwidth. `-crf 26` or so.
- **Strip the audio track.** The video is muted and looping, so audio is dead weight,
  and a muted track still downloads.
- **Give it a poster.** It shows while the video loads, when autoplay is refused
  (battery saver, data saver, iOS Low Power Mode), and to anyone with reduced motion on.
- **A WebM/VP9 sibling is optional.** H.264 in MP4 plays everywhere the page targets;
  a second encode is more bytes to keep in sync for no reach.

## Licensing

Whatever goes here ships on a live commercial page, so it needs to be footage the
practice owns or has licensed for that use. A watermarked preview from a stock library
is not licensed — the watermark is what marks it as such.

## Reduced motion

An autoplaying loop is exactly what `prefers-reduced-motion` is for, and the global
reduced-motion rule in `src/index.css` only neutralises CSS animation — it does nothing
to a `<video>`. `MediaPanel.jsx` handles it explicitly: with that preference set the
poster is shown and the video is never fetched.

## The single-file build

`emergency-dental-care.html` inlines whatever is in this folder as a data URI, so the
standalone file plays the video offline like everything else. Base64 costs about a third
in size on top, so a 2MB clip makes that file roughly 3.3MB — worth knowing before
emailing it. `node scratchpad/pack.js` with `STANDALONE=1` reports the exact figure.
