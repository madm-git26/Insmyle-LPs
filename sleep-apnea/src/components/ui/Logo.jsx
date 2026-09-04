import { practice } from '../../content/practice';

/** Wordmark + cloud/moon glyph, matching the reference comp lockup. */
export function Logo({ invert = false }) {
  return (
    <a className={`logo${invert ? ' logo--invert' : ''}`} href="#top" aria-label={`${practice.name} — home`}>
      <svg className="logo__mark" width="40" height="30" viewBox="0 0 40 30" fill="none" aria-hidden="true">
        <path
          d="M11.5 24.5h17a6.5 6.5 0 0 0 .8-12.95A9 9 0 0 0 12.2 9.2a6.6 6.6 0 0 0-.7 15.3Z"
          fill="currentColor" opacity=".16"
        />
        <path
          d="M11.5 24.5h17a6.5 6.5 0 0 0 .8-12.95A9 9 0 0 0 12.2 9.2a6.6 6.6 0 0 0-.7 15.3Z"
          stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
        />
        <path d="M22.6 4.6A5.4 5.4 0 0 0 28 13a5.4 5.4 0 1 1-5.4-8.4Z" fill="currentColor" />
      </svg>
      <span>
        <span className="logo__name">{practice.nameShort.toUpperCase()}</span>
        <span className="logo__sub">{practice.tagline}</span>
      </span>
    </a>
  );
}
