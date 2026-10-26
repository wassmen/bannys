export function StripeDivider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`stripe-band h-5 w-full border-y-[3px] border-ink ${className}`}
    />
  )
}

export function FreckleDots({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 dot-grid opacity-40 ${className}`}
    />
  )
}

export function Sticker({ children, className = '', rotate = '-rotate-3' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-gold px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-ink shadow-retro-sm ${rotate} ${className}`}
    >
      {children}
    </span>
  )
}

export function Blob({ className = '', color = 'bg-peach' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-2xl ${color} opacity-60 ${className}`}
    />
  )
}
