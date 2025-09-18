import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  user: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  console.log('Ultra-simple AuthContext - user:', user, 'loading:', loading)

  const signIn = async (email: string, password: string) => {
    console.log('Mock sign in')
    return { error: null }
  }

  const logout = async () => {
    console.log('Mock logout')
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
