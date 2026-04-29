'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, Globe, User, ChevronDown, LogOut, Palette } from 'lucide-react'
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
import { themeConfigs, type ThemeId } from '@/lib/themes/config'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HeaderProps {
  locale: Locale
  t: Translations
  onLocaleChange?: (locale: Locale) => void
  theme?: ThemeId
  onThemeChange?: (theme: ThemeId) => void
  user?: SupabaseUser | null
}

const themeIcons: Record<ThemeId, string> = {
  garden: '🌳',
  marble: '🏛️',
  orthodox: '☦️',
  eternal_night: '🌙',
  rainbow_bridge: '🌈',
  sunny_window: '☀️',
}

export function Header({ locale, t, onLocaleChange, theme = 'garden', onThemeChange, user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLocaleChange = (newLocale: Locale) => {
    if (onLocaleChange) {
      onLocaleChange(newLocale)
    }
  }

  const handleThemeChange = (newTheme: ThemeId) => {
    if (onThemeChange) {
      onThemeChange(newTheme)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const currentTheme = themeConfigs[theme]

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
            className="h-10 w-10"
          />
          <span className="font-serif text-xl font-semibold text-foreground">
            Eternal Garden
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground underline underline-offset-4 decoration-primary decoration-2"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/memories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.memories}
          </Link>
          <Link
            href="/support"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.supportProject}
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                <Globe className="h-4 w-4" />
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

          {/* Theme Selector */}
          {onThemeChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2">
                  <span className="text-sm">{themeIcons[theme]}</span>
                  <span className="text-xs max-w-[60px] truncate">{currentTheme?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {Object.values(themeConfigs).map((themeConfig) => (
                  <DropdownMenuItem
                    key={themeConfig.id}
                    onClick={() => handleThemeChange(themeConfig.id)}
                    className={`flex items-center justify-between ${theme === themeConfig.id ? 'bg-accent' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{themeIcons[themeConfig.id]}</span>
                      <span>{themeConfig.name}</span>
                    </span>
                    {themeConfig.isPremium && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {user ? (
            /* User is logged in */
            <>
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
            /* User is not logged in */
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            <Link
              href="/"
              className="text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              href="/memories"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.memories}
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.supportProject}
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {/* Mobile Language */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">
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
                </span>
              </div>
              
              {/* Mobile Theme */}
              {onThemeChange && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Palette className="h-4 w-4" />
                  {Object.values(themeConfigs).slice(0, 3).map((themeConfig) => (
                    <button
                      key={themeConfig.id}
                      onClick={() => handleThemeChange(themeConfig.id)}
                      className={`text-xs px-2 py-1 rounded ${
                        theme === themeConfig.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {themeIcons[themeConfig.id]} {themeConfig.name}
                    </button>
                  ))}
                </div>
              )}

              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/dashboard">Mano atminimai</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-destructive">
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
