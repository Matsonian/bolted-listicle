import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Building2, Calendar, Globe, Search, BarChart3 } from 'lucide-react'

export default function ProfilePage() {
  const { user, userProfile, canSearch } = useAuth()

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]
  const isToday = userProfile.last_search_date === today
  const searchesRemaining = isToday ? Math.max(0, 1 - userProfile.daily_searches_used) : 1

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {userProfile.first_name} {userProfile.last_name}
                </h1>
                <p className="text-blue-100">{userProfile.email}</p>
                <div className="mt-2">
                  <span className="bg-blue-500 text-blue-100 px-2 py-1 rounded-full text-xs font-medium uppercase">
                    {userProfile.tier} Plan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Business Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                    Business Information
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Name</label>
                      <p className="text-gray-900">{userProfile.business_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-900">{userProfile.business_description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Years in Business</label>
                        <p className="text-gray-900 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {userProfile.years_in_business} years
                        </p>
                      </div>
                      {userProfile.website && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Website</label>
                          <p className="text-gray-900">
                            <a 
                              href={userProfile.website.startsWith('http') ? userProfile.website : `https://${userProfile.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-500 flex items-center"
                            >
                              <Globe className="h-4 w-4 mr-1" />
                              Visit Site
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                    Usage Statistics
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Plan</span>
                      <span className="text-gray-900 font-semibold uppercase">{userProfile.tier}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Today's Searches</span>
                        <span className="text-gray-900 font-semibold">
                          {isToday ? userProfile.daily_searches_used : 0} / 1
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${isToday ? (userProfile.daily_searches_used / 1) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {searchesRemaining > 0 ? (
                          <span className="text-green-600">
                            {searchesRemaining} search{searchesRemaining === 1 ? '' : 'es'} remaining today
                          </span>
                        ) : (
                          <span className="text-red-600">
                            Daily limit reached. Resets tomorrow.
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Results per search</span>
                        <span className="text-gray-900 font-semibold">Up to 20</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Last search</span>
                        <span className="text-gray-900">
                          {userProfile.last_search_date ? (
                            new Date(userProfile.last_search_date).toLocaleDateString()
                          ) : (
                            'Never'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                disabled={!canSearch}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
                onClick={() => window.location.href = '/search'}
              >
                <Search className="h-4 w-4 mr-2" />
                {canSearch ? 'Start New Search' : 'Daily Limit Reached'}
              </button>
              
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                onClick={() => window.location.href = '/education'}
              >
                View Education Content
              </button>
            </div>

            {/* Account Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Account created: {new Date(userProfile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
