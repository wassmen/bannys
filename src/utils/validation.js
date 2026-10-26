export function normalizePhone(value = '') {
  return String(value).replace(/[\s.\-()]/g, '')
}

/**
 * Algerian mobile numbers: 05, 06 or 07 followed by 8 digits.
 */
export function isValidAlgerianPhone(value = '') {
  return /^0[567]\d{8}$/.test(normalizePhone(value))
}

export function validateCheckout(form, { orderType, subtotal, minOrder }) {
  const errors = {}

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'nameError'
  }

  if (!form.phone || !form.phone.trim()) {
    errors.phone = 'phoneRequired'
  } else if (!isValidAlgerianPhone(form.phone)) {
    errors.phone = 'phoneError'
  }

  if (orderType === 'delivery') {
    if (!form.zone) errors.zone = 'zoneError'
    if (!form.address || form.address.trim().length < 5) errors.address = 'addressError'
    if (subtotal < Number(minOrder || 0)) errors.order = 'minOrderError'
  }

  return errors
}
