'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  useState,
  useEffect,
  useMemo,
} from 'react'

import {
  useRouter,
  usePathname,
} from 'next/navigation'

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

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [currentUser, setCurrentUser] =
    useState<SupabaseUser | null>(
      user ?? null
    )

  const router = useRouter()
  const pathname = usePathname()

  // LOCALE
  const { locale, setLocale } =
    useLocaleContext()

  // TRANSLATIONS
  const t = getTranslations(locale)

  // MEMOIZED NAV
  const NAV = useMemo(
    () => getNavItems(t),
    [t]
  )

  const USER_MENU = useMemo(
    () => getUserMenu(t),
    [t]
  )

  // ACTIVE LINK
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

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
      console.error(
        'Logout error:',
        error
      )
    }
  }

  // LANGUAGE SWITCH
  const handleLocaleChange = async (
    newLocale: 'lt' | 'en'
  ) => {

    try {

      await setLocale(newLocale)

      router.refresh()

    } catch (error) {
      console.error(
        'Locale change error:',
        error
      )
    }
  }

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-[#d4c4a8]/20
        bg-[#f8f5ef]/70
        backdrop-blur-xl
        shadow-sm
        supports-[backdrop-filter]:bg-[#f8f5ef]/55
      "
    >

      {/* TOP LINE */}
      <div
        className="
          h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#2d5a3d]/20
          to-transparent
        "
      />

      <div
        className="
          container mx-auto
          flex h-16
          items-center
          justify-between
          px-4
        "
      >

        {/* LEFT SIDE */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link
            href="/"
            className="
              flex items-center
              gap-2
              shrink-0
            "
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
                transition-transform
                duration-300
                hover:scale-105
              "
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">

            {NAV.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className={`
                  group
                  relative
                  text-sm
                  pb-1
                  transition-all
                  duration-200

                  ${
                    isActive(item.href)
                      ? 'text-[#2d5a3d] font-semibold'
                      : 'text-[#4a4a4a] hover:text-[#2d5a3d]'
                  }
                `}
              >

                {item.label}

                <span
                  className={`
                    absolute
                    left-0
                    -bottom-[2px]
                    h-[2px]
                    rounded-full
                    bg-[#2d5a3d]
                    transition-all
                    duration-300

                    ${
                      isActive(item.href)
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }
                  `}
                />

              </Link>

            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className={`
                  group
                  relative
                  text-sm
                  pb-1
                  transition-all
                  duration-200
                  flex
                  items-center
                  gap-1.5
                  text-amber-700
                  hover:text-amber-800

                  ${
                    isActive('/admin')
                      ? 'text-amber-800 font-semibold'
                      : ''
                  }
                `}
              >

                <Shield className="h-4 w-4" />
                Administravimas

                <span
                  className={`
                    absolute
                    left-0
                    -bottom-[2px]
                    h-[2px]
                    rounded-full
                    bg-amber-700
                    transition-all
                    duration-300

                    ${
                      isActive('/admin')
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }
                  `}
                />

              </Link>
            )}

          </nav>

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            hidden md:flex
            items-center
            gap-3
          "
        >

          {/* LANGUAGE */}
          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button
                variant="ghost"
                size="sm"
                className="
                  rounded-full
                  border border-[#d4c4a8]/40
                  bg-white/50
                  hover:bg-[#efe7da]
                  transition-all
                "
              >
                {locale.toUpperCase()}

                <ChevronDown
                  className="
                    ml-1
                    h-3
                    w-3
                  "
                />
              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="
                border-[#d4c4a8]/40
                bg-[#fdfbf8]
                shadow-xl
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
                    justify-between
                    cursor-pointer
                  "
                >

                  <span>
                    {localeNames[loc]}
                  </span>

                  {locale === loc && (
                    <Check
                      className="
                        h-4
                        w-4
                        text-[#2d5a3d]
                      "
                    />
                  )}

                </DropdownMenuItem>

              ))}

            </DropdownMenuContent>

          </DropdownMenu>

          {/* AUTH */}
          <div
            className="
              w-[140px]
              flex
              justify-end
            "
          >

            {currentUser ? (

              <DropdownMenu>

                <DropdownMenuTrigger asChild>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="
                      rounded-full
                      border border-[#d4c4a8]/40
                      bg-white/60
                      hover:bg-[#efe7da]
                      transition-all
                    "
                  >

                    <User
                      className="
                        h-4
                        w-4
                        text-[#2d5a3d]
                      "
                    />

                  </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="
                    w-60
                    border-[#d4c4a8]/40
                    bg-[#fdfbf8]
                    shadow-xl
                  "
                >

                  <div
                    className="
                      px-3
                      py-2
                      text-xs
                      text-muted-foreground
                      border-b
                    "
                  >
                    {currentUser.email}
                  </div>

                  {USER_MENU.map((item) => (

                    <DropdownMenuItem
                      asChild
                      key={item.href}
                    >

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
                          href={adminItem(t).href}
                          className="
                            flex
                            gap-2
                            text-[#2d5a3d]
                          "
                        >

                          <Shield
                            className="
                              h-4
                              w-4
                            "
                          />

                          {adminItem(t).label}

                        </Link>

                      </DropdownMenuItem>

                    </>
                  )}

                  <div className="my-1 border-t" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="
                      flex
                      gap-2
                      text-red-500
                      cursor-pointer
                    "
                  >

                    <LogOut
                      className="
                        h-4
                        w-4
                      "
                    />

                    {t.nav.logout}

                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>

            ) : (

              <Button
                asChild
                size="sm"
                className="
                  min-w-[120px]
                  rounded-full
                  bg-[#2d5a3d]
                  hover:bg-[#244732]
                  text-white
                  shadow-md
                  transition-all
                "
              >

                <Link href="/auth/login">
                  {t.nav.login}
                </Link>

              </Button>

            )}

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="
            md:hidden
            text-[#2d5a3d]
            transition-transform
            duration-200
          "
          aria-label="Toggle Menu"
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

        <div
          className="
            md:hidden
            border-t
            border-[#d4c4a8]/20
            bg-[#fdfbf8]
            backdrop-blur-xl
          "
        >

          <nav
            className="
              p-4
              flex
              flex-col
              gap-1
            "
          >

            {NAV.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={`
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  transition-colors

                  ${
                    isActive(item.href)
                      ? 'bg-[#efe7da] text-[#2d5a3d] font-medium'
                      : 'hover:bg-[#efe7da]'
                  }
                `}
              >

                {item.label}

              </Link>

            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  transition-colors
                  bg-amber-50
                  text-amber-700
                  font-medium
                  border border-amber-200
                  flex
                  gap-2
                  items-center
                  hover:bg-amber-100
                "
              >

                <Shield className="h-4 w-4" />
                Administravimas

              </Link>
            )}

            <div
              className="
                my-3
                border-t
                border-[#d4c4a8]/20
              "
            />

            {/* MOBILE LANGUAGE */}
            <div className="flex gap-2">

              {locales.map((loc) => (

                <Button
                  key={loc}
                  variant={
                    locale === loc
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => {
                    handleLocaleChange(loc)
                    setMobileOpen(false)
                  }}
                  className={
                    locale === loc
                      ? 'bg-[#2d5a3d]'
                      : ''
                  }
                >

                  {loc.toUpperCase()}

                </Button>

              ))}

            </div>

            {/* MOBILE AUTH */}
            <div className="mt-4">

              {currentUser ? (

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="
                    w-full
                    justify-start
                    rounded-xl
                  "
                >

                  <LogOut
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  {t.nav.logout}

                </Button>

              ) : (

                <Button
                  asChild
                  className="
                    w-full
                    rounded-xl
                    bg-[#2d5a3d]
                    hover:bg-[#244732]
                  "
                  onClick={() => setMobileOpen(false)}
                >

                  <Link href="/auth/login">
                    {t.nav.login}
                  </Link>

                </Button>

              )}

            </div>

          </nav>

        </div>

      )}

    </header>
  )
      }