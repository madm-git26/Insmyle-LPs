import { Section, SectionIntro } from './ui/Section';
import { StepList } from './StepList';
import { Button } from './ui/Button';
import { applianceSteps } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Section 10 — how oral appliance therapy works, four steps (spec 19). */
export function TreatmentSteps() {
  const { openBooking } = useBooking();

  return (
    <Section aria-labelledby="appliance-steps-heading">
      <SectionIntro
        center
        heading={applianceSteps.heading}
        body={applianceSteps.body}
        headingId="appliance-steps-heading"
      />
      <StepList steps={applianceSteps.steps} />
      <div className="section__foot">
        <Button location="appliance_steps" onClick={() => openBooking('appliance_steps')}>
          {applianceSteps.cta}
        </Button>
      </div>
    </Section>
  );
}
