import { Section, SectionIntro } from './ui/Section';
import { StepList } from './StepList';
import { OralApplianceViewer } from './OralApplianceViewer';
import { treatment } from '../content/copy';

/** How the appliance is made and worn — four steps + the viewer (spec 19). */
export function TreatmentSteps() {
  return (
    <Section aria-labelledby="treatment-steps-heading">
      <div className="airway__grid" style={{ marginBottom: 'var(--space-16)' }}>
        <div>
          <SectionIntro
            eyebrow="How It Fits Into Your Night"
            heading="What Wearing An Oral Appliance Is Like"
            body="It goes in before bed and comes out in the morning. That's the whole routine."
            headingId="treatment-steps-heading"
          />
        </div>
        <OralApplianceViewer />
      </div>
      <StepList steps={treatment.steps} />
    </Section>
  );
}
