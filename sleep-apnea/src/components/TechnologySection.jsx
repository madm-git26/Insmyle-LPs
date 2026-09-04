import { Section, SectionIntro } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { technology } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Section 15 — three technology cards, quiet reveal, no spinning icons (spec 24). */
export function TechnologySection() {
  const { openBooking } = useBooking();

  return (
    <Section aria-labelledby="technology-heading">
      <SectionIntro
        center
        eyebrow={technology.eyebrow}
        heading={technology.heading}
        body={technology.body}
        headingId="technology-heading"
      />
      <div className="tech-grid">
        {technology.cards.map((card, i) => (
          <Reveal key={card.title} variant="scale-in" delay={i * 120}>
            <article className="card card--hover tech-card">
              <span className="icon-badge icon-badge--lg">
                <Icon name={card.icon} size={24} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="section__foot">
        <Button location="technology" onClick={() => openBooking('technology')}>
          {technology.cta}
        </Button>
      </div>
    </Section>
  );
}
