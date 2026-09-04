import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Img } from './ui/Img';
import { Button } from './ui/Button';
import { provider } from '../content/copy';
import { practice } from '../content/practice';
import { useBooking } from './BookingProvider';

/**
 * Trust block (spec 23).
 * Only list credentials the practice actually holds — edit practice.doctor
 * rather than this component.
 */
export function ProviderSection() {
  const { openBooking } = useBooking();

  return (
    <Section tone="tint" aria-labelledby="provider-heading">
      <div className="provider__grid">
        <Reveal variant="slide-right" className="provider__photo">
          <Img
            src={provider.image.src}
            placeholder={provider.image.placeholder}
            alt={provider.image.alt}
            widths={[640, 960]}
            sizes="(max-width: 1023px) 100vw, 46vw"
          />
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <span className="eyebrow">{provider.eyebrow}</span>
          <h2 id="provider-heading">{provider.heading}</h2>
          <p className="lede" style={{ marginTop: 'var(--space-5)' }}>
            {practice.doctor.name}
            {practice.doctor.credentials ? `, ${practice.doctor.credentials}` : ''} · {practice.name}
          </p>

          <div style={{ marginTop: 'var(--space-5)', display: 'grid', gap: 'var(--space-4)' }}>
            {provider.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{text}</p>
            ))}
          </div>

          <h3 className="sr-only">{provider.credsTitle}</h3>
          <ul className="provider__creds">
            {practice.doctor.highlights.map((item) => (
              <li key={item}>
                <Icon name="check" size={20} strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button
            location="provider"
            onClick={() => openBooking('provider')}
            style={{ marginTop: 'var(--space-8)' }}
          >
            {provider.cta}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
