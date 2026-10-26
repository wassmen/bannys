import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import usePageMeta from '../hooks/usePageMeta'
import Icon from '../components/Icon'
import { FreckleDots } from '../components/Decor'

export default function NotFound() {
  const { t } = useLanguage()

  usePageMeta({
    title: `${t('notFound.title')} - Benny's`,
    description: t('notFound.text'),
    image: '/images/logo.png',
  })

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <FreckleDots className="opacity-25" />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="relative mx-auto grid h-40 w-40 place-items-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rotate-6 rounded-full border-[3px] border-ink bg-gold shadow-retro"
          />
          <img
            src="/images/logo.png"
            alt="Benny's Fast Food"
            width={512}
            height={512}
            className="relative h-32 w-32 rounded-full border-[3px] border-ink bg-cream object-cover"
          />
        </div>

        <p className="mt-7 font-display text-7xl font-extrabold leading-none text-brand sm:text-8xl">
          404
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl font-extrabold text-ink">
          {t('notFound.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-ink-soft">{t('notFound.text')}</p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/menu" className="retro-btn bg-brand text-cream hover:bg-brand-dark">
            {t('notFound.cta')}
            <Icon name="arrowRight" size={18} strokeWidth={2.6} className="rtl:rotate-180" />
          </Link>
          <Link to="/" className="retro-btn bg-white text-ink hover:bg-peach">
            <Icon name="home" size={18} strokeWidth={2.4} />
            {t('common.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
