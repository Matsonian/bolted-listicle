import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthContext with Supabase initializing...')
    
    // Force loading to false after 3 seconds max
    const timeoutId = setTimeout(() => {
      console.log('Auth initialization timeout - forcing loading false')
      setLoading(false)
    }, 3000)
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        console.log('Initial session check:', session?.user?.email || 'No user', error || 'No error')
        
        clearTimeout(timeoutId) // Clear timeout since we got a response
        
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      } catch (error) {
        console.error('Session error:', error)
        clearTimeout(timeoutId)
        setUser(null)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user')
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
        } else if (session?.user) {
          setUser(session.user)
        }
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in...')
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      console.log('Sign in result:', error || 'Success')
      return { error }
    } catch (error) {
      console.error('Sign in exception:', error)
      return { error }
    }
  }

  const logout = async () => {
    console.log('Force logout - clearing user state immediately')
    setUser(null)
    
    // Try to logout from Supabase in background
    supabase.auth.signOut().then(result => {
      console.log('Background logout result:', result.error || 'Success')
    }).catch(error => {
      console.log('Background logout failed:', error)
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
