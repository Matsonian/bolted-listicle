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
