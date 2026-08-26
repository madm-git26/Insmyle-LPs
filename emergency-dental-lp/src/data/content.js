import { Zap, ShieldCheck, User } from 'lucide-react'

/* Tooth artwork. Drop files into public/teeth/ using these names and they
 * appear automatically; any that are missing fall back to the vector tooth.
 * See public/teeth/README.md for the full list and specs. */
const tooth = (file) => (file ? `${import.meta.env.BASE_URL}teeth/${file}` : undefined)
export const heroTooth = { src: tooth('hero-molar.webp'), alt: '' }
// no artwork supplied yet -> these slots render the vector tooth
export const aboutImage = { src: tooth(null), alt: '' }

/* ------------------------------------------------------------------ *
 * All page copy lives here so it can be edited without touching JSX.
 *
 * NOTE ON PLACEHOLDER VALUES
 * The phone number and every figure below (4.9, 500+, 98%, 24/7, 72 BPM)
 * come from the source mockup. They are illustrative, not verified.
 * See README.md -> "Before this goes live".
 * ------------------------------------------------------------------ */

export const brand = {
  name: 'Dental',
  nameLine2: 'Emergency Care',
  phone: '205-123-4567',
  phoneHref: 'tel:2051234567',
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Advanced Emergency Dental Care',
  headline: [
    { text: 'Emergency Care.', accent: false },
    { text: 'Right When You', accent: true },
    { text: 'Need It Most.', accent: false },
  ],
  body:
    'High-value emergency treatments for severe tooth pain, broken, cracked or infected teeth. ' +
    'Get expert care in Homewood & Birmingham.',
  primaryCta: 'Call For Emergency Care',
  secondaryCta: 'Request An Appointment',
}

export const features = [
  { icon: Zap, title: 'Same-Day Care', sub: 'Walk-ins Welcome' },
  { icon: ShieldCheck, title: 'Advanced Technology', sub: 'Modern & Precise' },
  { icon: User, title: 'Experienced Team', sub: 'Trusted Experts' },
]

export const rating = { score: '4.9', count: '500+ Patient Reviews' }

/* Orbit nodes. `angle` is degrees clockwise from 12 o'clock; adjust here
 * rather than nudging positions in the markup. */
export const orbitNodes = [
  { label: 'Root Canal\nTherapy', angle: 215, asset: tooth('orbit-root-canal.webp') },
  { label: 'Emergency\nCrown', angle: 170, asset: tooth(null) },
  { label: 'Infection\nTreatment', angle: 125, asset: tooth('orbit-infection.webp') },
  { label: 'Pain Relief\nCare', angle: 55, asset: tooth(null) },
  { label: 'Broken Tooth\nRepair', angle: 10, asset: tooth(null) },
  { label: 'Tooth\nExtraction', angle: 325, asset: tooth('orbit-extraction.webp') },
]

export const statCards = {
  patientStatus: { label: 'Patient Status', value: '72', unit: 'BPM' },
  careQuality: { label: 'Care Quality', value: 98, caption: 'Patient\nSatisfaction' },
  emergency: { label: 'Emergency Care', value: '24/7', caption: "We're here when\nyou need us" },
  patients: { count: '500+', caption: 'Happy Patients' },
}

export const services = {
  eyebrow: 'Our Emergency Services',
  heading: 'Comprehensive Emergency Dental Solutions',
  cta: 'View All Services',
  items: [
    { title: 'Root Canal\nTherapy', desc: 'Relieve severe pain and save your tooth', src: tooth('service-root-canal.webp') },
    { title: 'Emergency\nCrown', desc: 'Restore damaged teeth quickly', src: tooth(null) },
    { title: 'Tooth\nExtraction', desc: 'Safe & comfortable tooth removal', src: tooth('service-extraction.webp') },
    { title: 'Broken Tooth\nRepair', desc: 'Fix broken, cracked or chipped teeth', src: tooth(null) },
    { title: 'Infection\nTreatment', desc: 'Treat abscesses and infections', src: tooth('service-infection.webp') },
  ],
}

/* ---------------------------------------------------------------- *
 * Sections below the hero
 * ---------------------------------------------------------------- */

export const treatments = {
  eyebrow: 'How It Works',
  heading: 'From First Call To Pain Relief',
  intro:
    'Emergencies do not wait, so neither do we. Here is exactly what happens from the moment you call.',
  steps: [
    { n: '01', title: 'Call Us', desc: 'Describe your symptoms. We triage over the phone and tell you how fast we can see you.' },
    { n: '02', title: 'Same-Day Assessment', desc: 'Digital imaging and an exam pinpoint the cause before any treatment begins.' },
    { n: '03', title: 'Immediate Relief', desc: 'We stabilise the tooth and address the pain in the same visit wherever clinically possible.' },
    { n: '04', title: 'Follow-Up Plan', desc: 'You leave with a written plan, costs explained up front, and a follow-up already booked.' },
  ],
}

export const whyUs = {
  eyebrow: 'Why Us',
  heading: 'Built Around Urgent Care',
  items: [
    { title: 'Reserved Emergency Slots', desc: 'We hold appointment time open every day specifically for emergencies.' },
    { title: 'Digital Diagnostics', desc: 'On-site imaging means diagnosis and treatment happen in one visit, not three.' },
    { title: 'Costs Explained First', desc: 'You approve a written estimate before treatment starts. No surprises afterwards.' },
    { title: 'Anxiety-Aware Care', desc: 'Sedation options and a team used to treating patients who are frightened or in pain.' },
    { title: 'One Team Throughout', desc: 'The people who assess you are the people who treat you and follow up.' },
    { title: 'Insurance Handled', desc: 'We verify your benefits before your visit and file the claim for you.' },
  ],
}

export const about = {
  eyebrow: 'About',
  heading: 'Emergency Dentistry, Without The Wait',
  body: [
    'Most dental emergencies are not solved by a prescription and a wait. They need someone to look at the tooth today.',
    'Our practice keeps daily capacity open for urgent cases, so patients in pain are seen quickly rather than added to a list.',
  ],
  points: [
    'Same-day emergency appointments',
    'Walk-in patients welcome during opening hours',
    'On-site digital imaging',
    'Treatment and follow-up under one roof',
  ],
}

export const reviews = {
  eyebrow: 'Reviews',
  heading: 'What Patients Say',
  items: [
    { quote: '[CONFIRM: paste a verbatim patient review here. Do not paraphrase or invent.]', name: '[CONFIRM: name]', meta: '[CONFIRM: treatment]' },
    { quote: '[CONFIRM: paste a verbatim patient review here. Do not paraphrase or invent.]', name: '[CONFIRM: name]', meta: '[CONFIRM: treatment]' },
    { quote: '[CONFIRM: paste a verbatim patient review here. Do not paraphrase or invent.]', name: '[CONFIRM: name]', meta: '[CONFIRM: treatment]' },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  heading: 'Get Seen Today',
  intro: 'Call for the fastest response. If it is outside opening hours, send the form and we will reply as soon as we open.',
  hours: [
    { day: 'Monday – Thursday', time: '[CONFIRM: opening hours]' },
    { day: 'Friday', time: '[CONFIRM: open or closed]' },
    { day: 'Saturday', time: '[CONFIRM: open or closed]' },
    { day: 'Sunday', time: '[CONFIRM: open or closed]' },
  ],
  address: '[CONFIRM: street address, city, state, ZIP]',
  urgencyOptions: [
    'Severe pain right now',
    'Broken or knocked-out tooth',
    'Swelling or suspected infection',
    'Lost filling or crown',
    'Something else',
  ],
}

export const emergencyNotice =
  'If you have facial trauma, uncontrolled bleeding, difficulty breathing or swallowing, or swelling that is closing your eye or throat, go to your nearest hospital emergency department or call 911 first.'

export const footer = {
  columns: [
    { title: 'Care', links: ['Services', 'Treatments', 'Why Us'] },
    { title: 'Practice', links: ['About', 'Reviews', 'Contact'] },
  ],
  legal: '[CONFIRM: practice legal name]',
}
