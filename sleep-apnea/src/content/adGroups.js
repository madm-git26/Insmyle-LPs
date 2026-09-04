/**
 * Google Ads message match (spec 40).
 *
 * The hero adapts to the ad group that sent the visitor, so the headline
 * mirrors the intent they searched for. Resolution order:
 *   1. ?variant= explicit override (useful for previews and A/B tests)
 *   2. ?utm_content= / ?utm_term= keyword sniffing
 *   3. default
 *
 * Everything below the hero is shared — only the promise at the top changes.
 */
export const adGroups = {
  default: {
    key: 'default',
    eyebrow: 'Sleep Apnea Treatment',
    headlineLines: ['Breathe Better.', 'Sleep Deeper.', 'Wake Up Better.'],
    body:
      'If snoring, restless sleep, morning headaches, or daytime fatigue are affecting your life, sleep apnea may be the reason. Our team provides personalized sleep apnea evaluations and treatment options designed to help you breathe more comfortably while you sleep.',
    primaryCta: 'Schedule A Sleep Apnea Evaluation',
  },
  oral_appliance: {
    key: 'oral_appliance',
    eyebrow: 'Oral Appliance Therapy',
    headlineLines: ['Explore Oral Appliance', 'Therapy For', 'Sleep Apnea.'],
    body:
      'A custom oral appliance is worn like a retainer while you sleep — no mask, no hose, nothing to plug in. We’ll evaluate whether it’s an appropriate option for your diagnosis and your anatomy.',
    primaryCta: 'Schedule An Oral Appliance Consultation',
  },
  snoring: {
    key: 'snoring',
    eyebrow: 'Snoring Treatment',
    headlineLines: ['Find Out What’s', 'Behind Your', 'Snoring.'],
    body:
      'Snoring can be disruptive on its own — and it can also be a sign of interrupted breathing during sleep. We’ll help you find out which it is, and what can be done about it.',
    primaryCta: 'Schedule A Snoring Evaluation',
  },
  cpap_alternative: {
    key: 'cpap_alternative',
    eyebrow: 'Beyond CPAP',
    headlineLines: ['Exploring Options', 'Beyond CPAP?', 'Let’s Talk.'],
    body:
      'CPAP works well for many people — but not everyone can tolerate it. If you’ve been diagnosed with obstructive sleep apnea and CPAP isn’t working for you, an oral appliance may be worth discussing.',
    primaryCta: 'Discuss My Treatment Options',
  },
};

const KEYWORD_MAP = [
  [/oral[\s_-]?appliance|mouth[\s_-]?(guard|piece)|mad\b/i, 'oral_appliance'],
  [/snor/i, 'snoring'],
  [/cpap/i, 'cpap_alternative'],
];

/** Resolve the hero variant from the current URL. Safe on the server. */
export function resolveAdGroup(search = typeof window === 'undefined' ? '' : window.location.search) {
  const params = new URLSearchParams(search);
  const explicit = params.get('variant');
  if (explicit && adGroups[explicit]) return adGroups[explicit];

  const haystack = [params.get('utm_content'), params.get('utm_term'), params.get('kw')]
    .filter(Boolean)
    .join(' ');
  if (haystack) {
    for (const [pattern, key] of KEYWORD_MAP) {
      if (pattern.test(haystack)) return adGroups[key];
    }
  }
  return adGroups.default;
}
