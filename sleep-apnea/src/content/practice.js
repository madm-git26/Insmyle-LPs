/**
 * Practice configuration — the single place to swap in real client data.
 *
 * Everything here is PLACEHOLDER content carried over from the approved
 * reference comp. Replace before launch. Nothing in the copy layer hard-codes
 * a name, phone number, address or credential — it all reads from here, so a
 * find-and-replace is never needed.
 */
export const practice = {
  name: 'Restore Sleep & Wellness',
  nameShort: 'Restore',
  tagline: 'Sleep & Wellness',
  doctor: {
    name: 'Dr. [Provider Name]',
    credentials: 'DDS',
    // Only list credentials the practice genuinely holds (spec 23).
    highlights: [
      'Focused training in dental sleep medicine',
      'Custom oral appliance therapy provided in-office',
      'Works alongside your physician and sleep specialist',
      'Ongoing follow-up and appliance adjustment',
    ],
  },
  phone: {
    display: '(555) 123-4567',
    href: 'tel:+15551234567',
  },
  email: 'hello@restoresleep.com',
  address: {
    line1: '123 Wellness Way',
    line2: 'Suite 100',
    city: 'Springfield',
    state: 'ST',
    zip: '12345',
    mapUrl: 'https://maps.google.com/?q=123+Wellness+Way+Springfield',
  },
  hours: [
    { days: 'Mon – Thu', time: '8:00 am – 5:00 pm' },
    { days: 'Fri', time: '8:00 am – 3:00 pm' },
    { days: 'Sat – Sun', time: 'Closed' },
  ],
  // Where the primary CTA sends people when no on-page booking modal is used.
  bookingUrl: '/schedule',
  social: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'Google', href: '#', icon: 'google' },
  ],
  legal: {
    copyright: `© ${new Date().getFullYear()} Restore Sleep & Wellness. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
};

/** Convenience token map for copy strings: "{{CITY}}" → "Springfield". */
export const tokens = {
  '{{PRACTICE}}': practice.name,
  '{{CITY}}': practice.address.city,
  '{{STATE}}': practice.address.state,
  '{{PHONE}}': practice.phone.display,
  '{{DOCTOR}}': practice.doctor.name,
};

export function fill(str) {
  return Object.entries(tokens).reduce(
    (out, [token, value]) => out.split(token).join(value),
    str
  );
}
