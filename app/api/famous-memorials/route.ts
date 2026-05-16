import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('memorials')
      .select('id, slug, name, birth_date, death_date, biography, photo_url')
      .eq('is_famous', true)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('API Error fetching famous memorials:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data to include short_description from biography
    const transformedData = data?.map(memorial => ({
      ...memorial,
      short_description: memorial.biography 
        ? memorial.biography.substring(0, 150) + (memorial.biography.length > 150 ? '...' : '')
        : null
    }))

    return NextResponse.json({ data: transformedData })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
