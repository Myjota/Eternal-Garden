'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
}

interface SidebarProps {
  items: SidebarItem[]
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Sidebar({ items, header, footer, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'hidden lg:flex lg:flex-col w-64 border-r border-border bg-card',
        className
      )}
    >
      {/* Header */}
      {header && (
        <div className="h-16 flex items-center px-6 border-b border-border">
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
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

      {/* Footer */}
      {footer && (
        <div className="p-3 border-t border-border">{footer}</div>
      )}
    </aside>
  )
}
