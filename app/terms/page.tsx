import type { Metadata } from 'next'
import { TermsClient } from './terms-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Pirkimo taisyklės',
  description:
    'Eternal Garden pirkimo taisyklės ir naudojimo sąlygos. Sužinokite apie paslaugų užsakymą, kainas ir grąžinimus.',
  keywords: ['pirkimo taisyklės', 'naudojimo sąlygos', 'taisyklės', 'paslaugų sutartis'],
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    type: 'website',
    title: 'Pirkimo taisyklės | Eternal Garden',
    description:
      'Eternal Garden pirkimo taisyklės ir naudojimo sąlygos. Sužinokite apie paslaugų užsakymą, kainas ir grąžinimus.',
    url: `${BASE_URL}/terms`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Pirkimo taisyklės',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return <TermsClient />
}
