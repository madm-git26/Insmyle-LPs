import { useEffect, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useInView } from '../hooks/useInView';
import { airway } from '../content/copy';
import { Img } from './ui/Img';

/**
 * Airway state machine (spec 13/14).
 *
 * Desktop: scroll progress drives NORMAL → RESTRICTED → INTERRUPTED → RECOVERING.
 * Mobile:  a cheap timed loop instead of scroll-linked work.
 * Reduced motion: locks to NORMAL, no state changes.
 *
 * The figures are ordinary <img> so they lazy-load; the state machine only
 * changes which one is emphasised and what the readout says. Nothing here is
 * alarming — no blood, no extreme obstruction.
 */
const ORDER = ['NORMAL', 'RESTRICTED', 'INTERRUPTED', 'RECOVERING'];

function stateFromProgress(p) {
  if (p < 0.25) return 'NORMAL';
  if (p < 0.5) return 'RESTRICTED';
  if (p < 0.85) return 'INTERRUPTED';
  return 'RECOVERING';
}

export function AirwayVisualization() {
  const reduced = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 1023px)').matches;
  const scrollDriven = !reduced && !isMobile;

  const [scrollRef, progress] = useScrollProgress({ enabled: scrollDriven });
  const [inViewRef, inView] = useInView({ threshold: 0.2, once: false, rootMargin: '0px' });
  const [timedIndex, setTimedIndex] = useState(0);

  useEffect(() => {
    if (scrollDriven || reduced || !inView) return undefined;
    const id = setInterval(() => setTimedIndex((i) => (i + 1) % ORDER.length), 2200);
    return () => clearInterval(id);
  }, [scrollDriven, reduced, inView]);

  const state = reduced
    ? 'NORMAL'
    : scrollDriven
      ? stateFromProgress(progress)
      : ORDER[timedIndex];

  const activeFigure = state === 'NORMAL' || state === 'RECOVERING' ? 'NORMAL' : 'INTERRUPTED';

  return (
    <div
      className="airway__viz"
      ref={(node) => {
        scrollRef.current = node;
        inViewRef.current = node;
      }}
    >
      <div className="airway__states">
        {airway.figures.map((figure) => (
          <figure
            key={figure.state}
            className={`airway-state${figure.state === activeFigure ? ' is-active' : ''}`}
            style={{ margin: 0 }}
          >
            <div className="airway-state__figure">
              <Img
                src={figure.image.src}
                placeholder={figure.image.placeholder}
                alt={figure.image.alt}
                widths={[480, 800]}
                sizes="(max-width: 1023px) 50vw, 300px"
              />
            </div>
            <figcaption className="airway-state__caption">
              <b>{figure.title}</b>
              <span>{figure.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="airway__readout" data-state={state} role="status" aria-live="polite">
        <i aria-hidden="true" />
        {airway.states[state].label}
      </p>
    </div>
  );
}
