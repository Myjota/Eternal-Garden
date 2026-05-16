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

export const getUserMenu = (t?: any): NavItem[] => {
  const menu = t?.menu ?? {
    dashboard: 'Valdymas',
    profile: 'Paskyra',
    settings: 'Nustatymai',
    services: 'Paslaugos',
    createMemorial: 'Sukurti Atminimą',
  }

  return [
    { href: '/dashboard', label: menu.dashboard },
    { href: '/profile', label: menu.profile },
    { href: '/settings', label: menu.settings },
    { href: '/services', label: menu.services },
    { href: '/create', label: menu.createMemorial },
  ]
}

export const adminItem = (t?: any): NavItem => {
  const menu = t?.menu ?? { admin: 'Administravimas' }
  return {
    href: '/admin',
    label: menu.admin,
  }
}
