'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // For now, just navigate back to home with the search query
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Listicles</h1>
          <p className="text-lg text-gray-600">
            Find the best listicles in your niche powered by AI
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for listicles... (e.g., Jeep suspension, kitchen gadgets)"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 text-lg shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-500 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'Jeep suspension',
                'Bronco accessories',
                'Kitchen gadgets',
                'Fitness equipment',
                'Home decor',
                'Travel gear'
              ].map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search)
                    router.push(`/?q=${encodeURIComponent(search)}`)
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}