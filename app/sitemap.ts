import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://eternalgarden.eu'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontaktai`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  let memorialPages: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()

    const { data: memorials, error } = await supabase
      .from('memorials')
      .select('slug, updated_at')
      .eq('is_public', true)

    if (error) {
      console.error('[Sitemap] Supabase error:', error.message)
    }

    if (memorials && memorials.length > 0) {
      memorialPages = memorials
        .filter((memorial) => memorial.slug)
        .map((memorial) => ({
          url: `${BASE_URL}/memorial/${memorial.slug}`,
          lastModified: memorial.updated_at 
            ? new Date(memorial.updated_at).toISOString() 
            : now,
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }))
    }
  } catch (error) {
    console.error('[Sitemap] Error fetching memorials:', error)
    // Return static pages even if database fails
  }

  return [...staticPages, ...memorialPages]
}
