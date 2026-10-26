import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher({ className = '', small = false }) {
  const { language, setLanguage, languages, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`inline-flex items-center rounded-full border-[3px] border-ink bg-white p-0.5 ${className}`}
    >
      {languages.map((item) => {
        const active = item.code === language
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            aria-pressed={active}
            aria-label={item.name}
            title={item.name}
            className={`grid place-items-center rounded-full font-display font-extrabold transition ${
              small ? 'h-9 min-w-9 px-1.5 text-xs' : 'h-10 min-w-10 px-2 text-sm'
            } ${
              active
                ? 'bg-ink text-cream'
                : 'text-ink-soft hover:bg-peach hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
