import { useRef, useState } from 'react';
import { Section, SectionIntro } from './ui/Section';
import { Icon } from './ui/Icon';
import { faq } from '../content/copy';
import { track, EVENTS } from '../lib/analytics';

/**
 * Accordion (spec 26). Height animates 0 → content → 0, one panel open at a
 * time on mobile, multiple allowed on desktop. Buttons, not divs, so keyboard
 * and screen-reader behaviour is correct for free.
 */
export function FAQSection() {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (i, question) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (isMobile) next.clear();
        next.add(i);
        track(EVENTS.FAQ_OPEN, { faq_question: question });
      }
      return next;
    });
  };

  return (
    <Section id={faq.id} aria-labelledby="faq-heading">
      <SectionIntro center eyebrow={faq.eyebrow} heading={faq.heading} headingId="faq-heading" />
      <div className="accordion">
        {faq.items.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            index={i}
            isOpen={open.has(i)}
            onToggle={() => toggle(i, item.q)}
          />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ item, index, isOpen, onToggle }) {
  const panelRef = useRef(null);

  return (
    <div className="accordion__item" data-state={isOpen ? 'open' : 'closed'}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          className="accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          onClick={onToggle}
        >
          {item.q}
          <Icon className="accordion__icon" name="chevron" size={22} />
        </button>
      </h3>
      <div
        className="accordion__panel"
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        ref={panelRef}
        style={{
          height: isOpen ? panelRef.current?.scrollHeight ?? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        hidden={!isOpen ? undefined : undefined}
      >
        <p className="accordion__answer">{item.a}</p>
      </div>
    </div>
  );
}
