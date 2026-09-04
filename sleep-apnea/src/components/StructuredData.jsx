import { faq, meta } from '../content/copy';
import { fill, practice } from '../content/practice';

/** Dentist + FAQPage JSON-LD. Keep in sync with the visible copy. */
export function StructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: practice.name,
      description: fill(meta.description),
      telephone: practice.phone.display,
      email: practice.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${practice.address.line1}, ${practice.address.line2}`,
        addressLocality: practice.address.city,
        addressRegion: practice.address.state,
        postalCode: practice.address.zip,
      },
      medicalSpecialty: 'Dentistry',
      availableService: [
        { '@type': 'MedicalTherapy', name: 'Oral appliance therapy for obstructive sleep apnea' },
        { '@type': 'MedicalTherapy', name: 'Snoring treatment' },
        { '@type': 'MedicalTest', name: 'Sleep apnea screening and airway evaluation' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
