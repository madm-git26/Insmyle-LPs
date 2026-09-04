import { useEffect, useState } from 'react';
import { Logo } from './ui/Logo';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { nav } from '../content/copy';
import { practice } from '../content/practice';
import { useStickyHeader } from '../hooks/useStickyHeader';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { useBooking } from './BookingProvider';
import { track, EVENTS } from '../lib/analytics';

/** Transparent over the hero, solid after 80px (spec 06). */
export function Header() {
  const stuck = useStickyHeader(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}`}>
        <div className="container header__bar">
          <Logo />

          <nav className="header__nav" aria-label="Primary">
            {nav.links.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div className="header__actions">
            <a
              className="header__phone"
              href={practice.phone.href}
              onClick={() => track(EVENTS.CALL_CLICK, { cta_location: 'header' })}
            >
              <Icon name="phone" size={18} />
              {practice.phone.display}
            </a>
            <Button size="sm" location="header" onClick={() => openBooking('header')}>
              {nav.cta}
            </Button>
          </div>

          <button
            type="button"
            className="header__burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} title="Open menu" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__head">
            <Logo />
            <button type="button" className="modal__close" onClick={() => setMenuOpen(false)}>
              <Icon name="close" size={18} title="Close menu" />
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label="Mobile">
            {nav.links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu__actions">
            <Button
              block
              location="mobile_menu"
              onClick={() => {
                setMenuOpen(false);
                openBooking('mobile_menu');
              }}
            >
              {nav.cta}
            </Button>
            <Button variant="secondary" block href={practice.phone.href} icon="phone" location="mobile_menu">
              {practice.phone.display}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
