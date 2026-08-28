import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Practice details                                                     */
/*                                                                      */
/* NAP is confirmed against willowstreetdental.com. A design comp for   */
/* this page showed (715) 723-6363 and 209 S. Barstow St; both conflict */
/* with the live site, so the verified values are used here. If the     */
/* practice confirms a tracking number or a new address, change these   */
/* four constants and every reference on the page follows.              */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = '(715) 723-5688';
const PHONE_HREF = 'tel:+17157235688';
const ADDRESS_LINE1 = '123 W. Willow Street';
const ADDRESS_LINE2 = 'Chippewa Falls, WI 54729';

const HOURS = [
  { days: 'Mon – Thu', time: '8:00am – 5:00pm' },
  { days: 'Fri – Sun', time: 'Closed' },
];

const BOOKING_URL = 'https://book.allinone.dental/willow-street';
const VIRTUAL_CONSULT_URL = 'https://www.willowstreetdental.com/virtual-consult/';
const GOOGLE_REVIEWS_URL = 'https://www.willowstreetdental.com/';

const LOGO = `${import.meta.env.BASE_URL}img/logo.png`;
const DR_CALDER = `${import.meta.env.BASE_URL}img/dr-calder.webp`;
const HERO_IMAGE = `${import.meta.env.BASE_URL}img/invisalign-smile.webp`;
const ALIGNER_IMAGE = `${import.meta.env.BASE_URL}img/clear-aligners.webp`;

/* ------------------------------------------------------------------ */
/* Conversion tracking                                                 */
/* ------------------------------------------------------------------ */

type TrackPayload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: TrackPayload[];
  }
}

/** GTM-compatible push; no-ops when no tag manager is present. */
function track(event: string, payload: TrackPayload = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    /* tracking must never break the page */
  }
}

/** Classifies a CTA by destination so conversions stay countable separately. */
function ctaKind(href: string) {
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.includes('book.allinone')) return 'booking_click';
  if (href.includes('virtual-consult')) return 'virtual_consult_request';
  return 'cta_click';
}

/** Labels a CTA for reporting; clicks are captured by the delegated listener. */
function useCtaProps(location: string) {
  return useCallback(
    (label: string) => ({ 'data-cta': label, 'data-cta-location': location }),
    [location],
  );
}

/** One delegated click listener plus scroll-depth milestones. */
function useConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) return;
      track(ctaKind(href), {
        cta_label: link.dataset.cta || link.textContent?.trim().slice(0, 60) || 'unlabelled',
        cta_location: link.dataset.ctaLocation || link.closest('section')?.id || 'page',
        cta_href: href,
      });
    };
    document.addEventListener('click', onClick, true);

    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const mark of [25, 50, 75, 90]) {
        if (pct >= mark && !hit.has(mark)) {
          hit.add(mark);
          track('scroll_depth', { percent: mark });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

/**
 * Fades a section in once it scrolls into view.
 *
 * Starts already-visible when the OS asks for reduced motion — a CSS-only
 * override cannot rescue this, because the element's resting state is
 * opacity 0 and would simply never animate in.
 */
function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [reduced] = useState(prefersReducedMotion);
  const [shown, setShown] = useState(reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, reduced]);

  const style = (i = 0): CSSProperties =>
    reduced
      ? {}
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity .5s cubic-bezier(.16,1,.3,1) ${i * 70}ms, transform .5s cubic-bezier(.16,1,.3,1) ${i * 70}ms`,
        };

  return { ref, style };
}

/* ------------------------------------------------------------------ */
/* Icons (inline, no icon library)                                     */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };
const S = (p: IconProps) => ({
  className: p.className ?? 'w-6 h-6',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const IconCheck = (p: IconProps) => (
  <svg {...S(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);
const IconPhone = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const IconPin = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M12 21c-4.5-3-8-6.5-8-11a8 8 0 0 1 16 0c0 4.5-3.5 8-8 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const IconUsers = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.2a4 4 0 0 1 0 7.6" />
  </svg>
);
const IconMonitor = (p: IconProps) => (
  <svg {...S(p)}>
    <rect x="2.5" y="4" width="19" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const IconVideo = (p: IconProps) => (
  <svg {...S(p)}>
    <rect x="2" y="6" width="13" height="12" rx="2" />
    <path d="M15 10.5l6-3.5v10l-6-3.5" />
  </svg>
);
const IconEye = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);
const IconSwap = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </svg>
);
const IconSparkle = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
  </svg>
);
const IconClipboard = (p: IconProps) => (
  <svg {...S(p)}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 10h6M9 14h4" />
  </svg>
);
const IconCalendar = (p: IconProps) => (
  <svg {...S(p)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);
const IconSmile = (p: IconProps) => (
  <svg {...S(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01" />
  </svg>
);
const IconUpload = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    <path d="M12 16V4M8 8l4-4 4 4" />
  </svg>
);
const IconChat = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
  </svg>
);
const IconTooth = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M12 3c2 0 2.5 1 4.5 1S20 3.6 20 6.5c0 3-1.2 4-1.8 6.4-.5 2-.6 5.1-2.2 5.1s-1.4-3.6-4-3.6-2.4 3.6-4 3.6-1.7-3.1-2.2-5.1C5.2 10.5 4 9.5 4 6.5 4 3.6 5.5 4 7.5 4S10 3 12 3z" />
  </svg>
);
const IconClock = (p: IconProps) => (
  <svg {...S(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" />
  </svg>
);
const IconHeart = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M20.8 5.6a5.4 5.4 0 0 0-7.7 0l-1.1 1.1-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7L12 21l8.8-7.7a5.4 5.4 0 0 0 0-7.7z" />
  </svg>
);
const IconTag = (p: IconProps) => (
  <svg {...S(p)}>
    <path d="M20.6 13.4L12 22l-9-9V4h9l8.6 8.6a1.4 1.4 0 0 1 0 2z" />
    <circle cx="7.5" cy="8.5" r="1.4" />
  </svg>
);
const IconMobile = (p: IconProps) => (
  <svg {...S(p)}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);
const Arrow = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);
const Stars = ({ className = '' }: IconProps) => (
  <div className={`flex gap-0.5 text-amber-400 ${className}`} aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 1.6l2.5 5.1 5.6.8-4 4 .9 5.6L10 14.4l-5 2.7.9-5.6-4-4 5.6-.8L10 1.6z" />
      </svg>
    ))}
  </div>
);
const GoogleG = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.3c4.1-3.8 6.6-9.4 6.6-15.6z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.8 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.700l-7.1 5.5C8.1 40.9 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.5 27.9c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5A22 22 0 0 0 2 23.5c0 3.5.8 6.9 2.4 9.9l7.1-5.5z" />
    <path fill="#EA4335" d="M24 10.2c3.2 0 5.4 1.4 6.7 2.6l6.1-6C33.1 3.4 29.1 1 24 1 15.4 1 8.1 6.1 4.4 13.6l7.1 5.5C13.3 14 18.2 10.2 24 10.2z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Content (verified against willowstreetdental.com)                    */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'Why Aligners', href: '#benefits' },
  { label: 'The Process', href: '#journey' },
  { label: 'Our Dentist', href: '#doctor' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Cost', href: '#cost' },
  { label: 'FAQ', href: '#faq' },
];

const heroTrust = [
  'Chippewa Falls Dental Team',
  'Virtual Consultation Available',
  'Personalized Clear Aligner Care',
];

const trustBar = [
  { Icon: IconPin, title: 'Local Care in', sub: 'Chippewa Falls, WI' },
  { Icon: IconUsers, title: 'Patient-Focused,', sub: 'Personalized Care' },
  { Icon: IconMonitor, title: 'Modern Technology', sub: 'for Better Results' },
  { Icon: IconVideo, title: 'Virtual Consultation', sub: 'from the Comfort of Home' },
];

const benefits = [
  { Icon: IconEye, title: 'Discreet Appearance', body: 'Clear aligners are virtually invisible, so you can smile with confidence.' },
  { Icon: IconSwap, title: 'Removable & Flexible', body: 'Take them out to eat, brush, floss, and enjoy special occasions.' },
  { Icon: IconSparkle, title: 'Easier Oral Hygiene', body: 'Brush and floss normally to help maintain healthy teeth and gums.' },
  { Icon: IconClipboard, title: 'Personalized Treatment', body: 'Your plan is customized to your smile goals and lifestyle.' },
  { Icon: IconCalendar, title: 'Convenient Process', body: 'Start with a virtual consultation — quick, easy, and stress-free.' },
  { Icon: IconSmile, title: 'Confidence in Your Smile', body: 'Straighter teeth can enhance your smile and your confidence.' },
];

/* Excerpts exactly as published on the Willow Street Dental website. None of
   these mention clear aligners, so none is presented as an aligner review. */
const reviews = [
  { quote: '…best dental office I’ve ever visited. Doctor is incredibly knowledgeable and gentle…', name: 'Jason R.' },
  { quote: '…amazing experience…exceptional care…', name: 'Sarah M.' },
  { quote: '…exceeded all expectations…best dental care I’ve received…', name: 'Emily C.' },
];

const journey = [
  { Icon: IconUpload, n: '1', title: 'Request\na Consultation', body: 'Start with a virtual consultation by sharing a photo of your smile and telling us your goals.' },
  { Icon: IconChat, n: '2', title: 'Discuss\nYour Goals', body: 'We’ll talk with you about your concerns and determine if clear aligners may be right for you.' },
  { Icon: IconTooth, n: '3', title: 'Complete\nan Evaluation', body: 'We’ll complete a thorough exam and digital scan to evaluate your smile and create your plan.' },
  { Icon: IconSparkle, n: '4', title: 'Review Your\nPersonalized Plan', body: 'We’ll review your treatment plan, timeline, and next steps so you can make an informed decision.' },
];

const consultSteps = [
  'Share a clear photo of your smile',
  'Tell us what you’d like to change',
  'Our team will follow up with your next steps',
];

/* Concerns clear aligners may address — wording kept conditional, never a
   diagnosis, and matched to what the practice's own page lists. */
const concerns = [
  { title: 'Crowded teeth', body: 'Teeth that overlap or sit too close together.' },
  { title: 'Spacing between teeth', body: 'Gaps you would like to close for a more even smile.' },
  { title: 'Overbite, underbite or crossbite', body: 'Certain bite concerns may be treatable with aligners.' },
  { title: 'Minor tooth rotations', body: 'Teeth that are slightly turned out of position.' },
];

/* Why a local dentist, stated factually — no comparison claims about any
   named competitor, only what in-person care actually involves. */
const whyLocal = [
  {
    Icon: IconUsers,
    title: 'Treated by a local dentist',
    body: 'Your treatment is planned and monitored by Dr. Calder here in Chippewa Falls — not by mail.',
  },
  {
    Icon: IconTooth,
    title: 'A real exam comes first',
    body: 'Aligners are only recommended after a comprehensive dental exam and digital scan of your teeth.',
  },
  {
    Icon: IconHeart,
    title: 'Care beyond the aligners',
    body: 'If something else needs attention first, the same team can take care of it under one roof.',
  },
];

const costFactors = [
  'How complex your case is',
  'Estimated length of treatment',
  'The type of aligner treatment recommended',
  'Any existing dental needs',
  'Your insurance benefits',
  'Payment options available to you',
];

const faqs = [
  {
    q: 'What are clear aligners?',
    a: 'Clear aligners are transparent, custom-made trays that fit over your teeth and are designed to gradually guide them into a straighter position — an alternative to traditional metal braces.',
  },
  {
    q: 'Is Invisalign available in Chippewa Falls?',
    a: 'Many patients searching for Invisalign in Chippewa Falls are looking for a discreet way to straighten their smile. Willow Street Dental offers clear aligner treatment here in Chippewa Falls, and our team can talk through your specific options during a consultation.',
  },
  {
    q: 'Am I a candidate for clear aligners?',
    a: 'Clear aligners may help with mild to moderate concerns such as crowded or spaced teeth and certain bite issues, depending on your evaluation. An in-person or virtual consultation is needed to determine whether they are right for you.',
  },
  {
    q: 'How long does clear aligner treatment take?',
    a: 'Treatment length varies by patient. Many patients complete clear aligner treatment in about 6 to 18 months, though your specific timeline is discussed as part of your evaluation.',
  },
  {
    q: 'Are clear aligners comfortable?',
    a: 'Aligners are smooth and custom-made to fit closely, with no brackets or wires. As with any orthodontic treatment, you may notice a short adjustment period with each new set.',
  },
  {
    q: 'Can I take them out to eat and brush?',
    a: 'Yes. Clear aligners are removable, so you can take them out to eat, to drink anything other than water, and to brush and floss. Most patients wear them about 20 to 22 hours a day to stay on track.',
  },
  {
    q: 'How does the virtual consultation work?',
    a: 'You share a photo of your smile and tell us what you would like to change. Our team then follows up to arrange your personalized next step. The virtual consultation is free.',
  },
  {
    q: 'What do clear aligners cost?',
    a: 'Cost depends on treatment complexity, length and your individual dental needs. Willow Street Dental is in network with Delta Dental — ask our team about current fees, insurance benefits and payment options.',
  },
];

const miniFaqs = [
  { Icon: IconClock, title: 'How Long Does It Take?', body: 'Treatment time varies. Many patients complete clear aligner treatment in 6–18 months.' },
  { Icon: IconHeart, title: 'Comfortable Treatment', body: 'Aligners are smooth and custom-made to fit closely, with no brackets or wires.' },
  { Icon: IconSmile, title: 'Eat What You Love', body: 'Remove your aligners to eat and enjoy all your favorite foods.' },
  { Icon: IconTag, title: 'Questions About Cost?', body: 'We’re in network with Delta Dental. Ask our team about fees and payment options.' },
];

/* ------------------------------------------------------------------ */
/* Shared UI                                                            */
/* ------------------------------------------------------------------ */

const SHELL = 'mx-auto w-full max-w-6xl px-5 md:px-8';

function BtnPrimary({
  href,
  children,
  sub,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  sub?: string;
  className?: string;
  [k: string]: unknown;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      {...rest}
      className={`group inline-flex items-center gap-3 rounded-lg bg-brand-600 px-5 py-3.5 text-white shadow-card transition-colors hover:bg-brand-700 ${className}`}
    >
      <span className="flex-1 text-left leading-tight">
        <span className="flex items-center gap-2 text-[15px] font-semibold">
          {children}
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        {sub && <span className="mt-0.5 block text-xs font-normal text-brand-100">{sub}</span>}
      </span>
    </a>
  );
}

function BtnOutline({
  href,
  children,
  sub,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  sub?: string;
  className?: string;
  [k: string]: unknown;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      {...rest}
      className={`group inline-flex items-center gap-3 rounded-lg border border-brand-200 bg-white px-5 py-3.5 text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-50 ${className}`}
    >
      <IconPhone className="w-5 h-5 shrink-0" />
      <span className="flex-1 text-left leading-tight">
        <span className="flex items-center gap-2 text-[15px] font-semibold">
          {children}
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        {sub && <span className="mt-0.5 block text-xs font-normal text-muted">{sub}</span>}
      </span>
    </a>
  );
}

function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-[clamp(1.6rem,3.2vw,2.15rem)] font-bold text-navy-900">{children}</h2>
      <span className="mx-auto mt-3 block h-[3px] w-12 rounded-full bg-brand-500" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  const cta = useCtaProps('header');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className={`${SHELL} flex items-center justify-between gap-4 py-3`}>
        <a
          href="#top"
          className="flex shrink-0 items-center py-1.5"
          aria-label="Willow Street Dental, Chippewa Falls"
        >
          <img src={LOGO} alt="Willow Street Dental" width={342} height={184} className="h-9 w-auto md:h-11" />
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-sm font-medium text-ink transition-colors hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            {...cta('Header phone')}
            className="hidden min-h-[44px] items-center gap-2 px-2 text-sm font-semibold text-brand-700 md:inline-flex"
          >
            <IconPhone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={VIRTUAL_CONSULT_URL}
            target="_blank"
            rel="noopener"
            {...cta('Header Request Consultation')}
            className="hidden min-h-[44px] items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            Request Consultation
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className={`absolute h-0.5 w-6 rounded bg-navy-900 transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-6 rounded bg-navy-900 transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-0.5 w-6 rounded bg-navy-900 transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${open ? 'block' : 'hidden'} border-t border-slate-100 bg-white`}>
        <nav className={`${SHELL} flex flex-col gap-1 py-4`} aria-label="Mobile">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-semibold text-ink hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2">
            <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('Mobile menu consult')} className="justify-center">
              Request a Virtual Consultation
            </BtnPrimary>
            <BtnOutline href={PHONE_HREF} {...cta('Mobile menu call')} className="justify-center">
              Call {PHONE_DISPLAY}
            </BtnOutline>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const cta = useCtaProps('hero');

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className={`${SHELL} lg:ml-auto lg:mr-0 lg:max-w-[700px] py-10 md:py-16 lg:py-20`}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
            Clear Aligners in Chippewa Falls
          </p>

          <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.05rem)] font-bold leading-[1.14] text-navy-900">
            Explore a Straighter Smile with Clear Aligners in{' '}
            <span className="text-brand-600 underline decoration-brand-400 decoration-[3px] underline-offset-[6px]">
              Chippewa&nbsp;Falls
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            A discreet, comfortable way to straighten your teeth — without metal braces. Start with a
            virtual consultation and discover if clear aligners are right for you.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <BtnPrimary
              href={VIRTUAL_CONSULT_URL}
              sub="Start with a photo of your smile"
              {...cta('Hero — Request a Virtual Consultation')}
            >
              Request a Virtual Consultation
            </BtnPrimary>
            <BtnOutline href={PHONE_HREF} sub={PHONE_DISPLAY} {...cta('Hero — Call Willow Street Dental')}>
              Call Willow Street Dental
            </BtnOutline>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {heroTrust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <IconCheck className="w-4 h-4 shrink-0 text-brand-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px]">
          <img
            src={HERO_IMAGE}
            alt="Patient in Chippewa Falls holding a clear aligner tray"
            width={930}
            height={570}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          {/* Review badge: numbers stay blank until the practice confirms them. */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur md:bottom-6 md:right-6">
            <GoogleG />
            <div className="leading-tight">
              <p className="text-[12px] font-medium text-muted">
                [INSERT VERIFIED REVIEW COUNT]
              </p>
              <p className="text-[13px] font-bold text-navy-900">Google Reviews</p>
              <Stars className="mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust bar                                                           */
/* ------------------------------------------------------------------ */

function TrustBar() {
  return (
    <section className="border-t border-slate-100 bg-white py-6 md:py-8">
      <div className={SHELL}>
        <div className="grid divide-y divide-slate-100 rounded-xl border border-slate-100 bg-white shadow-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {trustBar.map(({ Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 px-5 py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="w-5 h-5" />
              </span>
              <p className="text-[13px] font-semibold leading-tight text-navy-900">
                {title}
                <span className="block font-normal text-muted">{sub}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

function Benefits() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('after_benefits');

  return (
    <section id="benefits" ref={ref} className="bg-brand-50/60 py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>Why Patients Choose Clear Aligners</SectionTitle>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-slate-100 bg-slate-100 shadow-card sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {benefits.map(({ Icon, title, body }, i) => (
            <div key={title} style={style(i)} className="flex flex-col items-center bg-white px-4 py-7 text-center">
              <Icon className="w-9 h-9 text-brand-500" />
              <h3 className="mt-4 text-sm font-bold leading-snug text-brand-700">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('Benefits — Explore Your Options')}>
            Explore Your Clear Aligner Options
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

function Reviews() {
  const { ref, style } = useReveal();

  return (
    <section id="reviews" ref={ref} className="bg-white py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>What Patients Say About Willow Street Dental</SectionTitle>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              style={style(i)}
              className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-6 text-center shadow-card"
            >
              <div className="flex justify-center">
                <Stars />
              </div>
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink">
                “{r.quote.replace(/^…|…$/g, '')}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-navy-900">— {r.name}</figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-muted">
          Excerpts as published on the Willow Street Dental website. No overall rating or review
          count is stated, as that figure is not confirmed.
        </p>

        <div className="mt-4 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            data-cta="Read More Reviews"
            data-cta-location="reviews"
            className="inline-flex min-h-[44px] items-center gap-2 px-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Read More Reviews <Arrow />
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-100 pt-8">
          <p className="text-[15px] font-semibold text-navy-900">Ready to explore your options?</p>
          <p className="text-[13.5px] text-muted">Start with a conversation about your smile goals.</p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <BtnPrimary href={VIRTUAL_CONSULT_URL} data-cta="Reviews — Request consultation" data-cta-location="after_reviews">
              Request Your Consultation
            </BtnPrimary>
            <BtnOutline href={PHONE_HREF} data-cta="Reviews — Call" data-cta-location="after_reviews">
              Call {PHONE_DISPLAY}
            </BtnOutline>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */

function Journey() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('after_process');

  return (
    <section id="journey" ref={ref} className="bg-brand-50/60 py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>Your Clear Aligner Journey</SectionTitle>

        <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          {journey.map(({ Icon, n, title, body }, i) => (
            <li key={n} style={style(i)} className="relative text-center">
              {/* dashed connector between steps on desktop */}
              {i < journey.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+2.4rem)] right-[calc(-50%+2.4rem)] top-8 hidden border-t-2 border-dashed border-brand-200 md:block"
                />
              )}
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Icon className="w-7 h-7" />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[12px] font-bold text-white">
                  {n}
                </span>
              </span>
              <h3 className="mt-5 whitespace-pre-line text-[15px] font-bold leading-snug text-navy-900">
                {`${n}. ${title}`}
              </h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-[13px] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('Journey — Start Your Virtual Consultation')}>
            Start Your Virtual Consultation
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Doctor + virtual consultation                                       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Lead form                                                           */
/* ------------------------------------------------------------------ */

/**
 * Set this to the practice's form handler (CRM webhook, Formspree, etc.).
 * While it is empty the form still validates and captures intent, then hands
 * off to the virtual-consult page rather than silently losing the lead.
 */
const FORM_ENDPOINT = '';

type Fields = { name: string; phone: string; email: string; goal: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your name so we know who to reach out to.';
  const digits = v.phone.replace(/\D/g, '');
  if (!digits) e.phone = 'Please enter a phone number we can reach you on.';
  else if (digits.length < 10) e.phone = 'That phone number looks too short — please include the area code.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'That email address does not look right — please check it.';
  return e;
}

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  error,
  onChange,
  autoComplete,
  inputMode,
  hint,
  textarea,
}: {
  id: keyof Fields;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
  hint?: string;
  textarea?: boolean;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ');
  const base =
    'mt-1.5 w-full rounded-lg border bg-white px-3.5 py-3 text-base text-ink placeholder:text-slate-400 transition-colors focus:outline-none';
  const tone = error
    ? 'border-red-500 focus:border-red-600'
    : 'border-slate-300 focus:border-brand-500';

  return (
    <p className="min-w-0">
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={`${base} ${tone} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={`${base} ${tone}`}
        />
      )}
      {hint && (
        <span id={`${id}-hint`} className="mt-1 block text-[12px] text-muted">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-[12px] font-medium text-red-600">
          {error}
        </span>
      )}
    </p>
  );
}

function LeadForm() {
  const [v, setV] = useState<Fields>({ name: '', phone: '', email: '', goal: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const formRef = useRef<HTMLFormElement | null>(null);

  const set = (k: keyof Fields) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    // Clear the error as soon as the field is being corrected.
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left hunting for it.
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      track('form_error', { fields: Object.keys(found).join(',') });
      return;
    }

    setState('sending');
    track('lead_form_submit', { has_email: v.email ? 'yes' : 'no' });

    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...v, source: 'clear-aligner-lp' }),
        });
        setState('done');
        return;
      } catch {
        /* fall through to the hand-off below */
      }
    }
    // No endpoint wired yet — hand the visitor to the real consult flow
    // rather than pretending the lead was captured.
    window.open(VIRTUAL_CONSULT_URL, '_blank', 'noopener');
    setState('done');
  };

  if (state === 'done') {
    return (
      <div className="rounded-xl border border-brand-200 bg-white p-6 text-center md:p-8" role="status">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <IconCheck className="w-6 h-6" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy-900">Thanks — we’ve got your details.</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          Our Chippewa Falls team will follow up about your clear aligner consultation. If you’d
          rather talk now, call{' '}
          <a href={PHONE_HREF} className="font-semibold text-brand-700 underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-card md:p-7"
      aria-labelledby="form-heading"
    >
      <h3 id="form-heading" className="text-xl font-bold text-navy-900">
        Request your free consultation
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
        Tell us how to reach you and our team will be in touch. No obligation.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" required value={v.name} error={errors.name} onChange={set('name')} autoComplete="name" />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          inputMode="tel"
          value={v.phone}
          error={errors.phone}
          onChange={set('phone')}
          autoComplete="tel"
        />
      </div>
      <div className="mt-4">
        <Field
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          value={v.email}
          error={errors.email}
          onChange={set('email')}
          autoComplete="email"
        />
      </div>
      <div className="mt-4">
        <Field
          id="goal"
          label="What would you like to change about your smile?"
          textarea
          value={v.goal}
          error={errors.goal}
          onChange={set('goal')}
          hint="Optional — even a sentence helps us prepare for your consultation."
        />
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        data-cta="Lead form submit"
        data-cta-location="lead_form"
        className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Request My Consultation'}
        {state !== 'sending' && <Arrow />}
      </button>

      <p className="mt-3 text-[12px] leading-relaxed text-muted">
        Prefer to talk?{' '}
        <a
          href={PHONE_HREF}
          data-cta="Form inline call"
          className="inline-flex min-h-[44px] items-center font-semibold text-brand-700 underline"
        >
          Call {PHONE_DISPLAY}
        </a>
        . Your details are only used to contact you about your consultation.
      </p>
    </form>
  );
}

function DoctorAndConsult() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('doctor_consult');

  return (
    <section id="doctor" ref={ref} className="bg-white py-14 md:py-20">
      <div className={SHELL}>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* Doctor */}
          <div style={style(0)} className="rounded-xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
            <p className="text-sm font-medium text-muted">Meet Your Chippewa Falls Dentist</p>
            <h2 className="mt-1 text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold text-brand-700">
              Dr. Curtis Calder, D.D.S.
            </h2>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row">
              <img
                src={DR_CALDER}
                alt="Dr. Curtis Calder, D.D.S."
                width={500}
                height={500}
                loading="lazy"
                className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-brand-50 sm:h-32 sm:w-32"
              />
              <div className="text-[14px] leading-relaxed text-muted">
                <p>
                  Dr. Calder earned his Doctor of Dental Surgery degree from Creighton University
                  School of Dentistry. He combines modern dental technology with a personal,
                  down-to-earth approach focused on helping patients feel comfortable in the dental
                  chair.
                </p>
                <p className="mt-3">
                  His goal is always the same: to help each patient feel confident in their smile and
                  comfortable in the dental chair.
                </p>
                <p className="mt-3 text-[12px] text-slate-500">
                  [INSERT VERIFIED INFORMATION for any additional credentials or memberships]
                </p>
              </div>
            </div>

            <div className="mt-6">
              <BtnOutline href={PHONE_HREF} {...cta('Doctor — Talk With Our Team')}>
                Talk With Our Dental Team
              </BtnOutline>
            </div>

            {/* Local proof sits with the dentist: where, when, which plan. */}
            <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-muted">
                  <IconPin className="w-4 h-4 text-brand-500" /> Visit
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-ink">
                  {ADDRESS_LINE1}
                  <br />
                  {ADDRESS_LINE2}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-muted">
                  <IconClock className="w-4 h-4 text-brand-500" /> Hours
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-ink">
                  {HOURS.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-muted">
                  <IconTag className="w-4 h-4 text-brand-500" /> Insurance
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-ink">
                  In network with
                  <br />
                  Delta Dental
                </dd>
              </div>
            </dl>
          </div>

          {/* Virtual consultation */}
          <div style={style(1)} className="rounded-xl bg-brand-50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card">
                <IconMobile className="w-6 h-6" />
              </span>
              <h2 className="mt-1 text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold text-brand-700">
                Start with a Virtual Consultation
              </h2>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Not sure if clear aligners are right for you? Start from home — it’s simple, and it’s
              free.
            </p>

            <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <ol className="space-y-3">
                {consultSteps.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 text-[13.5px] font-medium text-ink">
                    <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[12px] font-bold text-white">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <img
                src={ALIGNER_IMAGE}
                alt="Clear aligner tray"
                width={605}
                height={458}
                loading="lazy"
                className="hidden h-32 w-40 rounded-xl object-cover shadow-card sm:block"
              />
            </div>

            <div className="mt-6">
              <LeadForm />
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-muted">
              Complete treatment may require an in-office visit. A virtual consultation is not a
              substitute for a comprehensive dental exam.
            </p>
          </div>
        </div>

        {/* Mini FAQ row */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-slate-100 bg-slate-100 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {miniFaqs.map(({ Icon, title, body }, i) => (
            <div key={title} style={style(i + 2)} className="flex gap-3 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="w-4.5 h-4.5" />
              </span>
              <div>
                <h3 className="text-[13px] font-bold text-navy-900">{title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Candidacy + Invisalign terminology                                  */
/* ------------------------------------------------------------------ */

function Candidacy() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('after_candidacy');

  return (
    <section id="candidacy" ref={ref} className="bg-white py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>Could Clear Aligners Work for Your Smile?</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted">
          Clear aligners may help with a range of mild to moderate concerns, depending on your
          evaluation:
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {concerns.map((c, i) => (
            <div
              key={c.title}
              style={style(i)}
              className="rounded-xl border border-slate-100 bg-white p-5 shadow-card"
            >
              <IconCheck className="w-6 h-6 text-brand-500" />
              <h3 className="mt-3 text-[15px] font-bold text-navy-900">{c.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>

        <div
          style={style(4)}
          className="mt-6 rounded-xl border-l-4 border-brand-500 bg-brand-50 p-5 md:p-6"
        >
          <h3 className="text-[15px] font-bold text-navy-900">A consultation comes first</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            Every smile is different, and clear aligners are not right for every situation. Whether
            they may work for you depends on an evaluation with our Chippewa Falls team — this page
            is not a diagnosis.
          </p>
        </div>

        {/* Terminology: what people search for vs. what the treatment is called. */}
        <div
          style={style(5)}
          className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-card md:p-8"
        >
          <h3 className="text-lg font-bold text-navy-900 md:text-xl">
            Invisalign or clear aligners — what’s the difference?
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            “Invisalign” is a well-known brand name within the broader category of clear aligner
            treatment, which is why many people search for Invisalign in Chippewa Falls when what
            they really want is a clear, removable way to straighten their teeth. “Clear aligners”
            is the wider term for that type of treatment.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Willow Street Dental’s service is described as clear aligner treatment. If you have a
            particular brand in mind, ask our team during your consultation.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('Candidacy — See if aligners may be right')}>
            See If Clear Aligners May Be Right for You
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why a local dentist                                                 */
/* ------------------------------------------------------------------ */

function WhyLocal() {
  const { ref, style } = useReveal();

  return (
    <section id="why-local" ref={ref} className="bg-brand-50/60 py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>Why Choose a Chippewa Falls Dental Team?</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyLocal.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              style={style(i)}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-[15px] font-bold text-navy-900">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cost & insurance                                                    */
/* ------------------------------------------------------------------ */

function Cost() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('after_cost');

  return (
    <section id="cost" ref={ref} className="bg-white py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>What Do Clear Aligners Cost?</SectionTitle>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div style={style(0)} className="rounded-xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
            <p className="text-[14px] leading-relaxed text-muted">
              There is no single price for clear aligners, because no two smiles need the same
              treatment. Your cost depends on:
            </p>
            <ul className="mt-4 space-y-2.5">
              {costFactors.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink">
                  <IconCheck className="mt-0.5 w-4 h-4 shrink-0 text-brand-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div style={style(1)} className="flex flex-col rounded-xl bg-brand-50 p-6 md:p-8">
            <h3 className="text-lg font-bold text-navy-900 md:text-xl">
              In network with Delta Dental
            </h3>
            <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
              Willow Street Dental is in network with Delta Dental. The clearest way to understand
              your own cost is to ask — our team can walk you through current fees, your insurance
              benefits and the payment options available to you.
            </p>
            <div className="mt-6">
              <BtnPrimary href={PHONE_HREF} {...cta('Cost — Ask about options')}>
                Ask About Your Options
              </BtnPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  const { ref, style } = useReveal();
  const [open, setOpen] = useState<number | null>(0);
  const cta = useCtaProps('after_faq');

  return (
    <section id="faq" ref={ref} className="bg-brand-50/60 py-14 md:py-20">
      <div className={SHELL}>
        <SectionTitle>Clear Aligner Questions, Answered</SectionTitle>

        <div
          style={style(0)}
          className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card"
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => {
                      const next = isOpen ? null : i;
                      setOpen(next);
                      if (next !== null) track('faq_open', { faq_question: f.q });
                    }}
                    className="flex min-h-[56px] w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6"
                  >
                    <span className="text-[15px] font-semibold text-navy-900 md:text-base">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 md:px-6"
                >
                  <p className="max-w-2xl text-[14px] leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[14px] font-semibold text-navy-900">Still have questions?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('FAQ — Request consultation')}>
              Request a Virtual Consultation
            </BtnPrimary>
            <BtnOutline href={PHONE_HREF} {...cta('FAQ — Call')}>
              Call {PHONE_DISPLAY}
            </BtnOutline>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const cta = useCtaProps('final');

  return (
    <section id="contact" className="bg-navy-800 py-10 md:py-12">
      <div className={`${SHELL} grid items-center gap-7 lg:grid-cols-[auto_1fr_auto]`}>
        <span className="hidden h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white lg:flex">
          <IconCalendar className="w-7 h-7" />
        </span>

        <div>
          <h2 className="text-[clamp(1.35rem,2.8vw,1.85rem)] font-bold text-white">
            Ready to Explore Your Clear Aligner Options?
          </h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-brand-100">
            Take the first step toward a straighter smile with Willow Street Dental. Request a
            virtual consultation or call our Chippewa Falls office today.
          </p>
        </div>

        <div className="grid w-full gap-3 sm:w-auto sm:min-w-[260px]">
          <a
            href={VIRTUAL_CONSULT_URL}
            target="_blank"
            rel="noopener"
            {...cta('Final — Request a Virtual Consultation')}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-[15px] font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Request a Virtual Consultation
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={PHONE_HREF}
            {...cta('Final — Call')}
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            <IconPhone className="w-4 h-4" />
            Call {PHONE_DISPLAY}
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  const cta = useCtaProps('footer');

  return (
    <footer className="bg-navy-900 py-10 text-white">
      <div className={`${SHELL} grid gap-8 md:grid-cols-3`}>
        <div>
          <img
            src={LOGO}
            alt="Willow Street Dental"
            width={342}
            height={184}
            loading="lazy"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-[13px] leading-relaxed text-white/70">
            Personalized care. Comfortable visits.
            <br />
            Healthier smiles.
          </p>
        </div>

        <div className="text-[13px]">
          <div className="flex items-start gap-3">
            <IconPin className="mt-0.5 w-4 h-4 shrink-0 text-brand-400" />
            <p className="text-white/80">
              {ADDRESS_LINE1}
              <br />
              {ADDRESS_LINE2}
            </p>
          </div>
          <a href={PHONE_HREF} {...cta('Footer phone')} className="mt-2 flex min-h-[44px] items-center gap-3 text-white/80 hover:text-white">
            <IconPhone className="w-4 h-4 shrink-0 text-brand-400" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            {...cta('Footer book online')}
            className="mt-2 flex min-h-[44px] items-center gap-3 text-white/80 hover:text-white"
          >
            <IconCalendar className="w-4 h-4 shrink-0 text-brand-400" />
            Book an appointment
          </a>
        </div>

        <div className="text-[13px]">
          <p className="font-semibold text-white">Office Hours</p>
          <dl className="mt-3 space-y-1.5 text-white/80">
            {HOURS.map((h) => (
              <div key={h.days} className="flex gap-4">
                <dt className="w-24 shrink-0">{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={`${SHELL} mt-8 border-t border-white/10 pt-5 text-[12px] leading-relaxed text-white/60`}>
        Clear-aligner candidacy and treatment details are determined during an individual
        evaluation. Invisalign is a registered trademark of Align Technology, Inc.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky mobile CTA                                                   */
/* ------------------------------------------------------------------ */

function StickyMobileCta() {
  const [shown, setShown] = useState(false);
  const cta = useCtaProps('sticky_mobile');

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-slate-200 bg-white/95 px-4 pb-4 pt-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href={VIRTUAL_CONSULT_URL}
        target="_blank"
        rel="noopener"
        {...cta('Sticky — Request Consultation')}
        className="flex-1 rounded-lg bg-brand-600 px-4 py-3.5 text-center text-sm font-semibold text-white"
      >
        Request Consultation
      </a>
      <a
        href={PHONE_HREF}
        aria-label={`Call Willow Street Dental at ${PHONE_DISPLAY}`}
        {...cta('Sticky — Call')}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-200 text-brand-700"
      >
        <IconPhone className="w-5 h-5" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  useConversionTracking();

  return (
    <div className="min-h-screen bg-white">
      <a href="#main" className="skip-link rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Benefits />
        <Candidacy />
        <Journey />
        <DoctorAndConsult />
        <WhyLocal />
        <Reviews />
        <Cost />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <StickyMobileCta />
    </div>
  );
}
