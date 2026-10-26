import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { config } from '../utils/catalog'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import CartButton from './CartButton'
import Icon from './Icon'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/menu', label: t('nav.menu') },
    { to: '/about-contact', label: t('nav.about') },
  ]

  const linkClass = ({ isActive }) =>
    `relative inline-flex min-h-11 items-center rounded-full px-4 font-display text-sm font-extrabold uppercase tracking-wide transition ${
      isActive ? 'bg-cream text-brand' : 'text-ink hover:bg-cream hover:text-brand'
    }`

  return (
    <>
      <div className="hidden bg-brand text-cream sm:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[0.72rem] font-semibold">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="truck" size={14} strokeWidth={2.4} />
            {t('footer.delivery')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            {config.openingHours.label}
            <span className="opacity-60">•</span>
            {config.openingHours.weekdays}
          </span>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
          >
            <Icon name="whatsapp" size={14} strokeWidth={2.4} />
            {config.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream/95 backdrop-blur-md">
        <nav
          aria-label={t('nav.menu')}
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6"
        >
          <Link
            to="/"
            aria-label="Benny's — Accueil"
            className="shrink-0 rounded-2xl transition hover:opacity-90"
          >
            <Logo size="sm" showName />
          </Link>

          <div className="hidden items-center gap-1 rounded-full border-[3px] border-ink bg-white p-1 shadow-retro-sm lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSwitcher className="hidden xl:inline-flex" small />
            <CartButton className="hidden sm:inline-flex" />
            <Link
              to="/menu"
              className="retro-btn hidden bg-brand text-cream hover:bg-brand-dark md:inline-flex"
            >
              {t('nav.order')}
              <Icon name="arrowRight" size={17} strokeWidth={2.6} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-white text-ink shadow-retro-sm transition hover:bg-peach lg:hidden"
            >
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon name={mobileOpen ? 'close' : 'menu'} size={24} strokeWidth={2.8} />
              </motion.span>
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t-[3px] border-ink bg-cream lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-5">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.2 }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                          `flex min-h-12 items-center justify-between rounded-2xl border-[3px] px-4 font-display text-lg font-extrabold transition ${
                            isActive
                              ? 'border-ink bg-brand text-cream shadow-retro-sm'
                              : 'border-ink/15 bg-white text-ink hover:bg-peach'
                          }`
                        }
                      >
                        {link.label}
                        <Icon name="arrowRight" size={18} />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <LanguageSwitcher />
                  <CartButton />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    href={`https://wa.me/${config.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="retro-btn bg-mint text-ink"
                  >
                    <Icon name="whatsapp" size={19} strokeWidth={2.5} />
                    {t('home.whatsapp')}
                  </a>
                  <Link to="/menu" className="retro-btn bg-brand text-cream">
                    {t('nav.order')}
                    <Icon name="arrowRight" size={18} strokeWidth={2.6} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  )
}
