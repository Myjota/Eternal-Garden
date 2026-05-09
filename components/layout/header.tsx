'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import {
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  Shield,
  Check,
} from 'lucide-react'

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
} from '@/lib/i18n/config'

import { getTranslations } from '@/lib/i18n'

import {
  getNavItems,
  getUserMenu,
  adminItem,
} from '@/lib/nav/nav.config'

import { createClient } from '@/lib/supabase/client'

import { useLocaleContext } from '@/providers/locale-provider'

import type { User as SupabaseUser } from '@supabase/supabase-js'

interface HeaderProps {
  user?: SupabaseUser | null
  isAdmin?: boolean
}

export function Header({
  user,
  isAdmin = false,
}: HeaderProps) {

  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentUser, setCurrentUser] =
    useState<SupabaseUser | null>(user ?? null)

  const router = useRouter()
  const pathname = usePathname()

  // ✅ SINGLE SOURCE OF TRUTH (FIXED)
  const { locale, setLocale } = useLocaleContext()

  // ✅ REACTIVE TRANSLATIONS
  const t = getTranslations(locale)

  const NAV = getNavItems(t)
  const USER_MENU = getUserMenu()

  // ACTIVE LINK
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    )
  }

  // AUTH LISTENER
  useEffect(() => {
    const supabase = createClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // LOGOUT
  const handleLogout = async () => {
    try {
      const supabase = createClient()

      await supabase.auth.signOut()

      setMobileOpen(false)

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // LANGUAGE SWITCH
  const handleLocaleChange = async (
    newLocale: 'lt' | 'en'
  ) => {
    try {
      await setLocale(newLocale)

      // optional but safe for server components
      router.refresh()

    } catch (error) {
      console.error('Locale change error:', error)
    }
  }

  return (
    <header className="
      sticky top-0 z-50
      border-b border-[#d4c4a8]/20
      bg-[#f6f2ec]/80
      backdrop-blur-md
    ">

      {/* TOP LINE */}
      <div className="
        h-[1px]
        bg-gradient-to-r
        from-transparent
        via-[#2d5a3d]/20
        to-transparent
      " />

      <div className="
        container mx-auto
        flex h-16
        items-center
        justify-between
        px-4
      ">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Eternal Garden"
            width={40}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-8">

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                text-sm transition-colors
                ${
                  isActive(item.href)
                    ? 'text-[#2d5a3d] font-medium'
                    : 'text-[#4a4a4a] hover:text-[#2d5a3d]'
                }
              `}
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
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() =>
                    handleLocaleChange(loc)
                  }
                  className="flex justify-between"
                >
                  <span>{localeNames[loc]}</span>

                  {locale === loc && (
                    <Check className="h-4 w-4 text-[#2d5a3d]" />
                  )}
                </DropdownMenuItem>
              ))}

            </DropdownMenuContent>

          </DropdownMenu>

          {/* USER */}
          {currentUser ? (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4 text-[#2d5a3d]" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <div className="px-3 py-2 text-xs text-muted-foreground">
                  {currentUser.email}
                </div>

                {USER_MENU.map((item) => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {isAdmin && (
                  <>
                    <div className="my-1 border-t" />

                    <DropdownMenuItem asChild>
                      <Link
                        href={adminItem.href}
                        className="flex gap-2 text-[#2d5a3d]"
                      >
                        <Shield className="h-4 w-4" />
                        {adminItem.label}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <div className="my-1 border-t" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 flex gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Atsijungti
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/login">
                Prisijungti
              </Link>
            </Button>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#2d5a3d]"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE */}
      {mobileOpen && (
        <div className="md:hidden border-t">

          <nav className="p-4 flex flex-col gap-2">

            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

          </nav>

        </div>
      )}

    </header>
  )
}
