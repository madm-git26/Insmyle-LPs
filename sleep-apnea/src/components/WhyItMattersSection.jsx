import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { whyItMatters } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Section 07 — four supporting areas (spec 16). No statistics by design. */
export function WhyItMattersSection() {
  const { openBooking } = useBooking();

  return (
    <Section tone="ice" aria-labelledby="matters-heading">
      <Reveal className="section-intro section-intro--center">
        <span className="eyebrow">{whyItMatters.eyebrow}</span>
        <h2 id="matters-heading">{whyItMatters.heading}</h2>
        {whyItMatters.paragraphs.map((text) => (
          <p key={text.slice(0, 24)} className="lede">{text}</p>
        ))}
      </Reveal>

      <div className="matters-grid">
        {whyItMatters.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 100}>
            <article className="card card--hover matters-card">
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
        <Button location="why_it_matters" onClick={() => openBooking('why_it_matters')}>
          {whyItMatters.cta}
        </Button>
      </div>
    </Section>
  );
}
