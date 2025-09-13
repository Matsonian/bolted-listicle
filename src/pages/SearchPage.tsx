import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ExternalLink, Globe, Lock, Brain, Zap, Filter, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { perplexityService, ListicleResult } from '../services/perplexityApi';

interface SearchProgress {
  phase: string;
  progress: number;
  message: string;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ListicleResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchProgress, setSearchProgress] = useState<SearchProgress>({ phase: '', progress: 0, message: '' });
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  const query = searchParams.get('q');

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    setError('');

    try {
      // Start the actual API call immediately
      const searchPromise = perplexityService.searchListicles(searchTerm);
      
      // Run visual progress alongside the real search
      const phases = [
        { phase: 'analyzing', progress: 10, message: 'Analyzing your search query...', delay: 10000 },
        { phase: 'generating', progress: 20, message: 'Generating 10+ search variations...', delay: 10000 },
        { phase: 'searching', progress: 35, message: 'Searching across the web for listicles...', delay: 60000 },
        { phase: 'filtering', progress: 75, message: 'Filtering high-quality listicles...', delay: 10000 },
        { phase: 'organizing', progress: 90, message: 'Organizing and ranking results...', delay: 10000 }
      ];

      // Start with initializing immediately
      setSearchProgress({ phase: 'initializing', progress: 0, message: 'Initializing search...' });
      
      // Show progress phases while search runs
      const progressPromise = (async () => {
        for (const phaseData of phases) {
          setSearchProgress(phaseData);
          await new Promise(resolve => setTimeout(resolve, phaseData.delay));
        }
        setSearchProgress({ phase: 'finalizing', progress: 95, message: 'Finalizing results...' });
      })();

      // Wait for both the search and progress to complete
      const [searchResults] = await Promise.all([searchPromise, progressPromise]);
      
      setSearchProgress({ phase: 'complete', progress: 100, message: 'Search complete!' });
      setResults(searchResults);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching. Please try again.');
      setResults([]);
    }

    setLoading(false);
    setSearchProgress({ phase: '', progress: 0, message: '' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  const canViewAllResults = user !== null;
  const freeResultsLimit = 5;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for listicles..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Search Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {query && (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {loading ? 'Searching...' : `Found ${results.length} listicles for "${query}"`}
              </p>
              {!canViewAllResults && results.length > freeResultsLimit && (
                <p className="text-sm text-blue-600 font-medium">
                  Showing {freeResultsLimit} of {results.length} results
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-2xl mx-auto">
            {/* Progressive Search Bar */}
            <div className="card p-8 text-center">
              <div className="mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Searching for Amazing Listicles
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchProgress.message}
                  </p>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    This may take several minutes, sit back, relax and be amazed.
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${searchProgress.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span className="font-medium text-blue-600">{searchProgress.progress}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Search Phases */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {[
                  { key: 'analyzing', label: 'Analyze', icon: <Brain className="w-5 h-5" />, threshold: 10 },
                  { key: 'generating', label: 'Generate', icon: <Zap className="w-5 h-5" />, threshold: 20 },
                  { key: 'searching', label: 'Search', icon: <Globe className="w-5 h-5" />, threshold: 35 },
                  { key: 'filtering', label: 'Filter', icon: <Filter className="w-5 h-5" />, threshold: 75 },
                  { key: 'organizing', label: 'Organize', icon: <BarChart3 className="w-5 h-5" />, threshold: 90 }
                ].map((phase, index) => {
                  const isCompleted = searchProgress.progress > phase.threshold;
                  const isActive = searchProgress.phase === phase.key || 
                                 (phase.key === 'organizing' && searchProgress.progress >= phase.threshold && searchProgress.progress < 100);
                  const isUpcoming = searchProgress.progress < phase.threshold && !isActive;
                  
                  return (
                    <div 
                      key={phase.key}
                      className={`p-3 rounded-lg text-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-blue-100 text-blue-700 scale-105' 
                          : isActive
                          ? 'bg-blue-50 text-blue-600 scale-110 ring-2 ring-blue-200'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      <div className={`text-lg mb-1 ${
                        isActive
                          ? 'animate-bounce'
                          : ''
                      }`}>
                        {phase.icon}
                      </div>
                      <div className="text-xs font-medium">{phase.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Fun Facts */}
              <div className="text-sm text-gray-500">
                <p className="mb-2">💡 <strong>Did you know?</strong> We search across 10+ different query variations</p>
                <p>🎯 Finding the best listicles from major publications and niche experts</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="relative">
            <div className="space-y-6">
              {results.map((article, index) => {
                const isBlurred = !canViewAllResults && index >= freeResultsLimit;
                
                return (
                  <div 
                    key={article.id} 
                    className={`card p-6 transition-all duration-200 hover:shadow-lg ${
                      isBlurred ? 'relative overflow-hidden' : ''
                    }`}
                  >
                    {isBlurred && (
                      <div className="absolute inset-0 blur-overlay z-10 flex items-center justify-center">
                        <div className="text-center bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
                          <Lock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Create a free account to see all results
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Join thousands of users discovering amazing listicles
                          </p>
                          <div className="flex space-x-3 justify-center">
                            <Link to="/signup" className="btn-primary">
                              Sign Up Free
                            </Link>
                            <Link to="/login" className="btn-secondary">
                              Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className={isBlurred ? 'filter blur-sm' : ''}>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{article.domain}</span>
                        </div>
                      </div>
                      
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        <span>View Listicle</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="mb-6">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any listicles matching "{query}". Try different keywords or check your spelling.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-primary"
              >
                Try New Search
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !query && !error && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start Your Search</h2>
            <p className="text-gray-600">
              Enter keywords above to find amazing listicles in your niche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}