import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import {
  config,
  getCategoryById,
  getExtraById,
  getProductById,
  getRelatedProducts,
  getSauceById,
  ingredientEmoji,
} from '../utils/catalog'
import { calculateUnitPrice } from '../utils/pricing'
import { formatPrice } from '../utils/formatPrice'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import OptionGroup from '../components/OptionGroup'
import ProductCard from '../components/ProductCard'
import QuantitySelector from '../components/QuantitySelector'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { t, tCategory } = useLanguage()
  const { addItem, flyToCart, notify } = useCart()

  const [sizeId, setSizeId] = useState(null)
  const [sauceIds, setSauceIds] = useState([])
  const [extraIds, setExtraIds] = useState([])
  const [removedIngredients, setRemovedIngredients] = useState([])
  const [combo, setCombo] = useState(false)
  const [instructions, setInstructions] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setSizeId(product?.sizes?.[0]?.id ?? null)
    setSauceIds([])
    setExtraIds([])
    setRemovedIngredients([])
    setCombo(false)
    setInstructions('')
    setQuantity(1)
  }, [product])

  const sizeOptions = useMemo(
    () =>
      (product?.sizes || []).map((size) => ({
        id: size.id,
        label: size.name,
        price: size.priceDiff,
      })),
    [product],
  )

  const sauceOptions = useMemo(
    () =>
      (product?.sauceIds || [])
        .map((sauceId) => getSauceById(sauceId))
        .filter(Boolean)
        .map((sauce) => ({ id: sauce.id, label: sauce.name, price: sauce.price, emoji: sauce.emoji })),
    [product],
  )

  const extraOptions = useMemo(
    () =>
      (product?.extraIds || [])
        .map((extraId) => getExtraById(extraId))
        .filter(Boolean)
        .map((extra) => ({ id: extra.id, label: extra.name, price: extra.price, emoji: extra.emoji })),
    [product],
  )

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product],
  )

  const unitPrice = product
    ? calculateUnitPrice(product, {
        sizeId,
        sauceIds,
        extraIds,
        removedIngredients,
        combo,
      })
    : 0
  const total = unitPrice * quantity
  const category = product ? getCategoryById(product.category) : null

  usePageMeta({
    title: product
      ? t('seo.productTitle', { name: product.name })
      : t('product.notFoundTitle'),
    description: product
      ? t('seo.productDescription', {
          name: product.name,
          description: product.description,
        })
      : t('product.notFoundText'),
    image: product?.image || '/images/logo.png',
  })

  if (!product) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-ink bg-peach shadow-retro">
          <Icon name="alert" size={42} strokeWidth={2.2} />
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">
          {t('product.notFoundTitle')}
        </h1>
        <p className="mt-3 max-w-lg text-ink-soft">{t('product.notFoundText')}</p>
        <Link to="/menu" className="retro-btn mt-7 bg-brand text-cream hover:bg-brand-dark">
          <Icon name="arrowLeft" size={18} strokeWidth={2.6} className="rtl:rotate-180" />
          {t('product.backToMenu')}
        </Link>
      </div>
    )
  }

  const handleAddToCart = (event) => {
    addItem(product, {
      sizeId,
      sauceIds,
      extraIds,
      removedIngredients,
      combo,
      instructions,
      quantity,
    })
    flyToCart({ x: event.clientX, y: event.clientY }, product.image)
  }

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(window.location.href)
      notify(t('common.copied'), 'info')
    } catch {
      notify(t('common.copied'), 'info')
    }
  }

  const toggleRemovable = (ingredient) => {
    setRemovedIngredients((current) =>
      current.includes(ingredient)
        ? current.filter((item) => item !== ingredient)
        : [...current, ingredient],
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/menu"
          className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wide text-ink transition hover:text-brand"
        >
          <Icon name="arrowLeft" size={18} strokeWidth={2.6} className="rtl:rotate-180" />
          {t('product.backToMenu')}
        </Link>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 font-display text-sm font-extrabold text-ink shadow-retro-sm transition hover:bg-peach"
        >
          <Icon name="share" size={17} strokeWidth={2.4} />
          {t('common.share')}
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-ink bg-peach/60 shadow-retro">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
            {product.bestSeller ? (
              <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-gold px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-ink shadow-retro-sm">
                <Icon name="star" size={13} />
                {t('common.bestSeller')}
              </span>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-[3px] border-ink bg-white p-4 shadow-retro-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                <Icon name="utensils" size={18} strokeWidth={2.4} />
                {t('product.ingredients')}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="inline-flex items-center gap-1 rounded-full border-2 border-ink/15 bg-cream px-2 py-1 text-xs font-semibold text-ink"
                  >
                    <span aria-hidden="true">{ingredientEmoji(ingredient)}</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-[3px] border-ink bg-white p-4 shadow-retro-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                <Icon name="shield" size={18} strokeWidth={2.4} />
                {t('product.allergens')}
              </h2>
              {product.allergens?.length ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {product.allergens.map((allergen) => (
                    <li
                      key={allergen}
                      className="rounded-full border-2 border-brand/30 bg-brand-soft px-2 py-1 text-xs font-bold text-brand"
                    >
                      {allergen}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-soft">{t('product.noAllergens')}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <Link
                to={`/menu?category=${category.id}`}
                className="rounded-full border-2 border-ink bg-sky-soft px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-ink"
              >
                {tCategory(category)}
              </Link>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink/15 bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
              <Icon name="clock" size={14} />
              {t('product.prepTime')}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand">
              {formatPrice(unitPrice, config.currency)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t('product.liveTotal')}
            </span>
          </div>

          <div className="mt-6 space-y-6">
            <OptionGroup
              title={t('product.chooseSize')}
              options={sizeOptions}
              value={sizeId}
              onChange={setSizeId}
              type="radio"
              name="size"
              columns="sm:grid-cols-3"
            />

            {sauceOptions.length ? (
              <OptionGroup
                title={t('product.chooseSauces')}
                hint={t('product.saucesHint')}
                options={sauceOptions}
                value={sauceIds}
                onChange={setSauceIds}
                type="checkbox"
              />
            ) : (
              <p className="text-sm text-ink-soft">{t('product.noSauces')}</p>
            )}

            {extraOptions.length ? (
              <OptionGroup
                title={t('product.chooseExtras')}
                options={extraOptions}
                value={extraIds}
                onChange={setExtraIds}
                type="checkbox"
              />
            ) : (
              <p className="text-sm text-ink-soft">{t('product.noExtras')}</p>
            )}

            {product.removableIngredients?.length ? (
              <fieldset>
                <legend className="font-display text-xl font-extrabold text-ink">
                  {t('product.removeIngredients')}
                </legend>
                <p className="mt-1 text-xs font-medium text-ink-soft">{t('product.removeHint')}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.removableIngredients.map((ingredient) => {
                    const checked = removedIngredients.includes(ingredient)
                    return (
                      <label
                        key={ingredient}
                        className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-[3px] px-3 py-1.5 text-sm font-semibold transition ${
                          checked
                            ? 'border-brand bg-brand text-cream'
                            : 'border-ink/15 bg-white text-ink hover:border-ink/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRemovable(ingredient)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                            checked ? 'border-cream bg-cream text-brand' : 'border-ink/40'
                          }`}
                        >
                          {checked ? <Icon name="check" size={13} strokeWidth={3.4} /> : null}
                        </span>
                        {ingredient}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ) : (
              <p className="text-sm text-ink-soft">{t('product.noRemovables')}</p>
            )}

            {product.comboAvailable ? (
              <label
                className={`flex cursor-pointer flex-col gap-3 rounded-2xl border-[3px] p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                  combo
                    ? 'border-brand bg-brand-soft/70 shadow-retro-sm'
                    : 'border-ink/15 bg-white hover:border-ink/40'
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={combo}
                    onChange={(event) => setCombo(event.target.checked)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-[3px] border-ink ${
                      combo ? 'bg-brand text-cream' : 'bg-white text-transparent'
                    }`}
                  >
                    <Icon name="check" size={15} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold text-ink">
                      {t('product.comboTitle')}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                      {t('product.comboText', {
                        price: formatPrice(product.comboPriceDifference, config.currency),
                      })}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 self-start rounded-full border-2 border-ink/20 bg-gold px-3 py-1 font-display text-sm font-extrabold text-ink sm:self-auto">
                  +{formatPrice(product.comboPriceDifference, config.currency)}
                </span>
              </label>
            ) : null}

            <div>
              <label
                htmlFor="product-instructions"
                className="font-display text-xl font-extrabold text-ink"
              >
                {t('product.specialInstructions')}
              </label>
              <textarea
                id="product-instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                maxLength={250}
                rows={3}
                placeholder={t('product.instructionsPlaceholder')}
                className="field mt-2 resize-y"
              />
              <p className="mt-1 text-end text-[0.7rem] text-ink-soft">{instructions.length}/250</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border-[3px] border-ink bg-white p-4 shadow-retro sm:p-5 lg:sticky lg:top-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                  {t('product.quantity')}
                </p>
                <QuantitySelector value={quantity} onChange={setQuantity} className="mt-2" />
              </div>
              <div className="text-end">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                  {t('common.total')}
                </p>
                <p aria-live="polite" className="font-display text-3xl font-extrabold text-brand">
                  {formatPrice(total, config.currency)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="retro-btn mt-4 w-full bg-brand text-cream hover:bg-brand-dark"
            >
              <Icon name="cart" size={20} strokeWidth={2.5} />
              {t('product.addToCartTotal', { total: formatPrice(total, config.currency) })}
            </button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-soft">
              <Icon name="clock" size={14} className="text-brand" />
              {t('product.prepTime')}
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length ? (
        <section className="mt-16">
          <SectionHeading
            eyebrow={t('home.categoriesEyebrow')}
            title={t('product.relatedTitle')}
            text={t('product.relatedText')}
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related, index) => (
              <Reveal key={related.id} delay={index * 0.05}>
                <ProductCard product={related} className="h-full" />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
