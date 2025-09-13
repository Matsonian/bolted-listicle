import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    'Jeep suspension',
    'Bronco accessories', 
    'Kitchen gadgets',
    'Fitness equipment',
    'Home decor',
    'Travel gear'
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Smart Search',
      description: 'Find exactly what you\'re looking for across thousands of listicles'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Trending Content',
      description: 'Discover the most popular and recent listicles in your niche'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Results',
      description: 'Get instant results with our powerful search technology'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Driven',
      description: 'Join thousands of users discovering amazing content daily'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Get Listicled
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-2">
              AI is training on Listicles.
            </p>
            <p className="text-lg md:text-xl text-blue-200 mb-8">
              Find the best listicles in your niche and learn how to make your product popular with ChatGPT, Gemini, Claude and Perplexity.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for listicles... (e.g., Jeep suspension, kitchen gadgets)"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:ring-4 focus:ring-white/20 text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 text-lg shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mb-8">
            <p className="text-blue-100 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    navigate(`/search?q=${encodeURIComponent(search)}`);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 backdrop-blur-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Get Listicled?
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl text-gray-900 font-semibold">
                Listicles win online. Over 90% of AI-cited sources are listicles.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center group hover:shadow-lg transition-all duration-200">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">Find the listicles AI already cites most — fast, focused, and relevant.</p>
            </div>
            
            <div className="card p-6 text-center group hover:shadow-lg transition-all duration-200">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trending Content</h3>
              <p className="text-gray-600">Discover the "Top 10s" and "Best of" articles AI favors in your niche.</p>
            </div>
            
            <div className="card p-6 text-center group hover:shadow-lg transition-all duration-200">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Serious Results</h3>
              <p className="text-gray-600">Skip the noise... find clear, structured listicles that AI trusts.</p>
            </div>
            
            <div className="card p-6 text-center group hover:shadow-lg transition-all duration-200">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">Join creators and readers shaping the future of AI-powered content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Listicled?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start searching for amazing listicles in your favorite niches today
          </p>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search..."
                className="flex-grow px-4 py-3 text-gray-900 rounded-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Search Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}