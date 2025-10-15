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
    if (session?.user?.email) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [session?.user?.email])

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
