import { ICON_PATHS, SOLID_ICONS } from '../../content/icons';

/**
 * Line-icon set drawn to match the reference comp: 1.5px strokes, rounded
 * caps, 24px grid. Path data lives in content/icons.js so the React build and
 * the static standalone build share one source.
 *
 * Decorative by default (aria-hidden) — pass a `title` when an icon is the
 * only label for a control.
 */
export function Icon({ name, size = 24, strokeWidth = 1.5, filled = false, title, className }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  const labelled = Boolean(title);
  // Solid only when asked for — SOLID_ICONS lists the glyphs that read better
  // that way (brand marks, the quote glyph), it does not force them.
  const solid = filled;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : 'true'}
      focusable="false"
      // Path data is our own static markup, not user input.
      dangerouslySetInnerHTML={{ __html: (labelled ? `<title>${title}</title>` : '') + path }}
    />
  );
}

export { SOLID_ICONS };
