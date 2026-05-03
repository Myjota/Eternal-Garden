import { type Locale } from '@/lib/i18n/config'

export type NavItem = {
  href: string
  label: string
}

export const getNavItems = (t?: any): NavItem[] => {
  const nav = t?.nav ?? {
    home: 'Pradžia',
    supportProject: 'Parama',
    createMemorial: 'Sukurti atminimą',
    login: 'Prisijungti',
  }

  return [
    { href: '/', label: nav.home },
    { href: '/support', label: nav.supportProject },
  ]
}

export const getUserMenu = (): NavItem[] => [
  { href: '/dashboard', label: 'Valdymas' },
  { href: '/profile', label: 'Paskyra' },
  { href: '/settings', label: 'Nustatymai' },
  { href: '/services', label: 'Paslaugos' },
  { href: '/create', label: 'Sukurti Atminimą' },
]

export const adminItem: NavItem = {
  href: '/admin',
  label: 'Administravimas',
}
