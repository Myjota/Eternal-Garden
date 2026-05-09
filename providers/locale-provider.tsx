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
  const [locale, setLocaleState] =
    useState<Locale>(initialLocale)

  const setLocale = async (newLocale: Locale) => {

    // INSTANT UI UPDATE
    setLocaleState(newLocale)

    // LOCAL STORAGE
    localStorage.setItem('locale', newLocale)

    // SAVE TO SUPABASE
    if (user?.id) {
      const supabase = createClient()

      await supabase
        .from('profiles')
        .update({
          preferred_language: newLocale,
        })
        .eq('id', user.id)
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
