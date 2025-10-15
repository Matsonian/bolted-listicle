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
