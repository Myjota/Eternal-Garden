import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ServicesClient } from './services-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Paslaugos',
  description:
    'Sužinokite apie Eternal Garden mokamas ir nemokamas paslaugas. Sukurkite gražų atminimo puslapį savo mylimam žmogui.',
  keywords: [
    'paslaugos',
    'mokamos paslaugos',
    'premium',
    'atminimas',
    'memorialas',
  ],
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    type: 'website',
    title: 'Paslaugos | Eternal Garden',
    description:
      'Sužinokite apie Eternal Garden mokamas ir nemokamas paslaugas.',
    url: `${BASE_URL}/services`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Paslaugos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paslaugos | Eternal Garden',
    description: 'Sužinokite apie Eternal Garden mokamas ir nemokamas paslaugas.',
  },
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ServicesClient user={user} />
}
