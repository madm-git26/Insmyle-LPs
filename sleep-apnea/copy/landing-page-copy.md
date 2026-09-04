# Sleep Apnea Landing Page — Complete Copy

**Status: client-approved copy, implemented verbatim.**

This deck is the source of truth for every word on the page. The build reads
the same strings from [`src/content/copy.js`](../src/content/copy.js), so the
deck and the page cannot drift — edit one and mirror the other.

Tokens in `[BRACKETS]` resolve at render from
[`src/content/practice.js`](../src/content/practice.js). Set them once there;
never find-and-replace through the components.

| Token | Resolves to |
|---|---|
| `[PRACTICE NAME]` `[PHONE]` | practice name, display phone |
| `[ADDRESS]` `[CITY]` `[STATE]` `[ZIP]` | practice address parts |
| `[DOCTOR NAME]` `[CREDENTIALS]` | provider name and credentials |

Section numbers below match the approved deck. The component that renders each
one is noted so copy edits land in the right place.

---

## 01 — HERO SECTION
`HeroSection` · `HeroCopy` · `BreathingHero`

**Eyebrow**
SLEEP APNEA TREATMENT

**H1**
Breathe Better. Sleep Deeper. Wake Up Better.

**Body Copy**
You may be spending enough time in bed—but still waking up exhausted.

If you snore loudly, wake with headaches or a dry mouth, feel tired throughout the day, or have been told that you stop breathing during sleep, sleep apnea may be affecting the quality of your rest.

At [PRACTICE NAME], we provide personalized sleep apnea evaluations and treatment options designed around your individual needs.

**Primary CTA** Schedule A Sleep Apnea Evaluation
**Secondary CTA** Call [PHONE]

**Trust Points**
✓ Personalized Evaluation
✓ Comfortable Treatment Options
✓ Personalized Care

**Microcopy**
Take the first step toward understanding what's happening while you sleep.

---

## 02 — PROBLEM RECOGNITION
`ProblemSection`

**Eyebrow** COULD THIS BE YOU?

**H2** You Sleep. But You Don't Feel Rested.

**Body Copy**
A full night in bed doesn't always mean a full night of restorative sleep.

Sleep apnea can repeatedly interrupt normal breathing while you're asleep. You may not remember waking up, but those interruptions can leave you feeling tired, unfocused, or simply unlike yourself the next morning.

Sometimes, the first signs are noticed by the person sleeping next to you.

Sometimes, they're noticed when you realize that you're exhausted despite getting what should be enough sleep.

**Supporting Statement**
If something doesn't feel right about your sleep, it's worth finding out why.

**CTA** Schedule A Sleep Apnea Evaluation

---

## 03 — SYMPTOMS
`SymptomSection` · `SymptomGrid`

**H2** Could Your Sleep Be Trying To Tell You Something?

**Intro**
Sleep apnea can look different from person to person. If several of these symptoms sound familiar, talking with a qualified healthcare professional may be a good next step.

| # | Symptom | Copy |
|---|---|---|
| 01 | **Loud Snoring** | Persistent or disruptive snoring can be one sign of obstructed breathing during sleep—especially when it is loud or occurs regularly. |
| 02 | **Morning Headaches** | Waking with headaches may be associated with disrupted sleep and nighttime breathing problems. |
| 03 | **Daytime Fatigue** | Do you wake up tired even after spending a full night in bed? Poor-quality sleep can leave you feeling exhausted throughout the day. |
| 04 | **Gasping During Sleep** | Waking up choking, gasping, or suddenly short of breath can be an important sign that your breathing may be interrupted while you sleep. |
| 05 | **Difficulty Concentrating** | Interrupted or poor-quality sleep can make it harder to stay focused, alert, and productive during the day. |
| 06 | **Dry Mouth** | Regularly waking with a dry mouth may be another clue that you're experiencing nighttime breathing problems. |

**CTA** Talk To Our Sleep Apnea Team

---

## 04 — BREATHING TIMELINE
`BreathingSection` · `BreathingTimeline`

**Eyebrow** WHAT CAN HAPPEN WHILE YOU SLEEP?

**H2** Your Body May Be Working Harder Than You Realize.

**Body Copy**
During healthy sleep, breathing follows a natural rhythm.

With obstructive sleep apnea, the upper airway can become narrowed or blocked, interrupting normal airflow. Your body responds to restore breathing, and this can happen repeatedly throughout the night.

**Visual Labels**
NORMAL BREATHING — Smooth, uninterrupted airflow.
INTERRUPTED BREATHING — Airflow becomes restricted or interrupted.

**Supporting Text**
You may not fully wake up or remember these interruptions the next morning—which is one reason sleep apnea can sometimes go unnoticed.

---

## 05 — AIRWAY EDUCATION SECTION
`AirwaySection` · `AirwayVisualization`

**Eyebrow** UNDERSTANDING SLEEP APNEA

**H2** Sleep Apnea Doesn't Always Wake You Up.

**Body Copy**
Obstructive sleep apnea occurs when the upper airway becomes repeatedly narrowed or blocked during sleep.

When airflow is interrupted, your body works to restore normal breathing. These events can disrupt the natural quality of your sleep, even when you don't consciously wake up.

**Supporting Copy**
Understanding what's happening is the first step toward finding an appropriate treatment approach.

**CTA** Explore Your Treatment Options

**Educational Disclaimer**
Illustration for educational purposes only. Individual anatomy, diagnosis, and treatment needs vary.

*Readout states: Normal Airflow · Restricted Airflow · Breathing Interruption · Airflow Returning*

---

## 06 — WHAT IS OBSTRUCTIVE SLEEP APNEA?
`EducationSection`

**Eyebrow** WHAT IS SLEEP APNEA?

**H2** What Is Obstructive Sleep Apnea?

**Body Copy**
Obstructive sleep apnea is a sleep-related breathing disorder in which the upper airway becomes repeatedly narrowed or blocked during sleep.

These breathing interruptions can affect sleep quality and may contribute to symptoms such as loud snoring, daytime fatigue, morning headaches, and excessive daytime sleepiness.

Because symptoms can vary, proper evaluation and diagnosis are important before choosing a treatment.

**01 — The Airway Narrows**
When you fall asleep, the muscles and soft tissues around the upper airway relax. In some people, this can cause the airway to become narrowed.

**02 — Breathing Becomes Restricted**
As the airway becomes restricted, airflow may decrease or temporarily stop.

**03 — Your Body Responds**
Your body responds to the change in breathing and works to restore normal airflow. These events may repeat throughout the night.

**Bottom CTA** Find Out What Your Sleep Needs

---

## 07 — WHY IT MATTERS
`WhyItMattersSection`

**Eyebrow** YOUR SLEEP MATTERS

**H2** Poor Sleep Can Affect More Than Your Morning.

**Body Copy**
When your sleep is repeatedly disrupted, you may notice the effects long after you leave your bedroom.

You might feel tired during the day, struggle to concentrate, or wonder why you never feel completely refreshed.

Sleep apnea can also be associated with important health concerns, which is why suspected sleep apnea should be properly evaluated rather than ignored.

| Area | Copy |
|---|---|
| **Better Sleep Quality** | The goal of treatment is to address nighttime breathing problems and support healthier, more restorative sleep. |
| **Daytime Alertness** | Better-quality sleep may help you feel more awake and engaged during the day. |
| **Better Focus** | When you're not constantly dealing with poor-quality sleep, everyday activities can feel easier to manage. |
| **Long-Term Health** | Proper diagnosis and treatment of sleep apnea can be an important part of taking care of your overall health. |

**CTA** Schedule Your Sleep Apnea Evaluation

---

## 08 — TREATMENT INTRODUCTION
`TreatmentSection`

**Eyebrow** PERSONALIZED TREATMENT

**H2** A More Comfortable Approach To Sleep Apnea Treatment

**Body Copy**
Treatment for sleep apnea isn't necessarily one-size-fits-all.

Depending on your diagnosis, symptoms, anatomy, and individual treatment needs, an oral appliance may be an appropriate option for managing obstructive sleep apnea or snoring.

At [PRACTICE NAME], we take the time to understand your situation and discuss the treatment options that may be right for you.

**Highlight**
Your treatment should be based on your needs—not a one-size-fits-all approach.

**CTA** Explore Oral Appliance Therapy

---

## 09 — ORAL APPLIANCE SECTION
`ApplianceSection` · `OralApplianceViewer`

**Eyebrow** ORAL APPLIANCE THERAPY

**H2** A Small Appliance Designed For Your Sleep.

**Body Copy**
Oral appliance therapy uses a custom-fitted dental device worn while you sleep.

Certain oral appliances are designed to gently position the lower jaw forward to help maintain space for airflow in appropriate patients with obstructive sleep apnea.

Because every patient is different, your appliance should be selected, fitted, and adjusted according to your individual needs.

| Feature | Copy |
|---|---|
| **Custom Fit** | Your appliance is designed to fit your mouth comfortably and securely. |
| **Designed For Sleep** | The appliance is worn while you sleep, following your provider's instructions. |
| **Personalized Adjustments** | Follow-up appointments allow your provider to evaluate comfort, fit, and treatment needs. |

**CTA** Learn About Oral Appliance Therapy

---

## 10 — HOW ORAL APPLIANCE THERAPY WORKS
`TreatmentSteps` · `StepList`

**H2** Designed To Support Better Airflow While You Sleep.

**Intro**
For appropriate patients, an oral appliance can help address airway obstruction by positioning the lower jaw in a way that may support improved airflow during sleep.

**01 Custom Fit** — Your provider evaluates your oral health, bite, anatomy, and treatment needs to determine whether oral appliance therapy may be appropriate.
**02 Gentle Positioning** — The appliance is designed to position the lower jaw in a therapeutic position while you sleep.
**03 Wear While Sleeping** — You wear the appliance at night according to your provider's instructions.
**04 Follow-Up & Adjustments** — Your provider monitors your progress and can make adjustments when necessary.

**CTA** Discuss Your Treatment Options

---

## 11 — YOUR TREATMENT JOURNEY
`PatientJourney` · `StepList`

**Eyebrow** WHAT TO EXPECT

**H2** Your Sleep Apnea Treatment Journey

**Intro**
Getting started doesn't have to feel complicated. We'll guide you through each step so you know what to expect.

**01 Schedule Your Evaluation** — Start by telling us about your sleep concerns, symptoms, and treatment goals.
*Step CTA: Schedule My Evaluation*

**02 Comprehensive Evaluation** — We'll review your symptoms, oral health, anatomy, and treatment needs. If appropriate, we can coordinate with the appropriate medical or sleep-care professionals for diagnosis and treatment planning.

**03 Determine The Right Approach** — Once your condition and treatment needs have been appropriately evaluated, we'll discuss the options that may be available to you.

**04 Custom Treatment** — If oral appliance therapy is appropriate, your appliance will be custom-fitted and adjusted for your needs.

**05 Follow-Up & Monitoring** — We'll continue to evaluate your comfort, fit, and treatment progress and make adjustments when appropriate.

**Closing Statement**
You don't have to figure it all out at once. We'll help you understand your options.

---

## 12 — IS THIS RIGHT FOR ME?
`CandidateSection`

**Eyebrow** COULD YOU BE A CANDIDATE?

**H2** Could Sleep Apnea Treatment Be Right For You?

**Body Copy**
An evaluation may be worthwhile if you regularly experience one or more of the following:

**Checklist**
✓ Loud or persistent snoring
✓ Waking up feeling exhausted
✓ Morning headaches
✓ Dry mouth when you wake up
✓ Gasping or choking during sleep
✓ Excessive daytime sleepiness
✓ Difficulty concentrating during the day
✓ A diagnosis of obstructive sleep apnea
✓ Difficulty tolerating CPAP
✓ Interest in exploring oral appliance therapy

**Important Note**
These symptoms do not necessarily mean you have sleep apnea. The right way to find out is through an appropriate evaluation and diagnosis.

**CTA** Schedule A Sleep Apnea Evaluation

---

## 13 — CPAP SECTION
`CPAPSection`

**Eyebrow** EXPLORING YOUR OPTIONS

**H2** Already Using CPAP? Let's Talk About Your Options.

**Body Copy**
CPAP remains an important and effective treatment for many people with obstructive sleep apnea.

However, some patients have difficulty tolerating CPAP or may be candidates for other treatment approaches.

If you're struggling with your current treatment, don't simply stop using it on your own.

Instead, talk with your healthcare provider about your concerns and ask whether another treatment option, such as oral appliance therapy, may be appropriate for your situation.

**Highlight**
The goal isn't to choose the most popular treatment. It's to find an appropriate treatment approach for you.

**CTA** Discuss My Treatment Options

---

## 14 — PROVIDER TRUST SECTION
`ProviderSection`

**Eyebrow** PERSONALIZED SLEEP CARE

**H2** Sleep Treatment From A Team You Can Trust.

**Body Copy**
At [PRACTICE NAME], we believe treatment starts with listening.

Your sleep concerns are personal. That's why we take the time to understand your symptoms, answer your questions, evaluate your individual needs, and explain your treatment options clearly.

Our goal is to make the process straightforward, comfortable, and focused on your needs.

| Trust Point | Copy |
|---|---|
| **Experienced Dental Care** | Personalized treatment planning based on your individual needs. |
| **Modern Technology** | Digital tools can help support accurate evaluation and treatment planning. |
| **Patient-Focused Care** | Clear communication and thoughtful follow-up throughout your treatment journey. |

**CTA** Meet Our Team

---

## 15 — TECHNOLOGY SECTION
`TechnologySection`

**Eyebrow** MODERN DENTAL TECHNOLOGY

**H2** Modern Technology. Personalized Care.

**Intro**
Technology can make the treatment process more precise, comfortable, and convenient.

| Technology | Copy |
|---|---|
| **Digital Imaging** | Advanced imaging may help your provider evaluate relevant dental and anatomical structures as part of your treatment planning. |
| **Digital Scanning** | Comfortable digital scanning can create accurate models used to plan and customize dental appliances. |
| **Personalized Follow-Up** | Your treatment doesn't end when you receive your appliance. Follow-up allows your provider to evaluate fit, comfort, and ongoing treatment needs. |

**CTA** Explore Your Treatment Options

---

## 16 — TESTIMONIALS
`Testimonials`

**Eyebrow** PATIENT EXPERIENCES

**H2** Better Sleep Can Change How You Feel Every Day.

**Intro**
Read about the experiences of patients who chose to take the next step toward addressing their sleep concerns.

> ⚠️ **These are placeholders and must not go live as written.**
> Replace with verified, permissioned patient testimonials, or remove the
> section. The build renders the bracket text verbatim so it is impossible to
> miss in review.

**Placeholder 01**
"[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT SLEEP APNEA TREATMENT OR ORAL APPLIANCE EXPERIENCE.]"
— [PATIENT FIRST NAME / VERIFIED PATIENT]

**Placeholder 02**
"[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT COMFORT, CARE, OR TREATMENT EXPERIENCE.]"
— [PATIENT FIRST NAME / VERIFIED PATIENT]

**Placeholder 03**
"[INSERT VERIFIED PATIENT TESTIMONIAL ABOUT THE OVERALL EXPERIENCE.]"
— [PATIENT FIRST NAME / VERIFIED PATIENT]

**Trust Microcopy**
Real experiences. Real patients. Personalized care.

---

## 17 — FAQ
`FAQSection`

**Eyebrow** SLEEP APNEA QUESTIONS
**H2** Questions About Sleep Apnea Treatment?

**01 · What is sleep apnea?**
Sleep apnea is a sleep-related breathing disorder in which breathing repeatedly becomes interrupted or restricted during sleep. Obstructive sleep apnea is the most common type.

**02 · What are the signs of sleep apnea?**
Common signs can include loud snoring, gasping or choking during sleep, morning headaches, dry mouth, daytime fatigue, excessive sleepiness, and difficulty concentrating. Having these symptoms does not automatically mean you have sleep apnea. An appropriate evaluation is needed for diagnosis.

**03 · Can a dentist treat sleep apnea?**
Dentists with appropriate training can provide oral appliance therapy for qualified patients with obstructive sleep apnea. Because sleep apnea is a medical condition, proper diagnosis and coordination with qualified medical or sleep-care professionals may be part of the treatment process.

**04 · What is an oral appliance for sleep apnea?**
An oral appliance is a custom dental device worn during sleep. Certain appliances work by repositioning the lower jaw to help maintain airway space for appropriate patients.

**05 · Can an oral appliance replace CPAP?**
For some appropriately diagnosed patients, oral appliance therapy may be an alternative to CPAP. However, treatment decisions depend on the individual's diagnosis, severity, anatomy, medical history, and treatment needs. You should discuss any changes to your current sleep apnea treatment with your healthcare provider.

**06 · Does an oral appliance cure sleep apnea?**
An oral appliance is generally considered a treatment rather than a guaranteed cure. Its effectiveness varies from patient to patient, and appropriate follow-up is important.

**07 · Is an oral appliance comfortable?**
Modern oral appliances are designed to be compact and custom-fitted. There can be an adjustment period when you first begin wearing one. Follow-up appointments can help address fit, comfort, and treatment-related concerns.

**08 · Do I need a sleep study?**
A proper diagnosis of sleep apnea generally requires an appropriate medical evaluation and, when indicated, sleep testing. Your healthcare provider can help determine whether a sleep study or additional evaluation is appropriate.

**09 · Can you help with snoring?**
Snoring can have different causes, and not everyone who snores has sleep apnea. If you're experiencing persistent or disruptive snoring, an evaluation can help determine whether there may be an underlying breathing or sleep-related issue.

**10 · What happens during a sleep apnea evaluation?**
Your provider will review your symptoms, medical and dental history, oral health, and other relevant factors. Depending on your situation, additional sleep testing or coordination with a sleep physician may be recommended before treatment is selected.

**11 · How long does it take to get a sleep apnea appliance?**
The timeline depends on the evaluation process, whether a diagnosis is already available, the appliance selected, and the laboratory or digital workflow used by the practice. Your team can explain the expected timeline during your consultation.

**12 · What if I've been diagnosed with sleep apnea already?**
Bring your existing sleep study and relevant treatment information to your appointment if available. Your provider can review your situation and discuss whether oral appliance therapy may be an appropriate treatment option.

*All twelve are emitted as FAQPage JSON-LD by `StructuredData`.*

---

## 18 — LOCAL SEO SECTION
`LocalSEOSection`

**H2** Sleep Apnea Treatment In [CITY], [STATE]

**Body Copy**
Looking for sleep apnea treatment in [CITY]?

At [PRACTICE NAME], we help patients who are experiencing symptoms such as loud snoring, daytime fatigue, disrupted sleep, and other concerns associated with sleep-disordered breathing.

Our team provides personalized sleep apnea evaluations and treatment options, including oral appliance therapy for appropriate patients.

If you've been searching for a sleep apnea dentist in [CITY], sleep apnea treatment near me, or an oral appliance for sleep apnea, we're here to help you understand your options.

**Local Trust Copy**
Conveniently located at:
[PRACTICE NAME]
[ADDRESS]
[CITY], [STATE] [ZIP]

**CTA** Schedule Your Sleep Apnea Evaluation
**Local Phone CTA** Call [PHONE]

---

## 19 — FINAL CTA
`FinalCTA`

**Eyebrow** TAKE THE FIRST STEP

**H2** Ready To Sleep Better?

**Body Copy**
If snoring, fatigue, disrupted sleep, or concerns about sleep apnea are affecting your life, you don't have to keep guessing what's causing it.

Take the first step toward understanding your sleep and exploring the treatment options that may be right for you.

**Primary CTA** Schedule A Sleep Apnea Evaluation
**Secondary CTA** Call [PHONE]

**Reassurance**
Personalized Care • Convenient Scheduling • Treatment Options For Qualified Patients

**Final Microcopy**
Your journey toward better sleep starts with understanding what's happening while you sleep.

---

## 20 — MOBILE STICKY CTA
`MobileStickyCTA`

**Left Button** Call Now
**Right Button** Schedule Evaluation

Appears once the hero CTA scrolls away; hides again while the final CTA is on
screen so it never competes with the primary ask.

---

## 21 — BOOKING FORM
`BookingModal` · `BookingForm`

**H2** Let's Talk About Your Sleep.

**Intro**
Tell us a little about what you're experiencing, and our team will help you determine the next step.

**Fields**
First Name · Last Name · Phone Number · Email Address · Preferred Appointment Time

**Optional dropdown — What brings you in?**
Sleep Apnea · Snoring · CPAP Concerns · Oral Appliance Therapy · Other

**Submit CTA** Request My Evaluation

**Privacy Microcopy**
Your information is used to respond to your request and help coordinate your appointment.

**Validation messages**
This field is required. · Please enter a valid phone number. · Please enter a valid email address.

---

## 22 — FORM SUCCESS STATE

**H2** Thank You — Your Request Has Been Received.

**Body**
We've received your request. A member of our team will contact you to help coordinate your sleep apnea evaluation and answer any questions you may have.

**CTA** Call [PHONE]

---

## 23 — FOOTER CTA
`Footer`

**Short CTA**
Questions About Sleep Apnea?
Call [PHONE] · Schedule An Evaluation

**Footer Links**
Sleep Apnea Treatment · Oral Appliance Therapy · Snoring Treatment · About Our Practice · Contact · Privacy Policy

---

## 24 — SEO PAGE TITLE

Sleep Apnea Treatment in [CITY], [STATE] | [PRACTICE NAME]

**Alternative**
Sleep Apnea Dentist in [CITY] | Oral Appliance Therapy

---

## 25 — META DESCRIPTION

Looking for sleep apnea treatment in [CITY]? Explore personalized sleep apnea evaluations and oral appliance therapy options at [PRACTICE NAME].

---

## 26 — PRIMARY SEO KEYWORDS

sleep apnea treatment · sleep apnea dentist · sleep apnea treatment near me ·
sleep apnea dentist near me · sleep apnea treatment [CITY] ·
sleep apnea dentist [CITY] · obstructive sleep apnea treatment ·
oral appliance for sleep apnea · sleep apnea oral appliance ·
oral appliance therapy · sleep apnea dental appliance · snoring treatment ·
snoring dentist · CPAP alternative · sleep apnea evaluation

*Also exported as `seoKeywords` from `src/content/copy.js` for QA.*

---

## 27 — IMAGE ALT TEXT

| Slot | Alt text |
|---|---|
| Hero | Person sleeping peacefully while exploring sleep apnea treatment |
| Problem | Person awake at night experiencing disrupted sleep |
| Airway visualization | Illustration showing how obstructive sleep apnea can restrict airflow during sleep |
| Oral appliance | Custom oral appliance used for sleep apnea treatment |
| Dentist | [DOCTOR NAME], [CREDENTIALS], at [PRACTICE NAME] |
| Final CTA | Person waking up feeling rested after sleep apnea treatment |

Decorative visuals (breathing wave, timeline traces) are inline SVG with
`aria-hidden` and need no alt text.

---

## 28 — MEDICAL DISCLAIMER

Rendered in the footer on every view:

> This page provides general educational information and is not a substitute for professional medical advice, diagnosis, or treatment. Sleep apnea diagnosis and treatment should be determined by qualified healthcare professionals based on each patient's individual circumstances. Treatment options and results vary by patient.

---

# Ad-group message match

The hero adapts to the ad group that paid for the click; everything below the
hero is shared. Resolution order: `?variant=` → `utm_content` / `utm_term`
keyword sniff → default. Source: [`src/content/adGroups.js`](../src/content/adGroups.js).

| Variant | Preview URL | H1 | Primary CTA |
|---|---|---|---|
| Sleep Apnea *(default)* | `?variant=default` | Breathe Better. Sleep Deeper. Wake Up Better. | Schedule A Sleep Apnea Evaluation |
| Oral Appliance | `?variant=oral_appliance` | Explore Oral Appliance Therapy For Sleep Apnea. | Schedule An Oral Appliance Consultation |
| Snoring | `?variant=snoring` | Find Out What's Behind Your Snoring. | Schedule A Snoring Evaluation |
| CPAP Alternative | `?variant=cpap_alternative` | Exploring Options Beyond CPAP? Let's Talk. | Discuss My Treatment Options |

Variant body copy is drawn from the approved sections it maps to (09 for oral
appliance, 03/09 for snoring, 13 for CPAP), so no new claims are introduced.

---

# Conversion event names

`sleep_apnea_cta_click` · `sleep_apnea_call_click` · `sleep_apnea_form_start` ·
`sleep_apnea_form_submit` · `sleep_apnea_booking_start` ·
`sleep_apnea_booking_complete` · `faq_open` · `scroll_50` · `scroll_75` · `scroll_90`

Every event carries `cta_location` — `header` · `hero` · `problem` ·
`symptoms` · `airway` · `education` · `why_it_matters` · `treatment` ·
`appliance` · `appliance_steps` · `journey_step_01` · `candidate` · `cpap` ·
`provider` · `technology` · `local` · `sticky_bar` · `final_cta` · `footer` ·
`mobile_menu` · `booking_modal` · `booking_success` — plus `device` and the
stored UTM / GCLID set.

---

# Pre-launch checklist

- [ ] Fill every `[TOKEN]` in `src/content/practice.js`
- [ ] Replace the three testimonial placeholders with verified, permissioned reviews — or delete section 16
- [ ] Confirm section 14's trust points describe the practice accurately
- [ ] Add the real photography (see `docs/IMAGE-MANIFEST.md`)
- [ ] Point `submitLead` in `src/components/BookingForm.jsx` at the real endpoint
- [ ] Use a call-tracking number if call conversions are being counted
- [ ] Confirm the section 06 bottom CTA reads as intended — "Find Out What Your Sleep Needs" is carried verbatim from the approved deck
- [ ] Have a clinician read the page end to end before it takes traffic
