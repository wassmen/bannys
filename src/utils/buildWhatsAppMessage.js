import { getExtraById, getProductById, getSauceById, getSizeLabel } from './catalog'
import { formatPrice } from './formatPrice'
import { calculateLineTotal } from './pricing'

function lineDetails(item) {
  const product = getProductById(item.productId)
  if (!product) return []

  const details = []
  const size = getSizeLabel(product, item.sizeId)
  if (size && product.sizes.length > 1) details.push(`Taille : ${size.name}`)

  const sauceNames = (item.sauceIds || [])
    .map((id) => getSauceById(id)?.name)
    .filter(Boolean)
  if (sauceNames.length) details.push(`Sauces : ${sauceNames.join(', ')}`)

  const extraNames = (item.extraIds || [])
    .map((id) => getExtraById(id)?.name)
    .filter(Boolean)
  if (extraNames.length) details.push(`Extras : ${extraNames.join(', ')}`)

  if (item.removedIngredients?.length) {
    details.push(`Sans : ${item.removedIngredients.join(', ')}`)
  }

  if (item.combo) details.push('En menu : frites + boisson')

  return details
}

/**
 * Builds a readable WhatsApp order summary and returns a wa.me link.
 * Product names/labels stay in French, which is what the restaurant uses.
 */
export function buildWhatsAppMessage({
  items = [],
  customer = {},
  orderType = 'delivery',
  payment,
  subtotal = 0,
  deliveryFee = 0,
  total = 0,
  config,
  orderNumber = '',
  notes = '',
}) {
  const isDelivery = orderType === 'delivery'
  const paymentLabel = payment || (isDelivery ? 'Espèces à la livraison' : 'Paiement au retrait')

  const itemLines = items.flatMap((item) => {
    const product = getProductById(item.productId)
    const name = product?.name || item.name || 'Produit'
    const details = lineDetails(item).map((detail) => `   • ${detail}`)
    const note = item.instructions?.trim() ? [`   • Note : ${item.instructions.trim()}`] : []
    return [
      `*${item.quantity}× ${name}* — ${formatPrice(calculateLineTotal(item), config?.currency)}`,
      ...details,
      ...note,
    ]
  })

  const addressLines = []
  if (isDelivery) {
    if (customer.zone) addressLines.push(`   • Quartier : ${customer.zone}`)
    if (customer.address) addressLines.push(`   • Adresse : ${customer.address}`)
  }

  const message = [
    "*NOUVELLE COMMANDE — BENNY'S*",
    orderNumber ? `_Commande ${orderNumber}_` : '',
    '━━━━━━━━━━━━━━━━',
    `*Client :* ${customer.name || ''}`,
    `*Téléphone :* ${customer.phone || ''}`,
    `*Type :* ${isDelivery ? 'Livraison' : 'Retrait sur place'}`,
    ...addressLines,
    notes?.trim() ? `*Notes :* ${notes.trim()}` : '',
    '━━━━━━━━━━━━━━━━',
    ...itemLines,
    '━━━━━━━━━━━━━━━━',
    `*Sous-total :* ${formatPrice(subtotal, config?.currency)}`,
    `*Livraison :* ${isDelivery ? (deliveryFee === 0 ? 'Offerte' : formatPrice(deliveryFee, config?.currency)) : 'Retrait sur place'}`,
    `*TOTAL :* ${formatPrice(total, config?.currency)}`,
    `*Paiement :* ${paymentLabel}`,
    '━━━━━━━━━━━━━━━━',
    'Merci et à très vite chez Benny\'s !',
  ]
    .filter(Boolean)
    .join('\n')

  const phone = String(config?.whatsappNumber || '').replace(/\D/g, '')
  return {
    message,
    url: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
  }
}
