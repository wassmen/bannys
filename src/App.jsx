import { lazy, Suspense } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import useScrollTop from './hooks/useScrollTop'
import CartButton from './components/CartButton'
import CartDrawer from './components/CartDrawer'
import FlyToCart from './components/FlyToCart'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Toast from './components/Toast'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const AboutContact = lazy(() => import('./pages/AboutContact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  const { t } = useLanguage()

  return (
    <div className="grid min-h-[60vh] place-items-center px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src="/images/logo.png"
          alt="Benny's Fast Food"
          width={512}
          height={512}
          className="h-20 w-20 animate-float rounded-full border-[3px] border-ink bg-cream object-cover shadow-retro-sm"
        />
        <p className="font-display text-sm font-extrabold uppercase tracking-wide text-ink-soft">
          {t('common.loading')}
        </p>
      </div>
    </div>
  )
}

function FloatingCart() {
  const { itemCount } = useCart()

  return (
    <AnimatePresence>
      {itemCount > 0 ? <CartButton key="floating-cart" variant="floating" /> : null}
    </AnimatePresence>
  )
}

function AppShell() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  useScrollTop()

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:rounded-full focus:border-[3px] focus:border-ink focus:bg-gold focus:px-4 focus:py-2 focus:font-display focus:font-extrabold focus:text-ink"
      >
        {t('common.skipToContent')}
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="flex-1 scroll-mt-24 outline-none">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about-contact" element={<AboutContact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
      <FlyToCart />
      <FloatingCart />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
