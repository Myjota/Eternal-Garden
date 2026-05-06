import { createClient } from './client'

export type Candle = {
  id: string
  memorial_id: string
  user_id: string
  user_name: string
  user_avatar?: string
  is_lit: boolean
  lit_at?: string
  expires_at?: string
  created_at: string
}

export type CandleStats = {
  currently_burning: number
  total_lit: number
}

export type RecentUser = {
  id: string
  name: string
  time_ago: string
  avatar?: string
}

// Get candle statistics for a memorial
export async function getCandleStats(memorialId: string): Promise<CandleStats> {
  const supabase = createClient()
  
  // Get currently burning candles (is_lit = true)
  const { count: currentlyBurning } = await supabase
    .from('candles')
    .select('*', { count: 'exact', head: true })
    .eq('memorial_id', memorialId)
    .eq('is_lit', true)
  
  // Get total candles from memorial table (candle_count field)
  const { data: memorial } = await supabase
    .from('memorials')
    .select('candle_count')
    .eq('id', memorialId)
    .single()
  
  return {
    currently_burning: currentlyBurning || 0,
    total_lit: memorial?.candle_count || 0
  }
}

// Get recent users who lit candles
export async function getRecentCandleUsers(memorialId: string, limit = 2): Promise<RecentUser[]> {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('candles')
    .select('user_name, lit_at')
    .eq('memorial_id', memorialId)
    .eq('is_lit', true)
    .order('lit_at', { ascending: false })
    .limit(limit)
  
  if (!data) return []
  
  return data.map((candle, index) => ({
    id: `${candle.lit_at}-${index}`,
    name: candle.user_name,
    time_ago: getTimeAgo(candle.lit_at),
    avatar: undefined
  }))
}

// Light a new candle
export async function lightCandle(memorialId: string, userId: string | null, userName: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  // Create new candle - no restrictions for simple schema
  const { error } = await supabase
    .from('candles')
    .insert({
      memorial_id: memorialId,
      user_id: userId,
      user_name: userName,
      is_lit: true,
      lit_at: new Date().toISOString()
    })
  
  if (error) {
    console.error('Error lighting candle:', error)
    return { success: false, error: 'Nepavyko uždegti žvakės' }
  }
  
  return { success: true }
}

// Check if current user has lit a candle
export async function getUserCandleStatus(memorialId: string, userId: string): Promise<boolean> {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('candles')
    .select('id')
    .eq('memorial_id', memorialId)
    .eq('user_id', userId)
    .eq('is_lit', true)
    .single()
  
  return !!data
}

// Helper function to format time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 1) return 'ką tik'
  if (diffMins < 60) return `prieš ${diffMins} min.`
  if (diffHours < 24) return `prieš ${diffHours} val.`
  return `prieš ${diffDays} d.`
}
