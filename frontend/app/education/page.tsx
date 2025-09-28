'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, Target, Users, TrendingUp, Mail, CheckCircle } from 'lucide-react'

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master Listicle Marketing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn proven strategies to get your product featured in high-impact listicles and grow your business visibility
          </p>
        </div>

        {/* Learning Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Finding the Right Listicles
            </h3>
            <p className="text-gray-600 mb-4">
              Learn how to identify high-impact listicles in your industry and evaluate which ones are worth pursuing.
            </p>
            <Link href="/blog/content-angles" className="text-blue-600 hover:text-blue-500 font-medium">
              Read Guide →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Outreach That Works
            </h3>
            <p className="text-gray-600 mb-4">
              Master the art of editor outreach with proven email templates and follow-up strategies that get responses.
            </p>
            <Link href="/blog/outreach-templates" className="text-blue-600 hover:text-blue-500 font-medium">
              Get Templates →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Building Relationships
            </h3>
            <p className="text-gray-600 mb-4">
              Transform one-time placements into ongoing partnerships with editors and content creators.
            </p>
            <Link href="/blog/relationship-building" className="text-blue-600 hover:text-blue-500 font-medium">
              Learn More →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Measuring Success
            </h3>
            <p className="text-gray-600 mb-4">
              Track the right metrics and optimize your listicle marketing campaigns for maximum ROI.
            </p>
            <Link href="/blog/metrics-tracking" className="text-blue-600 hover:text-blue-500 font-medium">
              View Metrics →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              SEO Benefits
            </h3>
            <p className="text-gray-600 mb-4">
              Understand how listicle features impact your SEO rankings and brand authority over time.
            </p>
            <Link href="/blog/seo-impact" className="text-blue-600 hover:text-blue-500 font-medium">
              Learn SEO →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Timing Your Pitches
            </h3>
            <p className="text-gray-600 mb-4">
              Learn the optimal timing for pitching editors and aligning with publication schedules.
            </p>
            <Link href="/blog/pitch-timing" className="text-blue-600 hover:text-blue-500 font-medium">
              Perfect Timing →
            </Link>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search & Discover</h3>
              <p className="text-gray-600 text-sm">
                Use GetListicled to find relevant listicles in your industry and analyze your competition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Craft Your Pitch</h3>
              <p className="text-gray-600 text-sm">
                Use our proven email templates to reach out to editors with compelling product information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track & Optimize</h3>
              <p className="text-gray-600 text-sm">
                Monitor your results and build lasting relationships with editors for ongoing features.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Get Featured?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Put your knowledge into action. Start searching for listicle opportunities in your industry today.
          </p>
          <Link 
            href="/search" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors inline-block"
          >
            Start Searching Now
          </Link>
        </div>
      </div>
    </div>
  )
}
