import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = 'https://eternalgarden.eu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: memorials } = await supabase
    .from('memorials')
    .select('slug, updated_at')
    .eq('is_public', true)
    .order('updated_at', { ascending: false })
    .limit(5000)

  const dynamicMemorialUrls: MetadataRoute.Sitemap = (memorials || [])
    .filter((memorial): memorial is { slug: string; updated_at: string | null } =>
      typeof memorial.slug === 'string' && memorial.slug.length > 0,
    )
    .map(memorial => ({
      url: `${SITE_URL}/memorial/${encodeURIComponent(memorial.slug)}`,
      lastModified: memorial.updated_at ? new Date(memorial.updated_at).toISOString() : undefined,
    }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/about`, changefreq: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/create`, changefreq: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, changefreq: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changefreq: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/services`, changefreq: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/support`, changefreq: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/terms`, changefreq: 'yearly', priority: 0.4 },
  ]

  return [...staticUrls, ...dynamicMemorialUrls]
}
