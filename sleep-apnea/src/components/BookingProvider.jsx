import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { BookingModal } from './BookingModal';
import { track, EVENTS } from '../lib/analytics';

/**
 * Booking is a page-level concern: any CTA anywhere can open it, and the
 * primary CTA must never cause a page reload (spec 04/38).
 *
 * Swap `openBooking` for a redirect to a third-party scheduler if the practice
 * uses one — the CTA contract stays identical.
 */
const BookingContext = createContext({ openBooking: () => {}, closeBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [openedFrom, setOpenedFrom] = useState(null);

  const openBooking = useCallback((location = 'unspecified') => {
    setOpenedFrom(location);
    track(EVENTS.BOOKING_START, { cta_location: location });
  }, []);

  const closeBooking = useCallback(() => setOpenedFrom(null), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {openedFrom && <BookingModal onClose={closeBooking} location={openedFrom} />}
    </BookingContext.Provider>
  );
}
