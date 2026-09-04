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
    paragraphs: [
      'You may be spending enough time in bed—but still waking up exhausted.',
      'If you snore loudly, wake with headaches or a dry mouth, feel tired throughout the day, or have been told that you stop breathing during sleep, sleep apnea may be affecting the quality of your rest.',
      'At [PRACTICE NAME], we provide personalized sleep apnea evaluations and treatment options designed around your individual needs.',
    ],
    primaryCta: 'Schedule A Sleep Apnea Evaluation',
  },
  oral_appliance: {
    key: 'oral_appliance',
    eyebrow: 'Oral Appliance Therapy',
    headlineLines: ['Explore Oral Appliance', 'Therapy For', 'Sleep Apnea.'],
    paragraphs: [
      'Oral appliance therapy uses a custom-fitted dental device worn while you sleep—no mask and no hose.',
      'Certain oral appliances are designed to gently position the lower jaw forward to help maintain space for airflow in appropriate patients with obstructive sleep apnea.',
      'At [PRACTICE NAME], we evaluate whether oral appliance therapy may be an appropriate option for your individual needs.',
    ],
    primaryCta: 'Schedule An Oral Appliance Consultation',
  },
  snoring: {
    key: 'snoring',
    eyebrow: 'Snoring Treatment',
    headlineLines: ['Find Out What’s', 'Behind Your', 'Snoring.'],
    paragraphs: [
      'Snoring can be disruptive on its own—and it can also be a sign of interrupted breathing during sleep.',
      'Snoring can have different causes, and not everyone who snores has sleep apnea. An evaluation can help determine whether there may be an underlying breathing or sleep-related issue.',
      'At [PRACTICE NAME], we provide personalized evaluations and treatment options designed around your individual needs.',
    ],
    primaryCta: 'Schedule A Snoring Evaluation',
  },
  cpap_alternative: {
    key: 'cpap_alternative',
    eyebrow: 'Exploring Your Options',
    headlineLines: ['Exploring Options', 'Beyond CPAP?', 'Let’s Talk.'],
    paragraphs: [
      'CPAP remains an important and effective treatment for many people with obstructive sleep apnea.',
      'However, some patients have difficulty tolerating CPAP or may be candidates for other treatment approaches. If you’re struggling with your current treatment, don’t simply stop using it on your own.',
      'Talk with us about your concerns and whether oral appliance therapy may be appropriate for your situation.',
    ],
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
