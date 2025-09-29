// FILE: app/listicle/[id]/page.tsx - Listicle Detail Page (Dynamic Route)
'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save, ExternalLink, Calendar, User, Mail, Link as LinkIcon, Star, Target, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'

// Types for the analysis data
interface ImportanceBreakdown {
  auth: number
  rel: number
  fresh: number
  eng: number
}

interface AnalysisResponse {
  title: string
  author_name?: string
  author_email?: string
  contact_url?: string
  publication_date?: string
  description: string
  llm_quality_rating: string
  quality_reasons: string
  importance_score: number
  importance_breakdown: ImportanceBreakdown
  outreach_priority: string
  suggested_outreach_angle: string
  model_email: string
}

type ListicleAnalysis = AnalysisResponse & { url: string }

export default function ListicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const encodedUrl = params?.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [analysis, setAnalysis] = useState<ListicleAnalysis | null>(null)
  const [error, setError] = useState<string>('')
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user) {
      router.push('/login')
      return
    }

    // Set target number - you'll need to implement this with your database
    // For now, using a simple counter
    setTargetNumber(Date.now()) // Temporary - replace with actual target number logic

  }, [session, status, router])

  useEffect(() => {
    if (encodedUrl && session?.user) {
      analyzeListicle()
    }
  }, [encodedUrl, session?.user])

  const analyzeListicle = async () => {
    if (!encodedUrl) return
    
    setLoading(true)
    setError('')

    try {
      const decodedUrl = decodeURIComponent(encodedUrl)
      
      // TODO: Replace with your actual OpenAI service call
      // const analysisResult = await openaiService.analyzeListicle(decodedUrl, userProfile)
      
      // Mock analysis data for now
      const mockAnalysis: ListicleAnalysis = {
        url: decodedUrl,
        title: 'Best Kitchen Gadgets for 2024',
        author_name: 'Jane Smith',
        author_email: 'jane@example.com',
        publication_date: '2024-01-15',
        description: 'A comprehensive guide to the most useful kitchen gadgets that will transform your cooking experience.',
        llm_quality_rating: 'HIGH',
        quality_reasons: 'Well-researched content with detailed product reviews and clear recommendations.',
        importance_score: 8,
        importance_breakdown: {
          auth: 3,
          rel: 3,
          fresh: 2,
          eng: 2
        },
        outreach_priority: 'P1',
        suggested_outreach_angle: 'Position your product as a must-have kitchen innovation that solves common cooking problems.',
        model_email: `Subject: Featured Product Opportunity - [Your Product Name]

Hi Jane,

I hope this email finds you well. I recently read your excellent article "Best Kitchen Gadgets for 2024" and was impressed by your thorough research and practical recommendations.

I wanted to reach out because I believe [Your Product Name] would be a perfect fit for your audience. [Brief product description and unique value proposition].

Would you be interested in learning more about how [Your Product Name] could benefit your readers? I'd be happy to send you a sample for review or provide additional information.

Best regards,
[Your Name]`
      }
      
      setAnalysis(mockAnalysis)
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze the listicle. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!analysis || !session?.user) return
    
    setSaving(true)
    
    try {
      // TODO: Replace with your database service call
      console.log('Saving listicle target:', analysis)
      // Temporary success - replace with actual database call
      
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save listicle target. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleBackToSearch = async () => {
    await handleSave() // Save before going back
    router.back() // Go back to previous page
  }

  const copyEmail = () => {
    if (analysis?.model_email) {
      navigator.clipboard.writeText(analysis.model_email)
      // Could add a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Listicle</h2>
              <p className="text-gray-600">Our AI is extracting detailed information and generating your outreach strategy...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <p className="font-medium">Analysis Error</p>
            <p>{error}</p>
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return <div>No analysis data available</div>
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-green-100 text-green-800'
      case 'P2': return 'bg-yellow-100 text-yellow-800'
      case 'P3': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'HIGH': return 'bg-green-100 text-green-800'
      case 'MED': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Listicle Target #{targetNumber}
            </h1>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(analysis.outreach_priority)}`}>
                {analysis.outreach_priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(analysis.llm_quality_rating)}`}>
                {analysis.llm_quality_rating} QUALITY
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Article Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {analysis.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                {analysis.author_name && (
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Author:</span>
                    <span>{analysis.author_name}</span>
                  </div>
                )}
                
                {(analysis.author_email || analysis.contact_url) && (
                  <div className="flex items-center space-x-2">
                    {analysis.author_email ? (
                      <>
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${analysis.author_email}`} className="text-blue-600 hover:text-blue-700">
                          {analysis.author_email}
                        </a>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Contact:</span>
                        <a href={analysis.contact_url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          Contact Page
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {analysis.publication_date && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">Published:</span>
                    <span>{new Date(analysis.publication_date).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">URL:</span>
                  <a href={analysis.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 break-all">
                    {analysis.url}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Description:</h3>
              <p className="text-gray-700">{analysis.description}</p>
            </div>
          </div>

          {/* LLM Evaluation */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">LLM Evaluation</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Quality Assessment</h4>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getQualityColor(analysis.llm_quality_rating)}`}>
                  {analysis.llm_quality_rating} QUALITY
                </div>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {analysis.quality_reasons}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Importance Score</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">{analysis.importance_score}</span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getPriorityColor(analysis.outreach_priority)}`}>
                    {analysis.outreach_priority}
                  </span>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Authority:</span>
                    <span>{analysis.importance_breakdown.auth}/3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Relevance:</span>
                    <span>{analysis.importance_breakdown.rel}/3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Freshness:</span>
                    <span>{analysis.importance_breakdown.fresh}/2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span>{analysis.importance_breakdown.eng}/2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Outreach Angle</h4>
              <p className="text-gray-700">{analysis.suggested_outreach_angle}</p>
            </div>
          </div>

          {/* Model Email */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Model Email</h3>
              <button
                onClick={copyEmail}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {analysis.model_email}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              onClick={handleBackToSearch}
              disabled={saving}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Target'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
