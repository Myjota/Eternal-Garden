/**
 * SEO Metadata Configuration
 * Centralized SEO settings and utilities for the Eternal Garden project
 */

export const SEO_CONFIG = {
  SITE_URL: 'https://eternalgarden.eu',
  SITE_NAME: 'Eternal Garden',
  DEFAULT_TITLE: 'Eternal Garden | Skaitmeninė atminimo vieta',
  DEFAULT_DESCRIPTION:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
  LOGO_URL: 'https://eternalgarden.eu/logo.png',
  OG_IMAGE: 'https://eternalgarden.eu/og-image.png',
  OG_IMAGE_SQUARE: 'https://eternalgarden.eu/og-image-square.png',
  LOCALE: 'lt_LT',
  ALTERNATE_LOCALE: 'en_US',
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@eternalgarden.eu',
}

export const DEFAULT_KEYWORDS = [
  'atminimas',
  'memorialas',
  'elektroninis memorialas',
  'sėpulkos',
  'maldos',
  'giminės',
  'šeima',
  'atmintis',
  'gyvenimo istorija',
  'nekrologas',
  'skaitmeninė atmintis',
  'šeimos archyvas',
  'kartų perrašymas',
  'žmonių pagerbimas',
  'eternal garden',
  'amžiną atminimą',
  'memory',
  'memorial',
  'digital memorial',
  'condolences',
  'family history',
  'obituary',
]

export const SEO_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SUPPORT: '/support',
}

export const generatePageTitle = (pageName: string): string => {
  return `${pageName} | ${SEO_CONFIG.SITE_NAME}`
}

export const generateOpenGraphImage = (
  url: string = SEO_CONFIG.OG_IMAGE,
  width: number = 1200,
  height: number = 630,
  alt: string = SEO_CONFIG.SITE_NAME
) => {
  return {
    url,
    width,
    height,
    alt,
    type: 'image/png',
  }
}

export const generateTwitterCard = (title: string, description: string) => {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@eternalgarden',
    images: [SEO_CONFIG.OG_IMAGE],
  }
}

export const generateOpenGraphBase = (
  title: string,
  description: string,
  url: string,
  imageUrl?: string
) => {
  return {
    type: 'website' as const,
    locale: SEO_CONFIG.LOCALE,
    alternateLocale: [SEO_CONFIG.ALTERNATE_LOCALE],
    url,
    siteName: SEO_CONFIG.SITE_NAME,
    title,
    description,
    images: [
      generateOpenGraphImage(imageUrl || SEO_CONFIG.OG_IMAGE, 1200, 630, title),
    ],
  }
}

export const generateRobotsConfig = (indexable: boolean = true) => {
  return {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}

export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://www.facebook.com/eternalgarden',
  INSTAGRAM: 'https://www.instagram.com/eternalgarden',
  TWITTER: 'https://www.twitter.com/eternalgarden',
  LINKEDIN: 'https://www.linkedin.com/company/eternalgarden',
}

export const VERIFICATION = {
  GOOGLE: 'bSkiHT-YJWJl9Dm5J3A5omcwFLdlIAvZyuj3bT8MfTw',
}

/**
 * Sitemap configuration
 * Helps search engines discover all pages
 */
export const SITEMAP_CONFIG = {
  SITE_URL: 'https://eternalgarden.eu',
  CHANGE_FREQ_HOME: 'daily',
  CHANGE_FREQ_PAGE: 'monthly',
  CHANGE_FREQ_MEMORIAL: 'weekly',
  PRIORITY_HOME: 1.0,
  PRIORITY_PAGE: 0.8,
  PRIORITY_MEMORIAL: 0.7,
}
