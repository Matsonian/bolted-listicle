import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function WelcomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log('WelcomePage: Starting user profile fetch');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      console.log('WelcomePage: User check result', { user: !!user, confirmed: !!user?.email_confirmed_at, error: userError });
      
      if (user && user.email_confirmed_at) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        console.log('WelcomePage: Profile fetch result', { data: !!data, error });
        
        if (data) {
          setUserProfile(data);
        }
      } else {
        // Not logged in or email not confirmed, redirect
        console.log('WelcomePage: Redirecting to login - no user or email not confirmed');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Navigate to search page with the query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleExampleSearch = (example: string) => {
    setSearchQuery(example);
  };

  const exampleSearches = [
    "project management software",
    "wireless headphones", 
    "meal delivery services",
    "fitness trackers",
    "standing desks"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-teal-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Welcome Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">
                Welcome to the Inner Circle, {userProfile?.name || userProfile?.first_name || 'Member'}!
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              You're About to Discover
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                {" "}Hidden Opportunities
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Other companies are getting featured in high-authority listicles while you're still guessing. 
              <strong className="text-white"> Not anymore.</strong>
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Find Hidden Gems</h3>
              <p className="text-blue-100 text-sm">Discover listicles your competitors don't know about</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">High Authority Sites</h3>
              <p className="text-blue-100 text-sm">Get featured on Forbes, Entrepreneur, and TechCrunch-level publications</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-blue-100 text-sm">See opportunities in seconds, not hours of manual searching</p>
            </div>
          </div>

          {/* Main Search Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Find Your First Opportunity
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Enter your product, service, or niche and watch the magic happen
            </p>
            
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., project management software, wireless headphones..."
                className="w-full px-6 py-4 text-lg bg-white rounded-2xl shadow-lg border-0 focus:outline-none focus:ring-4 focus:ring-blue-300/50 placeholder-gray-500"
              />
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Find Opportunities</span>
                  </>
                )}
              </button>
            </div>

            {/* Example Searches */}
            <div className="text-center">
              <p className="text-blue-200 text-sm mb-4">Try these examples:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {exampleSearches.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleSearch(example)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-colors border border-white/20"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tier Info */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                userProfile?.tier === 'pro' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
              }`}>
                {userProfile?.tier?.toUpperCase() || 'BASIC'} MEMBER
              </span>
            </div>
            <p className="text-white/90">
              {userProfile?.tier === 'pro' 
                ? 'Unlimited searches • Priority support • Advanced analytics'
                : 'Up to 5 searches per day • Full access to all listicles • Expert guidance'
              }
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-blue-200 text-lg">
              Ready to get your first feature? Let's make it happen.
            </p>
            <div className="flex items-center justify-center mt-4 text-yellow-300">
              <ArrowRight className="w-5 h-5 animate-bounce" />
              <span className="ml-2 font-semibold">Start searching above</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}