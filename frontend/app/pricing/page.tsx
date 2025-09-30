'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight, Loader2, Star } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly')

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      // Store the intended plan and redirect to signup
      localStorage.setItem('intended_plan', priceId)
      router.push('/signup')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })

      const { sessionId } = await response.json()

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const stripe = await stripePromise
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const monthlyFeatures = [
    '2 AI powered searches daily',
    'Up to 20 curated results per search',
    'AI-powered outreach analysis',
    'Contact information extraction',
    'Personalized email templates',
    'Quality scoring & priority ranking',
    'Exclusive access to MasterClasses',
    'Email support'
  ]

  const annualFeatures = [
    ...monthlyFeatures,
    '2 months free (save $58)',
    'FREE PDF copy our new eBook GetListicled'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg inline-block mb-6">
            🤖 <strong>AI is recommending your competitors, not you</strong>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ChatGPT Is Making Your Competition Famous
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            When people ask AI "What's the best [your product]?" - your competitors get mentioned, you don't
          </p>
          <p className="text-lg text-gray-800 font-medium mb-8">
            <span className="text-red-600">AI models train on listicles.</span> Your competitors are in them. 
            <br />You're invisible to the <span className="text-blue-600">next billion AI searches.</span>
          </p>
          
          {/* Plan Toggle */}
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm mb-6">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPlan === 'monthly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                selectedPlan === 'annual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 px-4 py-3 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2">⏰</span>
              <strong>The AI Training Window is Closing</strong>
            </div>
            <p className="text-sm">
              Major AI models update their training data quarterly. Miss this cycle, 
              and you'll be invisible to AI for the next 3-6 months while your competitors dominate.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Monthly Plan */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 ${
            selectedPlan === 'monthly' ? 'ring-2 ring-blue-500 scale-105' : 'hover:shadow-xl'
          }`}>
            <div className="text-center mb-6">
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                🚀 Get AI-Ready NOW
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Plan</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                $29<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">Become visible to AI before your competition</p>
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-lg mt-3 text-sm">
                🤖 <strong>Start today</strong> - Next GPT update is in 8 weeks
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {monthlyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!)}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                selectedPlan === 'monthly'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Get Into AI's Training Data
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Join 847+ businesses already in AI recommendations
            </p>
          </div>

          {/* Annual Plan */}
          <div className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 relative ${
            selectedPlan === 'annual' ? 'ring-2 ring-blue-500 scale-105' : 'hover:shadow-xl'
          }`}>
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-1" />
                SMART CHOICE
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                🧠 Maximum AI Exposure + Save $58
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual Plan</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                $24<span className="text-lg text-gray-500">/month</span>
              </div>
              <p className="text-gray-600">
                <span className="line-through text-gray-400">$348/year</span> → 
                <span className="text-green-600 font-medium"> $290/year</span>
              </p>
              <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg mt-3 text-sm">
                🤖 <strong>Best for AI dominance</strong> - Cover multiple training cycles
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {annualFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className={`text-gray-700 ${
                    feature.includes('free') || feature.includes('save') ? 'font-medium text-green-700' : ''
                  }`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL!)}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                selectedPlan === 'annual'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Dominate AI Recommendations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Secure AI visibility before training cutoff
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🤖 Your Competitors Are Already In ChatGPT's Recommendations
            </h3>
            <p className="text-gray-700 mb-4">
              Right now, when potential customers ask AI "What's the best [your product category]?" - 
              <strong> your competitors get mentioned</strong>. You don't. AI models learn from listicles, 
              and your competitors are getting featured while you remain invisible.
            </p>
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg mb-4">
              <strong>⚠️ The Window Is Closing:</strong> AI training cycles happen every 3-6 months. 
              Miss this one, and you'll be invisible to billions of AI queries until the next update.
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">127</div>
                <div className="text-xs text-gray-600">Competitors in AI training data</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">2.8B</div>
                <div className="text-xs text-gray-600">Daily AI queries about products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">847</div>
                <div className="text-xs text-gray-600">Businesses getting AI mentions</div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            ✓ Cancel anytime • ✓ No setup fees • ✓ 30-day money-back guarantee
          </p>
          <p className="text-xs text-gray-400">
            Secure payment powered by Stripe • Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  )
}
