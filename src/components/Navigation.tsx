import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navigation() {
  const [debugInfo, setDebugInfo] = useState('Loading...');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const testSupabase = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setDebugInfo(`Supabase Error: ${error.message}`);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          setDebugInfo(`User: ${session.user.email} | Confirmed: ${session.user.email_confirmed_at ? 'Yes' : 'No'}`);
          
          // Test user profile fetch
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              setDebugInfo(`Profile Error: ${profileError.message}`);
              console.error('Profile error:', profileError);
            } else {
              setDebugInfo(`User: ${session.user.email} | Profile: ${profile?.name || 'No name'} | Tier: ${profile?.tier || 'No tier'}`);
              console.log('Profile data:', profile);
            }
          } catch (profileError) {
            setDebugInfo(`Profile Fetch Error: ${profileError.message}`);
            console.error('Profile fetch error:', profileError);
          }
        } else {
          setDebugInfo('No user session');
        }
      } catch (error) {
        setDebugInfo(`Connection Error: ${error.message}`);
        console.error('Connection error:', error);
      }
    };

    testSupabase();
  }, []);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="text-white text-sm">
        {debugInfo}
      </div>
      <div className="text-white mt-2">
        {user ? (
          <span>✅ Logged in as {user.email}</span>
        ) : (
          <span>❌ Not logged in</span>
        )}
      </div>
      <Link to="/" className="text-white underline ml-4">Home</Link>
      <Link to="/search" className="text-white underline ml-4">Search</Link>
    </nav>
  );
}
