'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  type Locale,
  localeNames,
  locales,
} from '@/lib/i18n/config'

import { type Translations } from '@/lib/i18n/locales/lt'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { type ThemeId } from '@/lib/themes/config'

interface HeaderProps {
  locale?: Locale
  t?: Translations
  onLocaleChange?: (locale: Locale) => void
  user?: SupabaseUser | null
  theme?: ThemeId
  onThemeChange?: (theme: ThemeId) => void
}

export function Header({
  locale = 'lt',
  t,
  onLocaleChange,
  user,
  theme,
  onThemeChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const nav = t?.nav ?? {
    home: 'Pradžia',
    supportProject: 'Parama',
    createMemorial: 'Sukurti atminimą',
    login: 'Prisijungti',
  }

  const handleLocaleChange = (newLocale: Locale) => {
    onLocaleChange?.(newLocale)
  }

  const handleLogout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push('/')
    router.refresh()
  }

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
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
            {nav.home}
          </Link>

          <Link href="/support" className={linkClass('/support')}>
            {nav.supportProject}
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-2 md:flex">

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 px-2"
              >
                <span className="text-xs">
                  {locale.toUpperCase()}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* USER */}
          {user ? (
            <>
              <Button size="sm" asChild>
                <Link href="/create">
                  {nav.createMemorial}
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">

                  <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                    {user.email ?? 'Account'}
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      Valdymas
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      Paskyra
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      Nustatymai
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/services">
                      Paslaugos
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/create">
                      Sukurti Atminimą
                    </Link>
                  </DropdownMenuItem>

                  <div className="my-1 border-t border-border" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Atsijungti
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">
                  {nav.login}
                </Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/create">
                  {nav.createMemorial}
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 p-4">

            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              {nav.home}
            </Link>

            <Link href="/support" onClick={() => setMobileMenuOpen(false)}>
              {nav.supportProject}
            </Link>

            <div className="pt-4 border-t border-border flex flex-col gap-2">

              <Button size="sm" asChild>
                <Link href="/create">
                  {nav.createMemorial}
                </Link>
              </Button>

              {!user && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">
                    {nav.login}
                  </Link>
                </Button>
              )}

              {user && (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">
                      Valdymas
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile">
                      Paskyra
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" asChild>
                    <Link href="/settings">
                      Nustatymai
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">
                      Paslaugos
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Atsijungti
                  </Button>
                </>
              )}

            </div>

          </nav>
        </div>
      )}
    </header>
  )
      }
