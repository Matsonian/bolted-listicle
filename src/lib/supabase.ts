import { createClient } from '@supabase/supabase-js'

// Debug: Log the actual values
console.log('Supabase URL:', import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Found' : 'Missing')

const supabaseUrl = import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
