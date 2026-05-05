import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const memorialId = searchParams.get('memorial_id')
    
    if (!memorialId) {
      return NextResponse.json({ error: 'memorial_id is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('condolences')
      .select('*')
      .eq('memorial_id', memorialId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (error) {
      console.error('API Error fetching condolences:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { memorialId, authorName, message } = await request.json()
    
    if (!memorialId || !authorName || !message) {
      return NextResponse.json({ error: 'memorial_id, authorName, and message are required' }, { status: 400 })
    }
    
    // Get authenticated user (optional)
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('condolences')
      .insert({
        memorial_id: memorialId,
        user_id: user?.id || null,
        author_name: authorName,
        message: message,
        is_approved: true
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating condolence:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating condolence:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
