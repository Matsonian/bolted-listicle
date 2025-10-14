// app/analyze/[...url]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Brain, Globe, Zap, Search, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface AnalysisProgress {
  phase: string;
  progress: number;
  message: string;
}

export default function AnalyzePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [progress, setProgress] = useState<AnalysisProgress>({ 
    phase: 'starting', 
    progress: 0, 
    message: 'Initializing analysis...' 
  });
  const [error, setError] = useState<string | null>(null);

  // Extract URL from params - no manipulation
  const encodedUrl = Array.isArray(params.url) ? params.url.join('/') : params.url;
  const decodedUrl = encodedUrl ? decodeURIComponent(encodedUrl) : '';

  useEffect(() => {
    if (decodedUrl) {
      startAnalysis();
    }
  }, [decodedUrl]);

  const startAnalysis = async () => {
    try {
      console.log('=== ANALYZE ROUTE: Starting analysis ===', decodedUrl);

      // Phase 1: Web Scraping
      setProgress({ 
        phase: 'scraping', 
        progress: 25, 
        message: 'Scraping website for content and contact information...' 
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Give user visual feedback
      
      // Phase 2: AI Analysis
      setProgress({ 
        phase: 'analyzing', 
        progress: 50, 
        message: 'Analyzing content with AI for outreach potential...' 
      });

      // Get user profile
      const userProfile = {
        first_name: session?.user?.name?.split(' ')[0] || 'User',
        last_name: session?.user?.name?.split(' ')[1] || '',
        business_name: 'Your Business',
        business_description: 'Your business description',
        website: 'https://yourbusiness.com',
        years_in_business: 5
      };

      console.log('=== ANALYZE ROUTE: Making API call ===', { url: decodedUrl, userProfile });

      // Make API call with cleaned URL
      const response = await fetch('/api/analyze-listicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: decodedUrl, // This is now properly cleaned
          userProfile
        }),
      });

      console.log('=== ANALYZE ROUTE: API response ===', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('=== ANALYZE ROUTE: API error ===', errorData);
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
      }

      // Phase 3: Processing Results
      setProgress({ 
        phase: 'processing', 
        progress: 75, 
        message: 'Processing analysis and generating outreach strategy...' 
      });

      const analysisData = await response.json();
      console.log('=== ANALYZE ROUTE: Analysis data received ===', analysisData);
      
      // Phase 4: Complete
      setProgress({ 
        phase: 'complete', 
        progress: 100, 
        message: 'Analysis complete! Redirecting to results...' 
      });

      await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause to show completion

      // Store results in sessionStorage for detail page
      sessionStorage.setItem(`analysis_${decodedUrl}`, JSON.stringify({
        data: analysisData,
        timestamp: Date.now()
      }));

      console.log('=== ANALYZE ROUTE: Redirecting to detail page ===');

      // Redirect to detail page with the original encoded URL
      router.push(`/listicle-detail/${encodedUrl}?analyzed=true`);

    } catch (err) {
      console.error('=== ANALYZE ROUTE: Error ===', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    }
  };

  const handleRetry = () => {
    setError(null);
    setProgress({ phase: 'starting', progress: 0, message: 'Retrying analysis...' });
    startAnalysis();
  };

  const handleGoBack = () => {
    router.back();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analysis Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleGoBack}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Analyzing Listicle
            </h1>
            <p className="text-gray-600 text-sm break-all">
              {decodedUrl}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Phase */}
          <div className="text-center mb-8">
            <p className="text-lg font-medium text-gray-900 mb-2">
              {progress.message}
            </p>
            <p className="text-sm text-gray-500">
              This usually takes 10-30 seconds
            </p>
          </div>

          {/* Phase Icons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className={`text-center p-4 rounded-lg transition-all duration-500 ${
              progress.progress >= 25 ? 'bg-blue-100 text-blue-700 scale-105' : 
              progress.phase === 'scraping' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200' : 
              'bg-gray-50 text-gray-400'
            }`}>
              <div className={`flex justify-center mb-2 ${progress.phase === 'scraping' ? 'animate-bounce' : ''}`}>
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium">Scrape</div>
            </div>

            <div className={`text-center p-4 rounded-lg transition-all duration-500 ${
              progress.progress >= 50 ? 'bg-blue-100 text-blue-700 scale-105' : 
              progress.phase === 'analyzing' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200' : 
              'bg-gray-50 text-gray-400'
            }`}>
              <div className={`flex justify-center mb-2 ${progress.phase === 'analyzing' ? 'animate-bounce' : ''}`}>
                <Brain className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium">Analyze</div>
            </div>

            <div className={`text-center p-4 rounded-lg transition-all duration-500 ${
              progress.progress >= 75 ? 'bg-blue-100 text-blue-700 scale-105' : 
              progress.phase === 'processing' ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200' : 
              'bg-gray-50 text-gray-400'
            }`}>
              <div className={`flex justify-center mb-2 ${progress.phase === 'processing' ? 'animate-bounce' : ''}`}>
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium">Process</div>
            </div>

            <div className={`text-center p-4 rounded-lg transition-all duration-500 ${
              progress.progress >= 100 ? 'bg-green-100 text-green-700 scale-105' : 
              progress.phase === 'complete' ? 'bg-green-50 text-green-600 ring-2 ring-green-200' : 
              'bg-gray-50 text-gray-400'
            }`}>
              <div className={`flex justify-center mb-2 ${progress.phase === 'complete' ? 'animate-bounce' : ''}`}>
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-xs font-medium">Complete</div>
            </div>
          </div>

          {/* What We're Doing */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="font-medium text-gray-900 mb-3">What we're analyzing:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Contact Information</span>
                <p className="text-xs">Author details, emails, contact pages</p>
              </div>
              <div>
                <span className="font-medium">Content Quality</span>
                <p className="text-xs">Authority, relevance, engagement potential</p>
              </div>
              <div>
                <span className="font-medium">Outreach Strategy</span>
                <p className="text-xs">Best approach and email templates</p>
              </div>
              <div>
                <span className="font-medium">Priority Scoring</span>
                <p className="text-xs">P1/P2/P3 ranking for outreach value</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
