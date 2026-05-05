import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { lightCandle, getCandleStats, getRecentCandleUsers } from '@/lib/supabase/candles'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const memorialId = searchParams.get('memorial_id')
    
    if (!memorialId) {
      return NextResponse.json({ error: 'memorial_id is required' }, { status: 400 })
    }
    
    // Get user info
    const { data: { user } } = await supabase.auth.getUser()
    
    // Get candle stats
    const stats = await getCandleStats(memorialId)
    
    // Get recent users
    const recentUsers = await getRecentCandleUsers(memorialId)
    
    return NextResponse.json({
      stats,
      recentUsers,
      currentUser: user ? {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous'
      } : null
    })
  } catch (error) {
    console.error('Error fetching candle data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { memorialId, userName, userAvatar } = await request.json()
    
    if (!memorialId || !userName) {
      return NextResponse.json({ error: 'memorial_id and userName are required' }, { status: 400 })
    }
    
    // Get authenticated user (optional - allow anonymous like condolences)
    const { data: { user } } = await supabase.auth.getUser()
    
    // Light the candle (allow anonymous users)
    const result = await lightCandle(
      memorialId,
      user?.id || null,
      userName,
      userAvatar || user?.user_metadata?.avatar
    )
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
    
    // Get updated stats
    const stats = await getCandleStats(memorialId)
    const recentUsers = await getRecentCandleUsers(memorialId)
    
    return NextResponse.json({
      success: true,
      stats,
      recentUsers
    })
  } catch (error) {
    console.error('Error lighting candle:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
