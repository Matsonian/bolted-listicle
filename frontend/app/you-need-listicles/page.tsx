// FILE: app/you-need-listicles/page.tsx - You Need Listicles Marketing Page
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, AlertTriangle, Brain, FileText, XCircle, CheckCircle, ArrowRight } from 'lucide-react'

export default function YouNeedListiclesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const problemPoints = [
    "AI never recommends your product to prospects",
    "Your competitors dominate every AI-generated list",
    "You're invisible in the fastest-growing discovery channel",
    "Your marketing budget fights an uphill battle against AI bias",
    "Your product: Not found in any of their recommendations"
  ]

  const searchResults = [
    { text: "Found 23 publications actively teaching AI about your space", icon: <CheckCircle className="w-5 h-5 text-green-500" />, positive: true },
    { text: "23 are Forbes/TechCrunch-level authority sites", icon: <CheckCircle className="w-5 h-5 text-green-500" />, positive: true },
    { text: "31 numbered lists being crawled by AI training systems", icon: <CheckCircle className="w-5 h-5 text-green-500" />, positive: true },
    { text: "19 comparison articles that determine AI recommendations", icon: <CheckCircle className="w-5 h-5 text-green-500" />, positive: true },
    { text: "Your product: Not found in any of them", icon: <XCircle className="w-5 h-5 text-red-500" />, positive: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AI Is Learning About Your Industry From{' '}
            <span className="block">
              Listicles...{' '}
              <span className="text-orange-400">And It Can't Find You</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
            While your competitors get mentioned in every AI response, you're invisible.
          </p>
          
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Here's how to fix it before it's too late.
          </p>
          
          <p className="text-base text-gray-300 mb-12 max-w-2xl mx-auto">
            ChatGPT, Claude, and Perplexity train on listicles from Forbes, TechCrunch, and industry 
            publications. If you're not in these lists, you don't exist to AI.
          </p>

          {/* Warning Banner */}
          <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-orange-300">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Every day you wait is another day your competitors own the AI conversation</span>
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-gray-700">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter your product category (e.g. project management software)"
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Show Me Where AI Learns About My Industry
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              Join 500+ companies ensuring AI knows they exist
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            The AI Visibility Crisis No One Is Talking About
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Trains on Listicles */}
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">🤖 AI Trains on Listicles</h3>
              <p className="text-gray-300">
                90% of AI knowledge comes from curated lists and rankings found in major publications
              </p>
            </div>

            {/* Your Competitors Are Listed */}
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">📋 Your Competitors Are Listed</h3>
              <p className="text-gray-300">
                They're getting mentioned in "Best of" lists while you're completely invisible to AI systems
              </p>
            </div>

            {/* You Don't Exist */}
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">🚫 You Don't Exist</h3>
              <p className="text-gray-300">
                When prospects ask AI for recommendations in your space, your name never comes up
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You're Missing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Here's What You're Missing While AI Learns About Your Competitors
          </h2>

          {/* Mock Search Results */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Search Results for "Project Management Software"
              </h3>
            </div>

            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {result.icon}
                  <span className={`${result.positive ? 'text-green-300' : 'text-red-300'}`}>
                    {result.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Points */}
          <div className="mt-12 space-y-4">
            {problemPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-200">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't Let Your Competitors Own The AI Conversation
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Find out exactly where AI is learning about your industry - and where you're missing
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your industry or product category"
                className="flex-grow px-6 py-4 text-lg rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get My AI Visibility Report</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          <p className="text-orange-100 text-sm mt-6">
            Free analysis • See results in 30 seconds • Join 500+ companies taking action
          </p>
        </div>
      </section>
    </div>
  )
}
