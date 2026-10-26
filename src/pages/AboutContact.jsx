import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { config } from '../utils/catalog'
import { formatPrice } from '../utils/formatPrice'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { FreckleDots, Sticker, StripeDivider } from '../components/Decor'

const values = [
  { icon: 'leaf', titleKey: 'about.value1Title', textKey: 'about.value1Text', color: 'bg-mint' },
  { icon: 'heart', titleKey: 'about.value2Title', textKey: 'about.value2Text', color: 'bg-brand-soft' },
  { icon: 'pin', titleKey: 'about.value3Title', textKey: 'about.value3Text', color: 'bg-sky-soft' },
]

const faqs = [
  { q: 'about.faq1Q', a: 'about.faq1A', needsAmount: true },
  { q: 'about.faq2Q', a: 'about.faq2A' },
  { q: 'about.faq3Q', a: 'about.faq3A' },
]

const socialItems = [
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
  { key: 'facebook', icon: 'facebook', label: 'Facebook' },
  { key: 'tiktok', icon: 'tiktok', label: 'TikTok' },
]

export default function AboutContact() {
  const { t } = useLanguage()

  usePageMeta({
    title: t('seo.aboutTitle'),
    description: t('seo.aboutDescription'),
    image: '/images/logo.png',
  })

  const hours = [
    { label: t('home.hoursWeekdays'), value: config.openingHours.weekdays },
    { label: t('home.hoursWeekend'), value: config.openingHours.weekend },
    { label: t('home.hoursSunday'), value: config.openingHours.friday },
  ]

  const contacts = [
    {
      icon: 'phone',
      title: t('about.callTitle'),
      value: config.phoneDisplay,
      href: `tel:${config.phone.replace(/\s/g, '')}`,
      color: 'bg-gold',
    },
    {
      icon: 'whatsapp',
      title: t('about.whatsappTitle'),
      value: config.phoneDisplay,
      href: `https://wa.me/${config.whatsappNumber}`,
      color: 'bg-mint',
      external: true,
    },
    {
      icon: 'mail',
      title: t('about.emailTitle'),
      value: config.email,
      href: `mailto:${config.email}`,
      color: 'bg-sky-soft',
    },
    {
      icon: 'pin',
      title: t('about.addressTitle'),
      value: config.address,
      href: config.mapsLink,
      color: 'bg-peach',
      external: true,
    },
  ]

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <FreckleDots className="opacity-25" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-16">
          <Reveal>
            <SectionHeading
              eyebrow={t('about.eyebrow')}
              title={t('about.title')}
              text={t('about.subtitle')}
            />
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="clock" size={15} />
                {config.openingHours.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-gold px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="truck" size={15} />
                {t('footer.delivery')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1.5 text-xs font-bold text-ink">
                <Icon name="heart" size={15} />
                Bouira
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-square">
              <div
                aria-hidden="true"
                className="absolute inset-6 -rotate-6 rounded-full border-[3px] border-ink bg-gold shadow-retro"
              />
              <div className="absolute inset-[14%] overflow-hidden rounded-full border-[3px] border-ink bg-cream shadow-retro">
                <img
                  src="/images/logo.png"
                  alt="Benny's Fast Food"
                  width={512}
                  height={512}
                  className="h-full w-full object-cover"
                />
              </div>
              <Sticker className="absolute start-0 top-8" rotate="-rotate-6">
                <Icon name="sparkles" size={14} strokeWidth={2.5} />
                {t('home.storyEyebrow')}
              </Sticker>
            </div>
          </Reveal>
        </div>
      </section>

      <StripeDivider />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal className="retro-card overflow-hidden">
            <img
              src="/images/products/category-combos.svg"
              alt=""
              width={800}
              height={600}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.storyTitle')} />
            <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
              {t('about.storyText1')}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
              {t('about.storyText2')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {config.deliveryZones.slice(0, 4).map((zone) => (
                <span
                  key={zone}
                  className="rounded-full border-2 border-ink/15 bg-white px-3 py-1 text-xs font-semibold text-ink"
                >
                  {zone}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-y-[3px] border-ink bg-white py-16 lg:py-20">
        <FreckleDots className="opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.valuesTitle')} align="center" />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.icon} delay={index * 0.07}>
                <article className="retro-card h-full p-6">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-ink text-ink shadow-retro-sm ${value.color}`}
                  >
                    <Icon name={value.icon} size={27} strokeWidth={2.3} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
                    {t(value.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(value.textKey)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="retro-card overflow-hidden">
            <div className="border-b-[3px] border-ink bg-gold p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
                <Icon name="clock" size={24} strokeWidth={2.5} />
                {t('about.hoursTitle')}
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
            </div>
          </Reveal>

          <Reveal delay={0.08} className="retro-card overflow-hidden">
            <div className="border-b-[3px] border-ink bg-peach p-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
                <Icon name="pin" size={24} strokeWidth={2.5} />
                {t('about.findUsTitle')}
              </h2>
            </div>
            <div>
              <iframe
                title={t('about.findUsTitle')}
                src={config.mapsEmbed}
                width="600"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ink p-4">
                <p className="text-sm font-semibold text-ink">{config.address}</p>
                <a
                  href={config.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="retro-btn min-h-10 bg-white px-3 py-1.5 text-sm text-ink hover:bg-cream"
                >
                  {t('home.locationCta')}
                  <Icon name="external" size={16} strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-y-[3px] border-ink bg-sky-soft py-16 lg:py-20">
        <FreckleDots className="opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow={t('about.eyebrow')}
              title={t('about.contactTitle')}
              text={t('about.contactText')}
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {contacts.map((contact) => (
                <a
                  key={contact.title}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noreferrer' : undefined}
                  className="group flex min-h-20 items-start gap-3 rounded-2xl border-[3px] border-ink bg-white p-4 shadow-retro-sm transition hover:-translate-y-0.5 hover:shadow-retro"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink text-ink ${contact.color}`}
                  >
                    <Icon name={contact.icon} size={19} strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-extrabold uppercase tracking-wide text-ink-soft">
                      {contact.title}
                    </span>
                    <span className="mt-0.5 block break-words text-sm font-semibold text-ink group-hover:text-brand">
                      {contact.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="retro-card p-5">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                {t('about.deliveryZones')}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {config.deliveryZones.map((zone) => (
                  <li
                    key={zone}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold text-ink"
                  >
                    <Icon name="pin" size={13} className="text-brand" />
                    {zone}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
                <Icon name="truck" size={16} className="mt-0.5 shrink-0 text-brand" />
                {t('checkout.deliveryFeeNote', {
                  amount: formatPrice(config.freeDeliveryThreshold, config.currency),
                })}
              </p>

              <h2 className="mt-6 font-display text-lg font-extrabold text-ink">
                {t('about.followTitle')}
              </h2>
              <p className="mt-1 text-xs text-ink-soft">{t('about.followText')}</p>
              <div className="mt-3 flex gap-2">
                {socialItems.map((item) => (
                  <a
                    key={item.key}
                    href={config.social[item.key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-white text-ink transition hover:-translate-y-0.5 hover:bg-brand hover:text-cream"
                  >
                    <Icon name={item.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          eyebrow={t('about.eyebrow')}
          title={t('about.faqTitle')}
          align="center"
        />
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.05}>
              <details className="group rounded-2xl border-[3px] border-ink bg-white shadow-retro-sm">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-display text-base font-extrabold text-ink sm:text-lg">
                  {t(faq.q)}
                  <Icon
                    name="chevronDown"
                    size={20}
                    strokeWidth={2.6}
                    className="shrink-0 transition group-open:rotate-180"
                  />
                </summary>
                <p className="border-t-2 border-dashed border-ink/15 px-4 py-3 text-sm leading-relaxed text-ink-soft">
                  {faq.needsAmount
                    ? t(faq.a, {
                        amount: formatPrice(config.freeDeliveryThreshold, config.currency),
                      })
                    : t(faq.a)}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y-[3px] border-ink bg-ink py-14 text-cream">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          <Sticker className="bg-gold" rotate="rotate-2">
            <Icon name="sparkles" size={14} strokeWidth={2.5} />
            Benny&apos;s • Bouira
          </Sticker>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold sm:text-5xl">
            {t('home.orderTitle')}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-cream/75">
            {t('home.orderText')}
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
            <Link to="/menu" className="retro-btn bg-brand text-cream hover:bg-brand-dark">
              {t('home.orderCta')}
              <Icon name="arrowRight" size={19} strokeWidth={2.6} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
