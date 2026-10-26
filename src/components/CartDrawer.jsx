import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { config, getProductById } from '../utils/catalog'
import { calculateDeliveryFee } from '../utils/calculateTotal'
import { formatPrice } from '../utils/formatPrice'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import Icon from './Icon'
import ItemOptions from './ItemOptions'
import QuantitySelector from './QuantitySelector'

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    subtotal,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
  } = useCart()
  const { t, isRTL } = useLanguage()
  const reduceMotion = useReducedMotion()
  const drawerRef = useRef(null)
  const closeRef = useRef(null)
  const [confirmClear, setConfirmClear] = useState(false)

  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (!isOpen) {
      setConfirmClear(false)
      return undefined
    }

    const previousFocus = document.activeElement
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeCart()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusables = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [isOpen, closeCart])

  const deliveryFee = calculateDeliveryFee(subtotal, config)
  const total = subtotal + deliveryFee
  const freeDeliveryRemaining = Math.max(0, config.freeDeliveryThreshold - subtotal)
  const progress = Math.min(100, (subtotal / config.freeDeliveryThreshold) * 100)
  const offscreen = isRTL ? '-100%' : '100%'

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50" role="presentation">
          <motion.button
            type="button"
            aria-label={t('cart.close')}
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/60 backdrop-blur-[2px]"
          />

          <motion.aside
            ref={drawerRef}
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={reduceMotion ? false : { x: offscreen }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: offscreen }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 end-0 flex h-full w-full flex-col border-s-[3px] border-ink bg-cream shadow-2xl sm:max-w-[480px] sm:rounded-s-[2rem]"
          >
            <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink bg-white px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-brand text-cream">
                  <Icon name="cart" size={22} strokeWidth={2.5} />
                </span>
                <div>
                  <h2 id="cart-title" className="font-display text-2xl font-extrabold leading-none">
                    {t('cart.title')}
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-ink-soft">
                    {t('cart.items', { count: itemCount })}
                  </p>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label={t('cart.close')}
                className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-cream text-ink transition hover:bg-peach"
              >
                <Icon name="close" size={22} strokeWidth={2.8} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                <div className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-ink bg-peach shadow-retro">
                  <Icon name="bag" size={44} strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-display text-3xl font-extrabold">{t('cart.emptyTitle')}</h3>
                <p className="mt-2 max-w-xs text-sm text-ink-soft">{t('cart.emptyText')}</p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="retro-btn mt-6 bg-brand text-cream hover:bg-brand-dark"
                >
                  {t('cart.emptyCta')}
                  <Icon name="arrowRight" size={18} className="rtl:rotate-180" />
                </Link>
              </div>
            ) : (
              <>
                <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((item) => {
                        const product = getProductById(item.productId)
                        return (
                          <motion.li
                            key={item.key}
                            layout={!reduceMotion}
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                            className="flex gap-3 rounded-3xl border-[3px] border-ink bg-white p-3 shadow-retro-sm"
                          >
                            <Link
                              to={`/product/${item.productId}`}
                              onClick={closeCart}
                              className="shrink-0 self-start overflow-hidden rounded-2xl border-2 border-ink bg-cream"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                width={76}
                                height={76}
                                loading="lazy"
                                className="h-[76px] w-[76px] object-cover transition hover:scale-105"
                              />
                            </Link>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <Link
                                    to={`/product/${item.productId}`}
                                    onClick={closeCart}
                                    className="font-display text-base font-extrabold leading-tight text-ink hover:text-brand"
                                  >
                                    {item.name}
                                  </Link>
                                  <ItemOptions item={item} product={product} className="mt-1" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.key)}
                                  aria-label={t('cart.removeItem', { name: item.name })}
                                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition hover:bg-brand-soft hover:text-brand"
                                >
                                  <Icon name="trash" size={17} />
                                </button>
                              </div>

                              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                <QuantitySelector
                                  value={item.quantity}
                                  onChange={(quantity) => {
                                    if (quantity >= item.quantity) incrementItem(item.key)
                                    else decrementItem(item.key)
                                  }}
                                  compact
                                />
                                <span className="font-display text-base font-extrabold text-ink">
                                  {formatPrice(item.unitPrice * item.quantity, config.currency)}
                                </span>
                              </div>
                            </div>
                          </motion.li>
                        )
                      })}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-4 rounded-2xl border-2 border-dashed border-ink/20 bg-peach-soft p-3">
                    {freeDeliveryRemaining > 0 ? (
                      <p className="text-xs font-semibold text-ink">
                        {t('checkout.deliveryFeeNote', {
                          amount: formatPrice(config.freeDeliveryThreshold, config.currency),
                        })}
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                        <Icon name="checkCircle" size={15} className="text-brand" />
                        {t('common.freeDelivery')}
                      </p>
                    )}
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full border border-ink/20 bg-white">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
                    <span>{t('cart.minOrderNote', {
                      amount: formatPrice(config.minOrder, config.currency),
                      freeAmount: formatPrice(config.freeDeliveryThreshold, config.currency),
                    })}</span>
                    {items.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setConfirmClear(true)}
                        className="inline-flex items-center gap-1 font-semibold text-brand underline-offset-2 hover:underline"
                      >
                        <Icon name="trash" size={13} />
                        {t('cart.clearCart')}
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="border-t-[3px] border-ink bg-white px-4 py-4 safe-bottom sm:px-5">
                  {confirmClear ? (
                    <div className="mb-3 rounded-2xl border-[3px] border-brand bg-brand-soft/60 p-3">
                      <p className="font-display font-extrabold text-ink">{t('cart.confirmClear')}</p>
                      <p className="mt-1 text-xs text-ink-soft">{t('cart.confirmClearText')}</p>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            clearCart()
                            setConfirmClear(false)
                          }}
                          className="retro-btn min-h-10 flex-1 bg-brand px-3 py-1.5 text-sm text-cream"
                        >
                          {t('cart.confirm')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmClear(false)}
                          className="retro-btn min-h-10 flex-1 bg-cream px-3 py-1.5 text-sm"
                        >
                          {t('cart.cancel')}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <dl className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-ink-soft">{t('cart.itemTotal')}</dt>
                      <dd className="font-semibold">{formatPrice(subtotal, config.currency)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-ink-soft">{t('cart.deliveryFee')}</dt>
                      <dd className="font-semibold">
                        {deliveryFee === 0
                          ? t('cart.freeDelivery')
                          : formatPrice(deliveryFee, config.currency)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t-2 border-dashed border-ink/20 pt-2">
                      <dt className="font-display text-lg font-extrabold text-ink">{t('cart.total')}</dt>
                      <dd className="font-display text-xl font-extrabold text-brand">
                        {formatPrice(total, config.currency)}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="retro-btn mt-3 w-full bg-brand text-cream hover:bg-brand-dark"
                  >
                    {t('cart.checkout')}
                    <Icon name="arrowRight" size={19} className="rtl:rotate-180" />
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 flex min-h-10 w-full items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-brand"
                  >
                    <Icon name="arrowLeft" size={16} className="rtl:rotate-180" />
                    {t('cart.continueShopping')}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
