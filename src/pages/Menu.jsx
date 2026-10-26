import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
  categories,
  getCategoryById,
  getProductsByCategory,
} from '../utils/catalog'
import usePageMeta from '../hooks/usePageMeta'
import CategoryTabs from '../components/CategoryTabs'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

function matchesQuery(product, query) {
  if (!query) return true
  const haystack = [
    product.name,
    product.description,
    ...(product.ingredients || []),
    ...(product.allergens || []),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

export default function Menu() {
  const { t, tCategoryDescription } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const requestedCategory = searchParams.get('category')
  const activeCategory = categories.some((category) => category.id === requestedCategory)
    ? requestedCategory
    : 'all'
  const activeCategoryData = getCategoryById(activeCategory)

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return getProductsByCategory(activeCategory).filter((product) =>
      matchesQuery(product, normalized),
    )
  }, [activeCategory, query])

  usePageMeta({
    title: t('seo.menuTitle'),
    description: t('seo.menuDescription'),
    image: '/images/logo.png',
  })

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pt-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={t('menu.eyebrow')}
          title={t('menu.title')}
          text={t('menu.subtitle')}
        />

        <Link to="/checkout" className="retro-btn shrink-0 bg-brand text-cream hover:bg-brand-dark">
          {t('cart.checkout')}
          <Icon name="arrowRight" size={18} strokeWidth={2.6} className="rtl:rotate-180" />
        </Link>
      </div>

      <div className="mt-8">
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={handleCategoryChange}
          allLabel={t('menu.allCategories')}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <label htmlFor="menu-search" className="sr-only">
            {t('common.search')}
          </label>
          <Icon
            name="search"
            size={20}
            strokeWidth={2.4}
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
          />
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('menu.searchPlaceholder')}
            className="field ps-11 pe-11"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('menu.clearSearch')}
              className="absolute end-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition hover:bg-peach hover:text-ink"
            >
              <Icon name="close" size={17} strokeWidth={2.6} />
            </button>
          ) : null}
        </div>

        <p aria-live="polite" className="text-sm font-semibold text-ink-soft">
          {t('menu.results', { count: filteredProducts.length })}
        </p>
      </div>

      {activeCategoryData ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {tCategoryDescription(activeCategoryData)}
        </p>
      ) : null}

      {filteredProducts.length ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index * 0.03, 0.24)}>
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="retro-card mt-8 flex flex-col items-center px-6 py-14 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full border-[3px] border-ink bg-peach">
            <Icon name="search" size={34} strokeWidth={2.2} />
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-ink">
            {t('menu.noResults')}
          </h2>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              if (activeCategory !== 'all') setSearchParams({})
            }}
            className="retro-btn mt-6 bg-brand text-cream hover:bg-brand-dark"
          >
            {t('menu.clearSearch')}
            <Icon name="close" size={17} strokeWidth={2.6} />
          </button>
        </div>
      )}
    </div>
  )
}
