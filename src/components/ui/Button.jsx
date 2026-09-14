import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'bg-secondary-container text-on-primary shadow-[0_4px_14px_rgba(253,118,26,0.3)] hover:opacity-95',
  secondary: 'bg-primary-container text-on-primary hover:opacity-90',
  ghost:
    'bg-transparent text-on-surface border border-outline-variant hover:bg-surface-container-low',
  subtle: 'bg-surface-container hover:bg-surface-container-high text-primary',
}

const SIZES = {
  md: 'h-11 px-space-lg text-label-lg',
  sm: 'h-10 px-space-md text-label-lg',
  lg: 'h-13 px-space-xl text-label-lg',
}

/**
 * Shared button/link primitive. Renders a <Link> when `to` is provided,
 * otherwise a native <button>, so call sites don't need to branch.
 */
export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-label-lg transition-all ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  const Component = as || 'button'
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
