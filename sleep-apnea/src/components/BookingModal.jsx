import { useEffect, useRef } from 'react';
import { BookingForm } from './BookingForm';
import { Icon } from './ui/Icon';
import { booking } from '../content/copy';
import { fill, practice } from '../content/practice';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

/** Accessible dialog: focus trap, Escape to close, background scroll locked. */
export function BookingModal({ onClose, location }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  useLockBodyScroll(true);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    dialogRef.current?.querySelector('input, button, select')?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div className="modal__head">
          <div>
            <h3 id="booking-title">{booking.title}</h3>
            <p className="small" style={{ marginTop: 'var(--space-2)' }}>
              {fill(booking.body).replace(practice.phone.display, practice.phone.display)}
            </p>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>
        <BookingForm location={location} />
      </div>
    </div>
  );
}
