import { cloneElement, isValidElement } from 'react';
import { useInView } from '../../hooks/useInView';

/**
 * One global reveal utility (spec 32). Wraps children in a div by default, or
 * decorates a single child element with `asChild` to avoid an extra node.
 */
export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  asChild = false,
  as: Tag = 'div',
  ...rest
}) {
  const [ref, inView] = useInView();
  const classes = [`reveal reveal--${variant}`, inView && 'is-visible', className]
    .filter(Boolean)
    .join(' ');
  const style = delay ? { '--reveal-delay': `${delay}ms` } : undefined;

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      className: [children.props.className, classes].filter(Boolean).join(' '),
      style: { ...children.props.style, ...style },
    });
  }

  return (
    <Tag ref={ref} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** Staggers a list of children by `step` ms (spec 15). */
export function RevealGroup({ children, step = 120, variant = 'fade-up', className = '' }) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={child.key ?? i} variant={variant} delay={i * step} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
