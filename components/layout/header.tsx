'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, User, ChevronDown, LogOut, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  locales,
  localeNames,
  type Locale,
} from '@/lib/i18n/config'

import {
  getNavItems,
  getUserMenu,
  adminItem,
} from '@/lib/nav/nav.config'

import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HeaderProps {
  locale?: Locale
  t?: any
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
  const [mobileOpen, setMobileOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const NAV = getNavItems(t)
  const USER_MENU = getUserMenu()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/auth/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? 'text-foreground underline'
                  : 'text-muted-foreground hover:text-foreground'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-2">

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
                  onClick={() => onLocaleChange?.(loc)}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* USER */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">

                <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                  {user.email}
                </div>

                {USER_MENU.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}

                {isAdmin && (
                  <>
                    <div className="my-1 border-t" />
                    <DropdownMenuItem asChild>
                      <Link href={adminItem.href} className="text-primary flex gap-2">
                        <Shield className="h-4 w-4" />
                        {adminItem.label}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <div className="my-1 border-t" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive flex gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Atsijungti
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Prisijungti</Link>
              </Button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-3 p-4">

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t pt-3 flex flex-col gap-2">

              {user ? (
                <>
                  {USER_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {isAdmin && (
                    <Link href={adminItem.href}>
                      {adminItem.label}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left"
                  >
                    Atsijungti
                  </button>
                </>
              ) : (
                <Link href="/auth/login">
                  Prisijungti
                </Link>
              )}

            </div>
          </nav>
        </div>
      )}
    </header>
  )
  }
