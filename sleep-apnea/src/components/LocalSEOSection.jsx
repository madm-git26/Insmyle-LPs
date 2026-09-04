import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { local } from '../content/copy';
import { fill, practice } from '../content/practice';

/**
 * Compact local block (spec 27). Keywords appear because the sentences are
 * about the service in the city — not stuffed.
 */
export function LocalSEOSection() {
  return (
    <Section tone="tint" className="local" aria-labelledby="local-heading">
      <div className="local__grid">
        <Reveal>
          <h2 id="local-heading">{fill(local.heading)}</h2>
          <div style={{ marginTop: 'var(--space-5)' }}>
            {local.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="measure">{fill(text)}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="local__meta">
          <div>
            <b>Visit</b>
            <span>
              {practice.address.line1}, {practice.address.line2}
              <br />
              {practice.address.city}, {practice.address.state} {practice.address.zip}
              <br />
              <a href={practice.address.mapUrl} style={{ color: 'var(--navy-700)', fontWeight: 600 }}>
                Get directions
              </a>
            </span>
          </div>
          <div>
            <b>Call</b>
            <span>
              <a href={practice.phone.href} style={{ color: 'var(--navy-700)', fontWeight: 600 }}>
                {practice.phone.display}
              </a>
            </span>
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
          <p className="small" style={{ display: 'flex', gap: 'var(--space-2)', color: 'var(--ink-muted)' }}>
            <Icon name="pin" size={16} />
            Serving {practice.address.city} and the surrounding communities.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
