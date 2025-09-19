import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Star, Users, TrendingUp, ArrowRight, Lock } from 'lucide-react'

export default function GuestSearchResultsPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || 'your search'
  const resultsCount = searchParams.get('count') || '47' // Default if not provided

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Search Info Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-600">
            Search results for: "<span className="font-medium text-blue-600">{query}</span>"
          </div>
        </div>
      </div>

      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Congratulations!
            </h1>
            <p className="text-2xl text-gray-700 mb-2">
              You're on your way to listicle success
            </p>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block text-xl font-semibold">
              We found {resultsCount} high-quality listicles for "{query}"
            </div>
          </div>

          {/* Value Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Here's what you're about to unlock:
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Editor Contacts</h3>
                <p className="text-gray-600 text-sm">Direct email addresses and submission guidelines</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Authority Scores</h3>
                <p className="text-gray-600 text-sm">Domain authority and traffic rankings</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Update Frequency</h3>
                <p className="text-gray-600 text-sm">When each listicle was last refreshed</p>
              </div>
            </div>

            {/* Teaser Results */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 relative">
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Premium results locked</p>
                </div>
              </div>
              
              {/* Blurred preview */}
              <div className="filter blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Top Industry Publication</h4>
                      <p className="text-sm text-gray-600">Authority Score: 85 • Updated: 2 weeks ago</p>
                    </div>
                    <div className="text-green-600 font-semibold">High Priority</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Major Tech Blog</h4>
                      <p className="text-sm text-gray-600">Authority Score: 78 • Updated: 1 month ago</p>
                    </div>
                    <div className="text-blue-600 font-semibold">Medium Priority</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Niche Authority Site</h4>
                      <p className="text-sm text-gray-600">Authority Score: 71 • Updated: 3 days ago</p>
                    </div>
                    <div className="text-green-600 font-semibold">High Priority</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hormozi-Style Pitch */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Most people waste 40+ hours manually hunting for these opportunities
              </h2>
              <p className="text-xl text-blue-100">
                You just found them in 30 seconds. Here's what happens next...
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">❌ The Old Way (Painful)</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Google for hours with generic searches</li>
                  <li>• Manually check if each site accepts pitches</li>
                  <li>• Hunt for editor contact information</li>
                  <li>• Guess which listicles are worth your time</li>
                  <li>• Get ignored because you pitched outdated content</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-300">✅ The GetListicled Way (Smart)</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• AI finds {resultsCount} qualified opportunities instantly</li>
                  <li>• Get editor emails and submission guidelines</li>
                  <li>• See authority scores and traffic data</li>
                  <li>• Know exactly when each was last updated</li>
                  <li>• Land placements that actually drive results</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
                <p className="text-2xl font-bold mb-2">Your {resultsCount} results are worth:</p>
                <div className="text-4xl font-bold text-yellow-300 mb-2">$2,350+</div>
                <p className="text-blue-100">
                  (Based on average placement value of $50 per listicle)
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unlock All {resultsCount} Results Now
            </h2>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">$19</div>
              <div className="text-gray-600">per month • Cancel anytime</div>
              <div className="text-sm text-green-600 font-medium mt-2">
                ✅ First month gets you access to {resultsCount} results + unlimited searches
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Unlimited Searches</div>
                  <div className="text-sm text-gray-600">Find listicles in any niche</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Editor Contact Info</div>
                  <div className="text-sm text-gray-600">Direct emails & guidelines</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Authority Metrics</div>
                  <div className="text-sm text-gray-600">Traffic & ranking data</div>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors w-full md:w-auto">
              Start Your $19 Membership
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              30-day money-back guarantee • No setup fees • Cancel anytime
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join 1,247+ marketers who've accelerated their listicle outreach</p>
            <div className="flex justify-center space-x-2">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 from 89 reviews</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
