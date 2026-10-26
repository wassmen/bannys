import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  className = '',
  light = false,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start'

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-[0.18em] shadow-retro-sm ${
            light ? 'bg-cream text-ink' : 'bg-sky-soft text-ink'
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-brand" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`text-balance font-display text-4xl font-extrabold leading-[0.98] sm:text-5xl lg:text-6xl ${
          light ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-4 max-w-xl text-pretty text-base leading-relaxed sm:text-lg ${
            light ? 'text-cream/80' : 'text-ink-soft'
          }`}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  )
}
