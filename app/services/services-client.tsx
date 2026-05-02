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
    title: 'Žvakutės uždegimas',
    desc: 'Uždekite virtualias žvakutes atminimo puslapiuose',
    price: 'Nemokama',
    status: 'Galima',
  },
  {
    title: 'Atminimo puslapio išryškinimas',
    desc: 'Padidinkite atminimo puslapio matomumą',
    price: '€4.99',
    status: 'Netrukus',
  },
  {
    title: 'Šeimos ženklelis',
    desc: 'Patvirtintas šeimos nario ženklelis',
    price: '€9.99',
    status: 'Netrukus',
  },
  {
    title: 'Atminimo puslapio eksportas',
    desc: 'Atsisiųskite atminimo puslapį kaip spausdinamą dokumentą',
    price: '€2.99',
    status: 'Planuojama',
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
        <h1 className="text-2xl font-semibold mb-2">Paslaugos</h1>

        <p className="text-sm text-muted-foreground mb-6">
          Papildomos paslaugos atminimo puslapiams tobulinti
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
                disabled={service.status !== 'Galima'}
              >
                {service.status === 'Galima' ? 'Aktyvuoti' : 'Nepasiekiama'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
