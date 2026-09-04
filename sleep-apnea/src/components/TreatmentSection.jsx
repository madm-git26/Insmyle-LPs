import { Button } from './ui/Button';
import { Img } from './ui/Img';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { treatment } from '../content/copy';
import { fill } from '../content/practice';
import { useBooking } from './BookingProvider';

/**
 * Level 2 CTA intensity — "explore", not "book" (spec 39).
 * Image left, copy right, on the tinted ground, per the comp.
 */
export function TreatmentSection() {
  const { openBooking } = useBooking();

  return (
    <section className="treatment" id={treatment.id} aria-labelledby="treatment-heading">
      <div className="treatment__grid">
        <div className="treatment__media">
          <Img
            src={treatment.image.src}
            placeholder={treatment.image.placeholder}
            alt={treatment.image.alt}
            widths={[640, 960, 1280]}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>

        <div className="treatment__body">
          <Reveal>
            <span className="eyebrow">{treatment.eyebrow}</span>
            <h2 id="treatment-heading">{treatment.heading}</h2>

            <div style={{ marginTop: 'var(--space-6)' }}>
              {treatment.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="measure">{fill(text)}</p>
              ))}
            </div>

            <p className="treatment__callout">
              <span className="icon-badge">
                <Icon name="user" size={20} />
              </span>
              {treatment.callout}
            </p>

            <Button location="treatment" onClick={() => openBooking('treatment')}>
              {treatment.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
