'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Search, ExternalLink, Globe, Brain, Zap, Filter, BarChart3, ArrowUpRight } from 'lucide-react'

interface ListicleResult {
  id: string
  title: string
  url: string
  domain: string
}

interface SearchProgress {
  phase: string
  progress: number
  message: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<ListicleResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searchProgress, setSearchProgress] = useState<SearchProgress>({ phase: '', progress: 0, message: '' })
  const [error, setError] = useState<string>('')
  const hasSearched = useRef(false)

  const query = searchParams?.get('q')

  useEffect(() => {
    if (query && !hasSearched.current && status !== 'loading') {
      hasSearched.current = true
      setSearchQuery(query)
      performSearch(query)
    }
  }, [query, status])

  const performSearch = async (searchTerm: string) => {
    setLoading(true)
    setError('')

    try {
      const searchPromise = fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm })
      }).then(res => {
        if (!res.ok) throw new Error('Search failed')
        return res.json()
      })
      
      const phases = [
        { phase: 'analyzing', progress: 10, message: 'Analyzing your search query...', delay: 10000 },
        { phase: 'generating', progress: 20, message: 'Generating 10+ search variations...', delay: 10000 },
        { phase: 'searching', progress: 35, message: 'Searching across the web for listicles...', delay: 60000 },
        { phase: 'filtering', progress: 75, message: 'Filtering high-quality listicles...', delay: 10000 },
        { phase: 'organizing', progress: 90, message: 'Organizing and ranking results...', delay: 10000 }
      ]

      setSearchProgress({ phase: 'initializing', progress: 0, message: 'Initializing search...' })
      
      const progressPromise = (async () => {
        for (let i = 0; i < phases.length; i++) {
          const phaseData = phases[i]
          
          if (phaseData.phase === 'searching') {
            const searchStartProgress = 20
            const searchEndProgress = 75
            const searchRange = searchEndProgress - searchStartProgress
            const increment = searchRange / 6
            
            for (let step = 0; step < 6; step++) {
              const currentProgress = searchStartProgress + (increment * (step + 1))
              setSearchProgress({
                phase: 'searching',
                progress: Math.round(currentProgress),
                message: 'Searching across the web for listicles...'
              })
              await new Promise(resolve => setTimeout(resolve, 10000))
            }
          } else {
            setSearchProgress(phaseData)
            await new Promise(resolve => setTimeout(resolve, phaseData.delay))
          }
        }
        setSearchProgress({ phase: 'finalizing', progress: 95, message: 'Finalizing results...' })
      })()

      const [searchData] = await Promise.all([searchPromise, progressPromise])
      
      setSearchProgress({ phase: 'complete', progress: 100, message: 'Search complete!' })
      
      if (!session) {
        const estimateCount = searchData.results?.length || 0
        router.push(`/guest-search?q=${encodeURIComponent(searchTerm)}&count=${estimateCount}`)
      } else {
        const limitedResults = searchData.results?.slice(0, 20) || []
        setResults(limitedResults)
      }
      
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while searching. Please try again.')
      setResults([])
    }

    setLoading(false)
    setSearchProgress({ phase: '', progress: 0, message: '' })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      hasSearched.current = false
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleGetListicled = (article: ListicleResult) => {
    const encodedUrl = encodeURIComponent(article.url)
    router.push(`/listicle-detail/${encodedUrl}`)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for listicles..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Search Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {query && (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {loading ? 'Searching...' : session ? `Found ${results.length} listicles for "${query}"` : `Search complete for "${query}"`}
              </p>
            </div>
          )}
        </div>

        {loading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Searching for Amazing Listicles
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchProgress.message}
                  </p>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    This may take several minutes, sit back, relax and be amazed.
                  </p>
                </div>
              </div>

              <div className="relative mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${searchProgress.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span className="font-medium text-blue-600">{searchProgress.progress}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {[
                  { key: 'analyzing', label: 'Analyze', icon: <Brain className="w-5 h-5" />, threshold: 10 },
                  { key: 'generating', label: 'Generate', icon: <Zap className="w-5 h-5" />, threshold: 20 },
                  { key: 'searching', label: 'Search', icon: <Globe className="w-5 h-5" />, threshold: 35 },
                  { key: 'filtering', label: 'Filter', icon: <Filter className="w-5 h-5" />, threshold: 75 },
                  { key: 'organizing', label: 'Organize', icon: <BarChart3 className="w-5 h-5" />, threshold: 90 }
                ].map((phase) => {
                  const isCompleted = searchProgress.progress > phase.threshold
                  const isActive = searchProgress.phase === phase.key || 
                                 (phase.key === 'organizing' && searchProgress.progress >= phase.threshold && searchProgress.progress < 100)
                  
                  return (
                    <div 
                      key={phase.key}
                      className={`p-3 rounded-lg text-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-blue-100 text-blue-700 scale-105' 
                          : isActive
                          ? 'bg-blue-50 text-blue-600 scale-110 ring-2 ring-blue-200'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      <div className={`flex justify-center mb-1 ${isActive ? 'animate-bounce' : ''}`}>
                        {phase.icon}
                      </div>
                      <div className="text-xs font-medium">{phase.label}</div>
                    </div>
                  )
                })}
              </div>

              <div className="text-sm text-gray-500">
                <p className="mb-2">💡 <strong>Did you know?</strong> We search across 10+ different query variations</p>
                <p>🎯 Finding the best listicles from major publications and niche experts</p>
              </div>
            </div>
          </div>
        )}

        {!loading && session && results.length > 0 && (
          <div className="relative">
            <div className="space-y-6">
              {results.map((article) => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-lg shadow-sm border p-6 transition-all duration-200 hover:shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{article.domain}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      <span>View Listicle</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    
                    <button
                      onClick={() => handleGetListicled(article)}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span>GetListicled</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && query && results.length === 0 && !error && session && (
          <div className="text-center py-12">
            <div className="mb-6">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any listicles matching "{query}". Try different keywords or check your spelling.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  hasSearched.current = false
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Try New Search
              </button>
            </div>
          </div>
        )}

        {!loading && !query && !error && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start Your Search</h2>
            <p className="text-gray-600">
              Enter keywords above to find amazing listicles in your niche
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
