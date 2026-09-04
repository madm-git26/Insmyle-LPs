import { useEffect, useMemo, useRef } from 'react';
import { BookingProvider } from './components/BookingProvider';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SymptomSection } from './components/SymptomSection';
import { AirwaySection } from './components/AirwaySection';
import { EducationSection } from './components/EducationSection';
import { WhyItMattersSection } from './components/WhyItMattersSection';
import { TreatmentSection } from './components/TreatmentSection';
import { TreatmentSteps } from './components/TreatmentSteps';
import { PatientJourney } from './components/PatientJourney';
import { CandidateSection } from './components/CandidateSection';
import { CPAPSection } from './components/CPAPSection';
import { ProviderSection } from './components/ProviderSection';
import { TechnologySection } from './components/TechnologySection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { LocalSEOSection } from './components/LocalSEOSection';
import { TrustBand } from './components/TrustBand';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { StructuredData } from './components/StructuredData';
import { resolveAdGroup } from './content/adGroups';
import { captureAttribution } from './lib/utm';
import { initScrollDepth } from './lib/analytics';
import { meta } from './content/copy';
import { fill } from './content/practice';

/**
 * SleepApneaLandingPage — section order follows spec 43.
 *
 * The first ~35% of the page (hero → symptoms → airway) is the
 * conversion-focused block: the booking CTA appears three times before any
 * long-form explanation begins (spec 39).
 */
export default function App() {
  const heroRef = useRef(null);
  const finalRef = useRef(null);

  // Ad-group message match is resolved once, on load (spec 40).
  const variant = useMemo(() => resolveAdGroup(), []);

  useEffect(() => {
    captureAttribution();
    document.title = fill(meta.title);
    return initScrollDepth();
  }, []);

  return (
    <BookingProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />

      <main id="main">
        <HeroSection ref={heroRef} variant={variant} />
        <ProblemSection />
        <SymptomSection />
        <AirwaySection />
        <EducationSection />
        <WhyItMattersSection />
        <TreatmentSection />
        <TreatmentSteps />
        <PatientJourney />
        <CandidateSection />
        <CPAPSection />
        <ProviderSection />
        <TechnologySection />
        <Testimonials />
        <FAQSection />
        <LocalSEOSection />
        <TrustBand />
        <FinalCTA ref={finalRef} />
      </main>

      <Footer />
      <MobileStickyCTA heroRef={heroRef} finalRef={finalRef} />
      <StructuredData />
    </BookingProvider>
  );
}
