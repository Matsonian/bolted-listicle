import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import { getApolloClient } from '../lib/apollo-client';

// Define GraphQL queries and mutations that match the backend
const SIGN_IN_MUTATION = gql`
  mutation SignUpOrInWithPassword($email: String!, $password: String!) {
    signUpOrInWithPassword(email: $email, password: $password) {
      token
      userId
    }
  }
`;

const ME_QUERY = gql`
  query User {
    user {
      id
      email
      firstName
      lastName
      isOnboarded
    }
  }
`;

// User type that matches the backend User model
interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isOnboarded?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Use Apollo Client's mutation hook for signing in
  const [signInMutation] = useMutation(SIGN_IN_MUTATION);

  // Function to fetch the current user and update state
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      // Use the Apollo Client to make the query
      const { data, error } = await getApolloClient().query({
        query: ME_QUERY,
        fetchPolicy: 'network-only', // Always fetch fresh data
      });

      if (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        localStorage.removeItem('authToken'); // Clear invalid token
      } else if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Exception fetching user:', err);
      setUser(null);
      localStorage.removeItem('authToken'); // Clear token on error
    } finally {
      setLoading(false);
    }
  }, []);

  // On initial load, check for a token and fetch the user
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, errors } = await signInMutation({ 
        variables: { email, password } 
      });

      if (errors || !data?.signUpOrInWithPassword?.token) {
        const error = errors ? errors[0] : new Error('Authentication failed.');
        console.error('Sign in error:', error.message);
        return { error };
      }

      const { token } = data.signUpOrInWithPassword;
      localStorage.setItem('authToken', token);
      
      // Fetch the user data after successful login
      await fetchUser();

      setLoading(false);
      return {};
    } catch (error) {
      console.error('Sign in exception:', error);
      setLoading(false);
      return { error };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('authToken');
    
    // Reset Apollo Client store to clear cached data
    await getApolloClient().resetStore();
    
    console.log('User logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
