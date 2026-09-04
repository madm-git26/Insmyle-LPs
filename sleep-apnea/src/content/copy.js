/**
 * Landing page copy — the whole page, in one place.
 *
 * Editorial rules baked into this file:
 *  • No diagnostic claims. A dentist screens and treats; a physician diagnoses.
 *  • No statistics, percentages or outcome promises. Nothing here needs a citation.
 *  • Symptom language stays descriptive ("can be", "may be"), never predictive.
 *  • Every section earns the scroll: recognise → understand → see the option →
 *    trust the provider → book (spec 39/43).
 */

export const meta = {
  title: 'Sleep Apnea Treatment in {{CITY}} | {{PRACTICE}}',
  description:
    'Personalized sleep apnea evaluations and mask-free oral appliance therapy in {{CITY}}, {{STATE}}. Snoring, morning headaches, daytime fatigue — find out what is behind them. Call {{PHONE}}.',
  ogImage: '/og/sleep-apnea.jpg',
};

export const nav = {
  links: [
    { label: 'Sleep Apnea Treatment', href: '#symptoms' },
    { label: 'Oral Appliance Therapy', href: '#treatment' },
    { label: 'How It Works', href: '#journey' },
    { label: 'FAQs', href: '#faq' },
  ],
  cta: 'Schedule Evaluation',
};

export const hero = {
  eyebrow: 'Sleep Apnea Treatment',
  // Rendered as three lines to match the reference comp.
  headlineLines: ['Breathe Better.', 'Sleep Deeper.', 'Wake Up Better.'],
  headlinePlain: 'Breathe Better. Sleep Deeper. Wake Up Better.',
  body:
    'If snoring, restless sleep, morning headaches, or daytime fatigue are affecting your life, sleep apnea may be the reason. Our team provides personalized sleep apnea evaluations and treatment options designed to help you breathe more comfortably while you sleep.',
  primaryCta: 'Schedule A Sleep Apnea Evaluation',
  secondaryCta: 'Call {{PHONE}}',
  trust: [
    { icon: 'user', label: 'Personalized Evaluation' },
    { icon: 'moon', label: 'Comfortable Treatment Options' },
    { icon: 'calendar', label: 'Convenient Scheduling' },
  ],
  image: {
    src: '/images/hero-restful-sleep.jpg',
    placeholder: '/images/hero-restful-sleep.svg',
    alt: 'A man asleep on his side in bed, resting comfortably against a grey pillow in a bright bedroom.',
  },
  visualCaption: 'Steady, uninterrupted breathing',
};

export const problem = {
  eyebrow: 'Could This Be You?',
  heading: 'You Sleep. But You Don’t Feel Rested.',
  paragraphs: [
    'A full night in bed doesn’t always mean a full night of restorative sleep.',
    'Sleep apnea can repeatedly interrupt normal breathing while you’re asleep. You may not remember waking up, but those interruptions can leave you feeling tired, unfocused, or simply unlike yourself the next morning.',
    'Sometimes the first signs are noticed by the person sleeping next to you. Sometimes they’re noticed when you realize that you’re exhausted despite getting what should be enough sleep.',
  ],
  pullquote:
    'If something doesn’t feel right about your sleep, it’s worth finding out why.',
  cta: 'Schedule A Sleep Apnea Evaluation',
  image: {
    src: '/images/tired-morning.jpg',
    placeholder: '/images/tired-morning.svg',
    alt: 'A woman clamping a pillow over her ears with a pained expression, unable to sleep.',
  },
};

export const symptoms = {
  id: 'symptoms',
  heading: 'Could Your Sleep Be Trying To Tell You Something?',
  body:
    'Sleep apnea can look different from person to person. If several of these sound familiar, talking with a qualified healthcare professional may be a good next step.',
  cta: 'Talk To Our Sleep Apnea Team',
  items: [
    {
      icon: 'snore',
      title: 'Loud Snoring',
      body: 'Persistent or disruptive snoring can be a sign of obstructed breathing during sleep.',
    },
    {
      icon: 'head',
      title: 'Morning Headaches',
      body: 'Waking with headaches may be associated with disrupted sleep.',
    },
    {
      icon: 'battery',
      title: 'Daytime Fatigue',
      body: 'Do you wake up tired even after a full night in bed?',
    },
    {
      icon: 'lungs',
      title: 'Gasping During Sleep',
      body: 'Waking up choking, gasping, or short of breath can be a sign of interrupted breathing.',
    },
    {
      icon: 'brain',
      title: 'Difficulty Concentrating',
      body: 'Interrupted or poor-quality sleep can make it harder to stay focused.',
    },
    {
      icon: 'drop',
      title: 'Dry Mouth',
      body: 'Regularly waking with a dry mouth may be a clue to nighttime breathing problems.',
    },
  ],
  timeline: {
    normal: { label: 'Normal Breathing', caption: 'Smooth, uninterrupted airflow.' },
    interrupted: {
      label: 'Interrupted Breathing',
      caption: 'Airflow becomes restricted or interrupted.',
    },
  },
};

export const airway = {
  eyebrow: 'What Can Happen While You Sleep?',
  heading: 'Your Body May Be Working Harder Than You Realize.',
  paragraphs: [
    'During healthy sleep, breathing follows a natural rhythm.',
    'With obstructive sleep apnea, the upper airway can become narrowed or blocked, interrupting normal airflow.',
    'Your body responds to restore breathing, and this can happen repeatedly throughout the night.',
    'You may not fully wake up or remember these interruptions the next morning — which is one reason sleep apnea can sometimes go unnoticed.',
  ],
  cta: 'Learn About Your Treatment Options',
  states: {
    NORMAL: { label: 'Normal Airflow', caption: 'Smooth, uninterrupted airflow.' },
    RESTRICTED: { label: 'Restricted Airflow', caption: 'The airway begins to narrow.' },
    INTERRUPTED: { label: 'Breathing Interruption', caption: 'Airflow becomes restricted or interrupted.' },
    RECOVERING: { label: 'Airflow Returning', caption: 'The body works to restore normal breathing.' },
  },
  figures: [
    {
      state: 'NORMAL',
      title: 'Normal Breathing',
      caption: 'Smooth, uninterrupted airflow.',
      image: { src: '/images/airway-open.jpg', placeholder: '/images/airway-open.svg', alt: 'Side-profile illustration of an open upper airway with air moving freely.' },
    },
    {
      state: 'INTERRUPTED',
      title: 'Interrupted Breathing',
      caption: 'Airflow becomes restricted or interrupted.',
      image: { src: '/images/airway-restricted.jpg', placeholder: '/images/airway-restricted.svg', alt: 'Side-profile illustration of a narrowed upper airway restricting airflow.' },
    },
  ],
};

export const education = {
  eyebrow: 'The Basics',
  heading: 'What Is Obstructive Sleep Apnea?',
  body:
    'Obstructive sleep apnea is a sleep-related breathing condition. The soft tissues at the back of the throat can relax during sleep and narrow the airway, which interrupts normal breathing. It is diagnosed by a physician, usually after a sleep study you can often take at home.',
  steps: [
    {
      num: '01',
      title: 'The Airway Narrows',
      body: 'Muscles and soft tissue relax during sleep, and the space air travels through can become smaller.',
    },
    {
      num: '02',
      title: 'Breathing Is Interrupted',
      body: 'Airflow is reduced or briefly stops. This can happen more than once, throughout the night.',
    },
    {
      num: '03',
      title: 'Your Body Responds',
      body: 'The body works to reopen the airway and restore breathing — often without you fully waking up.',
    },
  ],
};

export const whyItMatters = {
  eyebrow: 'Why It Matters',
  heading: 'Poor Sleep Can Affect More Than Your Morning.',
  body:
    'Sleep is when the body recovers. When it’s repeatedly interrupted, the effects can show up in places you might not connect to sleep at all.',
  cards: [
    { icon: 'moon', title: 'Sleep Quality', body: 'Interrupted breathing can keep sleep from feeling restorative, even after a full night in bed.' },
    { icon: 'sun', title: 'Daytime Alertness', body: 'Tiredness during the day is one of the most commonly reported effects of disrupted sleep.' },
    { icon: 'brain', title: 'Concentration', body: 'Focus, memory and mood can all be harder to maintain when sleep is poor.' },
    { icon: 'heart', title: 'Overall Health', body: 'Untreated sleep apnea is associated with other health concerns, which is why physicians take it seriously.' },
  ],
  disclaimer:
    'This page is general health information, not medical advice, and no individual outcome is implied.',
};

export const treatment = {
  id: 'treatment',
  eyebrow: 'Personalized Treatment',
  heading: 'A More Comfortable Approach To Sleep Apnea Treatment',
  paragraphs: [
    'Treatment for sleep apnea isn’t necessarily one-size-fits-all. Depending on your diagnosis, symptoms, anatomy, and individual treatment needs, an oral appliance may be an appropriate option for managing obstructive sleep apnea or snoring.',
    'An oral appliance is a custom-made device worn like a retainer while you sleep. It supports the position of the lower jaw to help keep the airway open — no mask, no hose, and nothing to plug in.',
    'At {{PRACTICE}}, we take the time to understand your situation and discuss the treatment options that may be right for you.',
  ],
  callout: 'Your treatment should be based on your needs — not a one-size-fits-all approach.',
  cta: 'Explore Oral Appliance Therapy',
  image: {
    src: '/images/oral-appliance.jpg',
    placeholder: '/images/oral-appliance.svg',
    alt: 'A clinician holding a clear custom oral appliance used for sleep apnea treatment.',
  },
  viewerHint: 'Scroll to see how the appliance fits together',
  steps: [
    { num: '01', title: 'Custom Fit', body: 'We take a digital scan so the appliance is made specifically for your teeth and bite.' },
    { num: '02', title: 'Gentle Positioning', body: 'The appliance supports your lower jaw in a position that helps keep the airway open.' },
    { num: '03', title: 'Wear While Sleeping', body: 'You wear it only at night. It’s small enough to travel with and needs no power.' },
    { num: '04', title: 'Follow-Up', body: 'We adjust gradually and follow up, so comfort and fit are dialed in over time.' },
  ],
};

export const journey = {
  id: 'journey',
  eyebrow: 'How It Works',
  heading: 'Your Sleep Apnea Treatment Journey',
  body: 'Here’s what working with our team actually looks like, from first call to follow-up.',
  cta: 'Start With An Evaluation',
  steps: [
    { num: '01', title: 'Evaluation', body: 'We talk through your symptoms and sleep history, and examine your airway, teeth and bite.' },
    { num: '02', title: 'Testing', body: 'If a sleep study makes sense, we help arrange it — often a take-home test you do in your own bed.' },
    { num: '03', title: 'Diagnosis', body: 'A physician reviews the study and makes the diagnosis. That step is required before treatment.' },
    { num: '04', title: 'Custom Treatment', body: 'If an oral appliance fits your case, we scan, design and fit a device made for you.' },
    { num: '05', title: 'Ongoing Care', body: 'We fine-tune the fit, check in on how you’re sleeping, and coordinate with your physician.' },
  ],
};

export const candidate = {
  eyebrow: 'Is This Right For Me?',
  heading: 'You Might Be A Candidate For Oral Appliance Therapy',
  paragraphs: [
    'Oral appliance therapy isn’t right for everyone, and the only way to know is a conversation and a proper evaluation.',
    'That said, if you recognize yourself in several of the statements here, it’s worth asking about.',
  ],
  checklistTitle: 'See how many of these sound like you:',
  checklist: [
    'Regular or disruptive snoring',
    'Morning headaches',
    'Daytime fatigue after a full night in bed',
    'Gasping or choking during sleep',
    'Excessive daytime sleepiness',
    'Diagnosed obstructive sleep apnea',
    'Difficulty tolerating CPAP',
    'Interested in oral appliance therapy',
  ],
  cta: 'Let’s Talk About Your Options',
};

export const cpap = {
  eyebrow: 'Already On CPAP?',
  heading: 'Already Using CPAP? Let’s Talk About Your Options.',
  paragraphs: [
    'CPAP remains an important treatment for many people with obstructive sleep apnea. Some patients, however, have difficulty tolerating CPAP or may be candidates for other approaches.',
    'We can discuss your situation and help determine whether oral appliance therapy may be appropriate — including whether it makes more sense alongside CPAP rather than instead of it.',
  ],
  cta: 'Discuss My Treatment Options',
  equation: [
    { title: 'CPAP', body: 'Effective for many people, especially with severe sleep apnea.' },
    { title: 'Oral Appliance', body: 'A mask-free option that may be appropriate in some cases.' },
    { title: 'A Personalized Treatment Discussion', body: 'We look at your diagnosis and what you can realistically wear every night.', isResult: true },
  ],
};

export const provider = {
  eyebrow: 'Your Care Team',
  heading: 'Care That Starts With Listening',
  paragraphs: [
    'Sleep apnea treatment works best when it’s built around the person, not just the diagnosis. We take time to understand your history, your symptoms, and what you’ve already tried.',
    'We work alongside your physician and sleep specialist so that screening, testing, diagnosis and treatment stay connected.',
  ],
  cta: 'Meet With Our Team',
  image: {
    src: '/images/provider.jpg',
    placeholder: '/images/provider.svg',
    alt: 'A dentist talking with a patient in a bright consultation room.',
  },
  // Replace with the practice's genuine credentials before launch (spec 23).
  credsTitle: 'What we bring to your care',
};

export const technology = {
  eyebrow: 'Technology',
  heading: 'A Modern, Comfortable Process',
  body: 'A digital workflow means fewer impressions, a more precise fit, and less back-and-forth for you.',
  cards: [
    { icon: 'scan', title: 'Digital Imaging', body: 'Imaging helps us evaluate your airway, teeth and bite as part of your evaluation.' },
    { icon: 'tooth', title: 'Digital Scanning', body: 'A digital scan replaces messy impression material and supports a precise, comfortable fit.' },
    { icon: 'calendar', title: 'Personalized Follow-Up', body: 'We adjust the appliance over time and check in on how you’re actually sleeping.' },
  ],
};

export const testimonials = {
  eyebrow: 'Patient Experiences',
  heading: 'What Patients Tell Us',
  // PLACEHOLDER — replace with real, permissioned patient reviews before launch.
  // Do not publish invented testimonials (spec 25).
  note: 'Placeholder content — replace with real, permissioned patient reviews before launch.',
  items: [
    {
      quote:
        'I didn’t realize how much my sleep was affecting my day until it changed. The appliance was easier to get used to than I expected.',
      by: 'Patient, {{CITY}}',
    },
    { quote: 'My wife noticed the difference before I did.', by: 'Patient, {{CITY}}' },
    { quote: 'They explained every step and never pushed me toward anything.', by: 'Patient, {{CITY}}' },
  ],
};

export const faq = {
  id: 'faq',
  eyebrow: 'Common Questions',
  heading: 'Sleep Apnea Questions, Answered',
  items: [
    {
      q: 'Can a dentist diagnose sleep apnea?',
      a: 'No. Obstructive sleep apnea is a medical diagnosis made by a physician, usually based on a sleep study. What we do is screen for risk, evaluate your airway, help you arrange testing, and provide oral appliance therapy once a diagnosis is in place.',
    },
    {
      q: 'What is an oral appliance?',
      a: 'It’s a custom-made device worn like a retainer while you sleep. It supports the position of your lower jaw to help keep the airway open. There’s no mask, no hose and no power cord, and it fits in a travel case.',
    },
    {
      q: 'Is the appliance uncomfortable?',
      a: 'Most people adapt within a week or two — it feels similar to a retainer or nightguard. Temporary jaw soreness or a slightly different-feeling bite in the morning is common early on and usually settles. We adjust gradually rather than all at once.',
    },
    {
      q: 'Do I need a sleep study first?',
      a: 'For sleep apnea treatment, yes. Snoring and sleep apnea can’t reliably be told apart by questionnaire or exam alone, and treatment should follow a diagnosis. Testing is often a single night at home in your own bed.',
    },
    {
      q: 'Will my insurance cover it?',
      a: 'Oral appliance therapy for diagnosed obstructive sleep apnea is generally billed to medical insurance rather than dental. Coverage varies by plan, so we’ll review your benefits and go over the numbers with you before anything is made.',
    },
    {
      q: 'I already have a CPAP but I struggle with it.',
      a: 'That’s a common reason people come to us, and it’s worth a conversation. Bring your diagnosis and your CPAP settings. Some patients transition to an appliance, some use it for travel, and some do best using both.',
    },
    {
      q: 'How long does the process take?',
      a: 'It varies. After your evaluation and any testing, a custom appliance is typically fabricated and fitted over a few visits, followed by adjustment appointments to fine-tune comfort and fit.',
    },
    {
      q: 'What happens at the evaluation?',
      a: 'We talk through your symptoms and sleep history, look at your airway, teeth and bite, and explain what your options would look like. You’ll leave knowing what the next step is — and whether one is needed at all.',
    },
  ],
};

export const local = {
  heading: 'Sleep Apnea Treatment In {{CITY}}',
  paragraphs: [
    'Our team provides sleep apnea treatment in {{CITY}} for people who snore, wake up tired, or have been told they stop breathing during sleep. If you’ve been searching for a sleep apnea dentist near you, we’re here to help you understand what’s going on and what your options are.',
    'We offer snoring treatment and custom oral appliance therapy, and we coordinate with local physicians and sleep specialists on testing and diagnosis. Patients travel to see us from {{CITY}} and the surrounding communities.',
  ],
};

export const finalCta = {
  eyebrow: 'Take The First Step',
  heading: 'Ready To Sleep Better?',
  paragraphs: [
    'If snoring, fatigue, disrupted sleep, or concerns about sleep apnea are affecting your life, you don’t have to keep guessing what’s causing it.',
    'Take the first step toward understanding your sleep and exploring the treatment options that may be right for you.',
  ],
  primaryCta: 'Schedule A Sleep Apnea Evaluation',
  secondaryCta: 'Call {{PHONE}}',
  image: {
    src: '/images/well-rested-couple.jpg',
    placeholder: '/images/well-rested-couple.svg',
    alt: 'A couple waking up rested and stretching in bed in a sunlit bedroom.',
  },
};

export const trustBand = {
  items: [
    { icon: 'shield', title: 'Experienced Care', body: 'Focused training and experience in sleep apnea treatment.' },
    { icon: 'scan', title: 'Advanced Technology', body: 'A modern, digital workflow for precision, comfort and better outcomes.' },
    { icon: 'users', title: 'Patient-Focused', body: 'We listen, we care, and we support you every step of the way.' },
    { icon: 'smile', title: 'Better Sleep. Better Life.', body: 'Our goal is better sleep, better health, and better days ahead.' },
  ],
};

export const booking = {
  title: 'Schedule Your Sleep Apnea Evaluation',
  body: 'Tell us how to reach you and we’ll confirm a time that works. Prefer to talk now? Call {{PHONE}}.',
  submit: 'Request My Evaluation',
  submitting: 'Scheduling…',
  successTitle: 'Thank You — Your Request Has Been Received',
  successBody: 'Our team will contact you to help schedule your evaluation.',
  errorBody: 'Something went wrong sending your request. Please try again, or call {{PHONE}} and we’ll take care of it.',
  privacy: 'We use your information only to contact you about your evaluation.',
  fields: {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    preferredTime: 'Preferred Appointment Time',
  },
  preferredTimes: ['Morning', 'Midday', 'Afternoon', 'No preference'],
  validation: {
    required: 'This field is required.',
    phone: 'Please enter a valid phone number.',
    email: 'Please enter a valid email address.',
  },
};

export const stickyCta = { call: 'Call Now', book: 'Schedule Evaluation' };

export const footer = {
  blurb: 'Personalized sleep apnea treatment for better sleep, better health, and better days ahead.',
  columns: {
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'Sleep Apnea Treatment', href: '#symptoms' },
        { label: 'Oral Appliance Therapy', href: '#treatment' },
        { label: 'Snoring Treatment', href: '#treatment' },
        { label: 'How It Works', href: '#journey' },
        { label: 'FAQs', href: '#faq' },
      ],
    },
    practice: { title: 'Our Practice' },
    hours: { title: 'Hours' },
    schedule: {
      title: 'Schedule Today',
      body: 'Take the first step toward better sleep.',
      cta: 'Schedule Evaluation',
    },
  },
  legalNote:
    'This page provides general health information and is not medical advice. Obstructive sleep apnea is diagnosed by a physician, typically following a home or in-lab sleep study. Individual results vary, and no specific outcome is implied. Oral appliance therapy is not appropriate for everyone; suitability is determined after evaluation and diagnosis.',
};
