import { createClient } from '@supabase/supabase-js'

// Debug: Log all environment variables
console.log('All environment variables:', import.meta.env);

// Try different possible variable names
const possibleUrls = [
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.SUPABASE_PROJECT_URL
];

const possibleKeys = [
  import.meta.env.SUPABASE_ANON_KEY,
  import.meta.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  import.meta.env.SUPABASE_SUPABASE_ANON_KEY
];

console.log('Possible URLs:', possibleUrls);
console.log('Possible Keys:', possibleKeys);

// Use the first valid values found
const supabaseUrl = possibleUrls.find(url => url && url.length > 0);
const supabaseAnonKey = possibleKeys.find(key => key && key.length > 0);

console.log('Selected URL:', supabaseUrl);
console.log('Selected Key:', supabaseAnonKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Missing Supabase environment variables. URL: ${supabaseUrl ? 'Found' : 'Missing'}, Key: ${supabaseAnonKey ? 'Found' : 'Missing'}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
