import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { config, getProductById } from '../utils/catalog'
import { calculateDeliveryFee } from '../utils/calculateTotal'
import { buildWhatsAppMessage } from '../utils/buildWhatsAppMessage'
import { validateCheckout } from '../utils/validation'
import { formatPrice } from '../utils/formatPrice'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import ItemOptions from '../components/ItemOptions'
import SectionHeading from '../components/SectionHeading'

const initialForm = {
  name: '',
  phone: '',
  zone: '',
  address: '',
  notes: '',
}

export default function Checkout() {
  const { t } = useLanguage()
  const { items, subtotal, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [orderType, setOrderType] = useState('delivery')
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deliveryFee = calculateDeliveryFee(subtotal, config, orderType)
  const total = subtotal + deliveryFee
  const minOrderRemaining = Math.max(0, config.minOrder - subtotal)

  usePageMeta({
    title: t('seo.checkoutTitle'),
    description: t('seo.checkoutDescription'),
    image: '/images/logo.png',
  })

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleOrderTypeChange = (type) => {
    setOrderType(type)
    setErrors((current) => {
      if (type === 'pickup') {
        const next = { ...current }
        delete next.zone
        delete next.address
        delete next.order
        return next
      }
      return current
    })
  }

  const errorText = (key) =>
    t(`checkout.${errors[key]}`, {
      amount: formatPrice(config.minOrder, config.currency),
    })

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateCheckout(form, {
      orderType,
      subtotal,
      minOrder: config.minOrder,
    })
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => {
        document.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    const orderNumber = `B-${String(Date.now()).slice(-6)}`
    const payment =
      orderType === 'delivery' ? t('checkout.paymentCash') : t('checkout.paymentPickup')
    const { url, message } = buildWhatsAppMessage({
      items,
      customer: form,
      orderType,
      payment,
      subtotal,
      deliveryFee,
      total,
      config,
      orderNumber,
      notes: form.notes,
    })

    setIsSubmitting(true)
    window.open(url, '_blank', 'noopener,noreferrer')
    setConfirmation({
      orderNumber,
      url,
      message,
      name: form.name.trim(),
      total,
      orderType,
    })
    clearCart()
    setIsSubmitting(false)
  }

  if (confirmation) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col px-4 py-16 sm:px-6">
        <div className="retro-card overflow-hidden">
          <div className="border-b-[3px] border-ink bg-mint p-6 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-ink bg-cream text-brand shadow-retro-sm">
              <Icon name="checkCircle" size={40} strokeWidth={2.4} />
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-ink">
              {t('checkout.confirmationTitle')}
            </h1>
          </div>

          <div className="p-6 text-center sm:p-8">
            <p className="mx-auto max-w-lg text-pretty text-base leading-relaxed text-ink-soft">
              {t('checkout.confirmationText', { name: confirmation.name })}
            </p>

            <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-start">
              <div className="rounded-2xl border-2 border-ink/15 bg-cream p-3">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-ink-soft">
                  {t('checkout.confirmationOrder')}
                </dt>
                <dd className="font-display text-lg font-extrabold text-ink">
                  {confirmation.orderNumber}
                </dd>
              </div>
              <div className="rounded-2xl border-2 border-ink/15 bg-cream p-3">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-ink-soft">
                  {t('common.total')}
                </dt>
                <dd className="font-display text-lg font-extrabold text-brand">
                  {formatPrice(confirmation.total, config.currency)}
                </dd>
              </div>
              <div className="col-span-2 rounded-2xl border-2 border-ink/15 bg-cream p-3">
                <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-ink-soft">
                  {t('checkout.orderType')}
                </dt>
                <dd className="font-semibold text-ink">
                  {confirmation.orderType === 'delivery'
                    ? t('checkout.deliveryOption')
                    : t('checkout.pickupOption')}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-sm text-ink-soft">{t('checkout.confirmationHint')}</p>

            <a
              href={confirmation.url}
              target="_blank"
              rel="noreferrer"
              className="retro-btn mt-4 w-full bg-mint text-ink hover:bg-white"
            >
              <Icon name="whatsapp" size={20} strokeWidth={2.5} />
              {t('checkout.openWhatsApp')}
            </a>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                to="/menu"
                onClick={() => {
                  setConfirmation(null)
                  setForm(initialForm)
                  setErrors({})
                }}
                className="retro-btn flex-1 bg-brand text-cream hover:bg-brand-dark"
              >
                {t('checkout.newOrder')}
              </Link>
              <Link to="/" className="retro-btn flex-1 bg-white text-ink hover:bg-peach">
                {t('checkout.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-ink bg-peach shadow-retro">
          <Icon name="bag" size={44} strokeWidth={2.2} />
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">
          {t('checkout.emptyTitle')}
        </h1>
        <p className="mt-3 max-w-lg text-ink-soft">{t('checkout.emptyText')}</p>
        <Link to="/menu" className="retro-btn mt-7 bg-brand text-cream hover:bg-brand-dark">
          {t('cart.emptyCta')}
          <Icon name="arrowRight" size={18} strokeWidth={2.6} className="rtl:rotate-180" />
        </Link>
      </div>
    )
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pt-14">
      <SectionHeading
        eyebrow={t('checkout.eyebrow')}
        title={t('checkout.title')}
        text={t('checkout.subtitle')}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          noValidate
          className="retro-card overflow-hidden"
        >
          <div className="border-b-[3px] border-ink bg-sky-soft px-5 py-4">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
              <Icon name="users" size={20} strokeWidth={2.4} />
              {t('checkout.contactTitle')}
            </h2>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {hasErrors ? (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-2xl border-[3px] border-brand bg-brand-soft/70 p-3 text-sm font-semibold text-brand"
              >
                <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
                {t('checkout.requiredFields')}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-bold text-ink">
                  {t('checkout.name')} <span className="text-brand">*</span>
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder={t('checkout.namePlaceholder')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'checkout-name-error' : undefined}
                  className={`field ${errors.name ? 'field-error' : ''}`}
                />
                {errors.name ? (
                  <p id="checkout-name-error" className="mt-1 text-xs font-semibold text-brand">
                    {errorText('name')}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-bold text-ink">
                  {t('checkout.phone')} <span className="text-brand">*</span>
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={updateField('phone')}
                  placeholder={t('checkout.phonePlaceholder')}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? 'checkout-phone-error' : 'checkout-phone-hint'
                  }
                  className={`field ${errors.phone ? 'field-error' : ''}`}
                />
                {errors.phone ? (
                  <p id="checkout-phone-error" className="mt-1 text-xs font-semibold text-brand">
                    {errorText('phone')}
                  </p>
                ) : (
                  <p id="checkout-phone-hint" className="mt-1 text-xs text-ink-soft">
                    {t('checkout.phoneHint')}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 block text-sm font-bold text-ink">
                {t('checkout.deliveryTitle')}
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    value: 'delivery',
                    label: t('checkout.deliveryOption'),
                    time: t('checkout.deliveryTime'),
                    icon: 'truck',
                  },
                  {
                    value: 'pickup',
                    label: t('checkout.pickupOption'),
                    time: t('checkout.pickupTime'),
                    icon: 'bag',
                  },
                ].map((option) => {
                  const checked = orderType === option.value
                  return (
                    <label
                      key={option.value}
                      className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-[3px] p-3 transition ${
                        checked
                          ? 'border-brand bg-brand-soft/70 shadow-retro-sm'
                          : 'border-ink/15 bg-white hover:border-ink/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value={option.value}
                        checked={checked}
                        onChange={() => handleOrderTypeChange(option.value)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink ${
                          checked ? 'bg-brand text-cream' : 'bg-cream text-ink'
                        }`}
                      >
                        <Icon name={option.icon} size={20} strokeWidth={2.4} />
                      </span>
                      <span>
                        <span className="block font-display font-extrabold text-ink">
                          {option.label}
                        </span>
                        <span className="text-xs font-semibold text-ink-soft">{option.time}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {orderType === 'delivery' ? (
              <div className="space-y-4 rounded-2xl border-[3px] border-ink/15 bg-cream/70 p-4">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                  <Icon name="pin" size={18} strokeWidth={2.4} />
                  {t('checkout.deliveryAddress')}
                </h3>

                <div>
                  <label
                    htmlFor="checkout-zone"
                    className="mb-1.5 block text-sm font-bold text-ink"
                  >
                    {t('checkout.zone')} <span className="text-brand">*</span>
                  </label>
                  <select
                    id="checkout-zone"
                    name="zone"
                    value={form.zone}
                    onChange={updateField('zone')}
                    aria-invalid={Boolean(errors.zone)}
                    aria-describedby={errors.zone ? 'checkout-zone-error' : undefined}
                    className={`field ${errors.zone ? 'field-error' : ''}`}
                  >
                    <option value="">{t('checkout.zonePlaceholder')}</option>
                    {config.deliveryZones.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                  {errors.zone ? (
                    <p id="checkout-zone-error" className="mt-1 text-xs font-semibold text-brand">
                      {errorText('zone')}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-1.5 block text-sm font-bold text-ink"
                  >
                    {t('checkout.address')} <span className="text-brand">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={updateField('address')}
                    placeholder={t('checkout.addressPlaceholder')}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                    className={`field ${errors.address ? 'field-error' : ''}`}
                  />
                  {errors.address ? (
                    <p
                      id="checkout-address-error"
                      className="mt-1 text-xs font-semibold text-brand"
                    >
                      {errorText('address')}
                    </p>
                  ) : null}
                </div>

                {minOrderRemaining > 0 ? (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border-2 border-brand/25 bg-brand-soft/60 p-2.5 text-xs font-semibold text-brand"
                  >
                    <Icon name="info" size={15} className="mt-0.5 shrink-0" />
                    {t('checkout.minOrderError', {
                      amount: formatPrice(config.minOrder, config.currency),
                    })}
                  </p>
                ) : null}

                <p className="text-xs text-ink-soft">
                  {t('checkout.deliveryFeeNote', {
                    amount: formatPrice(config.freeDeliveryThreshold, config.currency),
                  })}
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-2xl border-[3px] border-ink/15 bg-mint/20 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-mint">
                  <Icon name="bag" size={20} strokeWidth={2.4} />
                </span>
                <div>
                  <p className="font-display font-extrabold text-ink">
                    {t('checkout.pickupOption')}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-soft">{t('checkout.pickupNote')}</p>
                  <p className="mt-1 text-xs font-semibold text-ink">{config.address}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-bold text-ink">
                {t('checkout.notes')}
              </label>
              <textarea
                id="checkout-notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={updateField('notes')}
                placeholder={t('checkout.notesPlaceholder')}
                className="field resize-y"
              />
            </div>
          </div>
        </form>

        <aside className="retro-card overflow-hidden lg:sticky lg:top-24">
          <div className="border-b-[3px] border-ink bg-gold px-5 py-4">
            <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
              <Icon name="bag" size={20} strokeWidth={2.4} />
              {t('checkout.orderSummary')}
            </h2>
          </div>

          <div className="p-5">
            <ul className="max-h-[22rem] space-y-3 overflow-y-auto pe-1">
              {items.map((item) => {
                const product = getProductById(item.productId)
                return (
                  <li key={item.key} className="flex gap-3 border-b border-dashed border-ink/15 pb-3">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-cream">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute -end-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink bg-brand px-0.5 text-[0.65rem] font-bold text-cream">
                        {item.quantity}
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-extrabold leading-tight text-ink">
                        {item.name}
                      </p>
                      <ItemOptions item={item} product={product} className="mt-0.5" />
                    </div>
                    <span className="shrink-0 font-display text-sm font-extrabold text-ink">
                      {formatPrice(item.unitPrice * item.quantity, config.currency)}
                    </span>
                  </li>
                )
              })}
            </ul>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-ink-soft">{t('checkout.subtotalLabel')}</dt>
                <dd className="font-semibold">{formatPrice(subtotal, config.currency)}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-ink-soft">
                  {orderType === 'delivery'
                    ? t('checkout.deliveryLabel')
                    : t('checkout.pickupOption')}
                </dt>
                <dd className="font-semibold">
                  {orderType === 'pickup'
                    ? t('common.free')
                    : deliveryFee === 0
                      ? t('cart.freeDelivery')
                      : formatPrice(deliveryFee, config.currency)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-t-2 border-dashed border-ink/20 pt-2">
                <dt className="font-display text-lg font-extrabold text-ink">
                  {t('checkout.totalLabel')}
                </dt>
                <dd className="font-display text-2xl font-extrabold text-brand">
                  {formatPrice(total, config.currency)}
                </dd>
              </div>
            </dl>

            <div className="mt-3 rounded-xl border-2 border-ink/15 bg-cream p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                {t('checkout.payment')}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Icon name="card" size={16} />
                {orderType === 'delivery'
                  ? t('checkout.paymentCash')
                  : t('checkout.paymentPickup')}
              </p>
            </div>

            {errors.order ? (
              <p
                role="alert"
                className="mt-3 rounded-xl border-2 border-brand/25 bg-brand-soft/60 p-2.5 text-xs font-semibold text-brand"
              >
                {errorText('order')}
              </p>
            ) : null}

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="retro-btn mt-4 w-full bg-brand text-cream hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon name="whatsapp" size={20} strokeWidth={2.5} />
              {isSubmitting ? t('checkout.submitting') : t('checkout.submit')}
            </button>
            <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-ink-soft">
              {t('checkout.summaryNote')}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
