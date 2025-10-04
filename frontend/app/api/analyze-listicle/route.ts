// app/api/analyze-listicle/route.ts
import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

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

async function scrapeWebpage(url: string): Promise<string> {
  try {
    console.log('🌐 Fetching webpage:', url)
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000, // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    console.log('✅ Webpage fetched, size:', html.length)

    // Parse HTML with Cheerio
    const $ = cheerio.load(html)

    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .sidebar, .advertisement, .ads').remove()

    // Extract main content - try multiple selectors
    let content = ''
    const contentSelectors = [
      'article',
      '[role="main"]',
      '.post-content',
      '.entry-content', 
      '.content',
      'main',
      '.article-body',
      '.post-body'
    ]

    for (const selector of contentSelectors) {
      const element = $(selector).first()
      if (element.length && element.text().trim().length > 200) {
        content = element.text().trim()
        console.log(`📄 Content found using selector: ${selector}`)
        break
      }
    }

    // If no content found with selectors, try to extract from body
    if (!content) {
      content = $('body').text().trim()
      console.log('📄 Content extracted from body tag')
    }

    // Clean up content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim()

    // Limit content size for OpenAI (keep within token limits)
    const maxLength = 15000 // Roughly 3000-4000 tokens
    if (content.length > maxLength) {
      content = content.substring(0, maxLength) + '...[content truncated]'
      console.log('✂️ Content truncated to fit token limits')
    }

    console.log('📊 Final content length:', content.length)
    return content

  } catch (error) {
    console.error('❌ Scraping error:', error)
    throw new Error(`Failed to scrape webpage: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function POST(req: NextRequest) {
  console.log('🚀 API route called')
  
  try {
    console.log('📝 Parsing request body...')
    const { url, userProfile }: { url: string; userProfile: UserProfile } = await req.json();
    console.log('📋 Received URL:', url)
    console.log('👤 User profile received:', !!userProfile)

    if (!url || !userProfile) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('🔑 Checking OpenAI API key...')
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.log('❌ OpenAI API key not configured')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }
    console.log('✅ OpenAI key found')

    // Scrape the webpage content
    console.log('🕷️ Starting web scraping...')
    const webpageContent = await scrapeWebpage(url)

    console.log('🔨 Building analysis prompt...')
    const prompt = buildAnalysisPrompt(url, webpageContent, userProfile);
    console.log('📝 Prompt length:', prompt.length)

    console.log('🤖 Calling OpenAI API...')
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini', // Updated to use GPT-4.1 mini
        messages: [
          {
            role: 'system',
            content: 'You are an expert content analyst specializing in evaluating listicles and articles for business outreach opportunities. You analyze actual webpage content to find contact information and assess quality. Always return valid JSON responses.'
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

    console.log('📡 OpenAI response status:', openaiResponse.status)

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('❌ OpenAI API error:', openaiResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to analyze listicle' },
        { status: 500 }
      );
    }

    console.log('✅ OpenAI response OK, parsing data...')
    const openaiData = await openaiResponse.json();
    const content = openaiData.choices[0]?.message?.content;

    if (!content) {
      console.log('❌ No content received from OpenAI')
      return NextResponse.json(
        { error: 'No content received from OpenAI' },
        { status: 500 }
      );
    }

    console.log('📄 Content received, length:', content.length)

    // Parse the JSON response
    let parsedResponse;
    try {
      console.log('🔍 Parsing JSON response...')
      parsedResponse = JSON.parse(content);
      console.log('✅ JSON parsed successfully')
    } catch (parseError) {
      console.error('❌ Failed to parse OpenAI response:', content);
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 500 }
      );
    }

    console.log('🔍 Validating response...')
    const validatedResponse = validateAndFormatResponse(parsedResponse);
    console.log('✅ Response validated')

    console.log('🎉 Returning success response')
    return NextResponse.json(validatedResponse, { status: 200 });

  } catch (error) {
    console.error('💥 API error:', error);
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

function buildAnalysisPrompt(url: string, content: string, userProfile: UserProfile): string {
  return `
Analyze this article content and extract detailed information:

URL: ${url}

WEBPAGE CONTENT:
${content}

EXTRACT AND ANALYZE:
1. TITLE: Extract the exact article title from the content
2. PUBLICATION_DATE: Find publication date (YYYY-MM-DD format) or last updated date
3. AUTHOR: Find author name from byline, bio, or about section in the content
4. CONTACT: Look for author email addresses, contact page links, or social media profiles mentioned in the content
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
   - AUTH: domain/author credibility based on content quality
   - REL: topical match to USER BUSINESS: ${userProfile.business_name} - ${userProfile.business_description}
   - FRESH: recent/updated content based on dates found
   - ENG: content depth, internal links, professional presentation
8. OUTREACH_ANGLE: One sentence pitch tailored to this specific article content
9. MODEL_EMAIL: Write personalized outreach email using business info below and referencing specific details from the article

USER BUSINESS INFO:
- Name: ${userProfile.first_name} ${userProfile.last_name}
- Business: ${userProfile.business_name}
- Description: ${userProfile.business_description}
- Website: ${userProfile.website || 'Not provided'}
- Years in Business: ${userProfile.years_in_business || 'Not specified'}

Return ONLY valid JSON in this exact format:
{
  "title": "exact article title from content",
  "author_name": "author name found in content or null",
  "author_email": "email@domain.com found in content or null", 
  "contact_url": "contact page URL or social media URL found in content or null",
  "publication_date": "YYYY-MM-DD found in content or null",
  "description": "200 char max description based on actual content",
  "llm_quality_rating": "HIGH|MED|LOW",
  "quality_reasons": "• bullet point reasons based on actual content analysis",
  "importance_score": 1-10,
  "importance_breakdown": {
    "auth": 0-3,
    "rel": 0-3, 
    "fresh": 0-2,
    "eng": 0-2
  },
  "outreach_priority": "P1|P2|P3",
  "suggested_outreach_angle": "one sentence pitch based on actual article content",
  "model_email": "complete professional email referencing specific details from the article"
}

Note: Base all analysis on the actual webpage content provided, not assumptions about the URL.
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
