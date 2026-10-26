import { getExtraById, getSauceById, getSizeLabel } from './catalog'

export const uniqueIds = (ids = []) => [...new Set(ids.filter(Boolean))]

/**
 * Unit price for one product with the selected options.
 * basePrice + size difference + paid sauces + extras + combo difference.
 */
export function calculateUnitPrice(product, selection = {}) {
  if (!product) return 0

  let total = Number(product.basePrice) || 0
  const size = getSizeLabel(product, selection.sizeId)
  total += Number(size?.priceDiff) || 0

  for (const sauceId of uniqueIds(selection.sauceIds)) {
    total += Number(getSauceById(sauceId)?.price) || 0
  }

  for (const extraId of uniqueIds(selection.extraIds)) {
    total += Number(getExtraById(extraId)?.price) || 0
  }

  if (product.comboAvailable && selection.combo) {
    total += Number(product.comboPriceDifference) || 0
  }

  return total
}

export function calculateLineTotal(item) {
  if (!item) return 0
  const unitPrice = Number(item.unitPrice) || 0
  const quantity = Number(item.quantity) || 0
  return unitPrice * quantity
}

/**
 * A deterministic key so identical configurations stack in the cart.
 */
export function buildSelectionKey(productId, selection = {}) {
  const parts = [
    productId,
    selection.sizeId || 'default',
    [...uniqueIds(selection.sauceIds)].sort().join(','),
    [...uniqueIds(selection.extraIds)].sort().join(','),
    [...(selection.removedIngredients || [])].sort().join(','),
    selection.combo ? 'combo' : 'single',
    (selection.instructions || '').trim().toLowerCase(),
  ]
  return parts.join('|')
}

export function getSelectionSummary(product, item) {
  const summary = []
  const size = getSizeLabel(product, item.sizeId)
  if (size && product.sizes.length > 1) summary.push(size.name)

  const sauceNames = (item.sauceIds || [])
    .map((id) => getSauceById(id)?.name)
    .filter(Boolean)
  if (sauceNames.length) summary.push(`Sauces : ${sauceNames.join(', ')}`)

  const extraNames = (item.extraIds || [])
    .map((id) => getExtraById(id)?.name)
    .filter(Boolean)
  if (extraNames.length) summary.push(`Extras : ${extraNames.join(', ')}`)

  if (item.removedIngredients?.length) {
    summary.push(`Sans : ${item.removedIngredients.join(', ')}`)
  }

  if (item.combo) summary.push('En menu (frites + boisson)')

  return summary
}
