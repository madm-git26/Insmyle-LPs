import { useState } from 'react';

/**
 * Responsive image with a graceful placeholder.
 *
 * `src` is the production photograph (AVIF/WebP/JPG). Until the real asset is
 * dropped into /public/images, the on-brand SVG placeholder in `placeholder`
 * renders instead — so the page never shows a broken image during build-out.
 *
 * When the real photography lands, add the responsive derivatives listed in
 * docs/IMAGE-MANIFEST.md and pass `widths` to emit a srcset (spec 33).
 */
export function Img({
  src,
  placeholder,
  alt,
  widths,
  sizes = '100vw',
  priority = false,
  className,
  ...rest
}) {
  const [failed, setFailed] = useState(false);
  const resolved = failed && placeholder ? placeholder : src;
  const isVector = resolved.endsWith('.svg');

  const srcSet =
    !failed && widths?.length && !isVector
      ? widths.map((w) => `${withWidth(src, w)} ${w}w`).join(', ')
      : undefined;

  return (
    <img
      className={className}
      src={resolved}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

/** /images/hero.jpg + 960 → /images/hero-960.jpg */
function withWidth(src, width) {
  return src.replace(/(\.[a-z0-9]+)$/i, `-${width}$1`);
}
