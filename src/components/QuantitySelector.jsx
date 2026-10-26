import Icon from './Icon'
import { useLanguage } from '../context/LanguageContext'

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  compact = false,
  className = '',
}) {
  const { t } = useLanguage()
  const buttonSize = compact ? 'h-10 w-10' : 'h-11 w-11'

  const decrease = () => onChange(Math.max(min, value - 1))
  const increase = () => onChange(Math.min(max, value + 1))

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border-[3px] border-ink bg-cream p-1 ${
        compact ? 'shadow-none' : 'shadow-retro-sm'
      } ${className}`}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label={t('cart.decrease')}
        className={`tap-target grid ${buttonSize} place-items-center rounded-full text-ink transition hover:bg-peach disabled:cursor-not-allowed disabled:opacity-35`}
      >
        <Icon name="minus" size={compact ? 16 : 18} strokeWidth={2.8} />
      </button>
      <span
        aria-live="polite"
        aria-label={`${t('common.quantity')}: ${value}`}
        className={`grid place-items-center font-display font-extrabold text-ink ${
          compact ? 'min-w-7 text-base' : 'min-w-9 text-lg'
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label={t('cart.increase')}
        className={`tap-target grid ${buttonSize} place-items-center rounded-full text-ink transition hover:bg-peach disabled:cursor-not-allowed disabled:opacity-35`}
      >
        <Icon name="plus" size={compact ? 16 : 18} strokeWidth={2.8} />
      </button>
    </div>
  )
}
