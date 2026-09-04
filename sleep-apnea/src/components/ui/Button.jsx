import { Icon } from './Icon';
import { track, EVENTS } from '../../lib/analytics';
import { withAttribution } from '../../lib/utm';

/**
 * The single CTA component (spec 04/38).
 * States: idle · hover · focus · active · disabled · loading · success.
 * Every click fires an analytics event tagged with its page location.
 */
export function Button({
  as,
  href,
  variant = 'primary',
  size,
  block = false,
  loading = false,
  success = false,
  disabled = false,
  icon,
  location = 'unspecified',
  event = EVENTS.CTA_CLICK,
  label,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button');
  const isCall = typeof href === 'string' && href.startsWith('tel:');
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    block && 'btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    track(isCall ? EVENTS.CALL_CLICK : event, {
      cta_location: location,
      cta_label: label || (typeof children === 'string' ? children : undefined),
    });
    onClick?.(e);
  };

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </>
  );

  if (Tag === 'a') {
    return (
      <a
        className={classes}
        href={withAttribution(href)}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        data-state={loading ? 'loading' : success ? 'success' : 'idle'}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      data-state={loading ? 'loading' : success ? 'success' : 'idle'}
      {...rest}
    >
      {content}
    </button>
  );
}
