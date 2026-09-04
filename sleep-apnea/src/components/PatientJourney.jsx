import { Section, SectionIntro } from './ui/Section';
import { StepList } from './StepList';
import { journey } from '../content/copy';

/** Section 11 — five-step journey on navy (spec 20). Step 01 carries its own CTA. */
export function PatientJourney() {
  return (
    <Section id={journey.id} tone="navy" className="journey" aria-labelledby="journey-heading">
      <SectionIntro
        eyebrow={journey.eyebrow}
        heading={journey.heading}
        body={journey.body}
        headingId="journey-heading"
      />
      <StepList steps={journey.steps} ctaLocation="journey" />
      <p className="journey__closing">{journey.closing}</p>
    </Section>
  );
}
