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
  const debounceRef = useRef<NodeJS.Timeout>()

  const searchMemorials = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('memorials')
        .select('id, slug, first_name, last_name, birth_date, death_date, profile_image_url, biography')
        .eq('privacy', 'public')
        .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
        .order('last_name', { ascending: true })
        .limit(6)

      if (error) {
        console.error('Search error:', error)
        setResults([])
      } else {
        setResults(data || [])
        setIsOpen(true)
      }
    } catch (err) {
      console.error('Search failed:', err)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchMemorials(query)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, searchMemorials])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
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
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/memorial/${results[selectedIndex].slug}`)
          setIsOpen(false)
          setQuery('')
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const formatYears = (birthDate: string | null, deathDate: string | null) => {
    const birth = birthDate ? new Date(birthDate).getFullYear() : null
    const death = deathDate ? new Date(deathDate).getFullYear() : null
    
    if (birth && death) return `${birth} - ${death}`
    if (birth) return `g. ${birth}`
    if (death) return `m. ${death}`
    return null
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const variantStyles = {
    hero: 'pl-12 pr-10 py-6 text-base backdrop-blur bg-background/90 border-border rounded-full shadow-lg',
    header: 'pl-10 pr-8 py-2 text-sm bg-background border-border rounded-full',
    page: 'pl-12 pr-10 py-4 text-base bg-background border-border rounded-lg',
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className={cn(
            'text-muted-foreground',
            variant === 'header' ? 'h-4 w-4' : 'h-5 w-5'
          )} />
        </div>
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className={variantStyles[variant]}
        />
        {(query || isLoading) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : query && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
        >
          {results.length > 0 ? (
            <>
              <ul className="divide-y divide-border">
                {results.map((memorial, index) => (
                  <li key={memorial.id}>
                    <Link
                      href={`/memorial/${memorial.slug}`}
                      className={cn(
                        'flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors',
                        selectedIndex === index && 'bg-muted/50'
                      )}
                      onClick={() => {
                        setIsOpen(false)
                        setQuery('')
                      }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted overflow-hidden">
                        {memorial.profile_image_url ? (
                          <Image
                            src={memorial.profile_image_url}
                            alt={`${memorial.first_name} ${memorial.last_name}`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {memorial.first_name} {memorial.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatYears(memorial.birth_date, memorial.death_date)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {query.trim() && (
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  className="block p-3 text-center text-sm text-primary hover:bg-muted/50 border-t border-border transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Rodyti visus rezultatus &rarr;
                </Link>
              )}
            </>
          ) : query.length >= 2 && !isLoading ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Nieko nerasta pagal &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bandykite ieškoti kitu vardu
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
