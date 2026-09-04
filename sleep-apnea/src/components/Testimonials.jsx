import { useRef, useState } from 'react';
import { Section, SectionIntro } from './ui/Section';
import { Icon } from './ui/Icon';
import { testimonials } from '../content/copy';
import { fill } from '../content/practice';

/**
 * One lead quote + two supporting quotes on desktop; a swipeable, keyboard
 * accessible carousel on mobile (spec 25).
 *
 * No autoplay: it is user-controlled by default, so there is no pause button
 * to get wrong and nothing moving while someone reads.
 *
 * PUBLISH RULE: only real, permissioned patient reviews go here.
 */
export function Testimonials() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    setIndex(i);
    const track = trackRef.current;
    const card = track?.children?.[i];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const [lead, ...rest] = testimonials.items;

  return (
    <Section tone="navy" aria-labelledby="testimonials-heading">
      <SectionIntro
        eyebrow={testimonials.eyebrow}
        heading={testimonials.heading}
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
        <figure className="card card--invert quote quote--lead" style={{ margin: 0 }}>
          <Icon className="quote__mark" name="quote" size={32} filled />
          <blockquote style={{ margin: 0 }}>
            <p>{fill(lead.quote)}</p>
          </blockquote>
          <figcaption className="quote__by">— {fill(lead.by)}</figcaption>
        </figure>

        <div className="testimonials__stack">
          {rest.map((item) => (
            <figure className="card card--invert quote" key={item.quote} style={{ margin: 0 }}>
              <Icon className="quote__mark" name="quote" size={24} filled />
              <blockquote style={{ margin: 0 }}>
                <p>{fill(item.quote)}</p>
              </blockquote>
              <figcaption className="quote__by">— {fill(item.by)}</figcaption>
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
    </Section>
  );
}
