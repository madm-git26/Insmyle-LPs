import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { candidate } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Self-qualification checklist (spec 21). */
export function CandidateSection() {
  const { openBooking } = useBooking();

  return (
    <Section tone="ice" aria-labelledby="candidate-heading">
      <div className="candidate__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{candidate.eyebrow}</span>
          <h2 id="candidate-heading">{candidate.heading}</h2>
          <div style={{ marginTop: 'var(--space-6)', display: 'grid', gap: 'var(--space-4)' }}>
            {candidate.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{text}</p>
            ))}
          </div>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <div className="card candidate__card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>{candidate.checklistTitle}</h3>
            <ul className="checklist">
              {candidate.checklist.map((item) => (
                <li key={item}>
                  <Icon name="check" size={20} strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button block location="candidate" onClick={() => openBooking('candidate')}>
              {candidate.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
