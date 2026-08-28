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
  { label: 'Reviews', href: '#reviews' },
  { label: 'The Process', href: '#journey' },
  { label: 'Our Dentist', href: '#doctor' },
  { label: 'Contact', href: '#contact' },
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
              className="inline-flex min-h-[44px] items-center px-2 text-sm font-medium text-ink transition-colors hover:text-brand-600"
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

function DoctorAndConsult() {
  const { ref, style } = useReveal();
  const cta = useCtaProps('doctor_consult');

  return (
    <section id="doctor" ref={ref} className="bg-white py-14 md:py-20">
      <div className={SHELL}>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
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
              <BtnPrimary href={VIRTUAL_CONSULT_URL} {...cta('Consult panel — Request Your Virtual Consultation')}>
                Request Your Virtual Consultation
              </BtnPrimary>
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
        <Reviews />
        <Journey />
        <DoctorAndConsult />
        <FinalCta />
      </main>
      <Footer />
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <StickyMobileCta />
    </div>
  );
}
