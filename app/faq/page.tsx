import type { Metadata } from 'next'
import { FAQClient } from './faq-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Dažniausiai užduodami klausimai',
  description:
    'Atsakymai į dažniausiai užduodamus klausimus apie Eternal Garden. Sužinokite apie paslaugas, kainas ir funkcijas.',
  keywords: ['DUK', 'klausimai', 'atsakymai', 'pagalba', 'FAQ', 'eternal garden'],
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
  openGraph: {
    type: 'website',
    title: 'Dažniausiai užduodami klausimai | Eternal Garden',
    description:
      'Atsakymai į dažniausiai užduodamus klausimus apie Eternal Garden. Sužinokite apie paslaugas, kainas ir funkcijas.',
    url: `${BASE_URL}/faq`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - DUK',
      },
    ],
  },
}

export default function FAQPage() {
  return <FAQClient />
}
