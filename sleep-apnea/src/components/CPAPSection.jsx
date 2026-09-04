import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { cpap } from '../content/copy';
import { useBooking } from './BookingProvider';

/**
 * CPAP is treated as a peer option, not a competitor (spec 22).
 * The visual resolves to "a personalized treatment discussion" — it must never
 * imply oral appliances are universally superior.
 */
export function CPAPSection() {
  const { openBooking } = useBooking();

  return (
    <Section aria-labelledby="cpap-heading">
      <div className="cpap__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{cpap.eyebrow}</span>
          <h2 id="cpap-heading">{cpap.heading}</h2>
          <div style={{ marginTop: 'var(--space-6)', display: 'grid', gap: 'var(--space-4)' }}>
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

        <Reveal variant="slide-left" delay={120} className="cpap__equation">
          {cpap.equation.map((row, i) => (
            <div key={row.title}>
              {i > 0 && (
                <p className="cpap__op" aria-hidden="true" style={{ margin: 'var(--space-2) 0' }}>
                  {i === cpap.equation.length - 1 ? '=' : '+'}
                </p>
              )}
              <div className={`cpap__row${row.isResult ? ' cpap__row--result' : ''}`}>
                <div>
                  <b>{row.title}</b>
                  <span style={{ display: 'block', marginTop: 'var(--space-1)' }}>{row.body}</span>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
