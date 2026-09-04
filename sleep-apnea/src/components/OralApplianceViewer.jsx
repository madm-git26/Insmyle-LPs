import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { treatment } from '../content/copy';
import { Img } from './ui/Img';

/**
 * Oral appliance viewer (spec 18 / 34).
 *
 * Loading policy — this matters more than the effect itself on a paid-traffic
 * page: a static WebP is what ships in the HTML. The 3D module is only
 * imported when the section is ~250px from the viewport, is skipped entirely
 * on reduced motion, and any failure silently keeps the static image.
 *
 * States: idle → loading → interactive | fallback.
 *
 * The scroll position drives the assembly sequence (complete → separated →
 * connection → aligning → complete) rather than a decorative spin, so the
 * interaction explains how the appliance works.
 */
export function OralApplianceViewer() {
  const reduced = useReducedMotion();
  const [nearViewport] = useInView({ threshold: 0, rootMargin: '250px 0px' });
  const [inViewRef, near] = useInView({ threshold: 0, rootMargin: '250px 0px' });
  const [scrollRef, progress] = useScrollProgress({ enabled: !reduced });
  const [state, setState] = useState('idle'); // idle | loading | interactive | fallback
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!near || reduced || state !== 'idle') return undefined;
    let cancelled = false;
    setState('loading');

    // Deliberately dynamic: keeps the 3D bundle out of the critical path.
    import('../lib/applianceScene')
      .then((mod) => {
        if (cancelled || !viewerRef.current) return;
        return mod.mountApplianceScene(viewerRef.current);
      })
      .then((handle) => {
        if (cancelled) {
          handle?.dispose?.();
          return;
        }
        if (handle) {
          viewerRef.current._handle = handle;
          setState('interactive');
        } else {
          setState('fallback');
        }
      })
      .catch(() => !cancelled && setState('fallback'));

    return () => {
      cancelled = true;
      viewerRef.current?._handle?.dispose?.();
    };
  }, [near, reduced, state]);

  // Feed scroll progress to the scene once it is live.
  useEffect(() => {
    if (state !== 'interactive') return;
    viewerRef.current?._handle?.setProgress?.(progress);
  }, [state, progress]);

  const setRefs = (node) => {
    scrollRef.current = node;
    inViewRef.current = node;
    nearViewport.current = node;
  };

  return (
    <div>
      <div className="appliance-viewer" ref={setRefs} data-state={state}>
        {/* Always in the DOM: the LCP-safe fallback (spec 34). */}
        <Img
          className="appliance-viewer__fallback"
          src={treatment.image.src}
          placeholder={treatment.image.placeholder}
          alt={treatment.image.alt}
          widths={[320, 640]}
          sizes="(max-width: 767px) 320px, 560px"
          hidden={state === 'interactive'}
        />
        <div ref={viewerRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
      </div>
      {state === 'interactive' && <p className="appliance-viewer__hint">{treatment.viewerHint}</p>}
    </div>
  );
}
