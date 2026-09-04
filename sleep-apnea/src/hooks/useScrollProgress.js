import { useEffect, useRef, useState } from 'react';

/**
 * 0 → 1 progress of an element travelling through the viewport.
 * Used to drive the airway state machine and the appliance viewer
 * (spec 14, 18). rAF-throttled; skipped entirely under reduced motion.
 */
export function useScrollProgress({ enabled = true } = {}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return undefined;

    let ticking = false;

    const measure = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const travelled = window.innerHeight - rect.top;
      setProgress(Math.min(1, Math.max(0, travelled / total)));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return [ref, progress];
}
