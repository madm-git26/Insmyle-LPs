import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode, RefObject } from 'react';

const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

const SECTION3_IMG1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';

const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';

const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

const PHONE_DISPLAY = '(715) 723-5688';
const PHONE_HREF = 'tel:+17157235688';
const BOOKING_URL = 'https://book.allinone.dental/willow-street';
const VIRTUAL_CONSULT_URL = 'https://www.willowstreetdental.com/virtual-consult/';

const featureBars = ['Free Virtual Consultation', 'In Network With Delta Dental', 'Local Chippewa Falls Care'];

const services = [
  { name: 'Clear\nAligners', num: '01', active: true },
  { name: 'Dental\nImplants', num: '02', active: false },
  { name: 'Smile\nMakeovers', num: '03', active: false },
  { name: 'Crowns &\nFillings', num: null, active: false },
];

const navLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'Process', href: '#process' },
  { label: 'Our Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

const benefits = [
  {
    title: 'A More Discreet Way\nto Straighten Teeth',
    body: 'Clear aligners are designed to be virtually invisible when worn, so they tend to blend in with your natural smile. Many patients like that they can work toward their smile goals without the more noticeable look of metal brackets and wires.',
  },
  {
    title: 'Comfortable,\nCustom-Fitted Trays',
    body: 'Because each set of aligners is custom-made for your teeth, they are designed to fit closely and comfortably. As with any new dental appliance, it can take a little time to adjust to wearing a new set.',
  },
  {
    title: 'Removable for\nEating and Drinking',
    body: 'Clear aligners can be taken out, so you are not restricted from the foods you enjoy the way you might be with fixed braces. Most patients remove them to eat and to drink anything other than water.',
  },
  {
    title: 'Easier\nOral Hygiene',
    body: 'Because clear aligners come out, brushing and flossing can be more straightforward than navigating around brackets and wires. Removing your aligners for regular oral care can help you keep up with your normal routine.',
  },
  {
    title: 'A Personalized\nTreatment Plan',
    body: 'Your clear aligner plan is built around your own teeth and smile goals. Digital scans and imaging are used to map out how your teeth may move over the course of treatment, so your plan is designed specifically for you.',
  },
  {
    title: 'A Convenient Path to\nExploring Your Options',
    body: 'You do not have to commit to anything to start learning more. A consultation — including a free virtual consultation — gives you a low-pressure way to ask questions and find out whether clear aligners may be a good fit.',
  },
];

const whyUs = [
  {
    title: 'Local Care in Chippewa Falls',
    body: 'Willow Street Dental is located at 123 W. Willow Street, Chippewa Falls, WI 54729, offering dental care to patients throughout the local community.',
  },
  {
    title: 'The Dental Team',
    body: 'Care is led by Dr. Curtis Calder, D.D.S., supported by a team that includes experienced staff such as dental hygienist Gena, who has been part of the team for 16 years.',
  },
  {
    title: 'Doctor Education',
    body: 'Dr. Calder earned his Doctor of Dental Surgery degree from Creighton University School of Dentistry.',
  },
  {
    title: 'Personalized Recommendations',
    body: 'Rather than a one-size-fits-all approach, treatment recommendations are based on your own dental exam and digital scans, so any plan discussed with you is specific to your smile and goals.',
  },
  {
    title: 'Communication and Comfort',
    body: 'Dr. Calder describes his approach as combining modern dental technology with “a personal, down-to-earth approach,” with the goal of helping each patient feel comfortable in the dental chair.',
  },
  {
    title: 'Virtual Consultation Convenience',
    body: 'For patients who want to start exploring their options before visiting the office, Willow Street Dental offers a free virtual consultation that begins with a photo of your smile.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Request a\nConsultation',
    body: 'Request a free virtual consultation from home by submitting a photo of your smile, or call our Chippewa Falls office directly.',
  },
  {
    num: '02',
    title: 'Discuss Your\nSmile Goals',
    body: 'Let our team know what you would like to change about your smile. We follow up to schedule your personalized next step.',
  },
  {
    num: '03',
    title: 'Complete an\nEvaluation',
    body: 'To determine whether clear aligners may be appropriate, our team completes a comprehensive dental exam along with a digital scan of your teeth.',
  },
  {
    num: '04',
    title: 'Review Your\nPersonalized Plan',
    body: 'If clear aligners are a good fit, digital imaging helps map out a step-by-step plan. Your timeline and next steps are discussed with you directly.',
  },
];

const concerns = [
  'Crowded teeth',
  'Spacing between teeth',
  'Overbites, underbites, or crossbites',
  'Minor tooth rotations',
];

const team = [
  {
    initials: 'CC',
    name: 'Dr. Curtis Calder, D.D.S.',
    body: 'Dr. Curtis Calder earned his Doctor of Dental Surgery degree from Creighton University School of Dentistry. He offers a full range of dental care at Willow Street Dental — from everyday needs like cleanings, fillings, and crowns to more advanced procedures such as root canal therapy, dental implants, and smile makeovers.',
    quote:
      '“My goal is always the same: to help each patient feel confident in their smile and comfortable in the dental chair. My team and I are committed to treating every patient like family.”',
    note: '[INSERT VERIFIED INFORMATION for any additional credentials, specialty training, or professional memberships]',
  },
  {
    initials: 'G',
    name: 'Gena — Dental Hygienist',
    body: 'Gena has been part of the Willow Street Dental team for 16 years. She attended the University of Minnesota for dental hygiene and graduated in 1982, bringing years of hands-on experience to every patient visit.',
    quote: null,
    note: null,
  },
];

const reviews = [
  {
    quote: '“…best dental office I’ve ever visited. Doctor is incredibly knowledgeable and gentle…”',
    name: 'Jason R.',
  },
  { quote: '“…amazing experience…exceptional care…”', name: 'Sarah M.' },
  {
    quote: '“…exceeded all expectations…best dental care I’ve received…”',
    name: 'Emily C.',
  },
];

const costFactors = [
  'The complexity of your treatment',
  'Estimated treatment length',
  'The type of aligner treatment recommended',
  'Your existing dental needs',
  'Your insurance benefits',
  'Available payment or financing options',
];

const faqs = [
  {
    q: 'What are clear aligners?',
    a: 'Clear aligners are transparent, custom-made trays that fit over your teeth and are designed to gradually guide them into a straighter position, offering an alternative to traditional metal braces.',
  },
  {
    q: 'Is Invisalign available in Chippewa Falls?',
    a: 'Many patients searching for Invisalign in Chippewa Falls are really looking for a discreet way to straighten their smile. Willow Street Dental offers clear aligner treatment in Chippewa Falls, WI, and our team can talk with you about your specific options during a consultation.',
  },
  {
    q: 'Am I a candidate for clear aligners?',
    a: 'Clear aligners may help with mild to moderate concerns such as crowded or spaced teeth and certain bite issues, depending on your evaluation. An in-person or virtual consultation is needed to determine whether clear aligners are right for you.',
  },
  {
    q: 'How long does clear aligner treatment take?',
    a: 'Treatment length varies by patient. Most patients complete clear aligner treatment in about 6 to 18 months, though your specific timeline will be discussed as part of your evaluation.',
  },
  {
    q: 'Are clear aligners comfortable?',
    a: 'Clear aligners are custom-made to fit closely over your teeth. As with any orthodontic treatment, you may notice a short adjustment period with each new set. Our team can walk you through what to expect.',
  },
  {
    q: 'Can I remove clear aligners to eat and brush?',
    a: 'Yes. Clear aligners are removable, so you can take them out to eat, to drink anything other than water, and to brush and floss. Most patients wear their aligners for about 20 to 22 hours a day to stay on track with their plan.',
  },
  {
    q: 'How does the virtual consultation work?',
    a: 'You submit a photo of your smile and let us know what you would like to change. Our team then follows up to schedule your personalized virtual consultation. This option is free.',
  },
  {
    q: 'How much do clear aligners cost?',
    a: 'Cost depends on factors like treatment complexity, length, and your individual dental needs. Ask the Willow Street Dental team about current fees, insurance benefits, and available payment options.',
  },
];

interface Position {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

function useMaskPositions(
  sectionRef: RefObject<HTMLElement | null>,
  cardRefs: RefObject<(HTMLDivElement | null)[]>,
  count: number,
): Position[] {
  const [positions, setPositions] = useState<Position[]>(() =>
    Array.from({ length: count }, () => ({ x: 0, y: 0, sw: 0, sh: 0 })),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compute = () => {
      const sectionRect = section.getBoundingClientRect();
      const sw = sectionRect.width;
      const sh = sectionRect.height;

      setPositions(
        cardRefs.current.map((card) => {
          if (!card) return { x: 0, y: 0, sw, sh };
          const cardRect = card.getBoundingClientRect();
          return {
            x: cardRect.left - sectionRect.left,
            y: cardRect.top - sectionRect.top,
            sw,
            sh,
          };
        }),
      );
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(section);
    return () => ro.disconnect();
  }, [sectionRef, cardRefs, count]);

  return positions;
}

function useImageWidth(src: string, sectionHeight: number): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!src || !sectionHeight) return;

    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth * (sectionHeight / img.naturalHeight));
    };
    img.src = src;
  }, [src, sectionHeight]);

  return width;
}

function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, count]);

  const getAnimStyle = useCallback(
    (index: number): CSSProperties => ({
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
    }),
    [visible],
  );

  return { containerRef, getAnimStyle };
}

/* ------------------------------------------------------------------ */
/* MaskedCard                                                          */
/* ------------------------------------------------------------------ */

interface MaskedCardProps {
  bgImage: string;
  position: Position;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
}

function MaskedCard({
  bgImage,
  position,
  imageWidth,
  focalX,
  className,
  children,
  cardRef,
  style,
}: MaskedCardProps) {
  const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  const bgStyle: CSSProperties = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: `auto ${position.sh}px`,
    backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
    backgroundRepeat: 'no-repeat',
    ...style,
  };

  return (
    <div ref={cardRef} className={className} style={bgStyle}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Splash Screen                                                       */
/* ------------------------------------------------------------------ */

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCount(step);
      if (step >= 100) {
        clearInterval(interval);
        setTimeout(() => setExiting(true), 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timeout = setTimeout(onComplete, 700);
    return () => clearTimeout(timeout);
  }, [exiting, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">
        {count}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">
            Willow
          </span>
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2">
            Street
          </span>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2">
            dental &middot; chippewa falls, wi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="px-6 py-3 bg-white rounded-full border border-black text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
          >
            Book Online
          </a>
          <a href={PHONE_HREF} className="text-sm font-semibold text-black">
            {PHONE_DISPLAY}
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center relative"
        >
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>
      </nav>

      <div
        className="md:hidden fixed inset-0 z-40"
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms' }}
                className={`text-4xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div
              style={{ transitionDelay: menuOpen ? '450ms' : '0ms' }}
              className={`mt-8 pt-8 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <a href={PHONE_HREF} className="block text-sm font-semibold text-black mb-4">
                {PHONE_DISPLAY} &middot; Mon&ndash;Thu, 8am&ndash;5pm
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener"
                className="block text-center w-full px-6 py-4 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Section 1 - Hero                                                    */
/* ------------------------------------------------------------------ */

function Section1({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reveal = useStaggeredReveal(4);
  const positions = useMaskPositions(sectionRef, cardRefs, 4);
  const imageWidth = useImageWidth(HERO_IMAGE, positions[0].sh);
  const focalX = isMobile ? 0.7 : 0.8;

  return (
    <section
      id="hero"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      {featureBars.map((label, i) => (
        <MaskedCard
          key={label}
          cardRef={(el) => {
            cardRefs.current[i] = el;
          }}
          bgImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative"
          style={reveal.getAnimStyle(i)}
        >
          <span className="flex items-center justify-center h-full text-black text-lg md:text-3xl font-bold text-center relative z-10">
            {label}
          </span>
        </MaskedCard>
      ))}

      <MaskedCard
        cardRef={(el) => {
          cardRefs.current[3] = el;
        }}
        bgImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative"
        style={reveal.getAnimStyle(3)}
      >
        <p className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[200px] md:max-w-[300px] z-10">
          Modern dental technology with a personal,
          <br />
          down-to-earth approach
        </p>

        <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
          <h1 className="text-black">
            <span className="block text-xs md:text-sm font-semibold mb-1 md:mb-2">
              Invisalign &amp; Clear Aligners in Chippewa Falls, WI
            </span>
            <span className="block text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight">
              Clear
              <br />
              Aligners
            </span>
          </h1>
        </div>

        <a
          href={VIRTUAL_CONSULT_URL}
          target="_blank"
          rel="noopener"
          className="absolute bottom-6 right-4 md:bottom-10 md:right-8 text-white text-xs md:text-sm font-semibold z-10"
        >
          Free Virtual Consult
        </a>
      </MaskedCard>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 - Why Clear Aligners                                      */
/* ------------------------------------------------------------------ */

function Section2({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reveal = useStaggeredReveal(4);
  const positions = useMaskPositions(sectionRef, cardRefs, 4);
  const imageWidth = useImageWidth(SECTION2_IMAGE, positions[0].sh);
  const focalX = isMobile ? 0.65 : 0.8;

  return (
    <section
      id="aligners"
      ref={(el) => {
        sectionRef.current = el;
        reveal.containerRef.current = el;
      }}
      className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[0] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          style={reveal.getAnimStyle(0)}
        >
          <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">
            Why Clear Aligners
          </h3>
          <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
            Transparent, custom-made, removable
          </p>
        </MaskedCard>

        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[1] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          style={reveal.getAnimStyle(1)}
        >
          <p className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10">
            Wondering if clear aligners fit your smile?
            <br />
            Call our Chippewa Falls team to ask.
          </p>
          <a
            href={PHONE_HREF}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform"
          >
            Call Us
          </a>
        </MaskedCard>

        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[2] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0"
          style={reveal.getAnimStyle(2)}
        >
          <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] z-10">
            Removable
            <br />
            &amp; clear
          </h3>
        </MaskedCard>

        <MaskedCard
          cardRef={(el) => {
            cardRefs.current[3] = el;
          }}
          bgImage={SECTION2_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] md:min-h-0"
          style={reveal.getAnimStyle(3)}
        >
          <div className="absolute inset-0 z-10 flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 p-2 md:p-3">
            {services.map((svc) => (
              <div
                key={svc.name}
                className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                  svc.active ? 'bg-white/90 backdrop-blur-md' : 'bg-white/20 backdrop-blur-xl'
                }`}
              >
                <h3
                  className={`text-xl md:text-4xl font-bold leading-[1.05] whitespace-pre-line ${
                    svc.active ? 'text-black' : 'text-white'
                  }`}
                >
                  {svc.name}
                </h3>
                {svc.num && (
                  <span
                    className={`self-end w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold ${
                      svc.active ? 'border-black text-black' : 'border-white text-white'
                    }`}
                  >
                    {svc.num}
                  </span>
                )}
              </div>
            ))}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 - Virtual Consults                                        */
/* ------------------------------------------------------------------ */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`rotate-[-45deg] ${className ?? ''}`}
    >
      <path
        d="M1 7h12m0 0L8 2m5 5L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section3() {
  const reveal = useStaggeredReveal(4);

  return (
    <section
      id="consult"
      ref={reveal.containerRef}
      className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div
            className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0"
            style={reveal.getAnimStyle(0)}
          >
            <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
              Virtual
              <br />
              Consults
            </h2>
            <p className="text-xs md:text-sm font-semibold text-black">
              Free &middot; Three simple steps
              <br />
              123 W. Willow Street, Chippewa Falls, WI 54729 &middot; {PHONE_DISPLAY}
            </p>
          </div>

          <div
            className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
            style={reveal.getAnimStyle(1)}
          >
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={SECTION3_IMG1}
                alt="Clear aligner tray"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={SECTION3_IMG2}
                alt="Clear aligner treatment at Willow Street Dental"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0"
            style={reveal.getAnimStyle(2)}
          >
            <div>
              <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                Step 01
              </p>
              <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                Submit
                <br />
                a Photo of
                <br />
                Your Smile
              </h3>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform"
            >
              Book Online
            </a>
          </div>
        </div>

        <div
          className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0"
          style={reveal.getAnimStyle(3)}
        >
          <img
            src={SECTION3_BG}
            alt="Smiling clear aligner patient in Chippewa Falls, WI"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
            <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                Tell Us What
                <br />
                You&rsquo;d Like to
                <br />
                Change
              </h4>
              <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center">
                <ArrowIcon />
              </div>
            </div>

            <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52">
              <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                We Contact
                <br />
                You to
                <br />
                Schedule
              </h4>
              <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center">
                <ArrowIcon className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared content-section primitives                                    */
/* ------------------------------------------------------------------ */

const SECTION_SHELL = 'w-full px-3 md:px-5 pt-1.5 md:pt-2 pb-1.5 md:pb-2';
const CARD = 'rounded-xl md:rounded-2xl overflow-hidden';

function SectionHeading({
  eyebrow,
  title,
  style,
}: {
  eyebrow: string;
  title: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={`${CARD} bg-stone-50 p-5 md:p-10`} style={style}>
      <span className="block text-black text-xs md:text-sm font-semibold mb-2 md:mb-4">
        {eyebrow}
      </span>
      <h2 className="text-black text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

function BenefitsSection() {
  const reveal = useStaggeredReveal(benefits.length + 1);

  return (
    <section
      id="benefits"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="Why Consider Clear Aligners?"
        title={
          <>
            Benefits
            <br />
            of aligners
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-2">
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className={`${CARD} bg-zinc-200 p-5 md:p-7 flex flex-col justify-between min-h-[210px] md:min-h-[280px]`}
            style={reveal.getAnimStyle(i + 1)}
          >
            <h3 className="text-black text-xl md:text-2xl font-bold leading-[1.05] whitespace-pre-line mb-4">
              {b.title}
            </h3>
            <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why Willow Street Dental                                            */
/* ------------------------------------------------------------------ */

function WhyUsSection() {
  const reveal = useStaggeredReveal(whyUs.length + 2);

  return (
    <section
      id="why"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="Why Choose Willow Street Dental for Clear Aligners?"
        title={
          <>
            Local care,
            <br />
            personal plans
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        {whyUs.map((w, i) => (
          <div
            key={w.title}
            className={`${CARD} bg-stone-50 p-5 md:p-7`}
            style={reveal.getAnimStyle(i + 1)}
          >
            <h3 className="text-black text-lg md:text-xl font-bold leading-tight mb-2">
              {w.title}
            </h3>
            <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5">
              {w.body}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`${CARD} bg-black p-5 md:p-7`}
        style={reveal.getAnimStyle(whyUs.length + 1)}
      >
        <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-2">
          What Makes the Practice Different
        </h3>
        <p className="text-white/80 text-xs md:text-sm font-medium leading-4 md:leading-5">
          Willow Street Dental offers a full range of dental care under one roof — from routine
          cleanings to more advanced procedures — with a team that says it is “committed to treating
          every patient like family.”
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

function ProcessSection() {
  const reveal = useStaggeredReveal(processSteps.length + 2);

  return (
    <section
      id="process"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="How the Clear Aligner Process Works"
        title={
          <>
            Four
            <br />
            simple steps
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 md:gap-2">
        {processSteps.map((s, i) => (
          <div
            key={s.num}
            className={`${CARD} bg-zinc-200 p-5 md:p-7 flex flex-col justify-between min-h-[200px] md:min-h-[300px]`}
            style={reveal.getAnimStyle(i + 1)}
          >
            <div>
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-black text-black text-xs md:text-sm font-semibold mb-4 md:mb-6">
                {s.num}
              </span>
              <h3 className="text-black text-xl md:text-2xl font-bold leading-[1.05] whitespace-pre-line">
                {s.title}
              </h3>
            </div>
            <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5 mt-4">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`${CARD} bg-black p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
        style={reveal.getAnimStyle(processSteps.length + 1)}
      >
        <p className="text-white text-lg md:text-2xl font-bold leading-tight">
          Ready to see if clear aligners fit your smile?
        </p>
        <a
          href={VIRTUAL_CONSULT_URL}
          target="_blank"
          rel="noopener"
          className="shrink-0 self-start md:self-auto px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform"
        >
          Request Your Virtual Consultation
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Candidacy + Invisalign vs clear aligners                            */
/* ------------------------------------------------------------------ */

function CandidacySection() {
  const reveal = useStaggeredReveal(3);

  return (
    <section
      id="candidacy"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2`}
    >
      <div
        className={`${CARD} bg-stone-50 p-5 md:p-10 flex flex-col justify-between`}
        style={reveal.getAnimStyle(0)}
      >
        <div>
          <span className="block text-black text-xs md:text-sm font-semibold mb-2 md:mb-4">
            Could Clear Aligners Be Right for You?
          </span>
          <h2 className="text-black text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight mb-6 md:mb-8">
            May help
            <br />
            with
          </h2>
        </div>
        <ul className="flex flex-col gap-2 md:gap-3">
          {concerns.map((c) => (
            <li
              key={c}
              className="text-black text-base md:text-xl font-bold border-t border-black/15 pt-2 md:pt-3"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1.5 md:gap-2">
        <div className={`${CARD} bg-black p-5 md:p-7`} style={reveal.getAnimStyle(1)}>
          <h3 className="text-white text-lg md:text-2xl font-bold leading-tight mb-2 md:mb-3">
            A consultation comes first
          </h3>
          <p className="text-white/80 text-xs md:text-sm font-medium leading-4 md:leading-5">
            Every smile is different, and clear aligners are not appropriate for every situation.
            Whether clear aligners may work for you depends on an in-person or virtual evaluation
            with our Chippewa Falls dental team. This page is not a diagnosis — a consultation is
            the best way to find out where you stand.
          </p>
        </div>

        <div
          id="compare"
          className={`${CARD} bg-zinc-200 p-5 md:p-7 flex-1`}
          style={reveal.getAnimStyle(2)}
        >
          <span className="block text-black text-xs md:text-sm font-semibold mb-2 md:mb-3">
            What Is the Difference Between Invisalign and Clear Aligners?
          </span>
          <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5 mb-3">
            “Invisalign” is a well-known brand name within the broader category of clear aligner
            treatment, which is why many patients search for “Invisalign” even when they are really
            looking for clear, removable aligners in general. “Clear aligners” is the broader term
            for this type of treatment.
          </p>
          <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5">
            Willow Street Dental’s Chippewa Falls service is described as clear aligner treatment.
            If you are interested in a particular brand, including Invisalign, ask our team during
            your consultation.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

function TeamSection() {
  const reveal = useStaggeredReveal(team.length + 1);

  return (
    <section
      id="team"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="Meet the Willow Street Dental Team"
        title={
          <>
            Meet
            <br />
            the team
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        {team.map((m, i) => (
          <div
            key={m.name}
            className={`${CARD} bg-zinc-200 p-5 md:p-7`}
            style={reveal.getAnimStyle(i + 1)}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black text-white text-base md:text-xl font-bold mb-4 md:mb-6">
              {m.initials}
            </span>
            <h3 className="text-black text-xl md:text-3xl font-bold leading-tight mb-3">
              {m.name}
            </h3>
            <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5">
              {m.body}
            </p>
            {m.quote && (
              <p className="text-black text-xs md:text-sm font-semibold italic leading-4 md:leading-5 mt-4 pl-4 border-l-2 border-black">
                {m.quote}
              </p>
            )}
            {m.note && (
              <p className="text-black/50 text-[10px] md:text-xs font-medium leading-3 md:leading-4 mt-4">
                {m.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

function ReviewsSection() {
  const reveal = useStaggeredReveal(reviews.length + 2);

  return (
    <section
      id="reviews"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="What Patients Say About Willow Street Dental"
        title={
          <>
            Patient
            <br />
            reviews
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 md:gap-2">
        {reviews.map((r, i) => (
          <div
            key={r.name}
            className={`${CARD} bg-stone-50 p-5 md:p-7 flex flex-col justify-between min-h-[190px] md:min-h-[260px]`}
            style={reveal.getAnimStyle(i + 1)}
          >
            <div>
              <span className="block text-black text-base md:text-lg tracking-[0.2em] mb-4">
                ★★★★★
              </span>
              <p className="text-black text-base md:text-xl font-bold leading-tight">{r.quote}</p>
            </div>
            <p className="text-black text-xs md:text-sm font-semibold mt-6 pt-3 border-t border-black/15">
              {r.name}
              <span className="block font-medium text-black/60">
                Willow Street Dental website
              </span>
            </p>
          </div>
        ))}
      </div>

      <p
        className="text-black/50 text-[10px] md:text-xs font-medium px-1"
        style={reveal.getAnimStyle(reviews.length + 1)}
      >
        Excerpts reflect review text as published on the Willow Street Dental website. No aggregate
        review count or overall star rating is stated, as that figure is not confirmed.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cost                                                                */
/* ------------------------------------------------------------------ */

function CostSection() {
  const reveal = useStaggeredReveal(2);

  return (
    <section
      id="cost"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2`}
    >
      <div className={`${CARD} bg-stone-50 p-5 md:p-10`} style={reveal.getAnimStyle(0)}>
        <span className="block text-black text-xs md:text-sm font-semibold mb-2 md:mb-4">
          Questions About Clear Aligner Costs?
        </span>
        <h2 className="text-black text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight mb-6">
          Cost
          <br />
          depends on
        </h2>
        <ul className="flex flex-col gap-2">
          {costFactors.map((f) => (
            <li
              key={f}
              className="text-black text-sm md:text-lg font-semibold border-t border-black/15 pt-2"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${CARD} bg-black p-5 md:p-10 flex flex-col justify-between`}
        style={reveal.getAnimStyle(1)}
      >
        <div>
          <h3 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3 md:mb-4">
            In network with
            <br />
            Delta Dental
          </h3>
          <p className="text-white/80 text-xs md:text-sm font-medium leading-4 md:leading-5">
            Ask the Willow Street Dental team about current fees, insurance benefits, and available
            payment options.
          </p>
        </div>
        <a
          href={PHONE_HREF}
          className="self-start mt-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform"
        >
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqSection() {
  const reveal = useStaggeredReveal(2);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <SectionHeading
        eyebrow="Clear Aligner FAQs"
        title={
          <>
            Common
            <br />
            questions
          </>
        }
        style={reveal.getAnimStyle(0)}
      />

      <div className={`${CARD} bg-zinc-200 px-5 md:px-10 py-2 md:py-4`} style={reveal.getAnimStyle(1)}>
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-black/15 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-6 py-4 md:py-6 text-left"
            >
              <span className="text-black text-base md:text-2xl font-bold leading-tight">
                {f.q}
              </span>
              <span className="relative shrink-0 w-5 h-5 md:w-6 md:h-6">
                <span className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-black rounded-full" />
                <span
                  className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-black rounded-full transition-all duration-300 ${
                    open === i ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                  }`}
                />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-black text-xs md:text-sm font-medium leading-4 md:leading-5 pb-5 md:pb-7 max-w-3xl">
                {f.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA + contact                                                 */
/* ------------------------------------------------------------------ */

function FinalCtaSection() {
  const reveal = useStaggeredReveal(2);

  return (
    <section
      id="contact"
      ref={reveal.containerRef}
      className={`${SECTION_SHELL} flex flex-col gap-1.5 md:gap-2`}
    >
      <div
        className={`${CARD} bg-black p-5 md:p-12 flex flex-col justify-between min-h-[420px] md:min-h-[520px]`}
        style={reveal.getAnimStyle(0)}
      >
        <div>
          <span className="block text-white/70 text-xs md:text-sm font-semibold mb-3 md:mb-5">
            Ready to Explore a Straighter Smile?
          </span>
          <h2 className="text-white text-[clamp(2.75rem,9vw,8rem)] font-bold leading-[0.85] tracking-tight">
            Start your
            <br />
            consult
          </h2>
        </div>

        <div className="mt-8 md:mt-10">
          <p className="text-white/80 text-xs md:text-sm font-medium leading-4 md:leading-5 max-w-xl mb-6">
            A conversation with our team — by phone, virtual consultation, or in person — is a
            simple, low-pressure way to find out what your options may look like. There is no
            obligation to start.
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            <a
              href={VIRTUAL_CONSULT_URL}
              target="_blank"
              rel="noopener"
              className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform"
            >
              Request Your Consultation
            </a>
            <a
              href={PHONE_HREF}
              className="px-5 py-3 md:px-8 md:py-5 bg-white/20 backdrop-blur-xl rounded-full text-white text-base md:text-xl font-bold hover:scale-105 transition-transform"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`${CARD} bg-stone-50 p-5 md:p-7 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2`}
        style={reveal.getAnimStyle(1)}
      >
        <div>
          <span className="block text-black text-xs md:text-sm font-semibold mb-2">Visit</span>
          <p className="text-black text-sm md:text-base font-bold leading-tight">
            Willow Street Dental
            <br />
            123 W. Willow Street
            <br />
            Chippewa Falls, WI 54729
          </p>
        </div>
        <div>
          <span className="block text-black text-xs md:text-sm font-semibold mb-2">Call</span>
          <a href={PHONE_HREF} className="text-black text-sm md:text-base font-bold leading-tight">
            {PHONE_DISPLAY}
          </a>
          <p className="text-black text-sm md:text-base font-bold leading-tight mt-2">
            Mon–Thu: 8am–5pm
            <br />
            Fri–Sun: Closed
          </p>
        </div>
        <div>
          <span className="block text-black text-xs md:text-sm font-semibold mb-2">Online</span>
          <a
            href={VIRTUAL_CONSULT_URL}
            target="_blank"
            rel="noopener"
            className="block text-black text-sm md:text-base font-bold leading-tight underline"
          >
            Free virtual consultation
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="block text-black text-sm md:text-base font-bold leading-tight underline mt-2"
          >
            Book an appointment
          </a>
        </div>
      </div>

      <p className="text-black/50 text-[10px] md:text-xs font-medium px-1">
        Clear-aligner candidacy and treatment details are determined during an individual
        evaluation.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="bg-white">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Navbar />
      <Section1 isMobile={isMobile} />
      <Section2 isMobile={isMobile} />
      <BenefitsSection />
      <WhyUsSection />
      <ProcessSection />
      <CandidacySection />
      <Section3 />
      <TeamSection />
      <ReviewsSection />
      <CostSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}

export default App;
