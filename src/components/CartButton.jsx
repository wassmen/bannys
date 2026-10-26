import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../utils/formatPrice'
import Icon from './Icon'

export default function CartButton({ variant = 'navbar', className = '' }) {
  const { itemCount, subtotal, openCart } = useCart()
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  if (variant === 'floating') {
    return (
      <motion.button
        type="button"
        onClick={openCart}
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
        whileHover={reduceMotion ? undefined : { y: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        aria-label={`${t('common.viewCart')} — ${t('common.inCart', { count: itemCount })}`}
        className={`fixed bottom-5 end-5 z-40 flex min-h-14 items-center gap-2.5 rounded-full border-[3px] border-ink bg-brand px-5 py-3 font-display font-extrabold text-cream shadow-retro transition hover:bg-brand-dark sm:bottom-6 sm:end-6 ${className}`}
      >
        <Icon name="cart" size={22} strokeWidth={2.6} />
        <span className="relative">
          {itemCount}
          <span className="sr-only"> {t('nav.cart')}</span>
        </span>
        <span className="hidden text-sm font-bold sm:inline">{formatPrice(subtotal)}</span>
      </motion.button>
    )
  }

  return (
    <button
      type="button"
      onClick={openCart}
      data-cart-target="true"
      aria-label={`${t('nav.cart')} — ${t('common.inCart', { count: itemCount })}`}
      className={`relative inline-flex min-h-11 items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-3 py-2 font-display text-sm font-extrabold text-ink shadow-retro-sm transition hover:-translate-y-0.5 hover:bg-peach ${className}`}
    >
      <Icon name="cart" size={21} strokeWidth={2.5} />
      <span className="hidden md:inline">{t('nav.cart')}</span>
      {itemCount > 0 ? (
        <motion.span
          key={itemCount}
          initial={reduceMotion ? false : { scale: 0.5, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 16 }}
          className="absolute -end-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-ink bg-brand px-1 text-[0.7rem] font-bold leading-none text-cream"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.span>
      ) : null}
    </button>
  )
}
