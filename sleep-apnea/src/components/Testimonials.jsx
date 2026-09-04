import { useRef, useState } from 'react';
import { Section, SectionIntro } from './ui/Section';
import { Icon } from './ui/Icon';
import { testimonials } from '../content/copy';

/**
 * Section 16 — one lead quote + two supporting quotes on desktop; a swipeable,
 * keyboard accessible carousel on mobile (spec 25).
 *
 * No autoplay: user-controlled by default, so nothing moves while someone reads
 * and there is no pause button to get wrong.
 *
 * PUBLISH RULE: the quotes below are bracketed placeholders. Replace them with
 * verified, permissioned patient testimonials or delete the section — never
 * publish invented reviews.
 */
export function Testimonials() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    setIndex(i);
    trackRef.current?.children?.[i]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const [lead, ...rest] = testimonials.items;

  return (
    <Section tone="navy" aria-labelledby="testimonials-heading">
      <SectionIntro
        center
        eyebrow={testimonials.eyebrow}
        heading={testimonials.heading}
        body={testimonials.body}
        headingId="testimonials-heading"
      />

      <div
        className="testimonials__grid"
        ref={trackRef}
        onScroll={(e) => {
          const { scrollLeft, clientWidth } = e.currentTarget;
          setIndex(Math.round(scrollLeft / (clientWidth * 0.9)));
        }}
      >
        <figure className="card card--invert quote quote--lead">
          <Icon className="quote__mark" name="quote" size={32} filled />
          <blockquote><p>{lead.quote}</p></blockquote>
          <figcaption className="quote__by">— {lead.by}</figcaption>
        </figure>

        <div className="testimonials__stack">
          {rest.map((item) => (
            <figure className="card card--invert quote" key={item.quote}>
              <Icon className="quote__mark" name="quote" size={24} filled />
              <blockquote><p>{item.quote}</p></blockquote>
              <figcaption className="quote__by">— {item.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="testimonials__controls">
        {testimonials.items.map((item, i) => (
          <button
            key={item.quote}
            type="button"
            className="dot-btn"
            aria-current={i === index}
            aria-label={`Show testimonial ${i + 1} of ${testimonials.items.length}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <p className="testimonials__microcopy">{testimonials.microcopy}</p>
    </Section>
  );
}
