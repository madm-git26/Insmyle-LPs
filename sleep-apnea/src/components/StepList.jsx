import { useEffect, useRef, useState } from 'react';

/**
 * Shared timeline used by the treatment steps and the patient journey
 * (spec 19/20). Horizontal on desktop, vertical on mobile; steps activate
 * as they scroll in and inactive steps sit at ~0.55 opacity.
 */
export function StepList({ steps, className = '' }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(() => new Set());

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll('[data-step]');
    if (!nodes?.length || typeof IntersectionObserver === 'undefined') {
      setActive(new Set(steps.map((_, i) => i)));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) next.add(Number(entry.target.dataset.step));
          });
          return next;
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <ol className={`steps ${className}`} ref={containerRef} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <span className="steps__rail" aria-hidden="true" />
      {steps.map((step, i) => (
        <li key={step.num} data-step={i} className={`step${active.has(i) ? ' is-active' : ''}`}>
          <span className="step__num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
