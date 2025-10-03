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
  CheckCircle
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

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile')
    }

    const userProfile = await profileResponse.json()

    // Ensure we have the required name fields
    const fullUserProfile: UserProfile = {
      first_name: session.user.name?.split(' ')[0] || userProfile.first_name || 'User',
      last_name: session.user.name?.split(' ')[1] || userProfile.last_name || '',
      business_name: userProfile.business_name,
      business_description: userProfile.business_description,
      website: userProfile.website,
      years_in_business: userProfile.years_in_business
    }

    const analysisResult = await openaiService.analyzeListicle(decodedUrl, fullUserProfile)
    setAnalysis(analysisResult)
  } catch (err) {
    console.error('Analysis error:', err)
    setError(err instanceof Error ? err.message : 'Failed to analyze listicle')
  } finally {
    setLoading(false)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to analyze listicles.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Sign In
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
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Results
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Listicle</h3>
            <p className="text-gray-600">
              Our AI is analyzing this article for outreach opportunities...
            </p>
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
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
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
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Overall Rating: {analysis.llm_quality_rating}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-line">
                  {analysis.quality_reasons}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.importance_breakdown.auth}</div>
                  <div className="text-sm text-gray-600">Authority</div>
                  <div className="text-xs text-gray-500">0-3</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analysis.importance_breakdown.rel}</div>
                  <div className="text-sm text-gray-600">Relevance</div>
                  <div className="text-xs text-gray-500">0-3</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.importance_breakdown.fresh}</div>
                  <div className="text-sm text-gray-600">Freshness</div>
                  <div className="text-xs text-gray-500">0-2</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analysis.importance_breakdown.eng}</div>
                  <div className="text-sm text-gray-600">Engagement</div>
                  <div className="text-xs text-gray-500">0-2</div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {(analysis.author_email || analysis.contact_url) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  {analysis.author_email && (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <a
                        href={`mailto:${analysis.author_email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {analysis.author_email}
                      </a>
                    </div>
                  )}
                  {analysis.contact_url && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-gray-400 mr-3" />
                      <a
                        href={analysis.contact_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Contact Page
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outreach Strategy */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Outreach Strategy</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-900 mb-2">Suggested Angle:</h3>
                <p className="text-blue-800">{analysis.suggested_outreach_angle}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Ready-to-Send Email:</h3>
                  <button
                    onClick={copyEmailToClipboard}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
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
                <div className="bg-white border rounded p-4 text-sm whitespace-pre-line font-mono">
                  {analysis.model_email}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
