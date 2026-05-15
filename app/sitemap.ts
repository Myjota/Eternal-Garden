import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://eternalgarden.eu'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontaktai`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  let memorialPages: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()

    const { data: memorials } = await supabase
      .from('memorials')
      .select('slug, updated_at')
      .eq('is_public', true)

    if (memorials) {
      memorialPages = memorials.map((memorial) => ({
        url: `${BASE_URL}/memorial/${memorial.slug}`,
        lastModified: new Date(memorial.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))
    }
  } catch (error) {
    console.error(error)
  }

  return [...staticPages, ...memorialPages]
}
