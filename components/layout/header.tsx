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
  Shield,
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

interface HeaderProps {
  locale?: Locale
  t?: Translations
  onLocaleChange?: (locale: Locale) => void
  user?: SupabaseUser | null
  isAdmin?: boolean
}

export function Header({
  locale = 'lt',
  t,
  onLocaleChange,
  user,
  isAdmin = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const nav = t?.nav ?? {
    home: 'Pradžia',
    supportProject: 'Parama',
    createMemorial: 'Sukurti atminimą',
    login: 'Prisijungti',
  }

  // ✅ 1 SOURCE OF TRUTH - PUBLIC NAV
  const NAV_ITEMS = [
    { href: '/', label: nav.home },
    { href: '/support', label: nav.supportProject },
  ]

  // ✅ USER MENU CONFIG
  const USER_MENU = [
    { href: '/dashboard', label: 'Valdymas' },
    { href: '/profile', label: 'Paskyra' },
    { href: '/settings', label: 'Nustatymai' },
    { href: '/services', label: 'Paslaugos' },
    { href: '/create', label: 'Sukurti Atminimą' },
  ]

  const ADMIN_ITEM = {
    href: '/admin',
    label: 'Administravimas',
  }

  const handleLocaleChange = (newLocale: Locale) => {
    onLocaleChange?.(newLocale)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()

    router.replace('/auth/login')
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

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Eternal Garden"
            width={40}
            height={40}
            className="h-10"
            style={{ width: 'auto', height: '40px' }}
          />
        </Link>

        {/* DESKTOP NAV (PUBLIC) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-2 md:flex">

          {/* LANGUAGE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {locale.toUpperCase()}
                <ChevronDown className="h-3 w-3 ml-1" />
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
                <Link href="/create">{nav.createMemorial}</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">

                  <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                    {user.email ?? 'Account'}
                  </div>

                  {USER_MENU.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}

                  {isAdmin && (
                    <>
                      <div className="my-1 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link href={ADMIN_ITEM.href} className="text-primary flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          {ADMIN_ITEM.label}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <div className="my-1 border-t border-border" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Atsijungti
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">{nav.login}</Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/create">{nav.createMemorial}</Link>
              </Button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 p-4">

            {/* PUBLIC NAV */}
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-border flex flex-col gap-2">

              <Button size="sm" asChild>
                <Link href="/create">{nav.createMemorial}</Link>
              </Button>

              {!user && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">{nav.login}</Link>
                </Button>
              )}

              {user && (
                <>
                  {USER_MENU.map((item) => (
                    <Button key={item.href} variant="outline" size="sm" asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}

                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild className="text-primary">
                      <Link href={ADMIN_ITEM.href}>
                        <Shield className="h-4 w-4 mr-2" />
                        {ADMIN_ITEM.label}
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
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
