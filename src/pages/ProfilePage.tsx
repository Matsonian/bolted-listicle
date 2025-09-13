import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Crown, Mail, Calendar, Settings, Search, Clock } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  name: string;
  tier: 'basic' | 'pro';
  searches_today: number;
  subscription_status: 'active' | 'cancelled' | 'expired';
  subscription_end_date: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from Supabase instead of localStorage
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // TODO: Replace with actual Supabase call
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  };

  const getDailySearchLimit = () => user?.tier === 'basic' ? 5 : 999;
  const getSearchesRemaining = () => getDailySearchLimit() - (user?.searches_today || 0);
  const getResultLimit = () => user?.tier === 'basic' ? 20 : 50;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your account settings and search activity</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.tier === 'basic' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {user.tier === 'basic' ? 'Basic Plan - $19/month' : 'Pro Plan - $119/month'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Usage */}
            <div className="card p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Usage</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Searches Today</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {user.searches_today}/{getDailySearchLimit()}
                  </p>
                  {user.tier === 'basic' && (
                    <p className="text-sm text-blue-700 mt-1">
                      {getSearchesRemaining()} searches remaining
                    </p>
                  )}
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Results Per Search</p>
                  <p className="text-2xl font-bold text-green-600">
                    Up to {getResultLimit()}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Quality listicles per search
                  </p>
                </div>
              </div>

              {user.tier === 'basic' && user.searches_today >= 5 && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">Daily limit reached</p>
                  </div>
                  <p className="text-yellow-700 text-sm mt-1">
                    Your searches reset at midnight or upgrade to Pro for unlimited searches.
                  </p>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Account Settings</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Search History</p>
                    <p className="text-sm text-gray-600">View and access your saved searches</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    View History
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Billing & Subscription</p>
                    <p className="text-sm text-gray-600">Manage your subscription and billing</p>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm transition-colors">
                    Manage
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Account Data</p>
                    <p className="text-sm text-gray-600">Download or delete your account data</p>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm transition-colors">
                    Manage Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Section */}
          <div className="lg:col-span-1">
            {user.tier === 'basic' ? (
              <div className="card p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade to Pro</h3>
                  <p className="text-gray-600 text-sm">Unlock unlimited searches and more results</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Unlimited daily searches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Up to 50 results per search</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Access to Maker Studio</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Priority support</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                  Upgrade to Pro - $119/month
                </button>
              </div>
            ) : (
              <div className="card p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="text-center">
                  <Crown className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Member</h3>
                  <p className="text-gray-600 text-sm">You have access to all premium features</p>
                </div>
              </div>
            )}

            {/* Activity Stats */}
            <div className="card p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Searches</span>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saved Searches</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subscription Status</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
