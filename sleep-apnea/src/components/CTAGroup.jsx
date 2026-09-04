import { Button } from './ui/Button';
import { practice, fill } from '../content/practice';
import { useBooking } from './BookingProvider';

/**
 * The two-CTA cluster used in the hero, the final CTA and the mobile menu.
 * Level 1 and level 3 intensity both use this (spec 39).
 */
export function CTAGroup({ primaryLabel, secondaryLabel, location, invert = false, className = '' }) {
  const { openBooking } = useBooking();

  return (
    <div className={`cta-group ${className}`}>
      <Button
        variant={invert ? 'invert' : 'primary'}
        location={location}
        onClick={() => openBooking(location)}
      >
        {fill(primaryLabel)}
      </Button>

      {secondaryLabel && (
        <Button
          variant={invert ? 'ghost-invert' : 'secondary'}
          href={practice.phone.href}
          icon="phone"
          location={location}
        >
          {fill(secondaryLabel)}
        </Button>
      )}
    </div>
  );
}
