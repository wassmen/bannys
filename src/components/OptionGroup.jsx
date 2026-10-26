import Icon from './Icon'
import { formatPrice } from '../utils/formatPrice'
import { useLanguage } from '../context/LanguageContext'

/**
 * Accessible radio/checkbox option group used for sizes, sauces, extras
 * and removable ingredients.
 */
export default function OptionGroup({
  title,
  hint,
  options = [],
  value,
  onChange,
  type = 'radio',
  name,
  columns = 'sm:grid-cols-2',
  emptyText,
  required = false,
}) {
  const { t } = useLanguage()

  if (!options.length) {
    return (
      <div>
        <h3 className="font-display text-xl font-extrabold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-ink-soft">{emptyText || t('common.noOptions')}</p>
      </div>
    )
  }

  const isChecked = (id) => (type === 'radio' ? value === id : (value || []).includes(id))

  const handleChange = (id) => {
    if (type === 'radio') {
      onChange(id)
      return
    }
    const next = isChecked(id) ? (value || []).filter((item) => item !== id) : [...(value || []), id]
    onChange(next)
  }

  return (
    <fieldset>
      <legend className="flex w-full flex-wrap items-baseline justify-between gap-2">
        <span className="font-display text-xl font-extrabold text-ink">
          {title}
          {required ? <span className="ms-1 text-brand">*</span> : null}
        </span>
        {hint ? <span className="text-xs font-medium text-ink-soft">{hint}</span> : null}
      </legend>

      <div className={`mt-3 grid gap-2.5 ${columns}`}>
        {options.map((option) => {
          const checked = isChecked(option.id)
          const price = Number(option.price ?? option.priceDiff ?? 0)

          return (
            <label
              key={option.id}
              className={`group flex min-h-[52px] cursor-pointer items-center gap-3 rounded-2xl border-[3px] p-3 transition ${
                checked
                  ? 'border-brand bg-brand-soft/70 shadow-retro-sm'
                  : 'border-ink/15 bg-white hover:border-ink/40'
              }`}
            >
              <input
                type={type}
                name={name || title}
                value={option.id}
                checked={checked}
                onChange={() => handleChange(option.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid h-6 w-6 shrink-0 place-items-center border-[3px] border-ink bg-white transition ${
                  type === 'radio' ? 'rounded-full' : 'rounded-md'
                } ${checked ? 'bg-brand text-cream' : 'text-transparent'}`}
              >
                {type === 'radio' ? (
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${checked ? 'bg-cream' : 'bg-transparent'}`}
                  />
                ) : (
                  <Icon name="check" size={15} strokeWidth={3} />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-display text-sm font-bold leading-tight text-ink sm:text-base">
                  {option.emoji ? <span aria-hidden="true">{option.emoji}</span> : null}
                  <span>{option.label}</span>
                </span>
                {option.sublabel ? (
                  <span className="mt-0.5 block text-xs leading-snug text-ink-soft">
                    {option.sublabel}
                  </span>
                ) : null}
              </span>

              <span
                className={`shrink-0 rounded-full border-2 px-2 py-0.5 text-[0.7rem] font-bold ${
                  price > 0
                    ? 'border-ink/20 bg-gold-soft text-ink'
                    : 'border-ink/10 bg-cream text-ink-soft'
                }`}
              >
                {price > 0 ? `+${formatPrice(price)}` : t('common.free')}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
