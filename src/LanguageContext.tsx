/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'te'
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('jh-language') === 'te' ? 'te' : 'en')
  useEffect(() => {
    document.documentElement.lang = language === 'te' ? 'te' : 'en'
  }, [language])
  const value = useMemo(() => ({ language, setLanguage: (next: Language) => { localStorage.setItem('jh-language', next); setLanguage(next) } }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
