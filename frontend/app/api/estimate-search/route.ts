import { NextRequest, NextResponse } from 'next/server';

interface EstimateResponse {
  estimatedCount: number;
  query: string;
}

class PerplexityEstimateService {
  private apiKey: string;
  private baseUrl = 'https://api.perplexity.ai/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    
    if (!this.apiKey) {
      throw new Error('Perplexity API key not configured');
    }
  }

  async estimateListicleCount(query: string): Promise<number> {
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid search query');
    }

    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) {
      throw new Error('Search query cannot be empty');
    }

    try {
      // Single search with broader prompt to get estimate
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'user',
              content: `Estimate how many high-quality listicles and "best of" articles exist about: ${sanitizedQuery}

INSTRUCTIONS:
- Provide a realistic estimate of listicle articles available
- Consider: "Top 10" lists, "Best of" articles, buying guides, product comparisons
- Only count legitimate listicles with product recommendations
- Give a single number estimate

Return ONLY citations/URLs of actual listicle articles you find. Do not explain or add commentary.`
            }
          ],
          return_citations: true,
          temperature: 0.1,
          max_tokens: 2000,
          search_domain_filter: null,
          search_recency_filter: null
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const citations = data.citations || [];
      const content = data.choices[0]?.message?.content || '';
      
      // Extract URLs from both citations and content
      const urlPattern = /https?:\/\/[^\s\)>,;!"'\]\}]+/gi;
      const contentUrls = content.match(urlPattern) || [];
      
      // Combine and filter for likely listicle URLs
      const allUrls = [...citations, ...contentUrls];
      const uniqueUrls = Array.from(new Set(allUrls));
      
      // Filter out obvious non-listicle URLs
      const listicleUrls = uniqueUrls.filter(url => {
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname.toLowerCase();
          const pathname = urlObj.pathname.toLowerCase();
          
          // Exclude social media, video platforms, etc.
          const excludePatterns = [
            'youtube.com', 'youtu.be', 'vimeo.com',
            'facebook.com', 'twitter.com', 'instagram.com',
            '/search', '/tag/', '/category/', '/author/',
            '/contact', '/about', '/privacy', '/terms',
            '.pdf', '.doc', '.xls', '.ppt', '.zip'
          ];
          
          return !excludePatterns.some(pattern => 
            hostname.includes(pattern) || pathname.includes(pattern)
          );
        } catch {
          return false;
        }
      });
      
      // Return count with slight multiplier for estimate
      // Since this is one search variation, multiply by ~3-4 to estimate full search potential
      const baseCount = listicleUrls.length;
      const estimatedTotal = Math.min(Math.round(baseCount * 3.5), 50);
      
      console.log(`Estimate for "${sanitizedQuery}": ${baseCount} found, ${estimatedTotal} estimated total`);
      
      return Math.max(estimatedTotal, 5); // Minimum 5 to make it worth signing up
      
    } catch (error) {
      console.error('Estimate search error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Estimate service temporarily unavailable');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      console.error('PERPLEXITY_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const estimateService = new PerplexityEstimateService(apiKey);
    const estimatedCount = await estimateService.estimateListicleCount(query);
    
    return NextResponse.json({ 
      estimatedCount,
      query: query.trim()
    });
    
  } catch (error) {
    console.error('Estimate API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Estimate service temporarily unavailable';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
