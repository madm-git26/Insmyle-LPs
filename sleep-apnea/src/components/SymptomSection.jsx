import { Section, SectionIntro } from './ui/Section';
import { SymptomGrid } from './SymptomGrid';
import { BreathingTimeline } from './BreathingTimeline';
import { Button } from './ui/Button';
import { symptoms } from '../content/copy';
import { useBooking } from './BookingProvider';

export function SymptomSection() {
  const { openBooking } = useBooking();

  return (
    <Section id={symptoms.id} tone="tint" aria-labelledby="symptoms-heading">
      <SectionIntro center heading={symptoms.heading} body={symptoms.body} headingId="symptoms-heading" />
      <SymptomGrid />
      <BreathingTimeline />
      <div className="symptoms__foot">
        <Button location="symptoms" onClick={() => openBooking('symptoms')}>
          {symptoms.cta}
        </Button>
      </div>
    </Section>
  );
}
