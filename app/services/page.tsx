import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ServicesClient } from './services-client'

export const metadata: Metadata = {
  title: 'Paslaugos | Eternal Garden',
  description:
    'Sužinokite apie Eternal Garden mokamas ir nemokamas paslaugas. Sukurkite gražų atminimo puslapį savo mylimam žmogui.',
  keywords: [
    'paslaugos',
    'mokamos paslaugos',
    'premium',
    'atminimas',
    'memorialas',
  ],
  openGraph: {
    type: 'website',
    title: 'Paslaugos | Eternal Garden',
    description:
      'Sužinokite apie Eternal Garden mokamas ir nemokamas paslaugas.',
    url: 'https://eternalgarden.eu/services',
    images: [
      {
        url: 'https://eternalgarden.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Paslaugos',
      },
    ],
  },
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ServicesClient user={user} />
}
