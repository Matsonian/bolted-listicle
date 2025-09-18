import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  business_name: string
  business_description: string
  years_in_business: number
  website?: string
  tier: 'basic' | 'pro'
  daily_searches_used: number
  last_search_date: string
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, profileData: Omit<UserProfile, 'id' | 'email' | 'tier' | 'daily_searches_used' | 'last_search_date'>) => Promise<{ error?: any }>
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  logout: () => Promise<void>
  canSearch: boolean
  incrementSearchUsage: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        setUserProfile(null)
      } else {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Exception fetching user profile:', error)
      setUserProfile(null)
    }
  }

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (initialized) return
    
    console.log('AuthContext initializing...')
    
    let mounted = true
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (!mounted) return
        
        if (error) {
          console.error('Session check error:', error)
          setUser(null)
          setUserProfile(null)
        } else if (session?.user) {
          console.log('Found existing session for user:', session.user.email)
          setUser(session.user)
          await fetchUserProfile(session.user.id)
        } else {
          console.log('No existing session found')
          setUser(null)
          setUserProfile(null)
        }
      } catch (err) {
        console.error('Exception during auth initialization:', err)
        if (mounted) {
          setUser(null)
          setUserProfile(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        console.log('Auth state changed:', event, session?.user?.email)
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
        }
        
        // Only set loading to false after the first auth state change
        if (!initialized) {
          setLoading(false)
          setInitialized(true)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [initialized])

  // Rest of your methods remain the same...
  const signUp = async (
    email: string, 
    password: string, 
    profileData: Omit<UserProfile, 'id' | 'email' | 'tier' | 'daily_searches_used' | 'last_search_date'>
  ) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) return { error: authError }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            ...profileData,
            tier: 'basic'
          })

        if (profileError) return { error: profileError }
      }

      return {}
    } catch (error) {
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const canSearch = userProfile ? (
    userProfile.daily_searches_used < 1 || 
    userProfile.last_search_date !== new Date().toISOString().split('T')[0]
  ) : false

  const incrementSearchUsage = async () => {
    if (!userProfile) return

    const today = new Date().toISOString().split('T')[0]
    const isNewDay = userProfile.last_search_date !== today

    const { error } = await supabase
      .from('users')
      .update({
        daily_searches_used: isNewDay ? 1 : userProfile.daily_searches_used + 1,
        last_search_date: today
      })
      .eq('id', userProfile.id)

    if (!error) {
      setUserProfile(prev => prev ? {
        ...prev,
        daily_searches_used: isNewDay ? 1 : prev.daily_searches_used + 1,
        last_search_date: today
      } : null)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    logout,
    canSearch,
    incrementSearchUsage
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
