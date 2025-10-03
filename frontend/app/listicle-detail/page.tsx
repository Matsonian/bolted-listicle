'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  ArrowLeft, 
  ExternalLink, 
  Mail, 
  Globe, 
  Calendar, 
  User, 
  Star, 
  TrendingUp,
  AlertCircle,
  Copy,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { openaiService, type AnalysisResponse, type UserProfile } from '@/services/openaiService'

export default function ListicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [emailCopied, setEmailCopied] = useState(false)

  const encodedUrl = params?.id as string
  const decodedUrl = encodedUrl ? decodeURIComponent(encodedUrl) : ''

  useEffect(() => {
    if (decodedUrl && session?.user && !analysis && !loading) {
      analyzeListicle()
    }
  }, [decodedUrl, session?.user])

  const analyzeListicle = async () => {
    if (!decodedUrl || !session?.user) return

    setLoading(true)
    setError('')

    try {
      // Fetch real user profile from your database
      const profileResponse = await fetch('/api/user-profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      let userProfile: UserProfile

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        userProfile = {
          first_name: session.user.name?.split(' ')[0] || profileData.first_name || 'User',
          last_name: session.user.name?.split(' ')[1] || profileData.last_name || '',
          business_name: profileData.business_name || 'Your Business',
          business_description: profileData.business_description || 'Your business description',
          website: profileData.website,
          years_in_business: profileData.years_in_business
        }
      } else {
        // Fallback to basic profile if no profile exists yet
        userProfile = {
          first_name: session.user.name?.split(' ')[0] || 'User',
          last_name: session.user.name?.split(' ')[1] || '',
          business_name: 'Your Business',
          business_description: 'Your business description',
          website: '',
          years_in_business: 1
        }
      }

      const analysisResult = await openaiService.analyzeListicle(decodedUrl, userProfile)
      setAnalysis(analysisResult)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze listicle')
    } finally {
      setLoading(false)
    }
  }

  const copyEmailToClipboard = () => {
    if (analysis?.model_email) {
      navigator.clipboard.writeText(analysis.model_email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-red-100 text-red-800 border-red-200'
      case 'P2': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'P3': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getQualityColor = (rating: string) => {
    switch (rating) {
      case 'HIGH': return 'bg-green-100 text-green-800 border-green-200'
      case 'MED': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'LOW': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to analyze listicles.</p>
          <button
            onClick={() => router.push('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Results
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Listicle</h3>
            <p className="text-gray-600 mb-4">
              Our AI is analyzing this article for outreach opportunities...
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                This analysis typically takes 30-60 seconds and includes quality assessment, 
                contact extraction, and personalized email generation.
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-red-900">Analysis Failed</h3>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
            <button
              onClick={analyzeListicle}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Article Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {analysis.title}
                  </h1>
                  <a
                    href={decodedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View Original Article
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(analysis.outreach_priority)}`}>
                    {analysis.outreach_priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQualityColor(analysis.llm_quality_rating)}`}>
                    {analysis.llm_quality_rating} Quality
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{analysis.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {analysis.author_name && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{analysis.author_name}</span>
                  </div>
                )}
                {analysis.publication_date && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{new Date(analysis.publication_date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Score: {analysis.importance_score}/10</span>
                </div>
              </div>
            </div>

            {/* Quality Assessment */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quality Assessment</h2>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Overall Rating: {analysis.llm_quality_rating}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                  {analysis.quality_reasons}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.importance_breakdown.auth}</div>
                  <div className="text-sm font-medium text-gray-700">Authority</div>
                  <div className="text-xs text-gray-500">Domain credibility</div>
                </div>
                <div className="text-center bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysis.importance_breakdown.rel}</div>
                  <div className="text-sm font-medium text-gray-700">Relevance</div>
                  <div className="text-xs text-gray-500">Business match</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analysis.importance_breakdown.fresh}</div>
                  <div className="text-sm font-medium text-gray-700">Freshness</div>
                  <div className="text-xs text-gray-500">Content recency</div>
                </div>
                <div className="text-center bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{analysis.importance_breakdown.eng}</div>
                  <div className="text-sm font-medium text-gray-700">Engagement</div>
                  <div className="text-xs text-gray-500">User signals</div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {(analysis.author_email || analysis.contact_url) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  {analysis.author_email && (
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Email Contact</div>
                        <a
                          href={`mailto:${analysis.author_email}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {analysis.author_email}
                        </a>
                      </div>
                    </div>
                  )}
                  {analysis.contact_url && (
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Globe className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">Contact Page</div>
                        <a
                          href={analysis.contact_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 transition-colors flex items-center"
                        >
                          Visit Contact Page
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outreach Strategy */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Outreach Strategy</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Suggested Approach:</h3>
                <p className="text-blue-800">{analysis.suggested_outreach_angle}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Ready-to-Send Email:</h3>
                  <button
                    onClick={copyEmailToClipboard}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {emailCopied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Email
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white border rounded-lg p-4 text-sm whitespace-pre-line font-mono text-gray-800 max-h-96 overflow-y-auto">
                  {analysis.model_email}
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  This email was personalized using your business profile and the article content.
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Next Steps</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Review & Customize</h3>
                  <p className="text-blue-100 text-sm">
                    Review the generated email and customize it to match your voice and specific offering.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Send & Follow Up</h3>
                  <p className="text-blue-100 text-sm">
                    Send your outreach email and plan a follow-up sequence if you don't hear back.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Track Results</h3>
                  <p className="text-blue-100 text-sm">
                    Monitor responses and engagement to refine your outreach strategy.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. Scale Success</h3>
                  <p className="text-blue-100 text-sm">
                    Use successful templates and approaches for similar publications and authors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
