'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Flame,
  Palette,
  Settings,
  User,
  CreditCard,
  HelpCircle,
} from 'lucide-react'

interface SidebarItem {
  label: string
  href: string
  icon: React.ElementType
}

const sidebarItems: SidebarItem[] = [
  { label: 'Apžvalga', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Mano memorialai', href: '/dashboard/memorials', icon: Flame },
  { label: 'Temos', href: '/dashboard/themes', icon: Palette },
  { label: 'Profilis', href: '/dashboard/profile', icon: User },
  { label: 'Prenumerata', href: '/dashboard/subscription', icon: CreditCard },
  { label: 'Nustatymai', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-border bg-card">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-primary" />
          <span className="font-serif font-semibold text-lg">Eternal Garden</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Help */}
      <div className="p-3 border-t border-border">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          Pagalba
        </Link>
      </div>
    </aside>
  )
}
