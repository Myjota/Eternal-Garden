import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('memorials')
      .select('id, slug, name, birth_date, death_date, short_description, photo_url')
      .eq('is_famous', true)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('API Error fetching famous memorials:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
