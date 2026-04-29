import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MemorialClient } from './memorial-client'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function MemorialPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch memorial by slug
  const { data: memorial, error } = await supabase
    .from('memorials')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !memorial) {
    notFound()
  }

  // Fetch timeline events
  const { data: timelineEvents } = await supabase
    .from('timeline_events')
    .select('*')
    .eq('memorial_id', memorial.id)
    .order('event_date', { ascending: true })

  // Fetch gallery items
  const { data: galleryItems } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('memorial_id', memorial.id)
    .order('sort_order', { ascending: true })

  // Fetch candles
  const { data: candles } = await supabase
    .from('candles')
    .select('*')
    .eq('memorial_id', memorial.id)
    .order('lit_at', { descending: true })
    .limit(50)

  // Fetch condolences
  const { data: condolences } = await supabase
    .from('condolences')
    .select('*')
    .eq('memorial_id', memorial.id)
    .eq('is_approved', true)
    .order('created_at', { descending: true })

  // Get current user (optional)
  const { data: { user } } = await supabase.auth.getUser()

  // Increment view count
  await supabase
    .from('memorials')
    .update({ view_count: memorial.view_count + 1 })
    .eq('id', memorial.id)

  return (
    <MemorialClient
      memorial={memorial}
      timelineEvents={timelineEvents || []}
      galleryItems={galleryItems || []}
      candles={candles || []}
      condolences={condolences || []}
      currentUser={user}
    />
  )
}
