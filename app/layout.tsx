import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Eternal Garden | Skaitmeninė atminimo vieta',
  description: 'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
  generator: 'v0.app',
  keywords: ['atminimas', 'memorialas', 'šeimos istorija', 'genealogija', 'prisiminimas'],
  authors: [{ name: 'Eternal Garden' }],
  openGraph: {
    title: 'Eternal Garden | Skaitmeninė atminimo vieta',
    description: 'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    type: 'website',
    locale: 'lt_LT',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#166534',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased theme-garden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
