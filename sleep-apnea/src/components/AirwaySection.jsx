import { Section } from './ui/Section';
import { AirwayVisualization } from './AirwayVisualization';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { airway } from '../content/copy';

/** 45 / 55 explanation + visualization on navy (spec 12). */
export function AirwaySection() {
  return (
    <Section tone="navy" aria-labelledby="airway-heading">
      <div className="airway__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{airway.eyebrow}</span>
          <h2 id="airway-heading">{airway.heading}</h2>
          <div style={{ marginTop: 'var(--space-6)', display: 'grid', gap: 'var(--space-4)' }}>
            {airway.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{text}</p>
            ))}
          </div>
          <Button
            variant="invert"
            href="#treatment"
            location="airway"
            style={{ marginTop: 'var(--space-8)' }}
          >
            {airway.cta}
          </Button>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <AirwayVisualization />
        </Reveal>
      </div>
    </Section>
  );
}
