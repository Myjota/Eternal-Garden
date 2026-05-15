import type { Metadata } from 'next'
import { AboutClient } from './about-client'

const BASE_URL = 'https://eternalgarden.eu'

export const metadata: Metadata = {
  title: 'Apie mus',
  description:
    'Sužinokite apie Eternal Garden komandą ir mūsų misiją kurti ilgalaikius skaitmeninius atminimo puslapius.',
  keywords: ['apie mus', 'eternal garden', 'komanda', 'misija', 'skaitmeniniai memorialai'],
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    type: 'website',
    title: 'Apie mus | Eternal Garden',
    description:
      'Sužinokite apie Eternal Garden komandą ir mūsų misiją kurti ilgalaikius skaitmeninius atminimo puslapius.',
    url: `${BASE_URL}/about`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Apie mus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apie mus | Eternal Garden',
    description:
      'Sužinokite apie Eternal Garden komandą ir mūsų misiją kurti ilgalaikius skaitmeninius atminimo puslapius.',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
