import { useInView } from '../hooks/useInView';
import { breathing } from '../content/copy';

/**
 * Two breathing traces, drawn left to right once on scroll (spec 11).
 * Pure SVG stroke-dash animation — no library, no layout cost.
 */
const NORMAL = 'M0 40c20 0 26-26 46-26s26 26 46 26 26-26 46-26 26 26 46 26 26-26 46-26 26 26 46 26 26-26 46-26 26 26 46 26';
const INTERRUPTED = 'M0 40c20 0 26-26 46-26s26 26 46 26h46c20 0 26-26 46-26s26 26 46 26h46c20 0 26-26 46-26s26 26 46 26';

export function BreathingTimeline() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const { normal, interrupted } = breathing.timeline;

  return (
    <div className={`timeline-chart${inView ? ' is-visible' : ''}`} ref={ref}>
      <div className="timeline-chart__row">
        <p className="timeline-chart__label">{normal.label}</p>
        <svg viewBox="0 0 368 80" preserveAspectRatio="none" role="img"
             aria-label={`${normal.label}: ${normal.caption}`}>
          <path className="trace trace-normal" d={NORMAL} style={{ '--len': 900 }} />
        </svg>
        <p className="timeline-chart__caption">{normal.caption}</p>
      </div>

      <div className="timeline-chart__row">
        <p className="timeline-chart__label">{interrupted.label}</p>
        <svg viewBox="0 0 368 80" preserveAspectRatio="none" role="img"
             aria-label={`${interrupted.label}: ${interrupted.caption}`}>
          <path className="trace trace-interrupted" d={INTERRUPTED} style={{ '--len': 900 }} />
          <circle className="timeline-chart__pause" cx="115" cy="40" r="3.5" />
          <circle className="timeline-chart__pause" cx="253" cy="40" r="3.5" />
        </svg>
        <p className="timeline-chart__caption">{interrupted.caption}</p>
      </div>
    </div>
  );
}
