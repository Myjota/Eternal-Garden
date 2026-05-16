import type {
  Metadata,
  Viewport,
} from 'next'

import {
  Inter,
  Playfair_Display,
} from 'next/font/google'

import AnalyticsGate from '@/components/AnalyticsGate'

import './globals.css'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/server'
import { LocaleProvider } from '@/providers/locale-provider'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const siteUrl = 'https://eternalgarden.eu'
const siteName = 'Eternal Garden'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Skaitmeninė atminimo vieta kapinės`,
    template: `%s | ${siteName}`,
  },
  description:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
  keywords: [
    'skaitmeninis atminimas',
    'skaitmeninis memorialas',
    'šeimos medis',
    'skaitmeninės kapinės',
    'eternal garden',
    'digital memorial',
    'family tree',
  ],
  authors: [
    {
      name: 'Olegas&Andrius Systems LLC',
      url: siteUrl,
    },
  ],
  creator: 'Olegas&Andrius Systems LLC',
  publisher: 'Eternal Garden',
  verification: {
    google: 'bSkiHT-YJWJl9Dm5J3A5omcwFLdlIAvZyuj3bT8MfTw',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'lt-LT': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'lt_LT',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Skaitmeninė atminimo vieta`,
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Skaitmeninė atminimo vieta`,
        type: 'image/png',
      },
      {
        url: `${siteUrl}/og-image-square.png`,
        width: 800,
        height: 800,
        alt: `${siteName} - Skaitmeninė atminimo vieta`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@eternalgarden',
    title: `${siteName} | Skaitmeninė atminimo vieta`,
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    creator: '@eternalgarden',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Memorial',
  classification: 'Memorial Service',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  let preferredLanguage: 'lt' | 'en' = 'lt'
  let isAdmin = false

  try {
    const supabase = createClient()

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser ?? null

    if (authUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('preferred_language, is_admin')
        .eq('id', authUser.id)
        .single()

      if (profile?.preferred_language === 'en') {
        preferredLanguage = 'en'
      }

      isAdmin = profile?.is_admin ?? false
    }
  } catch {
    // ignore SSR auth issues
  }

  return (
    <html
      lang={preferredLanguage}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="
        flex
        min-h-screen
        flex-col
        bg-background
        font-sans
        text-foreground
        antialiased
      ">
        <LocaleProvider
          user={user}
          initialLocale={preferredLanguage}
        >
          <Header user={user} isAdmin={isAdmin} />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </LocaleProvider>

        <AnalyticsGate />
      </body>
    </html>
  )
}
