import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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

const siteUrl = 'https://your-domain.com'
const siteName = 'Eternal Garden'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | Skaitmeninė atminimo vieta`,
    template: `%s | ${siteName}`,
  },

  description:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',

  applicationName: siteName,
  creator: siteName,
  publisher: siteName,

  keywords: [
    'atminimas',
    'memorialas',
    'šeimos istorija',
    'genealogija',
    'prisiminimas',
    'digital memorial',
    'legacy platform',
  ],

  authors: [{ name: siteName }],

  alternates: {
    canonical: siteUrl,
    languages: {
      'lt-LT': siteUrl,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'lt_LT',
    url: siteUrl,
    siteName,

    title: `${siteName} | Skaitmeninė atminimo vieta`,
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',

    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} preview`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteName} | Skaitmeninė atminimo vieta`,
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    images: [`${siteUrl}/og-image.jpg`],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32x32.png', sizes: '32x32' },
      { url: '/icon-16x16.png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },

  manifest: '/manifest.webmanifest',

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#166534' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lt" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">

        {/* Structured Data (SEO boost) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              url: siteUrl,
              description:
                'Skaitmeninė atminimo platforma šeimos istorijoms ir prisiminimams išsaugoti.',
            }),
          }}
        />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
        }
