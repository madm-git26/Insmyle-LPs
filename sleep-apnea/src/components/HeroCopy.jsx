import { CTAGroup } from './CTAGroup';
import { Icon } from './ui/Icon';
import { hero } from '../content/copy';
import { fill } from '../content/practice';

/** Eyebrow → H1 → body → CTAs → trust row → microcopy (spec 07). */
export function HeroCopy({ variant }) {
  return (
    <div className="hero__copy">
      <span className="eyebrow">{variant.eyebrow}</span>

      <h1>
        {variant.headlineLines.map((line) => (
          <span key={line} style={{ display: 'block' }}>{line}</span>
        ))}
      </h1>

      <div className="hero__lede">
        {variant.paragraphs.map((text, i) => (
          <p key={text.slice(0, 24)} className={i === 0 ? 'lede' : undefined}>
            {fill(text)}
          </p>
        ))}
      </div>

      <CTAGroup
        primaryLabel={variant.primaryCta}
        secondaryLabel={hero.secondaryCta}
        location="hero"
      />

      <ul className="trust-row">
        {hero.trust.map((item) => (
          <li className="trust-item" key={item.label}>
            <span className="icon-badge">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="trust-item__label">{item.label}</span>
          </li>
        ))}
      </ul>

      <p className="hero__microcopy">{hero.microcopy}</p>
    </div>
  );
}
