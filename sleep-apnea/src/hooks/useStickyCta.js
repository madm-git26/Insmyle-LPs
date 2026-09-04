import { useEffect, useState } from 'react';

/**
 * Mobile sticky bar visibility (spec 29):
 * shown once the hero CTA has scrolled away, hidden again when the final CTA
 * is on screen, so the bar never competes with the primary CTA.
 */
export function useStickyCta({ heroRef, finalRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const state = { heroVisible: true, finalVisible: false };
    const apply = () => setVisible(!state.heroVisible && !state.finalVisible);

    const observers = [];
    const watch = (node, key) => {
      if (!node) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          state[key] = entry.isIntersecting;
          apply();
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
      observers.push(observer);
    };

    watch(heroRef.current, 'heroVisible');
    watch(finalRef.current, 'finalVisible');
    return () => observers.forEach((o) => o.disconnect());
  }, [heroRef, finalRef]);

  return visible;
}
