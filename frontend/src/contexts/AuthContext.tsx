import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo-client'; // Ensure this path is correct

// Define GraphQL queries and mutations
const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
    }
  }
`;

// A basic user type. Adjust this to match your GraphQL user schema.
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
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
      // Use the existing Apollo Client to make the query
      const { data, error } = await apolloClient.query({
        query: ME_QUERY,
      });

      if (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        localStorage.removeItem('authToken'); // Clear invalid token
      } else if (data && data.me) {
        setUser(data.me);
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
      const { data, errors } = await signInMutation({ variables: { email, password } });

      if (errors || !data?.signIn?.token) {
        const error = errors ? errors[0] : new Error('Authentication failed.');
        console.error('Sign in error:', error.message);
        return { error };
      }

      const { token, user: signedInUser } = data.signIn;
      localStorage.setItem('authToken', token);
      setUser(signedInUser);
      
      // Reset Apollo Client store to refetch all active queries with new auth state
      await apolloClient.resetStore();

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
    await apolloClient.resetStore();
    
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
