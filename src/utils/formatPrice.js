const numberFormatter = new Intl.NumberFormat('fr-FR')

/**
 * Formats a price in Algerian Dinar, e.g. 850 -> "850 DA".
 * Always use this helper so prices stay consistent across the app.
 */
export function formatPrice(value, currency = 'DA') {
  const amount = Number.isFinite(Number(value)) ? Math.round(Number(value)) : 0
  return `${numberFormatter.format(amount)} ${currency}`
}
