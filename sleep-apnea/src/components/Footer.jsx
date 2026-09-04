import { Logo } from './ui/Logo';
import { Icon } from './ui/Icon';
import { Button } from './ui/Button';
import { footer } from '../content/copy';
import { fill, practice } from '../content/practice';
import { useBooking } from './BookingProvider';

/** Section 23 — footer CTA, link columns and the medical disclaimer (spec 28). */
export function Footer() {
  const { openBooking } = useBooking();
  const { quickLinks, practice: practiceCol, hours, schedule } = footer.columns;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta">
          <h3>{footer.ctaHeading}</h3>
          <div className="cta-group">
            <Button variant="invert" href={practice.phone.href} icon="phone" location="footer">
              {fill(footer.ctaPhone)}
            </Button>
            <Button variant="ghost-invert" location="footer" onClick={() => openBooking('footer')}>
              {footer.ctaBook}
            </Button>
          </div>
        </div>

        <div className="footer__grid">
          <div>
            <Logo invert />
            <p className="footer__blurb">{footer.blurb}</p>
            <div className="footer__social">
              {practice.social.map((item) => (
                <a key={item.label} href={item.href} aria-label={item.label}>
                  <Icon name={item.icon} size={16} filled />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>{quickLinks.title}</h4>
            <ul>
              {quickLinks.links.map((link) => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{practiceCol.title}</h4>
            <ul>
              <li>
                <a href={practice.address.mapUrl}>
                  {practice.address.line1}
                  <br />
                  {practice.address.line2}
                  <br />
                  {practice.address.city}, {practice.address.state} {practice.address.zip}
                </a>
              </li>
              <li>
                <a href={practice.phone.href} className="footer__inline">
                  <Icon name="phone" size={15} /> {practice.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${practice.email}`} className="footer__inline">
                  <Icon name="mail" size={15} /> {practice.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>{hours.title}</h4>
            <ul>
              {practice.hours.map((row) => (
                <li key={row.days} className="footer__row">
                  <b>{row.days}</b>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{schedule.title}</h4>
            <p className="footer__blurb" style={{ marginTop: 0 }}>{schedule.body}</p>
            <Button variant="invert" size="sm" location="footer" onClick={() => openBooking('footer')}>
              {schedule.cta}
            </Button>
          </div>
        </div>

        <p className="footer__legal">{footer.legalNote}</p>

        <div className="footer__bottom">
          <span>{practice.legal.copyright}</span>
          <span className="footer__legal-links">
            {practice.legal.links.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
