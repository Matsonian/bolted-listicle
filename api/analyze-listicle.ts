// api/analyze-listicle.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, userProfile }: { url: string; userProfile: UserProfile } = req.body;

    if (!url || !userProfile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get OpenAI API key from environment (server-side only)
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Build the analysis prompt
    const prompt = buildAnalysisPrompt(url, userProfile);

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content analyst specializing in evaluating listicles for business outreach opportunities. Always return valid JSON responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', openaiResponse.status, errorText);
      return res.status(500).json({ error: 'Failed to analyze listicle' });
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No content received from OpenAI' });
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      return res.status(500).json({ error: 'Invalid response from AI' });
    }

    // Validate and format the response
    const validatedResponse = validateAndFormatResponse(parsedResponse);

    return res.status(200).json(validatedResponse);

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function buildAnalysisPrompt(url: string, userProfile: UserProfile): string {
  return `
Analyze this article URL and extract detailed information:

URL: ${url}

EXTRACT AND ANALYZE:
1. TITLE: Extract the exact article title
2. PUBLICATION_DATE: Find publication date (YYYY-MM-DD format) or last updated date
3. AUTHOR: Find author name from byline, bio, or about section
4. CONTACT: Find author email, contact page URL, or social media link for the author
5. DESCRIPTION: Write a 200-character summary of the article content
6. QUALITY (HIGH|MED|LOW) — from an LLM POV: likely to be indexed/cited?
   Signals (+1 each): 
   - S: numbered "Best/Top" item list (H2/H3, scannable)
   - C: ≥8 items or deep specs/pros/cons
   - O/E: original notes, testing, or cited sources
   - F: updated ≤180d or clearly current models/pricing
   - A/UX: credible site/author + clean, non-spammy UX
   Rule: HIGH=4–5, MED=2–3, LOW=0–1
7. IMPORTANCE (1–10) — outreach priority for LLM impact
   Score = AUTH(0–3) + REL(0–3) + FRESH(0–2) + ENG(0–2)
   - AUTH: domain/author credibility
   - REL: topical match to USER BUSINESS: ${userProfile.business_name} - ${userProfile.business_description}
   - FRESH: recent/updated content
   - ENG: on-page signals (ToC, internal links, shares/comments if shown)
8. OUTREACH_ANGLE: One sentence pitch tailored to this article
9. MODEL_EMAIL: Write personalized outreach email using business info below

USER BUSINESS INFO:
- Name: ${userProfile.first_name} ${userProfile.last_name}
- Business: ${userProfile.business_name}
- Description: ${userProfile.business_description}
- Website: ${userProfile.website || 'Not provided'}
- Years in Business: ${userProfile.years_in_business || 'Not specified'}

Return ONLY valid JSON in this exact format:
{
  "title": "exact article title",
  "author_name": "author name or null",
  "author_email": "email@domain.com or null", 
  "contact_url": "contact page URL or social media URL or null",
  "publication_date": "YYYY-MM-DD or null",
  "description": "200 char max description",
  "llm_quality_rating": "HIGH|MED|LOW",
  "quality_reasons": "• bullet point reasons why this rating",
  "importance_score": 1-10,
  "importance_breakdown": {
    "auth": 0-3,
    "rel": 0-3, 
    "fresh": 0-2,
    "eng": 0-2
  },
  "outreach_priority": "P1|P2|P3",
  "suggested_outreach_angle": "one sentence pitch",
  "model_email": "complete professional email ready to send"
}

Note: For contact information, prioritize in this order: 1) direct email, 2) contact page, 3) social media. If none found, use null.
`;
}

function validateAndFormatResponse(response: any): AnalysisResponse {
  // Calculate priority based on importance score
  let priority: 'P1' | 'P2' | 'P3' = 'P3';
  const score = parseInt(response.importance_score) || 1;
  if (score >= 8) priority = 'P1';
  else if (score >= 6) priority = 'P2';

  const validated: AnalysisResponse = {
    title: response.title || 'Title not found',
    author_name: response.author_name || null,
    author_email: response.author_email || null,
    contact_url: response.contact_url || null,
    publication_date: response.publication_date || null,
    description: response.description || 'Description not available',
    llm_quality_rating: ['HIGH', 'MED', 'LOW'].includes(response.llm_quality_rating) 
      ? response.llm_quality_rating : 'LOW',
    quality_reasons: response.quality_reasons || 'No quality assessment available',
    importance_score: Math.min(Math.max(score, 1), 10),
    importance_breakdown: {
      auth: Math.min(Math.max(parseInt(response.importance_breakdown?.auth) || 0, 0), 3),
      rel: Math.min(Math.max(parseInt(response.importance_breakdown?.rel) || 0, 0), 3),
      fresh: Math.min(Math.max(parseInt(response.importance_breakdown?.fresh) || 0, 0), 2),
      eng: Math.min(Math.max(parseInt(response.importance_breakdown?.eng) || 0, 0), 2)
    },
    outreach_priority: ['P1', 'P2', 'P3'].includes(response.outreach_priority) 
      ? response.outreach_priority : priority,
    suggested_outreach_angle: response.suggested_outreach_angle || 'Consider reaching out to this publication',
    model_email: response.model_email || 'Email template not generated'
  };

  // Ensure description is within character limit
  if (validated.description.length > 200) {
    validated.description = validated.description.substring(0, 197) + '...';
  }

  return validated;
}
