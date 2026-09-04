import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { local } from '../content/copy';
import { fill, practice } from '../content/practice';
import { useBooking } from './BookingProvider';

/**
 * Section 18 — local block (spec 27). Keywords appear because the sentences are
 * about the service in the city, not because they were stuffed in.
 */
export function LocalSEOSection() {
  const { openBooking } = useBooking();

  return (
    <Section id="local" tone="tint" className="local" aria-labelledby="local-heading">
      <div className="local__grid">
        <Reveal>
          <h2 id="local-heading">{fill(local.heading)}</h2>
          <div className="stack-4" style={{ marginTop: 'var(--space-5)' }}>
            {local.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{fill(text)}</p>
            ))}
          </div>
          <div className="cta-group" style={{ marginTop: 'var(--space-8)' }}>
            <Button location="local" onClick={() => openBooking('local')}>
              {local.cta}
            </Button>
            <Button variant="secondary" href={practice.phone.href} icon="phone" location="local">
              {fill(local.phoneCta)}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className="card local__card">
          <p className="local__label">{local.addressLabel}</p>
          <address className="local__address">
            <b>{practice.name}</b>
            {practice.address.line1}
            <br />
            {practice.address.line2}
            <br />
            {practice.address.city}, {practice.address.state} {practice.address.zip}
          </address>
          <a className="local__link" href={practice.address.mapUrl}>
            <Icon name="pin" size={16} /> Get directions
          </a>

          <div className="local__meta">
            <div>
              <b>Call</b>
              <span><a href={practice.phone.href}>{practice.phone.display}</a></span>
            </div>
            <div>
              <b>Hours</b>
              <span>
                {practice.hours.map((row) => (
                  <span key={row.days} style={{ display: 'block' }}>
                    {row.days}: {row.time}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
