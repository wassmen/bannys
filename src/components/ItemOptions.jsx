import { useLanguage } from '../context/LanguageContext'
import { getExtraById, getSauceById, getSizeLabel } from '../utils/catalog'

/** Compact, localized summary of a cart line's chosen options. */
export default function ItemOptions({ item, product, className = '' }) {
  const { t } = useLanguage()
  if (!product) return null

  const size = getSizeLabel(product, item.sizeId)
  const sauceNames = (item.sauceIds || []).map((id) => getSauceById(id)?.name).filter(Boolean)
  const extraNames = (item.extraIds || []).map((id) => getExtraById(id)?.name).filter(Boolean)

  return (
    <ul className={`space-y-0.5 text-xs leading-relaxed text-ink-soft ${className}`}>
      {size && product.sizes.length > 1 ? (
        <li>
          <span className="font-semibold text-ink">{t('cart.size')} :</span> {size.name}
        </li>
      ) : null}
      {sauceNames.length ? (
        <li>
          <span className="font-semibold text-ink">{t('cart.sauces')} :</span>{' '}
          {sauceNames.join(', ')}
        </li>
      ) : null}
      {extraNames.length ? (
        <li>
          <span className="font-semibold text-ink">{t('cart.extras')} :</span>{' '}
          {extraNames.join(', ')}
        </li>
      ) : null}
      {item.removedIngredients?.length ? (
        <li>
          <span className="font-semibold text-ink">{t('cart.removed')} :</span>{' '}
          {item.removedIngredients.join(', ')}
        </li>
      ) : null}
      {item.combo ? (
        <li>
          <span className="font-semibold text-brand">{t('cart.combo')}</span> (+{' '}
          {product.comboPriceDifference} DA)
        </li>
      ) : null}
      {item.instructions ? (
        <li className="italic">
          <span className="font-semibold not-italic text-ink">{t('cart.notes')} :</span>{' '}
          {item.instructions}
        </li>
      ) : null}
    </ul>
  )
}
