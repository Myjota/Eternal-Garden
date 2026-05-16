import { useState, useEffect, useCallback } from 'react'
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
  userHasLitCandle: boolean // Track if current user/session already lit
}

// Helper to get localStorage key for candle status
function getLocalStorageKey(memorialId: string): string {
  return `candle_lit_${memorialId}`
}

// Helper to mark candle as lit in localStorage (for anonymous users)
function markCandleAsLitInLocalStorage(memorialId: string): void {
  if (typeof window !== 'undefined') {
    const key = getLocalStorageKey(memorialId)
    localStorage.setItem(key, JSON.stringify({
      lit: true,
      timestamp: new Date().toISOString()
    }))
  }
}

// Helper to check if candle is lit in localStorage (for anonymous users)
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
    error: null,
    userHasLitCandle: false
  })

  // Fetch candle data AND check user status in one call
  const fetchCandleData = useCallback(async () => {
    try {
      // Check localStorage first for anonymous users (immediate)
      const localLit = isCandleLitInLocalStorage(memorialId)
      
      const response = await fetch(`/api/candles?memorial_id=${memorialId}&check_status=true`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch candle data')
      }
      
      const result = await response.json()
      
      // Determine if user has lit candle:
      // - For authenticated users: check from API response (userHasLitCandle)
      // - For anonymous users: check localStorage
      const userHasLit = result.userHasLitCandle || localLit
      
      setData({
        stats: result.stats,
        recentUsers: result.recentUsers,
        currentUser: result.currentUser,
        loading: false,
        error: null,
        userHasLitCandle: userHasLit
      })
    } catch (error) {
      console.error('Error fetching candle data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Nepavyko įkelti žvakių duomenų',
        // Still check localStorage even on error
        userHasLitCandle: isCandleLitInLocalStorage(memorialId)
      }))
    }
  }, [memorialId])

  // Light a candle
  const lightCandle = async (userName?: string, userAvatar?: string) => {
    // Prevent duplicate attempts if already lit
    if (data.userHasLitCandle) {
      return { 
        success: false, 
        error: 'Jūs jau uždėgėte žvaką šiam memorialo',
        alreadyLit: true
      }
    }
    
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
        // Mark locally so we remember
        markCandleAsLitInLocalStorage(memorialId)
        setData(prev => ({ ...prev, userHasLitCandle: true }))
        return { 
          success: false, 
          error: responseData.error || 'Jūs jau uždėgėte žvaką šiam memorialo',
          alreadyLit: true
        }
      }
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to light candle')
      }
      
      // Mark as lit in localStorage (works for both anonymous and authenticated)
      markCandleAsLitInLocalStorage(memorialId)
      
      setData(prev => ({
        ...prev,
        stats: responseData.stats,
        recentUsers: responseData.recentUsers,
        userHasLitCandle: true
      }))
      
      return { success: true }
    } catch (error) {
      console.error('Error lighting candle:', error)
      const errorMessage = error instanceof Error ? error.message : 'Nepavyko uždegti žvakės'
      return { success: false, error: errorMessage }
    }
  }

  // Get current user candle status - now just returns the cached state
  const getUserCandleStatus = useCallback(async (): Promise<boolean> => {
    return data.userHasLitCandle
  }, [data.userHasLitCandle])

  // Initial data fetch
  useEffect(() => {
    if (memorialId) {
      fetchCandleData()
    }
  }, [memorialId, fetchCandleData])

  return {
    ...data,
    refetch: fetchCandleData,
    lightCandle,
    getUserCandleStatus
  }
}
