import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import fr from '../locales/fr.json'
import en from '../locales/en.json'
import ar from '../locales/ar.json'
import { getCategoryDescription, getCategoryName } from '../utils/catalog'

const dictionaries = { fr, en, ar }
const STORAGE_KEY = 'bennys-language'

export const languages = [
  { code: 'fr', label: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
]

const LanguageContext = createContext(null)

function detectLanguage() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && dictionaries[stored]) return stored
  const browser = window.navigator.language?.toLowerCase() || 'fr'
  if (browser.startsWith('ar')) return 'ar'
  if (browser.startsWith('en')) return 'en'
  return 'fr'
}

function getValue(dictionary, path) {
  return path.split('.').reduce((value, key) => (value ? value[key] : undefined), dictionary)
}

function interpolate(value, vars) {
  if (!vars) return value
  return Object.entries(vars).reduce(
    (result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement ?? '')),
    value,
  )
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectLanguage)
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language, dir])

  const setLanguage = useCallback((code) => {
    if (dictionaries[code]) setLanguageState(code)
  }, [])

  const t = useCallback(
    (path, vars) => {
      const value = getValue(dictionaries[language], path) ?? getValue(fr, path) ?? path
      return typeof value === 'string' ? interpolate(value, vars) : value
    },
    [language],
  )

  const tCategory = useCallback(
    (category) => getCategoryName(category, language),
    [language],
  )

  const tCategoryDescription = useCallback(
    (category) => getCategoryDescription(category, language),
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      tCategory,
      tCategoryDescription,
      dir,
      isRTL: dir === 'rtl',
      languages,
    }),
    [language, setLanguage, t, tCategory, tCategoryDescription, dir],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
