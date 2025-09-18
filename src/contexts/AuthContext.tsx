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
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        console.log('Initial session check:', session?.user?.email || 'No user', error || 'No error')
        
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Session error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user')
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
        } else if (session?.user) {
          setUser(session.user)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
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
    try {
      console.log('Attempting logout...')
      const { error } = await supabase.auth.signOut()
      console.log('Logout result:', error || 'Success')
      
      if (error) {
        console.error('Logout error:', error)
      }
      
      // Force clear user state regardless
      setUser(null)
    } catch (error) {
      console.error('Logout exception:', error)
      // Force clear user state even on error
      setUser(null)
    }
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
