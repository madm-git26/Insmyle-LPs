import { forwardRef } from 'react';
import { HeroCopy } from './HeroCopy';
import { BreathingHero } from './BreathingHero';

/** 55 / 45 split, centred, header overlaid (spec 07). */
export const HeroSection = forwardRef(function HeroSection({ variant }, ref) {
  return (
    <div className="hero" id="top">
      <div className="container hero__grid" ref={ref}>
        <HeroCopy variant={variant} />
        <BreathingHero />
      </div>
    </div>
  );
});
