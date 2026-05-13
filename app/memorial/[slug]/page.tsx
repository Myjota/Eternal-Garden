import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MemorialClient } from './memorial-client'
import { getTranslations, defaultLocale } from '@/lib/i18n'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: memorial } = await supabase
    .from('memorials')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!memorial) {
    return {
      title: 'Memorialas | Eternal Garden',
      description: 'Memorialas nerastas.',
    }
  }

  const firstName = memorial.first_name || ''
  const lastName = memorial.last_name || ''
  const birthYear = memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : null
  const deathYear = memorial.death_date ? new Date(memorial.death_date).getFullYear() : null

  const title = lastName
    ? `${firstName} ${lastName} (${birthYear}${deathYear ? ` - ${deathYear}` : ''})`
    : firstName

  const description = memorial.bio
    ? memorial.bio.substring(0, 160)
    : `${firstName} ${lastName} atminimo puslapis`

  const siteUrl = 'https://eternalgarden.eu'
  const memorialUrl = `${siteUrl}/memorial/${encodeURIComponent(memorial.slug)}`
  const imageUrl = memorial.profile_image_url || `${siteUrl}/og-image.png`

  return {
    title: `${title} | Eternal Garden`,
    description: description,
    keywords: [
      'atminimas',
      'memorialas',
      firstName,
      lastName,
      'electronic memorial',
      'digital memorial',
    ],
    openGraph: {
      type: 'profile',
      firstName: firstName,
      lastName: lastName,
      url: memorialUrl,
      title: title,
      description: description,
      siteName: 'Eternal Garden',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
    alternates: {
      canonical: memorialUrl,
    },
  }
}

export default async function MemorialPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  /* ================= MEMORIAL ================= */

  const { data: memorial, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !memorial) {
    notFound()
  }

  /* ================= PARALLEL FETCH ================= */
  // 🔥 greičiau nei sequential

  const [
    { data: timelineEvents },
    { data: candles },
    { data: condolences },
    { data: authData },
  ] = await Promise.all([
    supabase
      .from('timeline_events')
      .select('*')
      .eq('memorial_id', memorial.id)
      .order('event_date', { ascending: true }),

    supabase
      .from('candles')
      .select('*')
      .eq('memorial_id', memorial.id)
      .order('lit_at', { ascending: false })
      .limit(50),

    supabase
      .from('condolences')
      .select('*')
      .eq('memorial_id', memorial.id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false }),

    supabase.auth.getUser(),
  ])

  const user = authData?.user || null

  /* ================= VIEW COUNT ================= */
  // ⚠️ optional: galima per DB function (geriau scale)

  await supabase
    .from('memorials')
    .update({ view_count: memorial.view_count + 1 })
    .eq('id', memorial.id)

  /* ================= RENDER ================= */

  const locale = defaultLocale
  const t = getTranslations(locale)

  return (
    <MemorialClient
      memorial={memorial}
      timelineEvents={timelineEvents || []}
      candles={candles || []}
      condolences={condolences || []}
      currentUser={user}
      locale={locale}
      t={t}
    />
  )
}
