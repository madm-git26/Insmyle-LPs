import { Section, SectionIntro } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { education } from '../content/copy';

/** 01 / 02 / 03 explainer, numbers staggered in (spec 15). */
export function EducationSection() {
  return (
    <Section aria-labelledby="education-heading">
      <SectionIntro
        eyebrow={education.eyebrow}
        heading={education.heading}
        body={education.body}
        headingId="education-heading"
      />
      <div className="edu-grid">
        {education.steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 120}>
            <article className="edu-step">
              <p className="edu-step__num">{step.num}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
