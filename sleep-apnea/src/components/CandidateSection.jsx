import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { candidate } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Section 12 — self-qualification checklist (spec 21). */
export function CandidateSection() {
  const { openBooking } = useBooking();

  return (
    <Section tone="ice" aria-labelledby="candidate-heading">
      <div className="candidate__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{candidate.eyebrow}</span>
          <h2 id="candidate-heading">{candidate.heading}</h2>
          <p className="lede" style={{ marginTop: 'var(--space-6)' }}>{candidate.body}</p>
          <p className="candidate__note">{candidate.note}</p>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <div className="card candidate__card">
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
