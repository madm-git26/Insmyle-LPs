import { useEffect, useState } from 'react';

/** Header goes solid after ~80px of scroll (spec 06). */
export function useStickyHeader(offset = 80) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      setStuck(window.scrollY > offset);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return stuck;
}
