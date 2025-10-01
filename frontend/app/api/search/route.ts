import { NextRequest, NextResponse } from 'next/server';

interface ListicleResult {
  id: string;
  title: string;
  url: string;
  domain: string;
}

class PerplexitySearchService {
  private apiKey: string;
  private baseUrl = 'https://api.perplexity.ai/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    
    if (!this.apiKey) {
      throw new Error('Perplexity API key not configured');
    }
  }

  async searchListicles(query: string): Promise<ListicleResult[]> {
    if (!this.apiKey) {
      throw new Error('Perplexity API key not configured. The API key should be automatically loaded from environment variables.');
    }

    if (!query || typeof query !== 'string') {
      throw new Error('Invalid search query');
    }

    const sanitizedQuery = query.trim();
    if (!sanitizedQuery) {
      throw new Error('Search query cannot be empty');
    }

    try {
      const searchVariations = this.generateSearchVariations(sanitizedQuery);
      const allResults: ListicleResult[] = [];
      
      console.log('=== ENHANCED SEARCH STRATEGY ===');
      console.log(`Search variations (${searchVariations.length}):`, searchVariations);
      
      for (let i = 0; i < searchVariations.length; i++) {
        const searchTerm = searchVariations[i];
        console.log(`\n--- Search ${i + 1}/${searchVariations.length}: "${searchTerm}" ---`);
        
        try {
          const results = await this.performSingleSearch(searchTerm, sanitizedQuery);
          console.log(`Found ${results.length} results for "${searchTerm}"`);
          allResults.push(...results);
          
          if (i < searchVariations.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 800));
          }
        } catch (error) {
          console.error(`Error in search variation "${searchTerm}":`, error);
        }
      }
      
      const uniqueResults = this.deduplicateResults(allResults);
      console.log(`\n=== ENHANCED RESULTS ===`);
      console.log(`Total results before deduplication: ${allResults.length}`);
      console.log(`Unique results after deduplication: ${uniqueResults.length}`);
      console.log('=========================');
      
      return uniqueResults.slice(0, 50);
    } catch (error) {
      console.error('Enhanced search error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Search service temporarily unavailable');
    }
  }

  generateSearchVariations(query: string): string[] {
    const variations = [
      query,
      `best ${query}`,
      `top ${query}`,
      `${query} reviews`,
      // `top 10 ${query}`,
      // `top 15 ${query}`,
      // `best 5 ${query}`,
      // `7 best ${query}`,
      `${query} buying guide`,
      `${query} recommendations`,
      `${query} buyer's guide`,
      `ultimate ${query} guide`,
      `complete ${query} guide`,
      `${query} roundup`,
      `${query} tested`,
      `${query} comparison`,
      `${query} vs`,
      `best budget ${query}`,
      `cheap ${query}`,
      `affordable ${query}`,
      `${query} for beginners`,
      `professional ${query}`,
      `best ${query} 2024`,
      `${query} 2025`
    ];
    
    return Array.from(new Set(variations)).slice(0, 12);
  }

  async performSingleSearch(searchTerm: string, originalQuery: string): Promise<ListicleResult[]> {
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
            content: `Find ALL listicles and "best of" articles about: ${searchTerm}

CRITICAL INSTRUCTIONS:
- ONLY return results for articles that actually exist and that you can verify
- DO NOT make up or fabricate any URLs
- DO NOT create fake article titles
- DO NOT provide general website recommendations or "this is a good site for..." statements
- If you find fewer than 10 results, that's perfectly fine - quality over quantity

WHAT I NEED:
- Real article titles (preferably H1 tags from actual webpages)
- Working URLs to actual articles
- Only listicles, rankings, and "best of" articles - high quality blogs or informational sites are okay - low quality blogs or informational sites are not okay

SEARCH CRITERIA:
- Numbered lists ("Top 10", "Best 5", etc.)
- "Best of" product recommendations
- Product comparison articles
- Buying guides with ranked recommendations

RESPONSE FORMAT:
For each REAL article you find:
Title: [Actual article headline/H1 from webpage]
URL: [Complete working URL]

If you can only find 3-5 real articles, return those. Do not pad the results with fake entries or general website suggestions.

ABSOLUTELY DO NOT:
- Invent URLs that don't exist
- Create generic titles like "Best [Product] Guide"  
- Include general blogs without specific listicles
- Add commentary about websites being "good resources"

Only verified, actual listicle articles with real titles and working URLs.`
          }
        ],
        return_citations: true,
        temperature: 0.1,
        max_tokens: 6000,
        search_domain_filter: null,
        search_recency_filter: null
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const citations = data.citations || [];
    const content = data.choices[0]?.message?.content || '';
    
    const citationUrls = citations;
    const contentUrls = this.extractUrlsFromContent(content);
    
    const allUrls = [...citationUrls, ...contentUrls];
    const uniqueUrls = Array.from(new Set(allUrls));
    
    console.log(`=== URL EXTRACTION DEBUG ===`);
    console.log(`Citations found: ${citations.length}`);
    console.log(`Content URLs extracted: ${contentUrls.length}`);
    console.log(`Total unique URLs: ${uniqueUrls.length}`);
    
    return this.parseResults(uniqueUrls, content, originalQuery);
  }

  extractUrlsFromContent(content: string): string[] {
    const urlPattern = /https?:\/\/[^\s\)>,;!"'\]\}]+/gi;
    const urls = content.match(urlPattern) || [];
    
    const cleanUrls = urls
      .map(url => url.replace(/[.,;!?)\]"'>}]+$/, ''))
      .filter(url => {
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname.toLowerCase();
          const pathname = urlObj.pathname.toLowerCase();
          
        const excludePatterns = [
  // YouTube - all variants
  'youtube.com', 'youtu.be', 'youtube', 'm.youtube.com', 'music.youtube.com', 'studio.youtube.com',
  // Video platforms
  'vimeo.com', 'dailymotion.com', 'twitch.tv',
  // Social media
  'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
  'tiktok.com', 'pinterest.com', 'snapchat.com',
  // Navigation pages
  '/search', '/tag/', '/category/', '/author/', '/page/',
  '/contact', '/about', '/privacy', '/terms', '/sitemap',
  // File types
  '.pdf', '.doc', '.xls', '.ppt', '.zip', '.mp4', '.mp3', '.avi',
  // Low-quality domains to avoid
  'reddit.com', 'quora.com', 'answers.com',
  // Shopping/affiliate sites (if you want to exclude)
  'amazon.com/gp/', 'ebay.com', 'walmart.com', 'target.com'
];
          
      
          const isExcluded = excludePatterns.some(pattern => 
  hostname.includes(pattern.toLowerCase()) || 
  url.toLowerCase().includes(pattern.toLowerCase())
);
          
          return !isExcluded;
        } catch {
          return false;
        }
      });
    
    return Array.from(new Set(cleanUrls));
  }

  parseResults(urls: string[], content: string, query: string): ListicleResult[] {
    const results: ListicleResult[] = [];
    
    urls.forEach((url, index) => {
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        
        const title = this.extractTitleFromContent(content, url, index) || 
                     this.extractTitleFromUrl(url) || 
                     this.generateTitleFromDomain(domain, query);
        
        results.push({
          id: `enhanced-${Date.now()}-${index}`,
          title,
          url,
          domain
        });
      } catch (error) {
        console.error('Error processing URL:', url, error);
      }
    });

    console.log(`Parsed ${results.length} results from ${urls.length} URLs`);
    return results.slice(0, 40);
  }

  deduplicateResults(results: ListicleResult[]): ListicleResult[] {
    const seen = new Set();
    const unique: ListicleResult[] = [];
    
    for (const result of results) {
      const key = result.url.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(result);
      }
    }
    
    return unique;
  }

  extractTitleFromContent(content: string, url: string, index: number): string {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.includes(url)) {
        for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
          const prevLine = lines[j].trim();
          if (this.looksLikeTitle(prevLine)) {
            return this.cleanTitle(prevLine);
          }
        }
        
        for (let j = i + 1; j < Math.min(lines.length, i + 3); j++) {
          const nextLine = lines[j].trim();
          if (this.looksLikeTitle(nextLine)) {
            return this.cleanTitle(nextLine);
          }
        }
      }
    }
    
    for (const line of lines) {
      if (line.includes(url)) {
        const patterns = [
          /^(\d+\.\s*)?(.+?)\s*[-—–]\s*https?:\/\//,
          /^(\d+\.\s*)?(.+?)\s*\(\s*https?:\/\//,
          /^(\d+\.\s*)?(.+?)\s*https?:\/\//,
          /^[•\-*]\s*(.+?)\s*[-—–]\s*https?:\/\//,
          /^[•\-*]\s*(.+?)\s*https?:\/\//
        ];
        
        for (const pattern of patterns) {
          const match = line.match(pattern);
          if (match && match[2]) {
            const title = match[2].trim();
            if (this.looksLikeTitle(title)) {
              return this.cleanTitle(title);
            }
          }
        }
      }
    }
    
    return '';
  }
  
  extractTitleFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      const pathParts = pathname.split('/').filter(part => part.length > 0);
      const lastPart = pathParts[pathParts.length - 1];
      
      if (lastPart && lastPart !== 'index.html' && lastPart !== 'index.php') {
        const title = lastPart
          .replace(/\.(html|php|aspx?)$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .trim();
          
        if (title.length > 5 && title.length < 100) {
          return title;
        }
      }
    } catch (error) {
      // Invalid URL
    }
    
    return '';
  }
  
  looksLikeTitle(text: string): boolean {
    if (!text || text.length < 10 || text.length > 200) return false;
    if (text.includes('http://') || text.includes('https://')) return false;
    
    const wordCount = text.split(/\s+/).length;
    return wordCount >= 3;
  }
  
  cleanTitle(title: string): string {
    return title
      .replace(/^\d+\.\s*/, '')
      .replace(/^[•\-*]\s*/, '')
      .replace(/\s*[-—–]\s*$/, '')
      .replace(/\s*\|\s*.*$/, '')
      .trim();
  }
  
  generateTitleFromDomain(domain: string, query: string): string {
    const domainName = domain.split('.')[0];
    const capitalizedDomain = domainName.charAt(0).toUpperCase() + domainName.slice(1);
    const capitalizedQuery = query.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return `${capitalizedQuery} Guide from ${capitalizedDomain}`;
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

    const perplexityService = new PerplexitySearchService(apiKey);
    const results = await perplexityService.searchListicles(query);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Search service temporarily unavailable';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
