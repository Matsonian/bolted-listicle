// src/services/openaiService.ts

interface UserProfile {
  first_name: string;
  last_name: string;
  business_name: string;
  business_description: string;
  website?: string;
  years_in_business?: number;
}

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

class OpenAIService {
  async analyzeListicle(url: string, userProfile: UserProfile): Promise<AnalysisResponse> {
    try {
      // Call our secure Vercel API function instead of OpenAI directly
      const response = await fetch('/api/analyze-listicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          userProfile
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
      }

      const analysisData = await response.json();
      return analysisData;

    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw new Error(`Failed to analyze listicle: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const openaiService = new OpenAIService();
export type { AnalysisResponse, UserProfile };
