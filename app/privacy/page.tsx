import type { Metadata } from 'next'
import { PrivacyClient } from './privacy-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Privatumo politika',
  description:
    'Eternal Garden privatumo politika. Sužinokite, kaip renkame, naudojame ir saugome jūsų asmens duomenis.',
  keywords: ['privatumo politika', 'GDPR', 'asmens duomenys', 'duomenų apsauga'],
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    type: 'website',
    title: 'Privatumo politika | Eternal Garden',
    description:
      'Eternal Garden privatumo politika. Sužinokite, kaip renkame, naudojame ir saugome jūsų asmens duomenis.',
    url: `${BASE_URL}/privacy`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Privatumo politika',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
