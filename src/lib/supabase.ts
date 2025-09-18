import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('=== SUPABASE CONFIG DEBUG ===')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING')
console.log('Environment:', import.meta.env.MODE)

// Add this after the existing debug logs
console.log('=== TESTING SUPABASE CONNECTION ===')

// Test the connection immediately
supabase.auth.getSession().then(result => {
  console.log('Initial session test:', result)
}).catch(error => {
  console.error('Session test failed:', error)
})

// Test a simple query
supabase.from('users').select('count').limit(1).then(result => {
  console.log('Database test:', result)
}).catch(error => {
  console.error('Database test failed:', error)
})


if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.log('All env vars:', import.meta.env)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

