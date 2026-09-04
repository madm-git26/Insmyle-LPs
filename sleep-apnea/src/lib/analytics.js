/**
 * Conversion tracking (spec 05).
 *
 * Pushes to dataLayer when GTM is present and calls gtag directly when it is
 * not, so the page works with either setup — and silently no-ops in dev.
 */
import { getAttribution } from './utm';

export const EVENTS = {
  CTA_CLICK: 'sleep_apnea_cta_click',
  CALL_CLICK: 'sleep_apnea_call_click',
  FORM_START: 'sleep_apnea_form_start',
  FORM_SUBMIT: 'sleep_apnea_form_submit',
  BOOKING_START: 'sleep_apnea_booking_start',
  BOOKING_COMPLETE: 'sleep_apnea_booking_complete',
  FAQ_OPEN: 'faq_open',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  SCROLL_90: 'scroll_90',
};

export function getDevice() {
  if (typeof window === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function track(event, payload = {}) {
  if (typeof window === 'undefined') return;
  const data = {
    event,
    device: getDevice(),
    page_variant: getAttribution().variant || 'default',
    ...getAttribution(),
    ...payload,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data);
  } else if (typeof window.gtag === 'function') {
    const { event: _e, ...rest } = data;
    window.gtag('event', event, rest);
  } else if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, data);
  }
}

/** Fires scroll_50 / scroll_75 / scroll_90 once each. */
export function initScrollDepth() {
  if (typeof window === 'undefined') return () => {};
  const marks = [
    [50, EVENTS.SCROLL_50],
    [75, EVENTS.SCROLL_75],
    [90, EVENTS.SCROLL_90],
  ];
  const fired = new Set();
  let ticking = false;

  const measure = () => {
    ticking = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = (window.scrollY / scrollable) * 100;
    marks.forEach(([threshold, event]) => {
      if (pct >= threshold && !fired.has(event)) {
        fired.add(event);
        track(event, { depth: threshold });
      }
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
