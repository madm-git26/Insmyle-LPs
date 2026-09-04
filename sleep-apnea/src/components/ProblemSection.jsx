import { Button } from './ui/Button';
import { Img } from './ui/Img';
import { Reveal } from './ui/Reveal';
import { problem } from '../content/copy';
import { useBooking } from './BookingProvider';

/** Full-bleed image left, copy right — matches the comp (spec 09). */
export function ProblemSection() {
  const { openBooking } = useBooking();

  return (
    <section className="problem" aria-labelledby="problem-heading">
      <div className="problem__grid">
        <div className="problem__media">
          <Img
            src={problem.image.src}
            placeholder={problem.image.placeholder}
            alt={problem.image.alt}
            widths={[640, 960, 1280]}
            sizes="(max-width: 1023px) 100vw, 42vw"
          />
        </div>

        <div className="problem__body">
          <Reveal className="problem__body-inner">
            <span className="eyebrow">{problem.eyebrow}</span>
            <h2 id="problem-heading">{problem.heading}</h2>

            <div style={{ marginTop: 'var(--space-6)' }}>
              {problem.paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="measure">{text}</p>
              ))}
            </div>

            <p className="pullquote">{problem.pullquote}</p>

            <Button location="problem" onClick={() => openBooking('problem')}>
              {problem.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
