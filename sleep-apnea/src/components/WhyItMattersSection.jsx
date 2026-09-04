import { Section, SectionIntro } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { whyItMatters } from '../content/copy';

/**
 * Four consequence cards (spec 16).
 * No statistics by design — any figure added here needs a source and a
 * medical review first.
 */
export function WhyItMattersSection() {
  return (
    <Section tone="ice" aria-labelledby="matters-heading">
      <SectionIntro
        eyebrow={whyItMatters.eyebrow}
        heading={whyItMatters.heading}
        body={whyItMatters.body}
        headingId="matters-heading"
      />
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
      <p className="small" style={{ marginTop: 'var(--space-8)', color: 'var(--ink-muted)' }}>
        {whyItMatters.disclaimer}
      </p>
    </Section>
  );
}
