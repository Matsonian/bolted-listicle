// app/listicle-detail/[...url]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Star, 
  ExternalLink, 
  Copy,
  Phone,
  Globe,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface AnalysisResponse {
  title: string;
  author_name: string | null;
  author_email: string | null;
  contact_url: string | null;
  publication_date: string | null;
  description: string;
  llm_quality_rating: 'HIGH' | 'MED' | 'LOW';
  quality_reasons: string;
  importance_score: number;
  importance_breakdown: {
    auth: number;
    rel: number;
    fresh: number;
    eng: number;
  };
  outreach_priority: 'P1' | 'P2' | 'P3';
  suggested_outreach_angle: string;
  model_email: string;
}

interface ExtendedAnalysisResponse extends AnalysisResponse {
  author_bio?: string;
  author_url?: string;
}

export default function ListicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ExtendedAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Get the original URL from sessionStorage (stored by search page)
const [originalUrl, setOriginalUrl] = useState('');

useEffect(() => {
  // Try to get the original URL from sessionStorage first
  const storedUrl = sessionStorage.getItem('originalUrl');
  if (storedUrl) {
    setOriginalUrl(storedUrl);
    console.log('=== DETAIL PAGE: Using stored original URL ===', storedUrl);
  } else {
    // Fallback: decode from route params
    const encodedUrl = Array.isArray(params.url) ? params.url.join('/') : params.url;
    const decodedUrl = encodedUrl ? decodeURIComponent(encodedUrl) : '';
    setOriginalUrl(decodedUrl);
    console.log('=== DETAIL PAGE: Using decoded URL as fallback ===', decodedUrl);
  }
}, [params.url]);

  // Function to fix URLs for display/navigation only
  const fixUrlForDisplay = (url: string) => {
    if (!url) return '';
    
    // Only fix clearly broken URLs
    if (url.startsWith('www.') || (!url.startsWith('http') && url.includes('.'))) {
      return `https://${url}`;
    }
    
    return url; // Return as-is for valid URLs
  };

useEffect(() => {
  if (!originalUrl) return;  // ← Use originalUrl instead
  console.log('=== DETAIL PAGE: Component mounted ===', originalUrl);  // ← Use originalUrl instead
  
  // First, check if we have a saved analysis in the database
  checkForSavedAnalysis();
}, [originalUrl]);  // ← Use originalUrl instead

const checkForSavedAnalysis = async () => {
  try {
    console.log('🔍 Checking for saved analysis...');
    setLoading(true);
    setError(null);

    const response = await fetch('/api/get-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: originalUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to check for saved analysis');
    }

    const result = await response.json();

    if (result.found && result.analysis) {
      console.log('✅ Found saved analysis from:', result.analysis.analyzed_at);
      setAnalysis(result.analysis);
      setLoading(false);
    } else {
      console.log('❌ No saved analysis found, performing new analysis...');
      // No saved analysis, perform new analysis
      analyzeListicle();
    }
  } catch (error) {
    console.error('❌ Error checking for saved analysis:', error);
    // If check fails, fall back to new analysis
    analyzeListicle();
  }
};

  const analyzeListicle = async () => {
    try {
      console.log('=== DETAIL PAGE: Starting fallback analysis for ===', originalUrl);
      setLoading(true);
      setError(null);
      
      const userProfile = {
        first_name: 'John',
        last_name: 'Doe',
        business_name: 'Your Business',
        business_description: 'Your business description',
        website: 'https://yourbusiness.com',
        years_in_business: 5
      };

      const response = await fetch('/api/analyze-listicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: originalUrl, 
          userProfile
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('=== DETAIL PAGE: Analysis result ===', result);
      setAnalysis(result);
    } catch (err) {
      console.error('=== DETAIL PAGE: Fallback analysis error ===', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-green-100 text-green-800 border-green-200';
      case 'P2': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'P3': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'HIGH': return 'bg-green-100 text-green-800 border-green-200';
      case 'MED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Analyzing listicle and extracting contact information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-12">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={analyzeListicle}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return <div>No analysis data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/search')}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Listicle Analysis
              </h1>
              {/* Display URL with fix for display */}
              <a 
                href={fixUrlForDisplay(originalUrl)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm break-all inline-flex items-center gap-1"
              >
                {originalUrl}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(analysis.outreach_priority)}`}>
                {analysis.outreach_priority} Priority
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQualityColor(analysis.llm_quality_rating)}`}>
                {analysis.llm_quality_rating} Quality
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Article Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Article Overview */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {analysis.title}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                {analysis.publication_date && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Published: {analysis.publication_date}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Analyzed: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Article Summary:</h3>
                <p className="text-gray-700 leading-relaxed">{analysis.description}</p>
              </div>
            </div>

            {/* Quality Assessment */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Quality Assessment
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getQualityColor(analysis.llm_quality_rating)}`}>
                      {analysis.llm_quality_rating} QUALITY
                    </span>
                    <span className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full shadow-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-lg">{analysis.importance_score}/10</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{analysis.quality_reasons}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Authority & Reach:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(analysis.importance_breakdown.auth/3)*100}%`}}></div>
                        </div>
                        <span className="font-medium">{analysis.importance_breakdown.auth}/3</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Relevance:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: `${(analysis.importance_breakdown.rel/3)*100}%`}}></div>
                        </div>
                        <span className="font-medium">{analysis.importance_breakdown.rel}/3</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Freshness:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(analysis.importance_breakdown.fresh/2)*100}%`}}></div>
                        </div>
                        <span className="font-medium">{analysis.importance_breakdown.fresh}/2</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engagement:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: `${(analysis.importance_breakdown.eng/2)*100}%`}}></div>
                        </div>
                        <span className="font-medium">{analysis.importance_breakdown.eng}/2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outreach Strategy */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Outreach Strategy</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Suggested Approach:</h4>
                  <p className="text-gray-700 leading-relaxed">{analysis.suggested_outreach_angle}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Draft Email Template:</h4>
                  <div className="relative bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{analysis.model_email}</pre>
                    <button
                      onClick={() => copyToClipboard(analysis.model_email, 'email')}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy email template"
                    >
                      {copied === 'email' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-6">
            {/* Author Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {/* Display found author information */}
                {analysis.author_name && (
                  <div className="border-b pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Author Found
                        </h4>
                        <p className="text-gray-700">{analysis.author_name}</p>
                      </div>
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Display found email */}
                {analysis.author_email && (
                  <div className="border-b pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Email Found
                        </h4>
                        <p className="text-gray-700 break-all">{analysis.author_email}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(analysis.author_email!, 'author_email')}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy email"
                      >
                        {copied === 'author_email' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2">
                      <a
                        href={`mailto:${analysis.author_email}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Send Email
                      </a>
                    </div>
                  </div>
                )}

                {/* Contact URLs */}
                {analysis.contact_url && (
                  <div className="border-b pb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Contact Page
                      </h4>
                      <a
                        href={analysis.contact_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm break-all inline-flex items-center gap-1 mt-1"
                      >
                        View Contact Page
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Show status based on what we found */}
                {!analysis.author_email && !analysis.contact_url && !analysis.author_name && (
                  <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <XCircle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-2">No Direct Contact Found</h4>
                    <p className="text-gray-600 text-sm mb-3">Try these alternative outreach methods:</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Search for the publication's social media accounts</p>
                      <p>• Look for author profiles on LinkedIn or Twitter</p>
                      <p>• Check the website's general contact form</p>
                      <p>• Try reaching out via comments on the article</p>
                    </div>
                  </div>
                )}

                {/* Partial contact info found */}
                {(analysis.author_name && !analysis.author_email && !analysis.contact_url) && (
                  <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Author Found - Research Needed</h4>
                    <p className="text-blue-700 text-sm mb-2">Search for {analysis.author_name} on:</p>
                    <div className="text-xs text-blue-600 space-y-1">
                      <p>• LinkedIn for professional contact</p>
                      <p>• Twitter/X for social media outreach</p>
                      <p>• Google for author website or bio page</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open(fixUrlForDisplay(originalUrl), '_blank')}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  View Article
                </button>
                
                {analysis.author_email && (
                  <button
                    onClick={() => window.location.href = `mailto:${analysis.author_email}?subject=Collaboration Opportunity&body=${encodeURIComponent(analysis.model_email)}`}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Send Outreach Email
                  </button>
                )}
                
                <button
                  onClick={() => copyToClipboard(analysis.model_email, 'template')}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {copied === 'template' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  Copy Email Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
