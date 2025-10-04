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
    console.log('=== API START ===', new Date().toISOString());
    
    const { url, userProfile } = await req.json();
    console.log('=== REQUEST PARSED ===', new Date().toISOString());

    if (!url || !userProfile) {
      return NextResponse.json({ error: 'URL and user profile are required' }, { status: 400 });
    }

    console.log('=== STARTING FETCH ===', new Date().toISOString(), url);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('=== FETCH TIMEOUT ===', new Date().toISOString());
      controller.abort();
    }, 10000); // 10 second timeout

    let html: string;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Cache-Control': 'max-age=0'
        },
        signal: controller.signal, // This enables the timeout
      });

      // Clear the timeout since fetch completed
      clearTimeout(timeoutId);
      console.log('=== FETCH COMPLETED ===', new Date().toISOString());

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(`Website blocked our request (403 Forbidden). The site ${new URL(url).hostname} may be blocking automated access.`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      html = await response.text();
      console.log('=== HTML RECEIVED ===', new Date().toISOString(), 'Length:', html.length);

    } catch (error) {
      clearTimeout(timeoutId); // Clean up timeout on error
      console.log('=== FETCH ERROR ===', new Date().toISOString(), error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out after 10 seconds');
      }
      throw error; // Re-throw other errors
    }

    console.log('=== STARTING CHEERIO PARSE ===', new Date().toISOString());

    // Parse HTML and extract content
    const $ = cheerio.load(html);
    console.log('=== CHEERIO LOADED ===', new Date().toISOString());
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .social-share').remove();
    console.log('=== CLEANUP COMPLETE ===', new Date().toISOString());
    
    // Extract metadata
    const title = $('h1').first().text().trim() || 
                  $('title').text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  'No title found';
    
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       $('p').first().text().substring(0, 200) + '...' || 
                       'No description found';

    // FAST extraction - minimal selectors only
    let openingContent = '';
    
    // Quick paragraph extraction - just first 2 paragraphs
    const firstParagraphs = $('p').slice(0, 2).map((i, el) => $(el).text().trim()).get()
      .filter(p => p.length > 30).join('\n\n');
    
    openingContent = firstParagraphs.substring(0, 800); // Smaller limit for speed

    console.log('Opening content extraction method: fast paragraphs only');

    // FAST AUTHOR & CONTACT EXTRACTION - fewer selectors
    const quickAuthorSelectors = ['.author', '[rel="author"]', '.byline'];
    
    let authorName: string | null = null;
    let authorEmail: string | null = null;
    
    // Quick author search
    for (const selector of quickAuthorSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim()) {
        authorName = element.text().trim();
        break;
      }
    }
    
    // Fallback to meta tag only
    if (!authorName) {
      authorName = $('meta[name="author"]').attr('content') || null;
    }

    // FAST EMAIL EXTRACTION - simple regex only
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const pageText = $('body').text();
    const emailMatches = pageText.match(emailRegex);
    if (emailMatches && emailMatches.length > 0) {
      authorEmail = emailMatches[0];
    }

    // FAST CONTACT URL - just look for contact links
    let contactUrl: string | null = null;
    const contactLink = $('a[href*="contact"]').first().attr('href');
    if (contactLink) {
      contactUrl = contactLink.startsWith('http') ? contactLink : new URL(contactLink, url).toString();
    }

    // FAST DATE EXTRACTION
    let pubDate: string | null = null;
    pubDate = $('time[datetime]').first().attr('datetime') || 
             $('meta[property="article:published_time"]').attr('content') || null;

    // Streamlined content for faster processing
    const truncatedContent = openingContent.substring(0, 800);

    // Debug logging focused on contact information
    console.log('=== FAST EXTRACTION RESULTS ===');
    console.log(`Author: ${authorName || 'None'}`);
    console.log(`Email: ${authorEmail || 'None'}`);
    console.log(`Contact: ${contactUrl || 'None'}`);
    console.log(`Date: ${pubDate || 'None'}`);
    console.log(`Content: ${truncatedContent.length} chars`);
    console.log('=== END FAST EXTRACTION ===');

    // STREAMLINED PROMPT for faster OpenAI processing
    const prompt = `
Analyze this listicle quickly for ${userProfile.business_name}.

ARTICLE: ${title}
AUTHOR: ${authorName || 'Unknown'}
CONTENT: ${truncatedContent}

Rate 1-10 for outreach value considering:
- Contact info available: ${authorEmail ? 'YES (email found)' : 'NO'}
- Business relevance to: ${userProfile.business_description}

JSON response only:
{
  "title": "${title}",
  "author_name": "${authorName}",
  "author_email": "${authorEmail}",
  "contact_url": "${contactUrl}",
  "publication_date": "${pubDate}",
  "description": "Brief summary (150 chars max)",
  "llm_quality_rating": "HIGH/MED/LOW",
  "quality_reasons": "Brief explanation",
  "importance_score": 1-10,
  "importance_breakdown": {"auth": 0-3, "rel": 0-3, "fresh": 0-2, "eng": 0-2},
  "outreach_priority": "P1/P2/P3",
  "suggested_outreach_angle": "One sentence approach",
  "model_email": "Short professional email template"
}
`;

    console.log('=== STARTING OPENAI CALL ===', new Date().toISOString());
    
    // Call OpenAI API with faster settings
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Already using the fastest model
      messages: [
        {
          role: "system", 
          content: "You are a fast marketing analyst. Provide brief listicle analysis in valid JSON format only. Be concise."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1, // Lower for faster, more deterministic responses
      max_tokens: 1000, // Reduced from 2000 for speed
    });

    console.log('=== OPENAI RESPONSE RECEIVED ===', new Date().toISOString());

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
