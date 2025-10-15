import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function useSearchHandler() {
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSearch = async (query: string) => {
    if (!query.trim() || status === 'loading') return

    setIsSearching(true)

    try {
      const trimmedQuery = query.trim()

      // Guest user - get estimate
      if (!session) {
        const response = await fetch('/api/estimate-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: trimmedQuery })
        })

        if (response.ok) {
          const data = await response.json()
          router.push(`/guest-search?q=${encodeURIComponent(trimmedQuery)}&count=${data.estimatedCount}`)
        } else {
          throw new Error('Search failed')
        }
      } else {
        // Logged in user - go to full search
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      throw error
    } finally {
      setIsSearching(false)
    }
  }

  return { handleSearch, isSearching, isAuthLoading: status === 'loading' }
}
