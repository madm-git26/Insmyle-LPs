import { forwardRef } from 'react';
import { CTAGroup } from './CTAGroup';
import { Reveal } from './ui/Reveal';
import { Img } from './ui/Img';
import { Icon } from './ui/Icon';
import { finalCta } from '../content/copy';

/** Section 19 — level 3 CTA intensity: the same ask as the hero (spec 39). */
export const FinalCTA = forwardRef(function FinalCTA(_props, ref) {
  return (
    <section className="final-cta" ref={ref} aria-labelledby="final-cta-heading">
      <div className="container final-cta__grid">
        <Reveal className="final-cta__copy">
          <span className="eyebrow">{finalCta.eyebrow}</span>
          <h2 id="final-cta-heading">{finalCta.heading}</h2>
          {finalCta.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="lede">{text}</p>
          ))}

          <CTAGroup
            primaryLabel={finalCta.primaryCta}
            secondaryLabel={finalCta.secondaryCta}
            location="final_cta"
          />

          <ul className="final-cta__reassurance">
            {finalCta.reassurance.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>

          <p className="final-cta__microcopy">{finalCta.microcopy}</p>
        </Reveal>

        <Reveal variant="slide-left" delay={120} className="final-cta__media">
          <Img
            src={finalCta.image.src}
            placeholder={finalCta.image.placeholder}
            alt={finalCta.image.alt}
            widths={[640, 960, 1280]}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </Reveal>
      </div>
    </section>
  );
});
