import { calculateLineTotal } from './pricing'

export function calculateSubtotal(items = []) {
  return items.reduce((total, item) => total + calculateLineTotal(item), 0)
}

export function calculateDeliveryFee(subtotal, config, orderType = 'delivery') {
  if (orderType === 'pickup') return 0
  if (!config) return 0
  if (subtotal >= Number(config.freeDeliveryThreshold || Infinity)) return 0
  return Number(config.deliveryFee) || 0
}

export function calculateTotal(items, config, orderType = 'delivery') {
  const subtotal = calculateSubtotal(items)
  const deliveryFee = calculateDeliveryFee(subtotal, config, orderType)
  return { subtotal, deliveryFee, total: subtotal + deliveryFee }
}

export function countItems(items = []) {
  return items.reduce((count, item) => count + (Number(item.quantity) || 0), 0)
}
