'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, Search, Users, BookOpen, MessageCircle, ArrowRight, Loader2, Sparkles, Target, Mail, Zap } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function GuestSearchResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const query = searchParams?.get('q') || 'your search'
  const resultsCount = searchParams?.get('count') || '0'
  const [isLoading, setIsLoading] = useState(false)

  // Array of exciting headline variations
  const headlines = [
    { wow: "WOW!", subtitle: "Your Analysis Estimate is Complete!" },
    { wow: "Nailed it!", subtitle: "Your analysis just crossed the finish line!" },
    { wow: "BOOM!", subtitle: "The data gods have spoken — your estimate is ready!" },
    { wow: "You did it!", subtitle: "Your estimate is officially complete!" },
    { wow: "Epic work!", subtitle: "Your numbers are in and ready to review!" },
    { wow: "Bam!", subtitle: "Your analysis is wrapped, packed, and ready to attack!" },
    { wow: "Ding ding ding!", subtitle: "Your estimate is complete — time to celebrate!" },
    { wow: "YES!", subtitle: "That's a wrap — your data masterpiece is ready!" },
    { wow: "Analysis complete!", subtitle: "You just hit the bullseye!" },
    { wow: "Boom!", subtitle: "Your analysis is ready to roll!" },
    { wow: "Mission accomplished!", subtitle: "Your estimate is locked and loaded!" },
    { wow: "Ka-pow!", subtitle: "The numbers are in!" },
    { wow: "All done!", subtitle: "Your analysis just crossed the finish line!" },
    { wow: "Sweet!", subtitle: "Your estimate's hot off the press!" },
    { wow: "Done and dusted!", subtitle: "Your full analysis is ready!" },
    { wow: "The data's in!", subtitle: "And it looks good!" },
    { wow: "Victory!", subtitle: "Your analysis report is complete!" },
    { wow: "Mic drop moment!", subtitle: "Your estimate is complete!" },
    { wow: "You did it!", subtitle: "The analysis is complete and ready to view!" }
  ]

  // Pick a random headline on component mount
  const [headline] = useState(() => headlines[Math.floor(Math.random() * headlines.length)])

const handleStartMembership = () => {
  router.push('/login')
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      
      <main className="py-8 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* HERO - WOW Moment */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-6 py-2 bg-yellow-400 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-yellow-900 mr-2" />
              <span className="text-yellow-900 font-bold text-sm uppercase tracking-wide">Analysis Complete!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              {headline.wow}
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              {headline.subtitle}
            </h2>

            {/* MASSIVE NUMBER DISPLAY */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 transform hover:scale-105 transition-transform">
              <div className="text-white mb-4">
                <p className="text-xl md:text-2xl font-semibold mb-3">We Found</p>
                <div className="text-8xl md:text-9xl font-black mb-3 drop-shadow-lg">
                  {resultsCount}
                </div>
                <p className="text-3xl md:text-4xl font-bold">
                  Listicles in Your Niche!
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-6">
                <p className="text-white text-xl md:text-2xl font-semibold">
                  Searching for: <span className="font-black text-yellow-300">"{query}"</span>
                </p>
              </div>
            </div>

            {/* VALUE PROP */}
            <div className="bg-green-500 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
              <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed">
                This is an <span className="text-yellow-300 underline decoration-4">EXCELLENT</span> Opportunity to Make Your Business Better Known to AI!
              </p>
            </div>

            {/* CTA QUESTION */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-8 border-4 border-blue-600">
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Do You Want to See Your Results?
              </h3>
              
              <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-6 mb-8">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Sign Up Now... get <span className="text-green-600">7 Days FREE!</span>
                </p>
                <p className="text-gray-700 font-medium">
                  Zero risk. Cancel anytime. Full access immediately.
                </p>
              </div>

              <button 
                onClick={handleStartMembership}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-6 px-12 rounded-2xl text-2xl md:text-3xl transition-all transform hover:scale-105 shadow-2xl w-full md:w-auto inline-flex items-center justify-center border-4 border-green-700"
              >
                <Zap className="w-8 h-8 mr-3" />
                CLICK HERE to Start Winning with AI!
                <ArrowRight className="w-8 h-8 ml-3" />
              </button>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border-4 border-purple-600">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 font-semibold">
                It's So Simple, Anyone Can Do It!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {/* Step 1 */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl font-black">1</span>
                </div>
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-black mb-3 text-center">You Find the Listicle</h3>
                <p className="text-blue-100 text-center font-medium">
                  We show you exactly which listicles are perfect for your business
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl font-black">2</span>
                </div>
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-black mb-3 text-center">We Find the Contact</h3>
                <p className="text-purple-100 text-center font-medium">
                  We dig up the editor's info so you don't have to
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl font-black">3</span>
                </div>
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-black mb-3 text-center">We Provide What You Need</h3>
                <p className="text-pink-100 text-center font-medium">
                  Get templates, strategies, and everything to reach out
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl font-black">4</span>
                </div>
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-black mb-3 text-center">You Get Listicled!</h3>
                <p className="text-green-100 text-center font-medium">
                  Watch your business get featured and grow your authority
                </p>
              </div>
            </div>

            {/* Arrow pointing down */}
            <div className="text-center">
              <div className="inline-block animate-bounce">
                <ArrowRight className="w-12 h-12 text-purple-600 transform rotate-90" />
              </div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-red-700">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Start Getting Featured Today!
            </h3>
            <p className="text-xl md:text-2xl text-white font-bold mb-8">
              Join Hundreds of Businesses Already Winning with GetListicled
            </p>
            
            <div className="bg-white rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                <div>
                  <div className="text-5xl md:text-6xl font-black text-gray-900 mb-2">FREE</div>
                  <div className="text-xl font-bold text-gray-600">7-Day Trial</div>
                </div>
                <div className="hidden md:block text-4xl font-black text-gray-300">+</div>
                <div>
                  <div className="text-5xl md:text-6xl font-black text-green-600 mb-2">$29</div>
                  <div className="text-xl font-bold text-gray-600">per month after</div>
                </div>
              </div>
              <p className="text-gray-600 font-semibold text-lg">
                Less than a coffee a day to grow your business! 
              </p>
            </div>

            <button 
              onClick={handleStartMembership}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-black py-6 px-12 rounded-2xl text-2xl md:text-3xl transition-all transform hover:scale-105 shadow-2xl w-full md:w-auto inline-flex items-center justify-center border-4 border-yellow-600"
            >
              <Sparkles className="w-8 h-8 mr-3" />
              YES! Show Me My {resultsCount} Listicles NOW!
              <ArrowRight className="w-8 h-8 ml-3" />
            </button>
            
            <p className="text-white text-sm font-bold mt-6">
              ✓ Cancel Anytime ✓ No Setup Fees ✓ Instant Access ✓ 7 Days FREE
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
