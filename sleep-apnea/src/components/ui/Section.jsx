import { forwardRef } from 'react';
import { Reveal } from './Reveal';

/** Standard section shell: background variant + container + vertical rhythm. */
export const Section = forwardRef(function Section(
  { id, tone = 'white', size = 'default', className = '', children, ...rest },
  ref
) {
  const toneClass = { white: '', tint: 'section--tint', ice: 'section--ice', navy: 'section--navy' }[tone] || '';
  const classes = ['section', size === 'lg' && 'section--lg', toneClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} ref={ref} className={classes} {...rest}>
      <div className="container">{children}</div>
    </section>
  );
});

/** Eyebrow → H2 → paragraph, with the spec's 16/24/48 rhythm. */
export function SectionIntro({ eyebrow, heading, body, center = false, headingId, className = '' }) {
  return (
    <Reveal className={['section-intro', center && 'section-intro--center', className].filter(Boolean).join(' ')}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={headingId}>{heading}</h2>
      {body && <p className="lede">{body}</p>}
    </Reveal>
  );
}
