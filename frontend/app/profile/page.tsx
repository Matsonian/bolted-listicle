'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useProfile } from '@/hooks/useProfile'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Building2, 
  MapPin, 
  FileText, 
  Package, 
  Globe, 
  TrendingUp,
  Search,
  Database,
  CreditCard,
  Receipt,
  Settings,
  Trash2,
  Key,
  ExternalLink,
  Clock,
  Edit3,
  Save,
  X
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const { profile, dailyActivity, loading: profileLoading, error: profileError, updateProfile } = useProfile()
  const { searchHistory, loading: historyLoading, error: historyError } = useSearchHistory(10)
  
  const [activeTab, setActiveTab] = useState<'overview' | 'business' | 'history'>('overview')
  const [editingBusiness, setEditingBusiness] = useState(false)
  const [businessForm, setBusinessForm] = useState({
    first_name: '',
    last_name: '',
    location: '',
    business_name: '',
    business_description: '',
    business_website: '',
    primary_product: ''
  })

  // Initialize business form when profile data loads
  React.useEffect(() => {
    if (profile) {
      setBusinessForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        location: profile.location || '',
        business_name: profile.business_name || '',
        business_description: profile.business_description || '',
        business_website: profile.business_website || '',
        primary_product: profile.primary_product || ''
      })
    }
  }, [profile])

  const handleBusinessSubmit = async () => {
    try {
      await updateProfile({
        first_name: businessForm.first_name,
        last_name: businessForm.last_name,
        location: businessForm.location,
        business_name: businessForm.business_name,
        business_description: businessForm.business_description,
        business_website: businessForm.business_website,
        primary_product: businessForm.primary_product
      })
      setEditingBusiness(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  if (status === 'loading' || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading profile: {profileError}</p>
        </div>
      </div>
    )
  }

  // Default subscription limits for basic tier
  const subscriptionLimits = {
    subscription_tier: 'basic',
    daily_search_limit: 2,
    results_per_search_limit: 20
  }

  // Account level display
  const accountLevel = {
    tier: 'Basic Monthly',
    price: 29,
    nextBillingDate: '2025-10-29',
    isMonthly: true
  }

  // Use real daily activity or defaults
  const todayActivity = dailyActivity || {
    searches_performed: 0,
    total_results_found: 0,
    results_clicked: 0,
    results_bookmarked: 0,
    time_spent_minutes: 0
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profile?.first_name && profile?.last_name
                      ? `${profile.first_name} ${profile.last_name}`
                      : session.user.email}
                  </h1>
                  <p className="text-blue-100">GetListicled Member</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sm text-blue-100">Account Level</p>
                  <p className="text-lg font-bold text-white">{accountLevel.tier}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'business'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Business Info
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Search History
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Today's Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Today's Activity
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Searches Used</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {todayActivity.searches_performed} <span className="text-lg text-blue-600">/ {subscriptionLimits.daily_search_limit}</span>
                      </p>
                    </div>
                    <Search className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="mt-4">
                    <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${Math.min((todayActivity.searches_performed / subscriptionLimits.daily_search_limit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Total Results Today</p>
                      <p className="text-3xl font-bold text-purple-900">{todayActivity.total_results_found}</p>
                    </div>
                    <Database className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-900">
                        {profile?.first_name && profile?.last_name
                          ? `${profile.first_name} ${profile.last_name}`
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Account ID (Email)</p>
                      <p className="text-gray-900">{session.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-gray-900">
                        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Recently joined'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Account Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Info */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription Details</h2>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{accountLevel.tier}</h3>
                      <p className="text-sm text-gray-600">{subscriptionLimits.daily_search_limit} searches/day • {subscriptionLimits.results_per_search_limit} results/search</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">${accountLevel.price}</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    Next billing: {accountLevel.nextBillingDate}
                  </div>

                  {accountLevel.isMonthly && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-green-900 mb-2">💰 Save 17% with Annual Billing</p>
                      <p className="text-xs text-green-700 mb-3">Pay $290/year instead of $348/year</p>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
                        Switch to Annual
                      </button>
                    </div>
                  )}
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors">
                    Upgrade Plan
                  </button>
                </div>

                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm font-medium text-gray-700">Manage Billing</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </button>

                  <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <Receipt className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm font-medium text-gray-700">View Transactions</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-md transition-colors">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </button>
                
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </button>

                <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-md transition-colors">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Business Info Tab */}
        {activeTab === 'business' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
              {!editingBusiness ? (
                <button 
                  onClick={() => setEditingBusiness(true)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleBusinessSubmit}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingBusiness(false)
                      // Reset form to original values
                      if (profile) {
                        setBusinessForm({
                          first_name: profile.first_name || '',
                          last_name: profile.last_name || '',
                          location: profile.location || '',
                          business_name: profile.business_name || '',
                          business_description: profile.business_description || '',
                          business_website: profile.business_website || '',
                          primary_product: profile.primary_product || ''
                        })
                      }
                    }}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={businessForm.first_name}
                    onChange={(e) => setBusinessForm({ ...businessForm, first_name: e.target.value })}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={businessForm.last_name}
                    onChange={(e) => setBusinessForm({ ...businessForm, last_name: e.target.value })}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={businessForm.location}
                    onChange={(e) => setBusinessForm({ ...businessForm, location: e.target.value })}
                    placeholder="City, State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessForm.business_name}
                    onChange={(e) => setBusinessForm({ ...businessForm, business_name: e.target.value })}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  Business Description
                </label>
                <textarea
                  value={businessForm.business_description}
                  onChange={(e) => setBusinessForm({ ...businessForm, business_description: e.target.value })}
                  placeholder="Describe your business..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly={!editingBusiness}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Package className="h-4 w-4 mr-2 text-gray-400" />
                    Primary Product/Service
                  </label>
                  <input
                    type="text"
                    value={businessForm.primary_product}
                    onChange={(e) => setBusinessForm({ ...businessForm, primary_product: e.target.value })}
                    placeholder="Your main product or service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    Business Website
                  </label>
                  <input
                    type="url"
                    value={businessForm.business_website}
                    onChange={(e) => setBusinessForm({ ...businessForm, business_website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly={!editingBusiness}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Why we collect this:</strong> Business information helps us provide more relevant search results and tailor our recommendations to your specific needs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Search History</h2>
              <p className="text-sm text-gray-500">Your previous searches and results</p>
            </div>

            {historyLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading search history...</p>
              </div>
            ) : historyError ? (
              <div className="text-center py-8">
                <p className="text-red-600">Error loading search history: {historyError}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchHistory.map((search) => (
                  <div 
                    key={search.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{search.search_query}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(search.search_timestamp).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center">
                            <Database className="h-4 w-4 mr-1" />
                            {search.results_count} results
                          </span>
                          {search.search_duration_ms && (
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {Math.round(search.search_duration_ms / 1000)}s
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/search/results/${search.id}`}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                      >
                        View Results
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}

                {searchHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No search history yet</p>
                    <p className="text-sm text-gray-400 mt-2">Your searches will appear here as you use GetListicled</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
