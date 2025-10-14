// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for frontend use (with RLS when enabled)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types for TypeScript
export interface UserProfile {
  id?: string
  render_user_id: string
  first_name?: string
  last_name?: string
  location?: string
  business_name?: string
  business_description?: string
  business_website?: string
  primary_product?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface SearchSession {
  id: string
  render_user_id: string
  search_query: string
  search_timestamp: string
  results_count: number
  search_parameters?: any
  status: string
  search_duration_ms?: number
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface SearchResult {
  id: string
  search_session_id: string
  title: string
  url: string
  domain?: string
  description?: string
  publication_date?: string
  authority_score?: number
  listicle_type?: string
  position_in_results: number
  clicked: boolean
  clicked_at?: string
  bookmarked: boolean
  bookmarked_at?: string
  notes?: string
  created_at: string
}

export interface DailyActivity {
  id: string
  render_user_id: string
  activity_date: string
  searches_performed: number
  total_results_found: number
  results_clicked: number
  results_bookmarked: number
  time_spent_minutes: number
  created_at: string
  updated_at: string
}
