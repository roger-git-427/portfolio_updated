import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from './en'
import { es } from './es'
import type { Content, Locale } from './types'

const STORAGE_KEY = 'portfolio-locale'

const catalogs: Record<Locale, Content> = { en, es }

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Content
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale())

  function setLocale(next: Locale) {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const t = catalogs[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `${t.profile.name} | ${t.profile.role}`
  }, [locale, t.profile.name, t.profile.role])

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
