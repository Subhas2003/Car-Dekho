const STATUS_STYLES = {
  available: 'bg-surface-container text-primary',
  popular: 'bg-surface-container-highest text-primary',
  limited: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  value: 'bg-success-container text-on-success-container',
  booked: 'bg-surface-container-low text-on-surface-variant',
}

const DOT_STYLES = {
  available: 'bg-secondary-container',
  popular: 'bg-primary',
  limited: 'bg-secondary',
  value: 'bg-success',
  booked: 'bg-outline',
}

function statusKeyFromLabel(label) {
  const l = label.toLowerCase()
  if (l.includes('popular')) return 'popular'
  if (l.includes('limited')) return 'limited'
  if (l.includes('value')) return 'value'
  if (l.includes('booked')) return 'booked'
  return 'available'
}

export default function Badge({ label }) {
  const key = statusKeyFromLabel(label)
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-label-md px-3 py-1 rounded-full font-bold ${STATUS_STYLES[key]}`}
    >
      <span className={`w-2 h-2 rounded-full ${DOT_STYLES[key]}`} />
      {label}
    </span>
  )
}
