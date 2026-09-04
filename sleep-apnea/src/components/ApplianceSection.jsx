import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { OralApplianceViewer } from './OralApplianceViewer';
import { appliance } from '../content/copy';
import { useBooking } from './BookingProvider';

/**
 * Section 09 — the appliance itself.
 * This is where the appliance viewer lives: the visual and the copy explaining
 * the device belong together (spec 18).
 */
export function ApplianceSection() {
  const { openBooking } = useBooking();

  return (
    <Section id={appliance.id} tone="ice" aria-labelledby="appliance-heading">
      <div className="appliance__grid">
        <Reveal variant="slide-right">
          <span className="eyebrow">{appliance.eyebrow}</span>
          <h2 id="appliance-heading">{appliance.heading}</h2>
          <div className="stack-4" style={{ marginTop: 'var(--space-6)' }}>
            {appliance.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{text}</p>
            ))}
          </div>
          <Button
            location="appliance"
            onClick={() => openBooking('appliance')}
            style={{ marginTop: 'var(--space-8)' }}
          >
            {appliance.cta}
          </Button>
        </Reveal>

        <Reveal variant="slide-left" delay={120}>
          <OralApplianceViewer />
        </Reveal>
      </div>

      <div className="appliance__features">
        {appliance.features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 100}>
            <article className="card card--hover">
              <span className="icon-badge icon-badge--lg">
                <Icon name={feature.icon} size={24} />
              </span>
              <h3 style={{ margin: 'var(--space-4) 0 var(--space-2)', fontSize: 20 }}>{feature.title}</h3>
              <p style={{ fontSize: 15 }}>{feature.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
