'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { createClient } from '@/lib/supabase/client'

type Locale = 'lt' | 'en'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
}

const LocaleContext =
  createContext<LocaleContextType | null>(null)

export function LocaleProvider({
  children,
  initialLocale = 'lt',
  user,
}: any) {

  // 🔥 1. hydrate from localStorage first
  const [locale, setLocaleState] =
    useState<Locale>(() => {

      if (typeof window !== 'undefined') {
        const stored =
          localStorage.getItem('locale') as Locale

        if (stored) return stored
      }

      return initialLocale
    })

  // 🔥 sync localStorage whenever locale changes
  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  const setLocale = async (newLocale: Locale) => {

    // 1. instant UI update
    setLocaleState(newLocale)

    try {

      // 2. save to DB (only if user exists)
      if (user?.id) {
        const supabase = createClient()

        const { error } = await supabase
          .from('profiles')
          .update({
            preferred_language: newLocale,
          })
          .eq('id', user.id)

        if (error) {
          console.error('Locale save failed:', error)
        }
      }

    } catch (err) {
      console.error('Locale error:', err)
    }
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error(
      'useLocaleContext must be used inside LocaleProvider'
    )
  }

  return context
}
