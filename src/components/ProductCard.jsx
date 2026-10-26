import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { config } from '../utils/catalog'
import { formatPrice } from '../utils/formatPrice'
import Icon from './Icon'

export default function ProductCard({ product, className = '' }) {
  const { t } = useLanguage()
  const { addItem, flyToCart } = useCart()
  const reduceMotion = useReducedMotion()

  const minPrice =
    product.sizes?.length > 0
      ? Math.min(...product.sizes.map((size) => product.basePrice + Number(size.priceDiff || 0)))
      : product.basePrice

  const handleQuickAdd = (event) => {
    addItem(product, {
      sizeId: product.sizes?.[0]?.id || null,
      sauceIds: [],
      extraIds: [],
      removedIngredients: [],
      combo: false,
      quantity: 1,
    })
    flyToCart({ x: event.clientX, y: event.clientY }, product.image)
  }

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-white shadow-retro ${className}`}
    >
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden border-b-[3px] border-ink bg-peach/60"
        aria-label={`${product.name} — ${t('common.viewMenu')}`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {product.bestSeller ? (
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-gold px-2.5 py-1 font-display text-[0.65rem] font-extrabold uppercase tracking-wide text-ink shadow-retro-sm">
              <Icon name="star" size={12} />
              {t('common.bestSeller')}
            </span>
          ) : (
            <span />
          )}
          {product.comboAvailable ? (
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-sky px-2 py-1 font-display text-[0.6rem] font-extrabold uppercase text-ink">
              <Icon name="utensils" size={11} />
              Menu
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-extrabold leading-tight text-ink">
            <Link to={`/product/${product.id}`} className="hover:text-brand">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            {product.sizes.length > 1 ? (
              <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-ink-soft">
                {t('common.from')}
              </span>
            ) : null}
            <span className="font-display text-xl font-extrabold text-brand">
              {formatPrice(minPrice, config.currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`${t('common.addToCart')} — ${product.name}`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-[3px] border-ink bg-brand px-3.5 py-2 font-display text-sm font-extrabold text-cream shadow-retro-sm transition hover:-translate-y-0.5 hover:bg-brand-dark active:translate-y-0"
          >
            <Icon name="plus" size={17} strokeWidth={3} />
            <span className="hidden min-[380px]:inline">{t('common.addShort')}</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
