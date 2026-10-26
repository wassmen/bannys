import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import {
  categories,
  config,
  getBestSellers,
  getProductsByCategory,
} from '../utils/catalog'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { Blob, FreckleDots, Sticker, StripeDivider } from '../components/Decor'

const heroPositions = [
  'start-0 top-4 -rotate-6',
  'end-2 top-10 rotate-6',
  'bottom-0 start-1/2 -translate-x-1/2 rotate-3',
]

const reasons = [
  { icon: 'leaf', titleKey: 'home.why1Title', textKey: 'home.why1Text', color: 'bg-mint' },
  { icon: 'flame', titleKey: 'home.why2Title', textKey: 'home.why2Text', color: 'bg-gold' },
  { icon: 'scooter', titleKey: 'home.why3Title', textKey: 'home.why3Text', color: 'bg-sky' },
]

export default function Home() {
  const { t, tCategory, tCategoryDescription } = useLanguage()
  const reduceMotion = useReducedMotion()
  const bestSellers = getBestSellers(4)
  const heroProducts = bestSellers.slice(0, 3)

  usePageMeta({
    title: t('seo.homeTitle'),
    description: t('seo.homeDescription'),
    image: '/images/logo.png',
  })

  const hours = [
    { label: t('home.hoursWeekdays'), value: config.openingHours.weekdays },
    { label: t('home.hoursWeekend'), value: config.openingHours.weekend },
    { label: t('home.hoursSunday'), value: config.openingHours.friday },
  ]

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <FreckleDots className="opacity-30" />
        <Blob className="-start-24 top-10 h-72 w-72" color="bg-peach" />
        <Blob className="-end-20 bottom-0 h-80 w-80" color="bg-sky-soft" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20 lg:pt-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-gold px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] shadow-retro-sm">
              <Icon name="sparkles" size={15} strokeWidth={2.5} />
              {t('home.heroEyebrow')}
            </span>

            <h1 className="mt-5 max-w-2xl text-balance font-display text-5xl font-extrabold leading-[0.92] text-ink sm:text-6xl lg:text-7xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              {t('home.heroText')}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/menu" className="retro-btn bg-brand text-cream hover:bg-brand-dark">
                {t('home.heroCta')}
                <Icon name="arrowRight" size={19} strokeWidth={2.6} className="rtl:rotate-180" />
              </Link>
              <Link to="/menu" className="retro-btn bg-white text-ink hover:bg-peach">
                {t('home.heroCta2')}
                <Icon name="utensils" size={19} strokeWidth={2.4} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="truck" size={15} strokeWidth={2.4} />
                {t('home.heroDelivery')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="leaf" size={15} strokeWidth={2.4} />
                {t('home.heroFresh')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-peach px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="heart" size={15} strokeWidth={2.4} />
                {t('home.heroBadge')}
              </span>
            </div>
          </Reveal>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-square">
              <div
                aria-hidden="true"
                className="absolute inset-8 rotate-6 rounded-full border-[3px] border-ink bg-brand shadow-retro-lg"
              />
              <div className="absolute inset-[18%] overflow-hidden rounded-full border-[3px] border-ink bg-cream shadow-retro">
                <img
                  src="/images/logo.png"
                  alt="Benny's Fast Food"
                  width={512}
                  height={512}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>

              {heroProducts.map((product, index) => (
                <div key={product.id} className={`absolute ${heroPositions[index]}`}>
                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                    transition={{
                      duration: 5 + index,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5,
                    }}
                    className="h-24 w-24 overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-retro sm:h-28 sm:w-28"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>
              ))}

              <Sticker className="absolute -top-2 end-4" rotate="rotate-6">
                <Icon name="flame" size={14} strokeWidth={2.5} />
                {t('common.bestSeller')}
              </Sticker>
              <Sticker className="absolute bottom-6 end-0 bg-cream" rotate="-rotate-3">
                <Icon name="clock" size={14} strokeWidth={2.5} />
                {t('product.prepTime')}
              </Sticker>
            </div>
          </motion.div>
        </div>
      </section>

      <StripeDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t('home.bestSellersEyebrow')}
            title={t('home.bestSellersTitle')}
            text={t('home.bestSellersText')}
          />
          <Link
            to="/menu"
            className="inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-extrabold uppercase tracking-wide text-brand underline-offset-4 hover:underline"
          >
            {t('common.seeAll')}
            <Icon name="arrowRight" size={17} strokeWidth={2.6} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative border-y-[3px] border-ink bg-white py-16 lg:py-20">
        <FreckleDots className="opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t('home.categoriesEyebrow')}
            title={t('home.categoriesTitle')}
            text={t('home.categoriesText')}
            align="center"
          />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.03}>
                <Link
                  to={`/menu?category=${category.id}`}
                  className="group flex h-full flex-col items-center overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-cream p-3 text-center shadow-retro-sm transition hover:-translate-y-1 hover:bg-peach hover:shadow-retro"
                >
                  <span className="h-20 w-20 overflow-hidden rounded-full border-[3px] border-ink bg-white sm:h-24 sm:w-24">
                    <img
                      src={category.image}
                      alt=""
                      width={96}
                      height={96}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="mt-3 font-display text-lg font-extrabold leading-tight text-ink">
                    {tCategory(category)}
                  </span>
                  <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink-soft">
                    {t('menu.results', { count: getProductsByCategory(category.id).length })}
                  </span>
                  <span className="mt-2 line-clamp-2 text-xs leading-snug text-ink-soft">
                    {tCategoryDescription(category)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow={t('home.whyEyebrow')}
          title={t('home.whyTitle')}
          align="center"
        />
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.icon} delay={index * 0.08}>
              <article className="retro-card h-full p-6">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-ink text-ink shadow-retro-sm ${reason.color}`}
                >
                  <Icon name={reason.icon} size={27} strokeWidth={2.3} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
                  {t(reason.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(reason.textKey)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative border-y-[3px] border-ink bg-sky-soft py-16 lg:py-20">
        <FreckleDots className="opacity-25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-[3px] border-ink bg-white shadow-retro">
              <img
                src={bestSellers[0]?.image || '/images/logo.png'}
                alt={bestSellers[0]?.name || "Benny's"}
                width={800}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -end-3 grid h-24 w-24 place-items-center overflow-hidden rounded-full border-[3px] border-ink bg-cream shadow-retro-sm">
              <img
                src="/images/logo.png"
                alt=""
                width={96}
                height={96}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <Sticker className="absolute -start-3 top-5" rotate="-rotate-6">
              <Icon name="heart" size={14} strokeWidth={2.5} />
              Bouira
            </Sticker>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow={t('home.storyEyebrow')}
              title={t('home.storyTitle')}
              text={t('home.storyText1')}
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {t('home.storyText2')}
            </p>

            <dl className="mt-7 grid grid-cols-3 gap-3">
              {[t('home.stat1'), t('home.stat2'), t('home.stat3')].map((label, index) => (
                <div
                  key={label}
                  className="rounded-2xl border-[3px] border-ink bg-white p-3 text-center shadow-retro-sm"
                >
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold text-brand">
                      {['100%', '100%', '7j'][index]}
                    </span>
                    <span className="mt-0.5 block text-[0.65rem] font-bold uppercase leading-tight tracking-wide text-ink-soft">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="retro-card overflow-hidden">
            <div className="border-b-[3px] border-ink bg-gold p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
                <Icon name="clock" size={24} strokeWidth={2.5} />
                {t('home.hoursTitle')}
              </h2>
            </div>
            <div className="p-5">
              <dl className="space-y-2.5">
                {hours.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b-2 border-dashed border-ink/15 pb-2.5 text-sm"
                  >
                    <dt className="font-semibold text-ink">{row.label}</dt>
                    <dd className="font-display font-extrabold text-brand">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                <Icon name="info" size={16} className="mt-0.5 shrink-0 text-brand" />
                {t('home.hoursNote')}
              </p>
              <a
                href={`tel:${config.phone.replace(/\s/g, '')}`}
                className="retro-btn mt-5 w-full bg-brand text-cream hover:bg-brand-dark"
              >
                <Icon name="phone" size={18} strokeWidth={2.5} />
                {t('home.callUs')} · {config.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="retro-card overflow-hidden">
            <div className="border-b-[3px] border-ink bg-peach p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
                <Icon name="pin" size={24} strokeWidth={2.5} />
                {t('home.locationTitle')}
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-ink-soft">{t('home.locationText')}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border-[3px] border-ink">
                <iframe
                  title={t('home.locationTitle')}
                  src={config.mapsEmbed}
                  width="600"
                  height="240"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-48 w-full border-0"
                />
              </div>
              <a
                href={config.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="retro-btn mt-4 w-full bg-white text-ink hover:bg-cream"
              >
                {t('home.locationCta')}
                <Icon name="external" size={17} strokeWidth={2.4} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y-[3px] border-ink bg-brand py-14 text-cream lg:py-16">
        <FreckleDots className="opacity-15" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-cream bg-cream/10 px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em]">
            <Icon name="sparkles" size={15} strokeWidth={2.5} />
            {t('home.contactEyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold sm:text-5xl">
            {t('home.contactTitle')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-cream/85 sm:text-base">
            {t('home.contactText')}
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="retro-btn bg-mint text-ink hover:bg-white"
            >
              <Icon name="whatsapp" size={20} strokeWidth={2.5} />
              {t('home.whatsapp')}
            </a>
            <Link to="/checkout" className="retro-btn bg-cream text-ink hover:bg-gold">
              {t('home.orderCta')}
              <Icon name="arrowRight" size={19} strokeWidth={2.6} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
