/**
 * UTM / click-id persistence (spec 04.3).
 *
 * Google Ads attribution is lost the moment a CTA navigates without the
 * original query string. We capture the campaign parameters on first load,
 * keep them for the session, and re-attach them to every outbound link.
 */
const KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'variant',
];
const STORAGE_KEY = 'sa_lp_attribution';

function readStorage() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Capture params from the landing URL once per session. */
export function captureAttribution() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const found = {};
  KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) found[k] = v;
  });
  const merged = { ...readStorage(), ...found };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* private mode — fall back to in-memory for this page view */
  }
  return merged;
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  return readStorage();
}

/** Append stored attribution to an outbound URL (leaves tel: links alone). */
export function withAttribution(href) {
  if (!href || /^(tel:|mailto:|#)/.test(href)) return href;
  const attribution = getAttribution();
  if (!Object.keys(attribution).length) return href;
  try {
    const url = new URL(href, window.location.origin);
    Object.entries(attribution).forEach(([k, v]) => {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    });
    return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : url.toString();
  } catch {
    return href;
  }
}
