/**
 * Line-icon set drawn to match the reference comp: 1.5px strokes, rounded
 * caps, 24px grid. Decorative by default (aria-hidden) — pass a `title` when
 * an icon is the only label for a control.
 */
const PATHS = {
  user: <><circle cx="12" cy="8" r="3.4" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 19a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.6M17 19a6 6 0 0 0-2.2-4.6" /></>,
  moon: <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.6h17M8.5 3v4M15.5 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.3V12l3.2 2" /></>,
  phone: <path d="M6.4 3.5h3l1.6 4-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m3.8 7 8.2 6 8.2-6" /></>,
  pin: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />,
  shield: <><path d="M12 3 5 5.8v5.4c0 4.4 3 8 7 9.8 4-1.8 7-5.4 7-9.8V5.8Z" /><path d="m9 12 2.2 2.2L15.2 10" /></>,
  smile: <><circle cx="12" cy="12" r="8.5" /><path d="M8.6 13.6a4.4 4.4 0 0 0 6.8 0M9.4 9.6h.01M14.6 9.6h.01" /></>,
  brain: <><path d="M9.5 4.5A2.6 2.6 0 0 0 7 7.1a2.7 2.7 0 0 0-1.4 4.6A2.8 2.8 0 0 0 7.4 17c.5 1.4 2 2.3 3.4 2V4.9a2.3 2.3 0 0 0-1.3-.4Z" /><path d="M14.5 4.5A2.6 2.6 0 0 1 17 7.1a2.7 2.7 0 0 1 1.4 4.6A2.8 2.8 0 0 1 16.6 17c-.5 1.4-2 2.3-3.4 2V4.9a2.3 2.3 0 0 1 1.3-.4Z" /></>,
  lungs: <><path d="M12 3v9" /><path d="M12 8.5c-.6-1.3-1.7-2-2.9-2-1.6 0-2.6 1.3-3 3.2L5 16.4c-.3 1.7.6 3.1 2.2 3.4 1.6.3 3-.7 3.3-2.3l.5-3" /><path d="M12 8.5c.6-1.3 1.7-2 2.9-2 1.6 0 2.6 1.3 3 3.2l1.1 6.7c.3 1.7-.6 3.1-2.2 3.4-1.6.3-3-.7-3.3-2.3l-.5-3" /></>,
  head: <><path d="M18.5 20v-2.6c2-1.4 3-3.6 3-5.9A8 8 0 0 0 6.6 7L3.4 12.4c-.3.6 0 1.2.7 1.3l1.6.3v2.2c0 1.4 1.1 2.5 2.5 2.5h2.3V20" /><path d="M14.6 11.4h.01" /></>,
  snore: <><path d="M4 9.5v5M7.5 7v10M11 10.5v3" /><path d="M14.6 8.6a4.6 4.6 0 0 1 0 6.8M17.6 6a8 8 0 0 1 0 12" /></>,
  battery: <><rect x="3" y="7" width="15.5" height="10" rx="2.5" /><path d="M21 10.5v3" /><path d="M6.5 10.5v3" /></>,
  drop: <path d="M12 3.5s5.5 6 5.5 9.6a5.5 5.5 0 0 1-11 0C6.5 9.5 12 3.5 12 3.5Z" />,
  scan: <><path d="M3.5 8V5.6a2 2 0 0 1 2-2H8M16 3.6h2.4a2 2 0 0 1 2 2V8M20.5 16v2.4a2 2 0 0 1-2 2H16M8 20.4H5.6a2 2 0 0 1-2-2V16" /><path d="M3.5 12h17" /></>,
  tooth: <path d="M8.4 3.6c-2.2 0-3.9 1.9-3.9 4.2 0 1.5.5 2.4.9 3.6.5 1.5.5 2.6.7 4.3.2 1.5.4 3.7 1.6 4.3 1.4.7 2-1.2 2.2-2.6l.4-2.6c.1-.8.4-1.3 1.1-1.3.8 0 1 .5 1.2 1.3l.4 2.6c.2 1.4.8 3.3 2.2 2.6 1.2-.6 1.4-2.8 1.6-4.3.2-1.7.2-2.8.7-4.3.4-1.2.9-2.1.9-3.6 0-2.3-1.7-4.2-3.9-4.2-1.6 0-2.2.8-3.1.8s-1.5-.8-3-.8Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9.5 6 6 6-6" />,
  close: <path d="M6 6 18 18M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  quote: <path d="M9.5 6.5C6.9 7.6 5.5 9.9 5.5 13v4.5h5.8V12H8.4c0-1.9.7-3.1 2.4-3.9Zm9 0c-2.6 1.1-4 3.4-4 6.5v4.5h5.8V12h-2.9c0-1.9.7-3.1 2.4-3.9Z" />,
  facebook: <path d="M14.5 8.5h2.2V5.6h-2.4c-2.3 0-3.6 1.4-3.6 3.7v1.8H8.4v2.9h2.3v6.4h3v-6.4h2.3l.4-2.9h-2.7V9.6c0-.8.3-1.1.8-1.1Z" />,
  instagram: <><rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.6" /><circle cx="12" cy="12" r="3.7" /><path d="M16.9 7.1h.01" /></>,
  google: <path d="M20 12.2c0-.7-.06-1.2-.18-1.8H12v3.3h4.6a3.9 3.9 0 0 1-1.7 2.6v2.1h2.7c1.6-1.5 2.4-3.6 2.4-6.2Z M12 20.5c2.3 0 4.2-.8 5.6-2.1l-2.7-2.1c-.8.5-1.7.8-2.9.8-2.2 0-4.1-1.5-4.8-3.5H4.4v2.2A8.5 8.5 0 0 0 12 20.5Z M7.2 13.6a5 5 0 0 1 0-3.2V8.2H4.4a8.5 8.5 0 0 0 0 7.6Z M12 6.9c1.3 0 2.4.4 3.3 1.3l2.4-2.4A8.5 8.5 0 0 0 4.4 8.2l2.8 2.2c.7-2 2.6-3.5 4.8-3.5Z" />,
};

export function Icon({ name, size = 24, strokeWidth = 1.5, filled = false, title, className }) {
  const path = PATHS[name];
  if (!path) return null;
  const labelled = Boolean(title);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : 'true'}
      focusable="false"
    >
      {labelled && <title>{title}</title>}
      {path}
    </svg>
  );
}

// Brand glyphs read better as solid shapes.
export const SOLID_ICONS = new Set(['facebook', 'instagram', 'google', 'quote', 'tooth', 'drop', 'moon', 'heart']);
