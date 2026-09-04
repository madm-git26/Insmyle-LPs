import { Button } from './ui/Button';
import { stickyCta } from '../content/copy';
import { practice } from '../content/practice';
import { useStickyCta } from '../hooks/useStickyCta';
import { useBooking } from './BookingProvider';

/**
 * Mandatory on the paid-traffic build (spec 29).
 * Hidden while either the hero CTA or the final CTA is on screen so it never
 * competes with the primary ask.
 */
export function MobileStickyCTA({ heroRef, finalRef }) {
  const visible = useStickyCta({ heroRef, finalRef });
  const { openBooking } = useBooking();

  return (
    <div
      className={`sticky-cta${visible ? ' is-visible' : ''}`}
      aria-hidden={!visible}
      inert={!visible ? '' : undefined}
    >
      <Button
        variant="secondary"
        href={practice.phone.href}
        icon="phone"
        location="sticky_bar"
        tabIndex={visible ? 0 : -1}
      >
        {stickyCta.call}
      </Button>
      <Button
        location="sticky_bar"
        onClick={() => openBooking('sticky_bar')}
        tabIndex={visible ? 0 : -1}
      >
        {stickyCta.book}
      </Button>
    </div>
  );
}
