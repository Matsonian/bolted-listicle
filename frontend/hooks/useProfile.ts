// hooks/useProfile.ts
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { UserProfile, DailyActivity } from '@/lib/supabase'

interface UseProfileReturn {
  profile: UserProfile | null
  dailyActivity: DailyActivity | null
  loading: boolean
  error: string | null
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>
  refetch: () => Promise<void>
}

export function useProfile(): UseProfileReturn {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [dailyActivity, setDailyActivity] = useState<DailyActivity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [session?.user?.id])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/profile/get')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }
      
      setProfile(data.profile)
      setDailyActivity(data.dailyActivity)
    } catch (err) {
      console.error('Profile fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: updates.first_name,
          lastName: updates.last_name,
          location: updates.location,
          businessName: updates.business_name,
          businessDescription: updates.business_description,
          businessWebsite: updates.business_website,
          primaryProduct: updates.primary_product
        })
      })
      
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }
      
      setProfile(data.profile)
      return data.profile
    } catch (err) {
      console.error('Profile update error:', err)
      throw new Error(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  return {
    profile,
    dailyActivity,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  }
}

// hooks/useSearchHistory.ts
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { SearchSession } from '@/lib/supabase'

interface UseSearchHistoryReturn {
  searchHistory: SearchSession[]
  loading: boolean
  error: string | null
  loadMore: () => Promise<void>
  hasMore: boolean
  refetch: () => Promise<void>
}

export function useSearchHistory(initialLimit = 10): UseSearchHistoryReturn {
  const { data: session } = useSession()
  const [searchHistory, setSearchHistory] = useState<SearchSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchSearchHistory(0, initialLimit, true)
    } else {
      setLoading(false)
    }
  }, [session?.user?.id, initialLimit])

  const fetchSearchHistory = async (currentOffset: number, limit: number, reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setError(null)
      }
      
      const response = await fetch(`/api/search/history?limit=${limit}&offset=${currentOffset}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch search history')
      }
      
      const newHistory = data.searchHistory || []
      
      if (reset) {
        setSearchHistory(newHistory)
      } else {
        setSearchHistory(prev => [...prev, ...newHistory])
      }
      
      setHasMore(newHistory.length === limit)
      setOffset(currentOffset + newHistory.length)
    } catch (err) {
      console.error('Search history fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch search history')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (!hasMore || loading) return
    await fetchSearchHistory(offset, initialLimit, false)
  }

  const refetch = async () => {
    setOffset(0)
    await fetchSearchHistory(0, initialLimit, true)
  }

  return {
    searchHistory,
    loading,
    error,
    loadMore,
    hasMore,
    refetch
  }
}

// hooks/useSearchSession.ts
import { useState, useEffect } from 'react'
import { SearchSession } from '@/lib/supabase'

interface UseSearchSessionReturn {
  searchSession: SearchSession | null
  loading: boolean
  error: string | null
}

export function useSearchSession(sessionId: string | null): UseSearchSessionReturn {
  const [searchSession, setSearchSession] = useState<SearchSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchSearchSession(sessionId)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchSearchSession = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/search/session/${id}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch search session')
      }
      
      setSearchSession(data.searchSession)
    } catch (err) {
      console.error('Search session fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch search session')
    } finally {
      setLoading(false)
    }
  }

  return {
    searchSession,
    loading,
    error
  }
}

// Helper function to save search results
export async function saveSearchResults(searchQuery: string, results: any[], searchDuration?: number) {
  try {
    const response = await fetch('/api/search/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchQuery,
        results,
        searchDuration,
        searchParameters: null // Add any search filters/parameters here
      })
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save search results')
    }

    return data.sessionId
  } catch (error) {
    console.error('Error saving search results:', error)
    throw error
  }
}
