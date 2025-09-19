import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Search, Users, BookOpen, MessageCircle, ArrowRight } from 'lucide-react'

export default function GuestSearchResultsPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || 'your search'
  const resultsCount = searchParams.get('count') || '0'

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Analysis Complete
            </h1>
            <div className="bg-white rounded-lg shadow-sm border p-6 max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{resultsCount}</span>
                <span className="text-gray-600">listicles found</span>
              </div>
              <p className="text-gray-600 text-sm">
                High-quality opportunities identified for "{query}"
              </p>
            </div>
          </div>

          {/* Results Preview */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your results are ready to view
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Editor Contacts</h3>
                <p className="text-gray-600 text-sm">Direct outreach information and submission guidelines</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-50 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Analysis</h3>
                <p className="text-gray-600 text-sm">Authority scores, traffic data, and update frequency</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-50 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Outreach</h3>
                <p className="text-gray-600 text-sm">Personalized email templates and pitch strategies</p>
              </div>
            </div>

            {/* Locked Results Preview */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-3">
                  <Search className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Results Ready</h3>
                <p className="text-gray-600">
                  Your {resultsCount} listicles have been analyzed and are ready to view
                </p>
              </div>
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unlock Your Results with Membership
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to start getting featured in listicles
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Up to 20 Results Daily</div>
                    <div className="text-sm text-gray-600">Comprehensive listicle discovery across all niches</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Editor Contact Information</div>
                    <div className="text-sm text-gray-600">Direct emails and submission guidelines</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">AI-Powered Analysis</div>
                    <div className="text-sm text-gray-600">Quality scores, priority rankings, and outreach strategies</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">MasterClass Education</div>
                    <div className="text-sm text-gray-600">Complete training programs on listicle outreach</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Priority Support</div>
                    <div className="text-sm text-gray-600">Direct access to our outreach specialists</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Personalized Templates</div>
                    <div className="text-sm text-gray-600">Custom email templates for your business</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center border-t pt-8">
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">$19</div>
                <div className="text-gray-600 mb-2">per month</div>
                <div className="text-sm text-green-600 font-medium">
                  Less than $1 per day
                </div>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors w-full md:w-auto">
                Start Your Membership
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Cancel anytime • No setup fees • Immediate access
              </p>
            </div>
          </div>

          {/* Simple Value Statement */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Start Getting Featured Today
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Join hundreds of businesses using GetListicled to discover high-quality 
              listicle opportunities and build authority in their industry.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
