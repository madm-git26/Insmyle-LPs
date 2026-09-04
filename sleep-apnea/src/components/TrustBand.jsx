import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { trustBand } from '../content/copy';

/** The navy reassurance strip that sits above the final CTA in the comp. */
export function TrustBand() {
  return (
    <section className="trust-band" aria-label="Why patients choose us">
      <div className="container trust-band__grid">
        {trustBand.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="trust-band__item">
            <span className="icon-badge icon-badge--invert">
              <Icon name={item.icon} size={22} />
            </span>
            <span>
              <b>{item.title}</b>
              <span>{item.body}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
