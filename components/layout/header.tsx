'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, User, ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Locale, localeNames, locales } from '@/lib/i18n/config'
import { type Translations } from '@/lib/i18n/locales/lt'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HeaderProps {
  locale: Locale
  t: Translations
  onLocaleChange?: (locale: Locale) => void
  user?: SupabaseUser | null
}

export function Header({ locale, t, onLocaleChange, user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    if (onLocaleChange) {
      onLocaleChange(newLocale)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // ✅ Active link logic (fix „Pradžia“ bug + nested routes)
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActive(href)
        ? 'text-foreground underline underline-offset-4 decoration-primary decoration-2'
        : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Eternal Garden"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass('/')}>
            {t.nav.home}
          </Link>

          <Link href="/memories" className={linkClass('/memories')}>
            {t.nav.memories}
          </Link>

          <Link href="/support" className={linkClass('/support')}>
            {t.nav.supportProject}
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-2 md:flex">
          
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                <span className="text-xs">{locale.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={locale === loc ? 'bg-accent' : ''}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[80px] truncate text-xs">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Mano atminimai</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=profile">Profilis</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Atsijungti
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" asChild>
                <Link href="/create">{t.nav.createMemorial}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login" className="gap-2">
                  <User className="h-4 w-4" />
                  {t.nav.login}
                </Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/create">{t.nav.createMemorial}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 p-4">
            
            <Link href="/" className={linkClass('/')} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.home}
            </Link>

            <Link href="/memories" className={linkClass('/memories')} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.memories}
            </Link>

            <Link href="/support" className={linkClass('/support')} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.supportProject}
            </Link>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              
              {/* Mobile language */}
              <div className="flex items-center gap-2">
                {locales.map((loc, i) => (
                  <span key={loc}>
                    <button
                      onClick={() => handleLocaleChange(loc)}
                      className={locale === loc ? 'font-bold' : 'text-muted-foreground'}
                    >
                      {loc.toUpperCase()}
                    </button>
                    {i < locales.length - 1 && ' / '}
                  </span>
                ))}
              </div>

              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/dashboard">Mano atminimai</Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full text-destructive"
                  >
                    Atsijungti
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/auth/login">{t.nav.login}</Link>
                </Button>
              )}

              <Button size="sm" asChild className="w-full">
                <Link href="/create">{t.nav.createMemorial}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
