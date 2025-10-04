// app/api/analyze-listicle/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function POST(req: NextRequest) {
  try {
    const { url, userProfile } = await req.json();

    if (!url || !userProfile) {
      return NextResponse.json({ error: 'URL and user profile are required' }, { status: 400 });
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let html: string;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: controller.signal, // This enables the timeout
      });

      // Clear the timeout since fetch completed
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      html = await response.text();

    } catch (error) {
      clearTimeout(timeoutId); // Clean up timeout on error
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out after 10 seconds');
      }
      throw error; // Re-throw other errors
    }

    // Parse HTML and extract content
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .social-share').remove();
    
    // Extract metadata
    const title = $('h1').first().text().trim() || 
                  $('title').text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  'No title found';
    
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       $('p').first().text().substring(0, 200) + '...' || 
                       'No description found';

    // Extract main content with better selectors
    const contentSelectors = [
      'article', 
      '.post-content', 
      '.entry-content', 
      '.article-content',
      '.post-body',
      '.content', 
      'main', 
      '.main',
      '[role="main"]',
      '.article-body',
      '.story-body'
    ];
    
    let mainContent = '';
    let bestSelector = '';
    
    for (const selector of contentSelectors) {
      const content = $(selector).text().trim();
      if (content.length > mainContent.length) {
        mainContent = content;
        bestSelector = selector;
      }
    }
    
    // If no good content found, try paragraph-based extraction
    if (mainContent.length < 500) {
      const paragraphs = $('p').map((i, el) => $(el).text().trim()).get();
      mainContent = paragraphs.filter(p => p.length > 50).join('\n');
      bestSelector = 'paragraphs';
    }
    
    // Final fallback to body
    if (!mainContent || mainContent.length < 200) {
      mainContent = $('body').text().trim();
      bestSelector = 'body';
    }

    console.log('Best content selector used:', bestSelector);

    // Limit content length for API
    const truncatedContent = mainContent.substring(0, 8000);

    // Extract author info
    const authorName = $('.author').text().trim() || 
                      $('[rel="author"]').text().trim() || 
                      $('meta[name="author"]').attr('content') || 
                      $('.byline').text().trim() ||
                      null;

    // Extract contact info  
    const contactUrl = $('a[href*="contact"]').attr('href') || 
                      $('a[href*="about"]').attr('href') || 
                      null;

    // Extract publication date
    const pubDate = $('time').attr('datetime') || 
                   $('meta[property="article:published_time"]').attr('content') || 
                   $('.date').text().trim() ||
                   null;

    // Debug logging to see what we scraped
    console.log('=== SCRAPING DEBUG ===');
    console.log('URL:', url);
    console.log('Title extracted:', title);
    console.log('Description extracted:', description);
    console.log('Author extracted:', authorName);
    console.log('Content length:', mainContent.length);
    console.log('Content preview (first 500 chars):', truncatedContent.substring(0, 500));
    console.log('Contact URL found:', contactUrl);
    console.log('Publication date found:', pubDate);
    console.log('=== END SCRAPING DEBUG ===');

    // Create comprehensive prompt for OpenAI
    const prompt = `
Analyze this listicle and provide a comprehensive outreach assessment for ${userProfile.business_name}.

BUSINESS CONTEXT:
- Business: ${userProfile.business_name}
- Industry: ${userProfile.business_description}
- Website: ${userProfile.website || 'Not provided'}
- Experience: ${userProfile.years_in_business || 'Not specified'} years

LISTICLE DETAILS:
- Title: ${title}
- Author: ${authorName || 'Unknown'}
- URL: ${url}
- Content Preview: ${truncatedContent.substring(0, 2000)}

Please analyze this listicle and provide a JSON response with the following structure:

{
  "title": "Article title (cleaned up if needed)",
  "author_name": "Author name or null",
  "author_email": "Extracted email or null", 
  "contact_url": "Contact page URL or null",
  "publication_date": "Publication date or null",
  "description": "150-200 character summary of the article",
  "llm_quality_rating": "HIGH/MED/LOW based on content quality, writing, and authority",
  "quality_reasons": "Brief explanation of quality assessment",
  "importance_score": 1-10 (how valuable this outreach opportunity is),
  "importance_breakdown": {
    "auth": 0-3 (site authority and reach),
    "rel": 0-3 (relevance to business),
    "fresh": 0-2 (content recency),
    "eng": 0-2 (engagement potential)
  },
  "outreach_priority": "P1/P2/P3 (P1=high, P2=medium, P3=low)",
  "suggested_outreach_angle": "Specific angle for reaching out to this publication",
  "model_email": "Draft outreach email template"
}

Focus on relevance to ${userProfile.business_description} and provide actionable outreach insights.
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "You are an expert marketing analyst. Provide detailed listicle analysis in valid JSON format only. No additional text outside the JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const analysisText = completion.choices[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No analysis generated');
    }

    // Parse JSON response
    let analysis;
    try {
      // Clean the response - sometimes OpenAI adds markdown code blocks
      let cleanedResponse = analysisText.trim();
      
      // Remove markdown code blocks if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to extract JSON if there's extra text
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
      }
      
      analysis = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:');
      console.error('Raw response:', analysisText);
      console.error('Parse error:', parseError);
      
      // Return a fallback response instead of failing completely
      analysis = {
        title: title || 'Unknown Title',
        author_name: authorName,
        author_email: null,
        contact_url: contactUrl,
        publication_date: pubDate,
        description: description || 'Analysis could not be completed',
        llm_quality_rating: 'LOW',
        quality_reasons: 'AI response parsing failed',
        importance_score: 3,
        importance_breakdown: { auth: 1, rel: 1, fresh: 0, eng: 1 },
        outreach_priority: 'P3',
        suggested_outreach_angle: 'Manual review recommended',
        model_email: 'Please create custom outreach email'
      };
    }

    // Validate and clean the response
    const validatedResponse = validateAnalysisResponse(analysis, {
      title,
      authorName,
      contactUrl,
      pubDate,
      description
    });

    return NextResponse.json(validatedResponse);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}

function validateAnalysisResponse(response: any, fallbacks: any): AnalysisResponse {
  // Calculate importance score from breakdown
  const breakdown = response.importance_breakdown || {};
  const calculatedScore = (breakdown.auth || 0) + (breakdown.rel || 0) + 
                         (breakdown.fresh || 0) + (breakdown.eng || 0);
  
  const score = response.importance_score || calculatedScore || 5;
  
  // Determine priority based on score
  let priority: 'P1' | 'P2' | 'P3';
  if (score >= 8) priority = 'P1';
  else if (score >= 5) priority = 'P2';
  else priority = 'P3';

  const validated: AnalysisResponse = {
    title: response.title || fallbacks.title || 'Unknown Title',
    author_name: response.author_name || fallbacks.authorName || null,
    author_email: response.author_email || null,
    contact_url: response.contact_url || fallbacks.contactUrl || null,
    publication_date: response.publication_date || fallbacks.pubDate || null,
    description: response.description || fallbacks.description || 'No description available',
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
