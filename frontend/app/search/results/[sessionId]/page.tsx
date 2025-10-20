// app/search/results/[sessionId]/page.tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  url: string
  domain: string
  position_in_results: number
}

interface SearchSession {
  id: string
  search_query: string
  results_count: number
  created_at: string
  search_duration_ms: number
}

export default async function SearchResultsPage({ 
  params 
}: { 
  params: { sessionId: string } 
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  // Fetch search session
  const { data: searchSession, error: sessionError } = await supabaseAdmin
    .from('user_search_sessions')
    .select('*')
    .eq('id', params.sessionId)
    .eq('render_user_id', session.user.email)
    .single()

  if (sessionError || !searchSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Not Found</h1>
            <p className="text-gray-600 mb-6">This search session could not be found or you don't have access to it.</p>
            <Link 
              href="/profile" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Fetch search results
  const { data: results, error: resultsError } = await supabaseAdmin
    .from('search_results')
    .select('*')
    .eq('search_session_id', params.sessionId)
    .order('position_in_results', { ascending: true })

  const searchResults = results || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/profile" 
            className="text-purple-600 hover:text-purple-700 font-medium mb-4 inline-block"
          >
            ← Back to Profile
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Query:</span> {searchSession.search_query}
              </div>
              <div>
                <span className="font-semibold">Results:</span> {searchSession.results_count}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {new Date(searchSession.created_at).toLocaleDateString()}
              </div>
              {searchSession.search_duration_ms && (
                <div>
                  <span className="font-semibold">Duration:</span> {(searchSession.search_duration_ms / 1000).toFixed(2)}s
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600">No results found for this search.</p>
            </div>
          ) : (
            searchResults.map((result: SearchResult) => (
              <div 
                key={result.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                    {result.position_in_results}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {result.domain}
                    </p>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      View Listicle
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {searchResults.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <div className="text-center text-gray-600">
              <p className="font-semibold mb-2">Search Complete</p>
              <p>Found {searchResults.length} listicle{searchResults.length !== 1 ? 's' : ''} for "{searchSession.search_query}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
