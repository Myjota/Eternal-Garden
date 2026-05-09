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

import { useLocale } from '@/lib/i18n/useLocale'

import {
  getNavItems,
  getUserMenu,
  adminItem,
} from '@/lib/nav/nav.config'

import { createClient } from '@/lib/supabase/client'

import type { User as SupabaseUser } from '@supabase/supabase-js'

type Translator = (key: string) => string

interface HeaderProps {
  t?: Translator
  user?: SupabaseUser | null
  isAdmin?: boolean
}

export function Header({
  t,
  user,
  isAdmin = false,
}: HeaderProps) {

  const [mobileOpen, setMobileOpen] = useState(false)

  // REALTIME USER STATE
  const [currentUser, setCurrentUser] =
    useState<SupabaseUser | null>(user ?? null)

  const router = useRouter()
  const pathname = usePathname()

  // CENTRALIZED LOCALE SYSTEM
  const { locale, setLocale } = useLocale({
    user: currentUser ?? undefined,
  })

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

  // REALTIME AUTH LISTENER
  useEffect(() => {
    const supabase = createClient()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
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

  // LANGUAGE CHANGE
  const handleLocaleChange = async (
    newLocale: 'lt' | 'en'
  ) => {
    try {
      await setLocale(newLocale)

      router.refresh()

    } catch (error) {
      console.error('Locale change error:', error)
    }
  }

  return (
    <header className="
      sticky
      top-0
      z-50
      border-b
      border-[#d4c4a8]/20
      bg-[#f6f2ec]/80
      backdrop-blur-md
    ">

      {/* TOP PREMIUM LINE */}
      <div className="
        h-[1px]
        bg-gradient-to-r
        from-transparent
        via-[#2d5a3d]/20
        to-transparent
      " />

      <div className="
        container
        mx-auto
        flex
        h-16
        items-center
        justify-between
        px-4
      ">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="Eternal Garden"
            width={40}
            height={40}
            priority
            className="
              h-10
              w-auto
              drop-shadow-[0_0_10px_rgba(45,90,61,0.15)]
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="
          hidden
          md:flex
          items-center
          gap-8
        ">

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                text-sm
                transition-colors

                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[1px]
                after:w-0
                after:bg-[#2d5a3d]
                after:transition-all
                after:duration-300

                hover:after:w-full

                ${
                  isActive(item.href)
                    ? 'text-[#2d5a3d] font-medium after:w-full'
                    : 'text-[#4a4a4a] hover:text-[#2d5a3d]'
                }
              `}
            >
              {item.label}
            </Link>
          ))}

        </nav>

        {/* RIGHT SIDE */}
        <div className="
          hidden
          md:flex
          items-center
          gap-2
        ">

          {/* LANGUAGE */}
          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="
                  text-[#4a4a4a]
                  hover:bg-[#ede7dd]
                  hover:text-[#2d5a3d]
                "
              >
                {locale.toUpperCase()}

                <ChevronDown className="
                  ml-1
                  h-3
                  w-3
                " />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="
                border-[#d4c4a8]/30
                bg-white/95
                backdrop-blur-md
              "
            >

              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() =>
                    handleLocaleChange(loc)
                  }
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                  "
                >

                  <span>
                    {localeNames[loc]}
                  </span>

                  {locale === loc && (
                    <Check className="
                      h-4
                      w-4
                      text-[#2d5a3d]
                    " />
                  )}

                </DropdownMenuItem>
              ))}

            </DropdownMenuContent>

          </DropdownMenu>

          {/* USER */}
          {currentUser ? (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    rounded-full
                    hover:bg-[#ede7dd]
                  "
                >
                  <User className="
                    h-4
                    w-4
                    text-[#2d5a3d]
                  " />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                  w-56
                  border-[#d4c4a8]/30
                  bg-white/95
                  backdrop-blur-md
                "
              >

                {/* EMAIL */}
                <div className="
                  truncate
                  border-b
                  px-3
                  py-2
                  text-xs
                  text-muted-foreground
                ">
                  {currentUser.email}
                </div>

                {/* USER MENU */}
                {USER_MENU.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {/* ADMIN */}
                {isAdmin && (
                  <>
                    <div className="my-1 border-t" />

                    <DropdownMenuItem asChild>
                      <Link
                        href={adminItem.href}
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-2
                          text-[#2d5a3d]
                        "
                      >
                        <Shield className="
                          h-4
                          w-4
                        " />

                        {adminItem.label}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {/* LOGOUT */}
                <div className="my-1 border-t" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-red-500
                    focus:text-red-500
                  "
                >
                  <LogOut className="
                    h-4
                    w-4
                  " />

                  Atsijungti
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="
                text-[#2d5a3d]
                hover:bg-[#ede7dd]
              "
            >
              <Link href="/auth/login">
                Prisijungti
              </Link>
            </Button>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="Toggle menu"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="
            text-[#2d5a3d]
            transition-transform
            duration-200
            active:scale-95
            md:hidden
          "
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="
          border-t
          border-[#d4c4a8]/20
          bg-[#f6f2ec]
          md:hidden
        ">

          <nav className="
            flex
            flex-col
            gap-1
            p-4
          ">

            {/* NAVIGATION */}
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={`
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  transition-colors

                  ${
                    isActive(item.href)
                      ? 'bg-[#e7dfd1] text-[#2d5a3d]'
                      : 'text-[#4a4a4a] hover:bg-[#ede7dd]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* MOBILE LANGUAGE */}
            <div className="
              mt-3
              border-t
              border-[#d4c4a8]/20
              pt-3
            ">

              <div className="
                mb-2
                px-3
                text-xs
                uppercase
                tracking-wide
                text-muted-foreground
              ">
                Language
              </div>

              <div className="flex gap-2 px-3">

                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() =>
                      handleLocaleChange(loc)
                    }
                    className={`
                      rounded-md
                      border
                      px-3
                      py-1
                      text-sm
                      transition-colors

                      ${
                        locale === loc
                          ? 'border-[#2d5a3d] bg-[#2d5a3d] text-white'
                          : 'border-[#d4c4a8]/40 bg-white text-[#4a4a4a]'
                      }
                    `}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}

              </div>

            </div>

            {/* USER SECTION */}
            <div className="
              mt-3
              border-t
              border-[#d4c4a8]/20
              pt-3
            ">

              {currentUser ? (
                <div className="
                  flex
                  flex-col
                  gap-1
                ">

                  {/* EMAIL */}
                  <div className="
                    mb-2
                    px-3
                    text-xs
                    text-muted-foreground
                  ">
                    {currentUser.email}
                  </div>

                  {/* USER LINKS */}
                  {USER_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        text-[#4a4a4a]
                        transition-colors
                        hover:bg-[#ede7dd]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* ADMIN */}
                  {isAdmin && (
                    <Link
                      href={adminItem.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        text-[#2d5a3d]
                        transition-colors
                        hover:bg-[#ede7dd]
                      "
                    >
                      {adminItem.label}
                    </Link>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="
                      rounded-lg
                      px-3
                      py-2
                      text-left
                      text-sm
                      text-red-500
                      transition-colors
                      hover:bg-red-50
                    "
                  >
                    Atsijungti
                  </button>

                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    block
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    text-[#2d5a3d]
                    transition-colors
                    hover:bg-[#ede7dd]
                  "
                >
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
