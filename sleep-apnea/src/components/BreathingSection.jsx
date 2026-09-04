import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { BreathingTimeline } from './BreathingTimeline';
import { breathing } from '../content/copy';

/**
 * Section 04 — what happens while you sleep.
 * The animated normal / interrupted traces carry the two visual labels; the
 * supporting line explains why the reader may never have noticed.
 */
export function BreathingSection() {
  return (
    <Section aria-labelledby="breathing-heading">
      <Reveal className="section-intro section-intro--center">
        <span className="eyebrow">{breathing.eyebrow}</span>
        <h2 id="breathing-heading">{breathing.heading}</h2>
        {breathing.paragraphs.map((text) => (
          <p key={text.slice(0, 24)} className="lede">{text}</p>
        ))}
      </Reveal>

      <BreathingTimeline />

      <Reveal delay={200}>
        <p className="breathing__supporting">{breathing.supporting}</p>
      </Reveal>
    </Section>
  );
}
