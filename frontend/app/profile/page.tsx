'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useUserQuery } from '../../generated/graphql'
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
  Clock
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const { data: userData, loading: userLoading } = useUserQuery()
  const [activeTab, setActiveTab] = useState<'overview' | 'business' | 'history'>('overview')

  if (status === 'loading' || userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session?.user || !userData?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  const user = userData.user

  // Mock data - replace with actual data from GraphQL queries
  const todayStats = {
    searchesUsed: 1,
    searchesLimit: 2,
    totalResults: 45
  }

  const accountLevel = {
    tier: 'Basic Monthly', // or 'Basic Annual'
    isMonthly: true,
    price: 29,
    nextBillingDate: '2025-10-29'
  }

  const businessInfo = {
    name: user.businessName || '',
    location: user.businessLocation || '',
    description: user.businessDescription || '',
    product: user.primaryProduct || '',
    website: user.businessWebsite || ''
  }

  const searchHistory = [
    { id: '1', query: 'best project management tools', date: '2025-09-28', resultsCount: 23 },
    { id: '2', query: 'top CRM software', date: '2025-09-27', resultsCount: 18 },
    { id: '3', query: 'email marketing platforms', date: '2025-09-26', resultsCount: 31 },
  ]

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
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.email}
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
                Today&apos;s Activity
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">Searches Used</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {todayStats.searchesUsed} <span className="text-lg text-blue-600">/ {todayStats.searchesLimit}</span>
                      </p>
                    </div>
                    <Search className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="mt-4">
                    <div className="bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-300"
                        style={{ width: `${(todayStats.searchesUsed / todayStats.searchesLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Total Results Today</p>
                      <p className="text-3xl font-bold text-purple-900">{todayStats.totalResults}</p>
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
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Account ID (Email)</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'N/A'}
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
                      <p className="text-sm text-gray-600">2 searches/day • 20 results/search</p>
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
                  <Link 
                    href="https://billing.stripe.com/p/login/test_xxxxxxxxxxxx" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm font-medium text-gray-700">Manage Billing</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </Link>

                  <Link 
                    href="https://billing.stripe.com/p/login/test_xxxxxxxxxxxx" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <Receipt className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="text-sm font-medium text-gray-700">View Transactions</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-3 rounded-md transition-colors">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </button>
                
                <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-md transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </button>

                <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-md transition-colors sm:col-span-2">
                  <Trash2 className="h-4 w-4 mr-2" />
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
                Edit
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessInfo.name}
                    placeholder="Enter your business name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    Business Location
                  </label>
                  <input
                    type="text"
                    value={businessInfo.location}
                    placeholder="City, State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  Business Description
                </label>
                <textarea
                  value={businessInfo.description}
                  placeholder="Describe your business..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
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
                    value={businessInfo.product}
                    placeholder="Your main product or service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    Business Website
                  </label>
                  <input
                    type="url"
                    value={businessInfo.website}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
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
              <p className="text-sm text-gray-500">Saved results from your previous searches</p>
            </div>

            <div className="space-y-4">
              {searchHistory.map((search) => (
                <div 
                  key={search.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{search.query}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(search.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center">
                          <Database className="h-4 w-4 mr-1" />
                          {search.resultsCount} results
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/search/results/${search.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  <p className="text-sm text-gray-400 mt-2">Your saved searches will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
