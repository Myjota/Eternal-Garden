import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type CandleStats = {
  currently_burning: number
  total_lit: number
}

type RecentUser = {
  id: string
  name: string
  time_ago: string
  avatar?: string
}

type CandlesData = {
  stats: CandleStats
  recentUsers: RecentUser[]
  currentUser: {
    id: string
    name: string
  } | null
  loading: boolean
  error: string | null
}

// Helper to get localStorage key for candle status
function getLocalStorageKey(memorialId: string): string {
  return `candle_lit_${memorialId}`
}

// Helper to mark candle as lit in localStorage
function markCandleAsLitInLocalStorage(memorialId: string): void {
  if (typeof window !== 'undefined') {
    const key = getLocalStorageKey(memorialId)
    localStorage.setItem(key, JSON.stringify({
      lit: true,
      timestamp: new Date().toISOString()
    }))
  }
}

// Helper to check if candle is lit in localStorage
function isCandleLitInLocalStorage(memorialId: string): boolean {
  if (typeof window !== 'undefined') {
    const key = getLocalStorageKey(memorialId)
    const value = localStorage.getItem(key)
    if (value) {
      try {
        const data = JSON.parse(value)
        return data.lit === true
      } catch {
        return false
      }
    }
  }
  return false
}

export function useCandlesData(memorialId: string) {
  const [data, setData] = useState<CandlesData>({
    stats: { currently_burning: 0, total_lit: 0 },
    recentUsers: [],
    currentUser: null,
    loading: true,
    error: null
  })

  // Fetch candle data
  const fetchCandleData = async () => {
    try {
      const response = await fetch(`/api/candles?memorial_id=${memorialId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch candle data')
      }
      
      const result = await response.json()
      
      setData(prev => ({
        ...prev,
        stats: result.stats,
        recentUsers: result.recentUsers,
        currentUser: result.currentUser,
        loading: false,
        error: null
      }))
    } catch (error) {
      console.error('Error fetching candle data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Nepavyko įkelti žvakių duomenų'
      }))
    }
  }

  // Light a candle
  const lightCandle = async (userName?: string, userAvatar?: string) => {
    try {
      const response = await fetch('/api/candles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memorialId,
          userName,
          userAvatar
        })
      })
      
      const responseData = await response.json()
      
      // Handle already lit (409 Conflict)
      if (response.status === 409) {
        return { 
          success: false, 
          error: responseData.error || 'Jūs jau uždėgėte žvaką šiam memorialo',
          alreadyLit: true
        }
      }
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to light candle')
      }
      
      // Mark as lit in localStorage for anonymous users
      if (!data.currentUser) {
        markCandleAsLitInLocalStorage(memorialId)
      }
      
      setData(prev => ({
        ...prev,
        stats: responseData.stats,
        recentUsers: responseData.recentUsers
      }))
      
      return { success: true }
    } catch (error) {
      console.error('Error lighting candle:', error)
      const errorMessage = error instanceof Error ? error.message : 'Nepavyko uždegti žvakės'
      return { success: false, error: errorMessage }
    }
  }

  // Get current user candle status (checks both DB and localStorage)
  const getUserCandleStatus = async (): Promise<boolean> => {
    // First check localStorage for anonymous users (offline-first)
    if (isCandleLitInLocalStorage(memorialId)) {
      return true
    }
    
    // Then check database for authenticated users
    if (!data.currentUser) {
      return false
    }
    
    try {
      const supabase = createClient()
      const { data: candleData } = await supabase
        .from('candles')
        .select('id')
        .eq('memorial_id', memorialId)
        .eq('user_id', data.currentUser.id)
        .eq('is_lit', true)
        .or('expires_at.is.null,expires_at.gt.now()')
        .maybeSingle()
      
      return !!candleData
    } catch (error) {
      console.error('Error checking candle status:', error)
      return false
    }
  }

  // Initial data fetch
  useEffect(() => {
    if (memorialId) {
      fetchCandleData()
    }
  }, [memorialId])

  return {
    ...data,
    refetch: fetchCandleData,
    lightCandle,
    getUserCandleStatus
  }
}
