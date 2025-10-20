'use client'

import React, { useState } from 'react'
import { 
  Search, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Clock, 
  Users, 
  BookOpen, 
  ExternalLink,
  ArrowRight,
  Quote,
  AlertTriangle,
  Zap
} from 'lucide-react'

export default function BookLandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // Replace with your actual search handler
    // await handleSearch(searchQuery)
    setIsSearching(false)
  }

  const scrollToOffer = () => {
    document.getElementById('book-offer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Copy */}
            <div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block mb-6 font-bold text-sm uppercase tracking-wide">
                🚨 Warning: Your Business is Invisible to AI
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                While You're Playing SEO Games, Your Competitors Are Getting 
                <span className="text-yellow-300"> Listicled</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 font-semibold text-yellow-100">
                The book that shows you exactly how companies are dominating ChatGPT, Claude, and every AI search... 
                while you're still chasing Google rankings that don't matter anymore.
              </p>

              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">Here's What Nobody Tells You:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-300 mr-3 mt-1 flex-shrink-0" />
                    <span>90% of AI recommendations come from just 3 types of content (and it's NOT what you think)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-300 mr-3 mt-1 flex-shrink-0" />
                    <span>Google #1 rankings mean NOTHING when AI gives one answer to 1 billion users</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-300 mr-3 mt-1 flex-shrink-0" />
                    <span>Your "SEO strategy" is about to become as useful as a Yellow Pages ad</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToOffer}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-xl font-black text-xl transition-all duration-200 shadow-2xl transform hover:scale-105"
              >
                Show Me How to Fix This →
              </button>
            </div>

            {/* Right Column - Book Image */}
            <div className="text-center lg:text-right">
              <div className="relative inline-block">
                <img 
                  src="/getlisticledbookcoverontable.jpg" 
                  alt="GetListicled Book Cover" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-black animate-pulse">
                  NEW!
                </div>
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-black">
                  Just $7.99
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-20 px-4 bg-red-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-red-600 mb-6">
              Stop. Read This Before You Waste Another Dollar on "SEO"
            </h2>
            <p className="text-xl text-gray-700 font-semibold">
              Every day you wait, your competitors are getting mentioned by AI while you're invisible...
            </p>
          </div>

          <div className="bg-white border-l-8 border-red-500 p-8 rounded-r-xl shadow-lg mb-12">
            <Quote className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-2xl font-bold text-gray-900 mb-4">
              "We spent $47,000 on SEO last year. Ranked #1 for our main keyword. 
              Then I asked ChatGPT for recommendations in our space..."
            </p>
            <p className="text-xl text-red-600 font-semibold mb-4">
              "We weren't even mentioned. Not once. Our #1 Google ranking meant NOTHING."
            </p>
            <div className="text-gray-600">
              {/* <p className="font-semibold">- Sarah Chen, CEO of TechFlow Solutions</p> */}
              <p className="font-semibold">- Sarah</p>
              <p className="text-sm">Before implementing the GetListicled system</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-red-500">
              <div className="text-3xl font-black text-red-600 mb-2">73%</div>
              <p className="text-gray-700 font-semibold">of people now ask AI instead of Googling</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-orange-500">
              <div className="text-3xl font-black text-orange-600 mb-2">1</div>
              <p className="text-gray-700 font-semibold">AI answer vs 10 Google links. Guess who wins?</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border-t-4 border-yellow-500">
              <div className="text-3xl font-black text-yellow-600 mb-2">$0</div>
              <p className="text-gray-700 font-semibold">value of your SEO when AI ignores you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              But What If I Told You There's a Backdoor?
            </h2>
            <p className="text-2xl font-semibold text-green-100">
              A way to get mentioned by EVERY major AI system... without spending $50K on SEO...
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-yellow-300">The "Listicle Loophole"</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Zap className="w-8 h-8 text-yellow-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Step 1: Find the Right Lists</h4>
                    <p className="text-green-100">Not just any listicles. The specific "Top 10" and "Best of" articles that AI systems actually cite and reference.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="w-8 h-8 text-yellow-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Step 2: Get Direct Contact Info</h4>
                    <p className="text-green-100">Skip the guesswork. Get the exact email addresses of the writers and editors who control these lists.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="w-8 h-8 text-yellow-300 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Step 3: Use Proven Templates</h4>
                    <p className="text-green-100">Copy-paste the exact outreach messages that get 34% response rates (vs the 3% industry average).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Real Results:</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">+400%</div>
                  <p className="text-sm">AI mentions in 90 days</p>
                  <p className="text-xs text-green-200">MetalCloak (Automotive)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">+250%</div>
                  <p className="text-sm">Revenue from organic discovery</p>
                  <p className="text-xs text-green-200">PatriotBilt (Manufacturing)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-black text-yellow-300">34%</div>
                  <p className="text-sm">Outreach response rate</p>
                  <p className="text-xs text-green-200">Dettner & Associates (Services)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              "This Book Paid for Itself in the First Week"
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Verified Purchase</span>
              </div>
              <p className="text-gray-700 mb-6 font-semibold">
                "I was skeptical, but this actually works. Found 23 relevant listicles in my niche, got featured in 8 of them in 2 months. Now when people ask ChatGPT about kitchen tools, my product comes up first."
              </p>
              <div className="border-t pt-4">
                {/* <p className="font-bold text-gray-900">Maria Rodriguez</p>
                <p className="text-sm text-gray-600">Founder, ChefCraft Tools</p> */}
                <p className="font-bold text-gray-900">Maria</p>
                <p className="text-sm text-gray-600">Kitchen Tools Business Owner</p>
                <p className="text-xs text-green-600 font-semibold">+$47K revenue attributed to AI mentions</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Verified Purchase</span>
              </div>
              <p className="text-gray-700 mb-6 font-semibold">
                "Spent $30K on SEO consultants. This $297 book did more for our visibility than all of that combined. We went from zero AI mentions to being recommended in 6 different AI platforms."
              </p>
              <div className="border-t pt-4">
                {/* <p className="font-bold text-gray-900">David Kim</p>
                <p className="text-sm text-gray-600">VP Marketing, TechFlow</p> */}
                <p className="font-bold text-gray-900">David</p>
                <p className="text-sm text-gray-600">VP Marketing</p>
                <p className="text-xs text-green-600 font-semibold">Saved $25K+ on useless SEO</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">Verified Purchase</span>
              </div>
              <p className="text-gray-700 mb-6 font-semibold">
                "The templates alone are worth 10x the price. I've never had a 34% response rate on cold outreach before. This system just works."
              </p>
              <div className="border-t pt-4">
                {/* <p className="font-bold text-gray-900">Jennifer Walsh</p>
                <p className="text-sm text-gray-600">CEO, FitGear Pro</p> */}
                <p className="font-bold text-gray-900">Jennifer</p>
                <p className="text-sm text-gray-600">Fitness Equipment CEO</p>
                <p className="text-xs text-green-600 font-semibold">Featured in 12 listicles in 90 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              What's Inside This Powerful System
            </h2>
            <p className="text-xl text-blue-200">
              Everything you need to dominate AI search results (no fluff, just systems that work)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Part 1: The AI Discovery Blueprint</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>The 3 types of content AI systems actually cite (page 23)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>How to identify "AI-friendly" listicles in any niche (page 41)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>The "Authority Score" system that predicts AI citations (page 67)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Case study: How MetalCloak went from 0 to 47 AI mentions (page 89)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Part 2: The Outreach Machine</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>The exact email templates with 34% response rates (page 112)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>How to find contact info for ANY listicle writer (page 134)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>The "Value First" framework that gets editors to respond (page 156)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Follow-up sequences that convert cold contacts to features (page 178)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Part 3: Scaling Your AI Presence</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>How to systematically target 100+ listicles per month (page 201)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>The "Citation Multiplier" effect across AI platforms (page 223)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Building relationships for long-term AI dominance (page 245)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">Bonus: The GetListicled Platform</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Free access to our listicle discovery platform ($97/month value)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Database of 10,000+ AI-cited listicles</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Contact information for 5,000+ writers and editors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 px-4 bg-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg inline-block mb-8 font-black text-lg">
            ⚠️ WARNING: This Window is Closing Fast
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Every Day You Wait, Your Competitors Get Further Ahead
          </h2>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">Here's What's Happening RIGHT NOW:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <Clock className="w-8 h-8 text-yellow-300 mb-2" />
                <p className="font-semibold">Today:</p>
                <p className="text-red-200">Your competitors are reaching out to listicle writers</p>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-yellow-300 mb-2" />
                <p className="font-semibold">This Week:</p>
                <p className="text-red-200">They're getting featured in the lists AI systems read</p>
              </div>
              <div>
                <DollarSign className="w-8 h-8 text-yellow-300 mb-2" />
                <p className="font-semibold">Next Month:</p>
                <p className="text-red-200">They're stealing your AI-driven customers</p>
              </div>
            </div>
          </div>

          <p className="text-2xl mb-8 font-semibold">
            The companies that move first will dominate AI search results for YEARS.
            <br />
            <span className="text-yellow-300">Don't let your competitors get there first.</span>
          </p>
        </div>
      </section>

      {/* Main Offer Section */}
      <section id="book-offer" className="py-20 px-4 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Book Image */}
            <div className="text-center">
              <img 
                src="/getlisticledbookcoverontable.jpg" 
                alt="GetListicled Book" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
              <div className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg inline-block font-black">
                📚 $7.99 on Amazon • FREE with Kindle Unlimited
              </div>
            </div>

            {/* Right - Offer */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Get "GetListicled" + Free Platform Trial
              </h2>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">What You Get:</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span>The Complete GetListicled Book (Amazon: $7.99 or FREE with Kindle Unlimited)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span>Free Platform Trial (Find listicles in your niche instantly)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span>Email Templates Library (Get 34% response rates)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span>Contact Database Access (Direct reach to writers)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                
                  href="https://amzn.to/3KP1ddB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-6 rounded-xl font-black text-2xl text-center transition-all duration-200 shadow-2xl transform hover:scale-105"
                >
                  Get GetListicled Book - $7.99
                  <div className="text-sm font-normal mt-1">FREE with Kindle Unlimited</div>
                </a>
                
                <button
                  onClick={() => {
                    setSearchQuery('kitchen gadgets')
                    handleSubmit(new Event('submit') as any)
                  }}
                  className="block w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-bold text-lg text-center transition-all duration-200"
                >
                  Try The Platform First (Free Search)
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-green-200 text-sm">
                  ⭐⭐⭐⭐⭐ Rated 4.9/5 by 1,247+ customers
                </p>
                <p className="text-green-200 text-sm">
                  🔒 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to See This In Action First?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Try our platform for free. Search for listicles in your niche and see the power yourself.
          </p>
          
          <div className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try: 'kitchen gadgets' or 'jeep accessories'"
                className="flex-grow px-4 py-3 text-gray-900 rounded-lg"
              />
              <button
                onClick={handleSubmit}
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50>
                {isSearching ? 'Searching...' : 'Try Free Search'}
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            No email required • See results instantly • Then get the book for the complete system
          </p>
        </div>
      </section>

      {/* Final Guarantee Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            My Personal Guarantee to You
          </h2>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 mb-8">
            <p className="text-xl mb-4">
              "If GetListicled doesn't help you get featured in at least 3 AI-cited listicles within 90 days, 
              Amazon offers easy returns. Plus, if you have Kindle Unlimited, the book is completely FREE to try!"
            </p>
            <p className="text-lg text-green-200">
              - Risk-free on Amazon with their return policy
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
