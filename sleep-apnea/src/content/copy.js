/**
 * Landing page copy — client-approved, verbatim.
 *
 * Every string here matches copy/landing-page-copy.md word for word. Tokens use
 * the client's bracket convention ([PRACTICE NAME], [CITY], [PHONE]…) and
 * resolve from practice.js via fill(). Edit copy here or in the deck and mirror
 * the change — nothing else in the codebase contains page prose.
 */

export const meta = {
  title: 'Sleep Apnea Treatment in [CITY], [STATE] | [PRACTICE NAME]',
  titleAlt: 'Sleep Apnea Dentist in [CITY] | Oral Appliance Therapy',
  description:
    'Looking for sleep apnea treatment in [CITY]? Explore personalized sleep apnea evaluations and oral appliance therapy options at [PRACTICE NAME].',
  ogImage: '/og/sleep-apnea.jpg',
};

export const nav = {
  links: [
    { label: 'Sleep Apnea Treatment', href: '#symptoms' },
    { label: 'Oral Appliance Therapy', href: '#appliance' },
    { label: 'How It Works', href: '#journey' },
    { label: 'FAQs', href: '#faq' },
  ],
  cta: 'Schedule Evaluation',
};

/* 01 — HERO ------------------------------------------------------------- */
export const hero = {
  eyebrow: 'Sleep Apnea Treatment',
  headlineLines: ['Breathe Better.', 'Sleep Deeper.', 'Wake Up Better.'],
  headlinePlain: 'Breathe Better. Sleep Deeper. Wake Up Better.',
  paragraphs: [
    'You may be spending enough time in bed—but still waking up exhausted.',
    'If you snore loudly, wake with headaches or a dry mouth, feel tired throughout the day, or have been told that you stop breathing during sleep, sleep apnea may be affecting the quality of your rest.',
    'At [PRACTICE NAME], we provide personalized sleep apnea evaluations and treatment options designed around your individual needs.',
  ],
  primaryCta: 'Schedule A Sleep Apnea Evaluation',
  secondaryCta: 'Call [PHONE]',
  trust: [
    { icon: 'user', label: 'Personalized Evaluation' },
    { icon: 'moon', label: 'Comfortable Treatment Options' },
    { icon: 'heart', label: 'Personalized Care' },
  ],
  microcopy: 'Take the first step toward understanding what’s happening while you sleep.',
  image: {
    src: '/images/hero-restful-sleep.jpg',
    placeholder: '/images/hero-restful-sleep.svg',
    alt: 'Person sleeping peacefully while exploring sleep apnea treatment',
  },
  visualCaption: 'Steady, uninterrupted breathing',
};

/* 02 — PROBLEM RECOGNITION ---------------------------------------------- */
export const problem = {
  eyebrow: 'Could This Be You?',
  heading: 'You Sleep. But You Don’t Feel Rested.',
  paragraphs: [
    'A full night in bed doesn’t always mean a full night of restorative sleep.',
    'Sleep apnea can repeatedly interrupt normal breathing while you’re asleep. You may not remember waking up, but those interruptions can leave you feeling tired, unfocused, or simply unlike yourself the next morning.',
    'Sometimes, the first signs are noticed by the person sleeping next to you.',
    'Sometimes, they’re noticed when you realize that you’re exhausted despite getting what should be enough sleep.',
  ],
  pullquote: 'If something doesn’t feel right about your sleep, it’s worth finding out why.',
  cta: 'Schedule A Sleep Apnea Evaluation',
  image: {
    src: '/images/tired-morning.jpg',
    placeholder: '/images/tired-morning.svg',
    alt: 'Person awake at night experiencing disrupted sleep',
  },
};

/* 03 — SYMPTOMS ---------------------------------------------------------- */
export const symptoms = {
  id: 'symptoms',
  heading: 'Could Your Sleep Be Trying To Tell You Something?',
  body:
    'Sleep apnea can look different from person to person. If several of these symptoms sound familiar, talking with a qualified healthcare professional may be a good next step.',
  cta: 'Talk To Our Sleep Apnea Team',
  items: [
    {
      icon: 'snore',
      title: 'Loud Snoring',
      body: 'Persistent or disruptive snoring can be one sign of obstructed breathing during sleep—especially when it is loud or occurs regularly.',
    },
    {
      icon: 'head',
      title: 'Morning Headaches',
      body: 'Waking with headaches may be associated with disrupted sleep and nighttime breathing problems.',
    },
    {
      icon: 'battery',
      title: 'Daytime Fatigue',
      body: 'Do you wake up tired even after spending a full night in bed? Poor-quality sleep can leave you feeling exhausted throughout the day.',
    },
    {
      icon: 'lungs',
      title: 'Gasping During Sleep',
      body: 'Waking up choking, gasping, or suddenly short of breath can be an important sign that your breathing may be interrupted while you sleep.',
    },
    {
      icon: 'brain',
      title: 'Difficulty Concentrating',
      body: 'Interrupted or poor-quality sleep can make it harder to stay focused, alert, and productive during the day.',
    },
    {
      icon: 'drop',
      title: 'Dry Mouth',
      body: 'Regularly waking with a dry mouth may be another clue that you’re experiencing nighttime breathing problems.',
    },
  ],
};

/* 04 — BREATHING TIMELINE ------------------------------------------------ */
export const breathing = {
  eyebrow: 'What Can Happen While You Sleep?',
  heading: 'Your Body May Be Working Harder Than You Realize.',
  paragraphs: [
    'During healthy sleep, breathing follows a natural rhythm.',
    'With obstructive sleep apnea, the upper airway can become narrowed or blocked, interrupting normal airflow. Your body responds to restore breathing, and this can happen repeatedly throughout the night.',
  ],
  timeline: {
    normal: { label: 'Normal Breathing', caption: 'Smooth, uninterrupted airflow.' },
    interrupted: { label: 'Interrupted Breathing', caption: 'Airflow becomes restricted or interrupted.' },
  },
  supporting:
    'You may not fully wake up or remember these interruptions the next morning—which is one reason sleep apnea can sometimes go unnoticed.',
};

/* 05 — AIRWAY EDUCATION -------------------------------------------------- */
export const airway = {
  eyebrow: 'Understanding Sleep Apnea',
  heading: 'Sleep Apnea Doesn’t Always Wake You Up.',
  paragraphs: [
    'Obstructive sleep apnea occurs when the upper airway becomes repeatedly narrowed or blocked during sleep.',
    'When airflow is interrupted, your body works to restore normal breathing. These events can disrupt the natural quality of your sleep, even when you don’t consciously wake up.',
  ],
  supporting:
    'Understanding what’s happening is the first step toward finding an appropriate treatment approach.',
  cta: 'Explore Your Treatment Options',
  disclaimer:
    'Illustration for educational purposes only. Individual anatomy, diagnosis, and treatment needs vary.',
  states: {
    NORMAL: { label: 'Normal Airflow' },
    RESTRICTED: { label: 'Restricted Airflow' },
    INTERRUPTED: { label: 'Breathing Interruption' },
    RECOVERING: { label: 'Airflow Returning' },
  },
  figures: [
    {
      state: 'NORMAL',
      title: 'Normal Breathing',
      caption: 'Smooth, uninterrupted airflow.',
      image: {
        src: '/images/airway-open.jpg',
        placeholder: '/images/airway-open.svg',
        alt: 'Illustration showing how obstructive sleep apnea can restrict airflow during sleep',
      },
    },
    {
      state: 'INTERRUPTED',
      title: 'Interrupted Breathing',
      caption: 'Airflow becomes restricted or interrupted.',
      image: {
        src: '/images/airway-restricted.jpg',
        placeholder: '/images/airway-restricted.svg',
        alt: 'Illustration showing how obstructive sleep apnea can restrict airflow during sleep',
      },
    },
  ],
};

/* 06 — WHAT IS OBSTRUCTIVE SLEEP APNEA? --------------------------------- */
export const education = {
  eyebrow: 'What Is Sleep Apnea?',
  heading: 'What Is Obstructive Sleep Apnea?',
  paragraphs: [
    'Obstructive sleep apnea is a sleep-related breathing disorder in which the upper airway becomes repeatedly narrowed or blocked during sleep.',
    'These breathing interruptions can affect sleep quality and may contribute to symptoms such as loud snoring, daytime fatigue, morning headaches, and excessive daytime sleepiness.',
    'Because symptoms can vary, proper evaluation and diagnosis are important before choosing a treatment.',
  ],
  cta: 'Find Out What Your Sleep Needs',
  steps: [
    {
      num: '01',
      title: 'The Airway Narrows',
      body: 'When you fall asleep, the muscles and soft tissues around the upper airway relax. In some people, this can cause the airway to become narrowed.',
    },
    {
      num: '02',
      title: 'Breathing Becomes Restricted',
      body: 'As the airway becomes restricted, airflow may decrease or temporarily stop.',
    },
    {
      num: '03',
      title: 'Your Body Responds',
      body: 'Your body responds to the change in breathing and works to restore normal airflow. These events may repeat throughout the night.',
    },
  ],
};

/* 07 — WHY IT MATTERS ---------------------------------------------------- */
export const whyItMatters = {
  eyebrow: 'Your Sleep Matters',
  heading: 'Poor Sleep Can Affect More Than Your Morning.',
  paragraphs: [
    'When your sleep is repeatedly disrupted, you may notice the effects long after you leave your bedroom.',
    'You might feel tired during the day, struggle to concentrate, or wonder why you never feel completely refreshed.',
    'Sleep apnea can also be associated with important health concerns, which is why suspected sleep apnea should be properly evaluated rather than ignored.',
  ],
  cta: 'Schedule Your Sleep Apnea Evaluation',
  cards: [
    {
      icon: 'moon',
      title: 'Better Sleep Quality',
      body: 'The goal of treatment is to address nighttime breathing problems and support healthier, more restorative sleep.',
    },
    {
      icon: 'sun',
      title: 'Daytime Alertness',
      body: 'Better-quality sleep may help you feel more awake and engaged during the day.',
    },
    {
      icon: 'brain',
      title: 'Better Focus',
      body: 'When you’re not constantly dealing with poor-quality sleep, everyday activities can feel easier to manage.',
    },
    {
      icon: 'heart',
      title: 'Long-Term Health',
      body: 'Proper diagnosis and treatment of sleep apnea can be an important part of taking care of your overall health.',
    },
  ],
};

/* 08 — TREATMENT INTRODUCTION -------------------------------------------- */
export const treatment = {
  id: 'treatment',
  eyebrow: 'Personalized Treatment',
  heading: 'A More Comfortable Approach To Sleep Apnea Treatment',
  paragraphs: [
    'Treatment for sleep apnea isn’t necessarily one-size-fits-all.',
    'Depending on your diagnosis, symptoms, anatomy, and individual treatment needs, an oral appliance may be an appropriate option for managing obstructive sleep apnea or snoring.',
    'At [PRACTICE NAME], we take the time to understand your situation and discuss the treatment options that may be right for you.',
  ],
  callout: 'Your treatment should be based on your needs—not a one-size-fits-all approach.',
  cta: 'Explore Oral Appliance Therapy',
  image: {
    src: '/images/oral-appliance.jpg',
    placeholder: '/images/oral-appliance.svg',
    alt: 'Custom oral appliance used for sleep apnea treatment',
  },
};

/* 09 — ORAL APPLIANCE ---------------------------------------------------- */
export const appliance = {
  id: 'appliance',
  eyebrow: 'Oral Appliance Therapy',
  heading: 'A Small Appliance Designed For Your Sleep.',
  paragraphs: [
    'Oral appliance therapy uses a custom-fitted dental device worn while you sleep.',
    'Certain oral appliances are designed to gently position the lower jaw forward to help maintain space for airflow in appropriate patients with obstructive sleep apnea.',
    'Because every patient is different, your appliance should be selected, fitted, and adjusted according to your individual needs.',
  ],
  cta: 'Learn About Oral Appliance Therapy',
  viewerHint: 'Scroll to see how the appliance fits together',
  features: [
    { icon: 'tooth', title: 'Custom Fit', body: 'Your appliance is designed to fit your mouth comfortably and securely.' },
    { icon: 'moon', title: 'Designed For Sleep', body: 'The appliance is worn while you sleep, following your provider’s instructions.' },
    { icon: 'calendar', title: 'Personalized Adjustments', body: 'Follow-up appointments allow your provider to evaluate comfort, fit, and treatment needs.' },
  ],
};

/* 10 — HOW ORAL APPLIANCE THERAPY WORKS ---------------------------------- */
export const applianceSteps = {
  heading: 'Designed To Support Better Airflow While You Sleep.',
  body:
    'For appropriate patients, an oral appliance can help address airway obstruction by positioning the lower jaw in a way that may support improved airflow during sleep.',
  cta: 'Discuss Your Treatment Options',
  steps: [
    {
      num: '01',
      title: 'Custom Fit',
      body: 'Your provider evaluates your oral health, bite, anatomy, and treatment needs to determine whether oral appliance therapy may be appropriate.',
    },
    {
      num: '02',
      title: 'Gentle Positioning',
      body: 'The appliance is designed to position the lower jaw in a therapeutic position while you sleep.',
    },
    {
      num: '03',
      title: 'Wear While Sleeping',
      body: 'You wear the appliance at night according to your provider’s instructions.',
    },
    {
      num: '04',
      title: 'Follow-Up & Adjustments',
      body: 'Your provider monitors your progress and can make adjustments when necessary.',
    },
  ],
};

/* 11 — YOUR TREATMENT JOURNEY -------------------------------------------- */
export const journey = {
  id: 'journey',
  eyebrow: 'What To Expect',
  heading: 'Your Sleep Apnea Treatment Journey',
  body:
    'Getting started doesn’t have to feel complicated. We’ll guide you through each step so you know what to expect.',
  closing: 'You don’t have to figure it all out at once. We’ll help you understand your options.',
  steps: [
    {
      num: '01',
      title: 'Schedule Your Evaluation',
      body: 'Start by telling us about your sleep concerns, symptoms, and treatment goals.',
      cta: 'Schedule My Evaluation',
    },
    {
      num: '02',
      title: 'Comprehensive Evaluation',
      body: 'We’ll review your symptoms, oral health, anatomy, and treatment needs. If appropriate, we can coordinate with the appropriate medical or sleep-care professionals for diagnosis and treatment planning.',
    },
    {
      num: '03',
      title: 'Determine The Right Approach',
      body: 'Once your condition and treatment needs have been appropriately evaluated, we’ll discuss the options that may be available to you.',
    },
    {
      num: '04',
      title: 'Custom Treatment',
      body: 'If oral appliance therapy is appropriate, your appliance will be custom-fitted and adjusted for your needs.',
    },
    {
      num: '05',
      title: 'Follow-Up & Monitoring',
      body: 'We’ll continue to evaluate your comfort, fit, and treatment progress and make adjustments when appropriate.',
    },
  ],
};

/* 12 — IS THIS RIGHT FOR ME? --------------------------------------------- */
export const candidate = {
  eyebrow: 'Could You Be A Candidate?',
  heading: 'Could Sleep Apnea Treatment Be Right For You?',
  body: 'An evaluation may be worthwhile if you regularly experience one or more of the following:',
  checklist: [
    'Loud or persistent snoring',
    'Waking up feeling exhausted',
    'Morning headaches',
    'Dry mouth when you wake up',
    'Gasping or choking during sleep',
    'Excessive daytime sleepiness',
    'Difficulty concentrating during the day',
    'A diagnosis of obstructive sleep apnea',
    'Difficulty tolerating CPAP',
    'Interest in exploring oral appliance therapy',
  ],
  note:
    'These symptoms do not necessarily mean you have sleep apnea. The right way to find out is through an appropriate evaluation and diagnosis.',
  cta: 'Schedule A Sleep Apnea Evaluation',
};

/* 13 — CPAP -------------------------------------------------------------- */
export const cpap = {
  eyebrow: 'Exploring Your Options',
  heading: 'Already Using CPAP? Let’s Talk About Your Options.',
  paragraphs: [
    'CPAP remains an important and effective treatment for many people with obstructive sleep apnea.',
    'However, some patients have difficulty tolerating CPAP or may be candidates for other treatment approaches.',
    'If you’re struggling with your current treatment, don’t simply stop using it on your own.',
    'Instead, talk with your healthcare provider about your concerns and ask whether another treatment option, such as oral appliance therapy, may be appropriate for your situation.',
  ],
  highlight:
    'The goal isn’t to choose the most popular treatment. It’s to find an appropriate treatment approach for you.',
  cta: 'Discuss My Treatment Options',
};

/* 14 — PROVIDER TRUST ---------------------------------------------------- */
export const provider = {
  eyebrow: 'Personalized Sleep Care',
  heading: 'Sleep Treatment From A Team You Can Trust.',
  paragraphs: [
    'At [PRACTICE NAME], we believe treatment starts with listening.',
    'Your sleep concerns are personal. That’s why we take the time to understand your symptoms, answer your questions, evaluate your individual needs, and explain your treatment options clearly.',
    'Our goal is to make the process straightforward, comfortable, and focused on your needs.',
  ],
  cta: 'Meet Our Team',
  trustPoints: [
    { icon: 'shield', title: 'Experienced Dental Care', body: 'Personalized treatment planning based on your individual needs.' },
    { icon: 'scan', title: 'Modern Technology', body: 'Digital tools can help support accurate evaluation and treatment planning.' },
    { icon: 'users', title: 'Patient-Focused Care', body: 'Clear communication and thoughtful follow-up throughout your treatment journey.' },
  ],
  image: {
    src: '/images/provider.jpg',
    placeholder: '/images/provider.svg',
    alt: '[DOCTOR NAME], [CREDENTIALS], at [PRACTICE NAME]',
  },
};

/* 15 — TECHNOLOGY -------------------------------------------------------- */
export const technology = {
  eyebrow: 'Modern Dental Technology',
  heading: 'Modern Technology. Personalized Care.',
  body: 'Technology can make the treatment process more precise, comfortable, and convenient.',
  cta: 'Explore Your Treatment Options',
  cards: [
    {
      icon: 'scan',
      title: 'Digital Imaging',
      body: 'Advanced imaging may help your provider evaluate relevant dental and anatomical structures as part of your treatment planning.',
    },
    {
      icon: 'tooth',
      title: 'Digital Scanning',
      body: 'Comfortable digital scanning can create accurate models used to plan and customize dental appliances.',
    },
    {
      icon: 'calendar',
      title: 'Personalized Follow-Up',
      body: 'Your treatment doesn’t end when you receive your appliance. Follow-up allows your provider to evaluate fit, comfort, and ongoing treatment needs.',
    },
  ],
};

/* 16 — TESTIMONIALS ------------------------------------------------------ */
export const testimonials = {
  eyebrow: 'Patient Experiences',
  heading: 'Better Sleep Can Change How You Feel Every Day.',
  body:
    'Read about the experiences of patients who chose to take the next step toward addressing their sleep concerns.',
  microcopy: 'Real experiences. Real patients. Personalized care.',
  // PLACEHOLDERS — replace with verified, permissioned patient testimonials
  // before launch, or remove the section. Never publish invented reviews.
  items: [
    {
      quote: '[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT SLEEP APNEA TREATMENT OR ORAL APPLIANCE EXPERIENCE.]',
      by: '[PATIENT FIRST NAME / VERIFIED PATIENT]',
    },
    {
      quote: '[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT COMFORT, CARE, OR TREATMENT EXPERIENCE.]',
      by: '[PATIENT FIRST NAME / VERIFIED PATIENT]',
    },
    {
      quote: '[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT THE OVERALL EXPERIENCE.]',
      by: '[PATIENT FIRST NAME / VERIFIED PATIENT]',
    },
  ],
};

/* 17 — FAQ --------------------------------------------------------------- */
export const faq = {
  id: 'faq',
  eyebrow: 'Sleep Apnea Questions',
  heading: 'Questions About Sleep Apnea Treatment?',
  items: [
    {
      q: 'What is sleep apnea?',
      a: 'Sleep apnea is a sleep-related breathing disorder in which breathing repeatedly becomes interrupted or restricted during sleep. Obstructive sleep apnea is the most common type.',
    },
    {
      q: 'What are the signs of sleep apnea?',
      a: 'Common signs can include loud snoring, gasping or choking during sleep, morning headaches, dry mouth, daytime fatigue, excessive sleepiness, and difficulty concentrating. Having these symptoms does not automatically mean you have sleep apnea. An appropriate evaluation is needed for diagnosis.',
    },
    {
      q: 'Can a dentist treat sleep apnea?',
      a: 'Dentists with appropriate training can provide oral appliance therapy for qualified patients with obstructive sleep apnea. Because sleep apnea is a medical condition, proper diagnosis and coordination with qualified medical or sleep-care professionals may be part of the treatment process.',
    },
    {
      q: 'What is an oral appliance for sleep apnea?',
      a: 'An oral appliance is a custom dental device worn during sleep. Certain appliances work by repositioning the lower jaw to help maintain airway space for appropriate patients.',
    },
    {
      q: 'Can an oral appliance replace CPAP?',
      a: 'For some appropriately diagnosed patients, oral appliance therapy may be an alternative to CPAP. However, treatment decisions depend on the individual’s diagnosis, severity, anatomy, medical history, and treatment needs. You should discuss any changes to your current sleep apnea treatment with your healthcare provider.',
    },
    {
      q: 'Does an oral appliance cure sleep apnea?',
      a: 'An oral appliance is generally considered a treatment rather than a guaranteed cure. Its effectiveness varies from patient to patient, and appropriate follow-up is important.',
    },
    {
      q: 'Is an oral appliance comfortable?',
      a: 'Modern oral appliances are designed to be compact and custom-fitted. There can be an adjustment period when you first begin wearing one. Follow-up appointments can help address fit, comfort, and treatment-related concerns.',
    },
    {
      q: 'Do I need a sleep study?',
      a: 'A proper diagnosis of sleep apnea generally requires an appropriate medical evaluation and, when indicated, sleep testing. Your healthcare provider can help determine whether a sleep study or additional evaluation is appropriate.',
    },
    {
      q: 'Can you help with snoring?',
      a: 'Snoring can have different causes, and not everyone who snores has sleep apnea. If you’re experiencing persistent or disruptive snoring, an evaluation can help determine whether there may be an underlying breathing or sleep-related issue.',
    },
    {
      q: 'What happens during a sleep apnea evaluation?',
      a: 'Your provider will review your symptoms, medical and dental history, oral health, and other relevant factors. Depending on your situation, additional sleep testing or coordination with a sleep physician may be recommended before treatment is selected.',
    },
    {
      q: 'How long does it take to get a sleep apnea appliance?',
      a: 'The timeline depends on the evaluation process, whether a diagnosis is already available, the appliance selected, and the laboratory or digital workflow used by the practice. Your team can explain the expected timeline during your consultation.',
    },
    {
      q: 'What if I’ve been diagnosed with sleep apnea already?',
      a: 'Bring your existing sleep study and relevant treatment information to your appointment if available. Your provider can review your situation and discuss whether oral appliance therapy may be an appropriate treatment option.',
    },
  ],
};

/* 18 — LOCAL SEO --------------------------------------------------------- */
export const local = {
  heading: 'Sleep Apnea Treatment In [CITY], [STATE]',
  paragraphs: [
    'Looking for sleep apnea treatment in [CITY]?',
    'At [PRACTICE NAME], we help patients who are experiencing symptoms such as loud snoring, daytime fatigue, disrupted sleep, and other concerns associated with sleep-disordered breathing.',
    'Our team provides personalized sleep apnea evaluations and treatment options, including oral appliance therapy for appropriate patients.',
    'If you’ve been searching for a sleep apnea dentist in [CITY], sleep apnea treatment near me, or an oral appliance for sleep apnea, we’re here to help you understand your options.',
  ],
  addressLabel: 'Conveniently located at:',
  cta: 'Schedule Your Sleep Apnea Evaluation',
  phoneCta: 'Call [PHONE]',
};

/* 19 — FINAL CTA --------------------------------------------------------- */
export const finalCta = {
  eyebrow: 'Take The First Step',
  heading: 'Ready To Sleep Better?',
  paragraphs: [
    'If snoring, fatigue, disrupted sleep, or concerns about sleep apnea are affecting your life, you don’t have to keep guessing what’s causing it.',
    'Take the first step toward understanding your sleep and exploring the treatment options that may be right for you.',
  ],
  primaryCta: 'Schedule A Sleep Apnea Evaluation',
  secondaryCta: 'Call [PHONE]',
  reassurance: ['Personalized Care', 'Convenient Scheduling', 'Treatment Options For Qualified Patients'],
  microcopy:
    'Your journey toward better sleep starts with understanding what’s happening while you sleep.',
  image: {
    src: '/images/well-rested-couple.jpg',
    placeholder: '/images/well-rested-couple.svg',
    alt: 'Person waking up feeling rested after sleep apnea treatment',
  },
};

/* 20 — MOBILE STICKY CTA ------------------------------------------------- */
export const stickyCta = { call: 'Call Now', book: 'Schedule Evaluation' };

/* 21/22 — BOOKING FORM + SUCCESS ----------------------------------------- */
export const booking = {
  title: 'Let’s Talk About Your Sleep.',
  body: 'Tell us a little about what you’re experiencing, and our team will help you determine the next step.',
  submit: 'Request My Evaluation',
  submitting: 'Scheduling…',
  successTitle: 'Thank You — Your Request Has Been Received.',
  successBody:
    'We’ve received your request. A member of our team will contact you to help coordinate your sleep apnea evaluation and answer any questions you may have.',
  successCta: 'Call [PHONE]',
  errorBody:
    'Something went wrong sending your request. Please try again, or call [PHONE] and we’ll take care of it.',
  privacy:
    'Your information is used to respond to your request and help coordinate your appointment.',
  fields: {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    email: 'Email Address',
    preferredTime: 'Preferred Appointment Time',
    reason: 'What brings you in?',
  },
  preferredTimes: ['Morning', 'Midday', 'Afternoon', 'No preference'],
  reasons: ['Sleep Apnea', 'Snoring', 'CPAP Concerns', 'Oral Appliance Therapy', 'Other'],
  validation: {
    required: 'This field is required.',
    phone: 'Please enter a valid phone number.',
    email: 'Please enter a valid email address.',
  },
};

/* 23 — FOOTER ------------------------------------------------------------ */
export const footer = {
  ctaHeading: 'Questions About Sleep Apnea?',
  ctaPhone: 'Call [PHONE]',
  ctaBook: 'Schedule An Evaluation',
  blurb: 'Personalized sleep apnea evaluations and treatment options designed around your individual needs.',
  columns: {
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'Sleep Apnea Treatment', href: '#symptoms' },
        { label: 'Oral Appliance Therapy', href: '#appliance' },
        { label: 'Snoring Treatment', href: '#treatment' },
        { label: 'About Our Practice', href: '#provider' },
        { label: 'Contact', href: '#local' },
        { label: 'Privacy Policy', href: '/privacy' },
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
  /* 28 — MEDICAL DISCLAIMER */
  legalNote:
    'This page provides general educational information and is not a substitute for professional medical advice, diagnosis, or treatment. Sleep apnea diagnosis and treatment should be determined by qualified healthcare professionals based on each patient’s individual circumstances. Treatment options and results vary by patient.',
};

/* 26 — PRIMARY SEO KEYWORDS (reference; used in the copy deck and QA) ----- */
export const seoKeywords = [
  'sleep apnea treatment',
  'sleep apnea dentist',
  'sleep apnea treatment near me',
  'sleep apnea dentist near me',
  'sleep apnea treatment [CITY]',
  'sleep apnea dentist [CITY]',
  'obstructive sleep apnea treatment',
  'oral appliance for sleep apnea',
  'sleep apnea oral appliance',
  'oral appliance therapy',
  'sleep apnea dental appliance',
  'snoring treatment',
  'snoring dentist',
  'CPAP alternative',
  'sleep apnea evaluation',
];
