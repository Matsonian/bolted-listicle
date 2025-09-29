'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'

export default function SearchPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    // Redirect guests to estimate page
    if (status !== 'loading' && !session && query) {
      performEstimateAndRedirect()
    } else if (session && query) {
      performFullSearch()
    }
  }, [query, status, session])

  const performEstimateAndRedirect = async () => {
    setIsSearching(true)
    try {
      const response = await fetch('/api/estimate-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      })

      if (!response.ok) {
        throw new Error('Failed to estimate results')
      }

      const data = await response.json()
      router.push(`/guest-search?q=${encodeURIComponent(query.trim())}&count=${data.estimatedCount}`)
    } catch (err) {
      console.error('Estimate error:', err)
      setError('Failed to process search')
      setIsSearching(false)
    }
  }

  const performFullSearch = async () => {
    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.results || [])
      
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsSearching(false)
    }
  }

  // Loading state
  if (status === 'loading' || isSearching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Searching for listicles...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-2">Search Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Logged in user results display
  if (session && results.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            <p className="text-gray-600">Found {results.length} listicles for "{query}"</p>
          </div>

          <div className="grid gap-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600">{result.domain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
