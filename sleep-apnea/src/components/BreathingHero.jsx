import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { hero } from '../content/copy';
import { Img } from './ui/Img';

/**
 * Hero visual (spec 08).
 *
 * Deliberately CSS + SVG rather than WebGL: this is the LCP area of a paid
 * traffic page (spec 34). The 8s loop tells the story — steady breathing,
 * a subtle interruption, recovery — and pauses whenever it is off-screen.
 */
export function BreathingHero() {
  const reduced = useReducedMotion();
  // once:false so the loop can be paused when scrolled away.
  const [ref, inView] = useInView({ threshold: 0.25, once: false, rootMargin: '0px' });
  const animating = inView && !reduced;

  return (
    <div className={`breathing-hero${animating ? ' is-animating' : ''}`} ref={ref}>
      <div className="breathing-hero__glow" aria-hidden="true" />

      <div className="breathing-hero__media">
        <Img
          src={hero.image.src}
          placeholder={hero.image.placeholder}
          alt={hero.image.alt}
          width="520"
          height="520"
          widths={[320, 640, 960]}
          sizes="(max-width: 767px) 320px, 520px"
          priority
        />
      </div>

      <svg className="breathing-hero__wave" viewBox="0 0 320 60" fill="none" aria-hidden="true">
        {/* steady · steady · shallow interruption · recovery */}
        <path d="M4 40c14 0 18-24 32-24s18 24 32 24 18-24 32-24 18 24 32 24c10 0 14-8 20-8s10 8 20 8 18-24 32-24 18 24 32 24 18-24 32-24" />
      </svg>

      <span className="breathing-hero__caption">{hero.visualCaption}</span>
    </div>
  );
}
