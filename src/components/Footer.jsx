import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { config } from '../utils/catalog'
import { StripeDivider } from './Decor'
import Icon from './Icon'

const socialItems = [
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
  { key: 'facebook', icon: 'facebook', label: 'Facebook' },
  { key: 'tiktok', icon: 'tiktok', label: 'TikTok' },
]

export default function Footer() {
  const { t } = useLanguage()
  const telHref = `tel:${config.phone.replace(/\s/g, '')}`
  const whatsappHref = `https://wa.me/${config.whatsappNumber}`

  return (
    <footer className="relative mt-20 border-t-[3px] border-ink bg-ink text-cream">
      <StripeDivider className="border-t-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Benny's Fast Food"
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="rounded-full border-[3px] border-cream bg-cream object-cover"
              />
              <div>
                <p className="font-display text-3xl font-extrabold leading-none">Benny&apos;s</p>
                <p className="mt-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.24em] text-brand-soft">
                  Fast Food • Bouira
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">{t('footer.tagline')}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-3 py-1 text-xs font-semibold text-cream/80">
                <Icon name="truck" size={14} />
                {t('footer.delivery')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-3 py-1 text-xs font-semibold text-cream/80">
                <Icon name="card" size={14} />
                {t('footer.payment')}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-gold">
              {t('footer.quickLinks')}
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  to="/"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-cream/80 transition hover:text-cream"
                >
                  <Icon name="chevronRight" size={14} className="rtl:rotate-180" />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-cream/80 transition hover:text-cream"
                >
                  <Icon name="chevronRight" size={14} className="rtl:rotate-180" />
                  {t('nav.menu')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about-contact"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-cream/80 transition hover:text-cream"
                >
                  <Icon name="chevronRight" size={14} className="rtl:rotate-180" />
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  className="inline-flex min-h-10 items-center gap-2 text-sm text-cream/80 transition hover:text-cream"
                >
                  <Icon name="chevronRight" size={14} className="rtl:rotate-180" />
                  {t('cart.checkout')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-gold">
              {t('footer.contact')}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li>
                <a
                  href={telHref}
                  className="flex min-h-10 items-center gap-2.5 transition hover:text-cream"
                >
                  <Icon name="phone" size={17} />
                  {config.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-10 items-center gap-2.5 transition hover:text-cream"
                >
                  <Icon name="whatsapp" size={17} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={config.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-10 items-start gap-2.5 transition hover:text-cream"
                >
                  <Icon name="pin" size={17} className="mt-0.5 shrink-0" />
                  {config.address}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex min-h-10 items-center gap-2.5 transition hover:text-cream"
                >
                  <Icon name="mail" size={17} />
                  {config.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-gold">
              {t('footer.hours')}
            </h2>
            <div className="mt-4 space-y-2 text-sm text-cream/80">
              <p className="flex items-center justify-between gap-3 border-b border-cream/10 pb-2">
                <span>{t('home.hoursWeekdays')}</span>
                <span className="font-semibold text-cream">{config.openingHours.weekdays}</span>
              </p>
              <p className="flex items-center justify-between gap-3 border-b border-cream/10 pb-2">
                <span>{t('home.hoursWeekend')}</span>
                <span className="font-semibold text-cream">{config.openingHours.weekend}</span>
              </p>
              <p className="flex items-center justify-between gap-3 border-b border-cream/10 pb-2">
                <span>{t('home.hoursSunday')}</span>
                <span className="font-semibold text-cream">{config.openingHours.friday}</span>
              </p>
            </div>

            <h2 className="mt-6 font-display text-sm font-extrabold uppercase tracking-wide text-gold">
              {t('footer.follow')}
            </h2>
            <div className="mt-3 flex gap-2">
              {socialItems.map((item) => (
                <a
                  key={item.key}
                  href={config.social[item.key]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/40 text-cream transition hover:-translate-y-0.5 hover:border-cream hover:bg-brand"
                >
                  <Icon name={item.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Benny&apos;s Fast Food. {t('footer.rights')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
