const sizeMap = {
  xs: 36,
  sm: 44,
  md: 56,
  lg: 84,
  xl: 132,
  hero: 210,
}

/**
 * Brand logo. The PNG lives in /public/images/logo.png,
 * so it can be replaced without touching the components.
 */
export default function Logo({
  size = 'md',
  showName = false,
  className = '',
  nameClassName = '',
}) {
  const pixels = sizeMap[size] || sizeMap.md

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Benny's Fast Food"
        width={pixels}
        height={pixels}
        loading="eager"
        decoding="async"
        className="rounded-full border-[3px] border-ink bg-cream object-cover shadow-retro-sm"
        style={{ width: pixels, height: pixels }}
      />
      {showName ? (
        <span className={`flex flex-col leading-none ${nameClassName}`}>
          <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
            Benny&apos;s
          </span>
          <span className="mt-0.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.24em] text-brand">
            Fast Food
          </span>
        </span>
      ) : null}
    </span>
  )
}
