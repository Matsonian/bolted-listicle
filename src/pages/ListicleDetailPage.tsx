import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ExternalLink, Calendar, User, Mail, Link as LinkIcon, Star, Target, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ListicleAnalysis {
  title: string;
  url: string;
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

export default function ListicleDetailPage() {
  const { url: encodedUrl } = useParams<{ url: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analysis, setAnalysis] = useState<ListicleAnalysis | null>(null);
  const [error, setError] = useState<string>('');
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
      
      // Get user's next target number
      const { data: targets, error } = await supabase
        .from('listicle_targets')
        .select('target_number')
        .eq('user_id', user.id)
        .order('target_number', { ascending: false })
        .limit(1);
      
      if (!error && targets && targets.length > 0) {
        setTargetNumber(targets[0].target_number + 1);
      } else {
        setTargetNumber(1);
      }
    };

    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (encodedUrl && user) {
      analyzeListicle();
    }
  }, [encodedUrl, user]);

  const analyzeListicle = async () => {
    if (!encodedUrl) return;
    
    setLoading(true);
    setError('');

    try {
      const decodedUrl = decodeURIComponent(encodedUrl);
      
      // TODO: Replace with actual OpenAI API call
      // For now, we'll simulate the analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis data - replace with actual OpenAI response
      const mockAnalysis: ListicleAnalysis = {
        title: "Best Project Management Software of 2025",
        url: decodedUrl,
        author_name: "Sarah Johnson",
        author_email: "sarah@techreview.com",
        contact_url: null,
        publication_date: "2025-01-15",
        description: "Comprehensive review of top project management tools with detailed feature comparisons, pricing analysis, and user feedback from 500+ businesses.",
        llm_quality_rating: "HIGH",
        quality_reasons: "• Clear numbered list structure\n• Covers 12+ tools with detailed specs\n• Original testing notes and benchmarks\n• Updated within 30 days\n• Credible tech publication",
        importance_score: 8,
        importance_breakdown: {
          auth: 3,
          rel: 3,
          fresh: 2,
          eng: 0
        },
        outreach_priority: "P1",
        suggested_outreach_angle: "Pitch your project management tool as a rising alternative with unique team collaboration features.",
        model_email: `Subject: ${user?.business_name || 'Our company'} - Innovative Project Management Solution for Your Next Review

Hi Sarah,

I came across your excellent article "Best Project Management Software of 2025" and was impressed by your thorough analysis of the current market landscape.

I'm ${user?.first_name || 'writing'} from ${user?.business_name || 'our company'}, where we've developed an innovative project management solution that I believe would be valuable for your readers. ${user?.business_description || 'Our platform offers unique features that differentiate it from the traditional options covered in your review.'}

Key differentiators that might interest your audience:
• Advanced team collaboration features
• Intuitive user interface designed for non-technical teams  
• Competitive pricing model
• Strong customer satisfaction ratings

Would you be interested in learning more about our solution for a potential future review or update to your article? I'd be happy to provide a demo or additional information.

Best regards,
${user?.first_name || ''} ${user?.last_name || ''}
${user?.business_name || ''}
${user?.website || ''}

P.S. I particularly appreciated your insights on the importance of user adoption - it's exactly why we focused so heavily on intuitive design.`
      };

      setAnalysis(mockAnalysis);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze the listicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!analysis || !user) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('listicle_targets')
        .insert({
          user_id: user.id,
          target_number: targetNumber,
          title: analysis.title,
          url: analysis.url,
          author_name: analysis.author_name,
          author_email: analysis.author_email,
          contact_url: analysis.contact_url,
          publication_date: analysis.publication_date,
          description: analysis.description,
          llm_quality_rating: analysis.llm_quality_rating,
          quality_reasons: analysis.quality_reasons,
          importance_score: analysis.importance_score,
          importance_breakdown: analysis.importance_breakdown,
          outreach_priority: analysis.outreach_priority,
          suggested_outreach_angle: analysis.suggested_outreach_angle,
          model_email: analysis.model_email
        });

      if (error) {
        console.error('Save error:', error);
        setError('Failed to save listicle target. Please try again.');
      } else {
        // Success feedback could be added here
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save listicle target. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBackToSearch = async () => {
    await handleSave(); // Save before going back
    navigate(-1); // Go back to previous page
  };

  const copyEmail = () => {
    if (analysis?.model_email) {
      navigator.clipboard.writeText(analysis.model_email);
      // Could add a toast notification here
    }
  };

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
    );
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
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return <div>No analysis data available</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'bg-green-100 text-green-800';
      case 'P2': return 'bg-yellow-100 text-yellow-800';
      case 'P3': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'HIGH': return 'bg-green-100 text-green-800';
      case 'MED': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
  );
}
