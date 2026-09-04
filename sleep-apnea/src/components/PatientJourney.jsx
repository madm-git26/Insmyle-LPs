import { Section, SectionIntro } from './ui/Section';
import { StepList } from './StepList';
import { Button } from './ui/Button';
import { journey } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Five-step journey on navy (spec 20). */
export function PatientJourney() {
  const { openBooking } = useBooking();

  return (
    <Section id={journey.id} tone="navy" className="journey" aria-labelledby="journey-heading">
      <SectionIntro
        eyebrow={journey.eyebrow}
        heading={journey.heading}
        body={journey.body}
        headingId="journey-heading"
      />
      <StepList steps={journey.steps} />
      <div style={{ marginTop: 'var(--space-12)' }}>
        <Button variant="invert" location="journey" onClick={() => openBooking('journey')}>
          {journey.cta}
        </Button>
      </div>
    </Section>
  );
}
