'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import type { User } from '@supabase/supabase-js'

interface ServicesClientProps {
  user: User | null
}

const services = [
  {
    title: 'Candle Memory',
    desc: 'Light virtual candles on memorials',
    price: 'Free',
    status: 'Available',
  },
  {
    title: 'Memorial Boost',
    desc: 'Increase visibility of a memorial',
    price: '€4.99',
    status: 'Coming soon',
  },
  {
    title: 'Family Badge',
    desc: 'Verified family member badge',
    price: '€9.99',
    status: 'Coming soon',
  },
  {
    title: 'Legacy Page Export',
    desc: 'Download memorial as printable page',
    price: '€2.99',
    status: 'Planned',
  },
]

export function ServicesClient({ user }: ServicesClientProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const t = getTranslations(locale)

  return (
    <>
      <Header
        locale={locale}
        t={t}
        onLocaleChange={setLocale}
        user={user}
      />

      <div className="container mx-auto py-10 max-w-5xl">
        <h1 className="text-2xl font-semibold mb-2">Services</h1>

        <p className="text-sm text-muted-foreground mb-6">
          Optional services to enhance memorials and legacy pages
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium">{service.title}</h2>

                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                  {service.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{service.desc}</p>

              <p className="text-sm font-semibold">{service.price}</p>

              <Button
                className="w-full"
                disabled={service.status !== 'Available'}
              >
                {service.status === 'Available' ? 'Activate' : 'Not available'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
