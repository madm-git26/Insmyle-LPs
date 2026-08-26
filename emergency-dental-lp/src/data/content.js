import { Zap, ShieldCheck, User } from 'lucide-react'

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
  { label: 'Root Canal\nTherapy', angle: 215 },
  { label: 'Emergency\nCrown', angle: 170 },
  { label: 'Infection\nTreatment', angle: 125 },
  { label: 'Pain Relief\nCare', angle: 55 },
  { label: 'Broken Tooth\nRepair', angle: 10 },
  { label: 'Tooth\nExtraction', angle: 325 },
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
    { title: 'Root Canal\nTherapy', desc: 'Relieve severe pain and save your tooth' },
    { title: 'Emergency\nCrown', desc: 'Restore damaged teeth quickly' },
    { title: 'Tooth\nExtraction', desc: 'Safe & comfortable tooth removal' },
    { title: 'Broken Tooth\nRepair', desc: 'Fix broken, cracked or chipped teeth' },
    { title: 'Infection\nTreatment', desc: 'Treat abscesses and infections' },
  ],
}
