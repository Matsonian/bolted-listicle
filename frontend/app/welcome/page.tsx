'use client'

import React from 'react'
import Link from 'next/link'
import { Search, BookOpen, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function WelcomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to GetListicled{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your account is confirmed and ready to go. You now have access to our powerful listicle discovery system that will help grow your business visibility.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What you can do now:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Search className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Start Searching</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Search for listicles in your industry and discover where your competitors are getting featured. You have <strong>2 searches per day</strong> with up to <strong>20 results</strong> each.
              </p>
              <Link 
                href="/search" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block"
              >
                Start Your First Search
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Learn Best Practices</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Read our comprehensive guides on how to get featured in listicles, including outreach templates and proven strategies.
              </p>
              <Link 
                href="/blog" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Listed?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start discovering high-impact listicles where your product could be featured. Our AI-powered search will help you find the perfect opportunities.
          </p>
          <Link 
            href="/search" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors inline-block"
          >
            Begin Your Search Journey
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help getting started? <Link href="/blog" className="text-blue-600 hover:text-blue-500">Check out our guides</Link> or contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}
