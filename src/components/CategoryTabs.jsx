import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { getCategoryName } from '../utils/catalog'

export default function CategoryTabs({ categories, active, onChange, allLabel }) {
  const { language } = useLanguage()
  const reduceMotion = useReducedMotion()
  const tabRefs = useRef({})

  useEffect(() => {
    const node = tabRefs.current[active]
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [active])

  const items = [{ id: 'all', name: allLabel, image: '/images/logo.png' }, ...categories.map((category) => ({
    id: category.id,
    name: getCategoryName(category, language),
    image: category.image,
  }))]

  return (
    <div className="sticky top-[76px] z-30 -mx-4 border-y-[3px] border-ink bg-cream/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-b-3xl sm:border-x-[3px] sm:px-3">
      <div
        role="tablist"
        aria-label={allLabel}
        className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5"
      >
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-[3px] px-3.5 py-2 font-display text-sm font-extrabold transition ${
                isActive
                  ? 'border-ink text-cream'
                  : 'border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-peach'
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-category"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 32 }
                  }
                  className="absolute inset-0 rounded-full border-[3px] border-ink bg-brand"
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative z-10 grid h-6 w-6 overflow-hidden rounded-full border-2 border-ink bg-cream">
                <img
                  src={item.image}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="relative z-10">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
