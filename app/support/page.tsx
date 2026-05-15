import type { Metadata } from 'next'
import { SupportClient } from './support-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Paremti projektą',
  description:
    'Paremkite Eternal Garden projektą ir padėkite mums kurti dar geresnius skaitmeninius atminimo puslapius.',
  keywords: ['parama', 'paremti', 'donacija', 'aukoti', 'eternal garden'],
  alternates: {
    canonical: `${BASE_URL}/support`,
  },
  openGraph: {
    type: 'website',
    title: 'Paremti projektą | Eternal Garden',
    description:
      'Paremkite Eternal Garden projektą ir padėkite mums kurti dar geresnius skaitmeninius atminimo puslapius.',
    url: `${BASE_URL}/support`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Paremti projektą',
      },
    ],
  },
}

export default function SupportPage() {
  return <SupportClient />
}
