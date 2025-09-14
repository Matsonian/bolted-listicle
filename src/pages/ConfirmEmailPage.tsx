import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ConfirmEmailPage() {
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user to show their email
    const getCurrentUser = async () => {
      try {
        // First try to get from current session
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log('Current user data:', user);
        console.log('User email:', user?.email);
        
        if (error) {
          console.error('Error getting user:', error);
          return;
        }
        
        setUser(user);
        
        // Set email from user data, or try to get from session
        if (user?.email) {
          setEmail(user.email);
        } else {
          // Fallback: try to get from session
          const { data: { session } } = await supabase.auth.getSession();
          console.log('Session data:', session);
          if (session?.user?.email) {
            setEmail(session.user.email);
            setUser(session.user);
          }
        }
      } catch (error) {
        console.error('Error in getCurrentUser:', error);
      }
    };

    getCurrentUser();

    // Listen for auth changes (when email gets confirmed)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
          // Email confirmed! Redirect to welcome page
          window.location.href = '/welcome';
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleResendConfirmation = async () => {
    if (!email) return;
    
    setIsResending(true);
    setResendSuccess(false);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        console.error('Error resending confirmation:', error);
        alert('Error resending confirmation email. Please try again.');
      } else {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error resending confirmation:', error);
      alert('Error resending confirmation email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            
            {/* Hermozi-Style Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              You're Almost In!
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Check your email to unlock your listicle opportunities
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">
                Confirmation Email Sent
              </h2>
              <p className="text-blue-100 text-lg mb-2">
                We sent a confirmation link to:
              </p>
              <p className="text-white font-semibold text-xl bg-white/10 rounded-lg py-2 px-4 inline-block">
                {email || 'your email address'}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-blue-100">
                Click the confirmation link in your email, then come back here to get started.
              </p>
              
              {/* Resend Button */}
              <div className="pt-4">
                {resendSuccess ? (
                  <div className="flex items-center justify-center text-green-300 space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirmation email sent!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleResendConfirmation}
                    disabled={isResending}
                    className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                    <span>{isResending ? 'Sending...' : "Didn't receive it? Resend confirmation"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Why Confirmation */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-3">Why do we need confirmation?</h3>
            <div className="space-y-2 text-blue-100">
              <p>• Protect your account and search data</p>
              <p>• Ensure you receive important notifications about opportunities</p>
              <p>• Verify you're a real business owner, not a bot</p>
            </div>
          </div>

          {/* Auto-refresh notice */}
          <p className="text-center text-blue-200 text-sm mt-8">
            This page will automatically redirect once your email is confirmed
          </p>
        </div>
      </div>
    </div>
  );
}
