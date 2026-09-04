import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Img } from './ui/Img';
import { Button } from './ui/Button';
import { provider } from '../content/copy';
import { fill } from '../content/practice';
import { useBooking } from './BookingProvider';

/** Section 14 — provider trust plus the three trust points (spec 23). */
export function ProviderSection() {
  const { openBooking } = useBooking();

  return (
    <Section id="provider" tone="tint" aria-labelledby="provider-heading">
      <div className="provider__grid">
        <Reveal variant="slide-right" className="provider__photo">
          <Img
            src={provider.image.src}
            placeholder={provider.image.placeholder}
            alt={fill(provider.image.alt)}
            widths={[640, 960]}
            sizes="(max-width: 1023px) 100vw, 46vw"
          />
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <span className="eyebrow">{provider.eyebrow}</span>
          <h2 id="provider-heading">{provider.heading}</h2>
          <div className="stack-4" style={{ marginTop: 'var(--space-6)' }}>
            {provider.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{fill(text)}</p>
            ))}
          </div>
          <Button
            location="provider"
            onClick={() => openBooking('provider')}
            style={{ marginTop: 'var(--space-8)' }}
          >
            {provider.cta}
          </Button>
        </Reveal>
      </div>

      <div className="provider__points">
        {provider.trustPoints.map((point, i) => (
          <Reveal key={point.title} delay={i * 100}>
            <article className="card card--hover">
              <span className="icon-badge icon-badge--lg">
                <Icon name={point.icon} size={24} />
              </span>
              <h3 style={{ margin: 'var(--space-4) 0 var(--space-2)', fontSize: 19 }}>{point.title}</h3>
              <p style={{ fontSize: 15 }}>{point.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
