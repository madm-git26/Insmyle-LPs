import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { education } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Section 06 — 01 / 02 / 03 explainer, numbers staggered in (spec 15). */
export function EducationSection() {
  const { openBooking } = useBooking();

  return (
    <Section aria-labelledby="education-heading">
      <Reveal className="section-intro section-intro--center">
        <span className="eyebrow">{education.eyebrow}</span>
        <h2 id="education-heading">{education.heading}</h2>
        {education.paragraphs.map((text) => (
          <p key={text.slice(0, 24)} className="lede">{text}</p>
        ))}
      </Reveal>

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

      <div className="section__foot">
        <Button location="education" onClick={() => openBooking('education')}>
          {education.cta}
        </Button>
      </div>
    </Section>
  );
}
