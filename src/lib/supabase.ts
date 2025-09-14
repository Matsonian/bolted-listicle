import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


console.log('Available env vars:', Object.keys(import.meta.env));
console.log('SUPABASE_NEXT_PUBLIC_SUPABASE_URL:', import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY:', import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY);
