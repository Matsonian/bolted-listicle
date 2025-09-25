import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getApolloClient } from '../lib/apollo-client';
import {
  useSignUpOrInWithPasswordMutation,
  useSendOtpMutation,
  useSignInWithOtpMutation,
  useSsoLoginMutation,
  User,
  UserDocument,
} from '../../generated/graphql';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signInWithOtp: (otpCode: string) => Promise<{ error?: Error }>;
  sendOtp: (email: string) => Promise<{ error?: Error }>;
  ssoLogin: (provider: string, accessToken: string) => Promise<{ error?: Error }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Use generated mutation hooks
  const [signInMutation] = useSignUpOrInWithPasswordMutation();
  const [sendOtpMutation] = useSendOtpMutation();
  const [signInWithOtpMutation] = useSignInWithOtpMutation();
  const [ssoLoginMutation] = useSsoLoginMutation();

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
        query: UserDocument,
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
        const error = errors ? new Error(errors[0].message) : new Error('Authentication failed.');
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
      return { error: error as Error };
    }
  };

  const sendOtp = async (email: string) => {
    try {
      const { data, errors } = await sendOtpMutation({
        variables: { email }
      });

      if (errors || !data?.sendOtp) {
        const error = errors ? new Error(errors[0].message) : new Error('Failed to send OTP.');
        return { error };
      }

      return {};
    } catch (error) {
      console.error('Send OTP exception:', error);
      return { error: error as Error };
    }
  };

  const signInWithOtp = async (otpCode: string) => {
    setLoading(true);
    try {
      const { data, errors } = await signInWithOtpMutation({
        variables: { otpCode }
      });

      if (errors || !data?.signInWithOtp?.token) {
        const error = errors ? new Error(errors[0].message) : new Error('Invalid OTP.');
        console.error('Sign in with OTP error:', error.message);
        return { error };
      }

      const { token } = data.signInWithOtp;
      localStorage.setItem('authToken', token);

      // Fetch the user data after successful login
      await fetchUser();

      setLoading(false);
      return {};
    } catch (error) {
      console.error('Sign in with OTP exception:', error);
      setLoading(false);
      return { error: error as Error };
    }
  };

  const ssoLogin = async (provider: string, accessToken: string) => {
    setLoading(true);
    try {
      const { data, errors } = await ssoLoginMutation({
        variables: { provider, accessToken }
      });

      if (errors || !data?.ssoLogin?.token) {
        const error = errors ? new Error(errors[0].message) : new Error('SSO login failed.');
        console.error('SSO login error:', error.message);
        return { error };
      }

      const { token } = data.ssoLogin;
      localStorage.setItem('authToken', token);

      // Fetch the user data after successful login
      await fetchUser();

      setLoading(false);
      return {};
    } catch (error) {
      console.error('SSO login exception:', error);
      setLoading(false);
      return { error: error as Error };
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
    <AuthContext.Provider value={{ user, loading, signIn, signInWithOtp, sendOtp, ssoLogin, logout }}>
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
