import { CTAGroup } from './CTAGroup';
import { Icon } from './ui/Icon';
import { hero } from '../content/copy';
import { fill } from '../content/practice';

/** Eyebrow → H1 → paragraph → CTAs → trust row (spec 07). */
export function HeroCopy({ variant }) {
  return (
    <div className="hero__copy">
      <span className="eyebrow">{variant.eyebrow}</span>

      <h1>
        {variant.headlineLines.map((line) => (
          <span key={line} style={{ display: 'block' }}>{line}</span>
        ))}
      </h1>

      <p className="lede hero__lede">{fill(variant.body)}</p>

      <CTAGroup
        primaryLabel={variant.primaryCta}
        secondaryLabel={hero.secondaryCta}
        location="hero"
      />

      <ul className="trust-row" style={{ listStyle: 'none', padding: 0, margin: 'var(--space-10) 0 0' }}>
        {hero.trust.map((item) => (
          <li className="trust-item" key={item.label}>
            <span className="icon-badge">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="trust-item__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
