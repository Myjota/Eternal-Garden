import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MemorialClient } from './memorial-client'
import { getTranslations, defaultLocale } from '@/lib/i18n'

interface Props {
  params: Promise<{ slug: string }>
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
    { data: galleryItems },
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
      .from('gallery_items')
      .select('*')
      .eq('memorial_id', memorial.id)
      .order('sort_order', { ascending: true }),

    supabase
      .from('candles')
      .select('*')
      .eq('memorial_id', memorial.id)
      .order('lit_at', { descending: true })
      .limit(50),

    supabase
      .from('condolences')
      .select('*')
      .eq('memorial_id', memorial.id)
      .eq('is_approved', true)
      .order('created_at', { descending: true }),

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
      galleryItems={galleryItems || []}
      candles={candles || []}
      condolences={condolences || []}
      currentUser={user}
      locale={locale}
      t={t}
    />
  )
}
