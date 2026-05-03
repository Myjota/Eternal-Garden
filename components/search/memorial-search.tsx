'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, Loader2, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  profile_image_url: string | null
  biography: string | null
}

interface MemorialSearchProps {
  placeholder?: string
  className?: string
  variant?: 'hero' | 'header' | 'page'
}

export function MemorialSearch({
  placeholder = 'Ieškoti atminimų...',
  className,
  variant = 'hero'
}: MemorialSearchProps) {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Memorial[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  const latestQueryRef = useRef('')

  const supabase = createClient()

  const searchMemorials = useCallback(async (raw: string) => {
    const searchQuery = raw.trim()

    if (searchQuery.length < 3) {
      setResults([])
      setIsOpen(false)
      return
    }

    latestQueryRef.current = searchQuery
    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from('memorials')
        .select('id, slug, first_name, last_name, birth_date, death_date, profile_image_url')
        .eq('privacy', 'public')
        .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
        .order('last_name', { ascending: true })
        .limit(6)

      if (latestQueryRef.current !== searchQuery) return

      if (error) {
        setResults([])
      } else {
        setResults(data || [])
        setIsOpen(true)
      }
    } finally {
      if (latestQueryRef.current === searchQuery) {
        setIsLoading(false)
      }
    }
  }, [supabase])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      searchMemorials(query)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, searchMemorials])

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        dropdownRef.current?.contains(target) ||
        inputRef.current?.contains(target)
      ) return

      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((p) => Math.min(p + 1, results.length - 1))
        break

      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((p) => Math.max(p - 1, -1))
        break

      case 'Enter':
        e.preventDefault()

        if (selectedIndex < 0 && results.length > 0) {
          setSelectedIndex(0)
          return
        }

        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/memorial/${results[selectedIndex].slug}`)
          reset()
        } else {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
        break

      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const reset = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const clearSearch = () => {
    reset()
    inputRef.current?.focus()
  }

  const formatYears = (b: string | null, d: string | null) => {
    const birth = b ? new Date(b).getFullYear() : null
    const death = d ? new Date(d).getFullYear() : null

    if (birth && death) return `${birth} - ${death}`
    if (birth) return `g. ${birth}`
    if (death) return `m. ${death}`
    return null
  }

  const variantStyles = {
    hero: 'pl-12 pr-10 py-6 text-base backdrop-blur bg-background/90 border-border rounded-full shadow-lg',
    header: 'pl-10 pr-8 py-2 text-sm bg-background border-border rounded-full',
    page: 'pl-12 pr-10 py-4 text-base bg-background border-border rounded-lg',
  }

  return (
    <div className={cn('relative', className)}>
      {/* INPUT */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={variantStyles[variant]}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {(query || isLoading) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <button
                onClick={clearSearch}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
        >
          {results.length > 0 ? (
            <ul className="divide-y divide-border">
              {results.map((m, i) => (
                <li key={m.id}>
                  <Link
                    href={`/memorial/${m.slug}`}
                    className={cn(
                      'flex items-center gap-4 p-4 hover:bg-muted/50 min-h-[72px]',
                      selectedIndex === i && 'bg-muted/50'
                    )}
                    onClick={reset}
                    role="option"
                    aria-selected={selectedIndex === i}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                      {m.profile_image_url ? (
                        <Image
                          src={m.profile_image_url}
                          alt=""
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {m.first_name} {m.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatYears(m.birth_date, m.death_date)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.length >= 3 && !isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              Nieko nerasta pagal „{query}“
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
                                     }
