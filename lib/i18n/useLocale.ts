'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type Locale, defaultLocale } from './config'
import type { User } from '@supabase/supabase-js'

const LOCALE_STORAGE_KEY = 'eternal-garden-locale'

interface UseLocaleOptions {
  user?: User | null
}

export function useLocale(options: UseLocaleOptions = {}) {
  const { user } = options
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  // Load locale on mount
  useEffect(() => {
    const loadLocale = async () => {
      setIsLoading(true)
      
      // If user is logged in, try to get from Supabase
      if (user) {
        const supabase = createClient()
        const { data: profile } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', user.id)
          .single()
        
        if (profile?.preferred_language && (profile.preferred_language === 'lt' || profile.preferred_language === 'en')) {
          setLocaleState(profile.preferred_language as Locale)
          // Also save to localStorage for faster loading next time
          localStorage.setItem(LOCALE_STORAGE_KEY, profile.preferred_language)
          setIsLoading(false)
          return
        }
      }
      
      // Fall back to localStorage
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
      if (stored && (stored === 'lt' || stored === 'en')) {
        setLocaleState(stored as Locale)
      }
      
      setIsLoading(false)
    }

    loadLocale()
  }, [user])

  // Change locale function
  const setLocale = useCallback(async (newLocale: Locale) => {
    setLocaleState(newLocale)
    
    // Always save to localStorage
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
    
    // If user is logged in, save to Supabase
    if (user) {
      const supabase = createClient()
      await supabase
        .from('profiles')
        .update({ preferred_language: newLocale })
        .eq('id', user.id)
    }
  }, [user])

  return {
    locale,
    setLocale,
    isLoading,
  }
}
