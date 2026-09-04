import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cpap } from '../content/copy';
import { useBooking } from './BookingProvider';

/**
 * Section 13 — CPAP as a peer option, never a competitor (spec 22).
 * Note the explicit "don't stop on your own" line: it is the safest thing on
 * the page and it stays prominent.
 */
export function CPAPSection() {
  const { openBooking } = useBooking();

  return (
    <Section aria-labelledby="cpap-heading">
      <div className="cpap__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{cpap.eyebrow}</span>
          <h2 id="cpap-heading">{cpap.heading}</h2>
          <div className="stack-4" style={{ marginTop: 'var(--space-6)' }}>
            {cpap.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{text}</p>
            ))}
          </div>
          <Button
            location="cpap"
            onClick={() => openBooking('cpap')}
            style={{ marginTop: 'var(--space-8)' }}
          >
            {cpap.cta}
          </Button>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <blockquote className="card cpap__highlight">
            <Icon name="quote" size={28} filled />
            <p>{cpap.highlight}</p>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
