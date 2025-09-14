import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navigation() {
  const [debugInfo, setDebugInfo] = useState('Loading...');

  useEffect(() => {
    const testSupabase = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setDebugInfo(`Supabase Error: ${error.message}`);
          console.error('Supabase error:', error);
        } else {
          setDebugInfo(`Session: ${session ? 'User logged in' : 'No user'}`);
          console.log('Session data:', session);
        }
      } catch (error) {
        setDebugInfo(`Connection Error: ${error.message}`);
        console.error('Connection error:', error);
      }
    };

    testSupabase();
  }, []);

  return (
    <nav className="bg-green-500 p-4">
      <div className="text-white text-xl">
        Navigation Debug: {debugInfo}
      </div>
      <Link to="/" className="text-white underline ml-4">Home</Link>
      <Link to="/search" className="text-white underline ml-4">Search</Link>
    </nav>
  );
}
