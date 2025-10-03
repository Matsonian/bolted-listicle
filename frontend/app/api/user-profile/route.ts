'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Building2, Globe, Calendar, FileText, ArrowRight, Loader2 } from 'lucide-react'

interface BusinessProfile {
  business_name: string
  business_description: string
  website: string
  years_in_business: number
  industry: string
  target_audience: string
  product_type: string
  unique_value_proposition: string
}

export default function BusinessProfileForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [profile, setProfile] = useState<BusinessProfile>({
    business_name: '',
    business_description: '',
    website: '',
    years_in_business: 1,
    industry: '',
    target_audience: '',
    product_type: '',
    unique_value_proposition: ''
  })

  const industries = [
    'Technology/Software',
    'E-commerce/Retail',
    'Health & Wellness',
    'Food & Beverage',
    'Beauty & Personal Care',
    'Home & Garden',
    'Fitness & Sports',
    'Education',
    'Financial Services',
    'Professional Services',
    'Manufacturing',
    'Real Estate',
    'Travel & Hospitality',
    'Automotive',
    'Entertainment & Media',
    'Other'
  ]

  const productTypes = [
    'Physical Product',
    'Digital Product',
    'Software/App',
    'Service',
    'Consulting',
    'Course/Education',
    'Subscription',
    'Marketplace',
    'Other'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: name === 'years_in_business' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate required fields
      if (!profile.business_name || !profile.business_description || !profile.industry) {
        throw new Error('Please fill in all required fields')
      }

      // Save profile to your database
      const response = await fetch('/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          ...profile
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      // Store intended plan and redirect to pricing
      const intendedPlan = localStorage.getItem('intended_plan')
      router.push('/pricing')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign up first to continue.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tell Us About Your Business
            </h1>
            <p className="text-gray-600">
              Help us create personalized outreach emails that get results
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="business_name"
                value={profile.business_name}
                onChange={handleInputChange}
                placeholder="e.g., EcoClean Products"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                name="industry"
                value={profile.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select your industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you offer? *
              </label>
              <select
                name="product_type"
                value={profile.product_type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select product/service type</option>
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Business Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                name="business_description"
                value={profile.business_description}
                onChange={handleInputChange}
                placeholder="Describe what your business does, your main products/services, and what makes you unique..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be used to create personalized outreach emails
              </p>
            </div>

            {/* Unique Value Proposition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What makes you different from competitors?
              </label>
              <textarea
                name="unique_value_proposition"
                value={profile.unique_value_proposition}
                onChange={handleInputChange}
                placeholder="e.g., Only eco-friendly cleaning products made from 100% plant-based ingredients..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who is your target audience?
              </label>
              <input
                type="text"
                name="target_audience"
                value={profile.target_audience}
                onChange={handleInputChange}
                placeholder="e.g., Eco-conscious families, small businesses, health-focused consumers"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Website and Years */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    placeholder="https://yourbusiness.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Business
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="years_in_business"
                    value={profile.years_in_business}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    Continue to Pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              This information helps us create better outreach emails for your business
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
