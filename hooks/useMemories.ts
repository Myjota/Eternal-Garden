'use client'

import { useMemo, useState } from 'react'
import { famousLithuanians } from '@/lib/mock-data'
import { type Locale, defaultLocale } from '@/lib/i18n'

export function useMemories() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMemorials = useMemo(() => {
    return famousLithuanians.filter(m => {
      const name = `${m.firstName} ${m.lastName}`.toLowerCase()
      return name.includes(searchQuery.toLowerCase())
    })
  }, [searchQuery])

  return {
    locale,
    setLocale,
    searchQuery,
    setSearchQuery,
    filteredMemorials,
  }
}
