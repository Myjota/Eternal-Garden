import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 3) {
      return NextResponse.json({ data: [] })
    }

    const supabase = await createClient()
    const searchQuery = query.trim()

    const { data, error } = await supabase
      .from('memorials')
      .select('id, slug, first_name, last_name, birth_date, death_date, profile_image_url')
      .eq('privacy', 'public')
      .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
      .order('last_name', { ascending: true })
      .limit(6)

    if (error) {
      console.error('API Error searching memorials:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
