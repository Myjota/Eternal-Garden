/**
 * SEO Quick Reference Guide for Developers
 * Use this file as a template when creating new pages
 */

// ============================================
// EXAMPLE 1: Simple Page with Static Metadata
// ============================================

import type { Metadata } from 'next'
import { SEO_CONFIG, generatePageTitle } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: generatePageTitle('Page Name'),
  description: 'Page description here - 155-160 characters for optimal display',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    type: 'website',
    url: `${SEO_CONFIG.SITE_URL}/page-name`,
    title: generatePageTitle('Page Name'),
    description: 'Page description',
    siteName: SEO_CONFIG.SITE_NAME,
    locale: SEO_CONFIG.LOCALE,
    images: [
      {
        url: SEO_CONFIG.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Page Name',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: generatePageTitle('Page Name'),
    description: 'Page description',
    images: [SEO_CONFIG.OG_IMAGE],
  },
}

export default function PageName() {
  return <div>Page content</div>
}

// ============================================
// EXAMPLE 2: Dynamic Page with Database Data
// ============================================

import type { Metadata } from 'next'
import { SEO_CONFIG } from '@/lib/seo/config'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  
  // Fetch data from database
  const data = await fetchData(id)
  
  if (!data) {
    return {
      title: 'Not Found',
      description: 'This page could not be found',
    }
  }

  const title = data.title || 'Default Title'
  const description = data.description?.substring(0, 160) || 'Default description'
  const imageUrl = data.imageUrl || SEO_CONFIG.OG_IMAGE
  const pageUrl = `${SEO_CONFIG.SITE_URL}/path/${id}`

  return {
    title: `${title} | ${SEO_CONFIG.SITE_NAME}`,
    description,
    keywords: ['keyword1', 'keyword2'],
    openGraph: {
      type: 'website',
      url: pageUrl,
      title,
      description,
      siteName: SEO_CONFIG.SITE_NAME,
      locale: SEO_CONFIG.LOCALE,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const { id } = await params
  const data = await fetchData(id)

  return <div>{/* Content */}</div>
}

// ============================================
// EXAMPLE 3: Using Structured Data (JSON-LD)
// ============================================

import { generateOrganizationSchema } from '@/lib/seo/schema'

export default function Page() {
  const schema = generateOrganizationSchema()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Page content */}
    </>
  )
}

// ============================================
// EXAMPLE 4: Profile/Person Page (Memorials)
// ============================================

import type { Metadata } from 'next'
import { generateMemorialSchema } from '@/lib/seo/schema'
import { SEO_CONFIG } from '@/lib/seo/config'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const memorial = await fetchMemorial(slug)

  if (!memorial) return { title: 'Not Found' }

  const firstName = memorial.first_name || ''
  const lastName = memorial.last_name || ''
  const birth = memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : null
  const death = memorial.death_date ? new Date(memorial.death_date).getFullYear() : null

  const title = `${firstName} ${lastName} (${birth}${death ? ` - ${death}` : ''})`
  const url = `${SEO_CONFIG.SITE_URL}/memorial/${encodeURIComponent(slug)}`
  const imageUrl = memorial.profile_image_url || SEO_CONFIG.OG_IMAGE

  return {
    title: `${title} | ${SEO_CONFIG.SITE_NAME}`,
    description: memorial.bio?.substring(0, 160) || `${title} memorial`,
    openGraph: {
      type: 'profile', // Use 'profile' for person pages
      firstName,
      lastName,
      url,
      title,
      description: memorial.bio?.substring(0, 160) || '',
      images: [{ url: imageUrl, width: 800, height: 800, alt: title }],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function MemorialPage({ params }: Props) {
  const { slug } = await params
  const memorial = await fetchMemorial(slug)
  const schema = generateMemorialSchema(memorial)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Memorial content */}
    </>
  )
}

// ============================================
// TIPS FOR BEST RESULTS
// ============================================

/*
1. TITLE TAGS
   - Length: 50-60 characters
   - Format: "Page Title | Eternal Garden"
   - Include primary keyword in first 60 chars
   - Make each title unique

2. META DESCRIPTIONS
   - Length: 155-160 characters
   - Include primary keyword naturally
   - Write compelling call-to-action
   - Unique for each page

3. KEYWORDS
   - 3-5 keywords per page
   - Mix short-tail and long-tail
   - Lithuanian and English variants
   - Natural placement in content

4. IMAGES
   - Use descriptive alt text
   - Optimize file size (WebP preferred)
   - Use semantic filenames
   - Maintain 1200x630 or 800x800 aspect ratio

5. STRUCTURED DATA
   - Use JSON-LD format
   - Add schema markup for content type
   - Test with validator.schema.org
   - Include all relevant properties

6. INTERNAL LINKING
   - Link to related content
   - Use descriptive anchor text
   - Create content clusters
   - Link homepage to category pages

7. CANONICAL URLs
   - Always include for dynamic pages
   - Use absolute URLs
   - Prevent duplicate content issues
   - Set alternates for different languages
*/
