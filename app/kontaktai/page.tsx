import type { Metadata } from 'next'
import { ContactClient } from './contact-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Kontaktai',
  description:
    'Susisiekite su Eternal Garden komanda. Atsakysime į visus jūsų klausimus apie skaitmeninius atminimo puslapius.',
  keywords: ['kontaktai', 'susisiekti', 'el. paštas', 'pagalba', 'klausimas'],
  alternates: {
    canonical: `${BASE_URL}/kontaktai`,
  },
  openGraph: {
    type: 'website',
    title: 'Kontaktai | Eternal Garden',
    description:
      'Susisiekite su Eternal Garden komanda. Atsakysime į visus jūsų klausimus.',
    url: `${BASE_URL}/kontaktai`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Kontaktai',
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactClient />
}
