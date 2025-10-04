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

    // Extract opening content (first few paragraphs that describe the article)
    let openingContent = '';
    
    // Try to get the first 2-3 meaningful paragraphs
    const paragraphs = $('p').map((i, el) => $(el).text().trim()).get()
      .filter(p => p.length > 50 && !p.toLowerCase().includes('cookie') && !p.toLowerCase().includes('subscribe'));
    
    openingContent = paragraphs.slice(0, 3).join('\n\n');
    
    // If we didn't get much, try intro/lead selectors
    if (openingContent.length < 300) {
      const introSelectors = ['.intro', '.lead', '.article-intro', '.post-intro', '.excerpt', '.summary'];
      for (const selector of introSelectors) {
        const intro = $(selector).text().trim();
        if (intro.length > openingContent.length) {
          openingContent = intro;
        }
      }
    }

    console.log('Opening content extraction method: paragraphs + intro selectors');

    // Limit opening content for API (focus on first 1500 chars instead of 8000)
    const truncatedContent = openingContent.substring(0, 1500);

    // ENHANCED AUTHOR & CONTACT EXTRACTION
    // Try multiple strategies to find author information
    const authorSelectors = [
      '.author-name', '.author', '.byline', '.post-author', '.article-author',
      '[rel="author"]', '.writer', '.contributor', '.by-author',
      'span[class*="author"]', 'div[class*="author"]', 'p[class*="author"]'
    ];
    
    let authorName: string | null = null;
    let authorBio: string | null = null;
    let authorEmail: string | null = null;
    
    for (const selector of authorSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim()) {
        authorName = element.text().trim();
        // Try to find author bio near the author name
        authorBio = element.next('p').text().trim() || 
                   element.parent().find('p').first().text().trim() ||
                   element.siblings('.bio, .author-bio').text().trim();
        break;
      }
    }
    
    // Fallback author extraction from meta tags
    if (!authorName) {
      authorName = $('meta[name="author"]').attr('content') || 
                  $('meta[property="article:author"]').attr('content') ||
                  $('meta[name="byl"]').attr('content') || null;
    }

    // ENHANCED EMAIL EXTRACTION
    // Look for email addresses in multiple places
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    
    // Search in author bio/section
    if (authorBio) {
      const bioEmails = authorBio.match(emailRegex);
      if (bioEmails) authorEmail = bioEmails[0];
    }
    
    // Search in contact sections
    if (!authorEmail) {
      const contactSections = $('.contact, .author-contact, .bio, .about-author').text();
      const contactEmails = contactSections.match(emailRegex);
      if (contactEmails) authorEmail = contactEmails[0];
    }
    
    // Search in mailto links
    if (!authorEmail) {
      $('a[href^="mailto:"]').each((i, el) => {
        if (!authorEmail) {
          const href = $(el).attr('href');
          if (href) {
            authorEmail = href.replace('mailto:', '').split('?')[0];
          }
        }
      });
    }

    // ENHANCED CONTACT URL EXTRACTION
    // Look for multiple types of contact information
    const contactSelectors = [
      'a[href*="contact"]', 'a[href*="about"]', 'a[href*="team"]',
      'a[href*="author"]', 'a[href*="bio"]', '.author-link', '.contact-link'
    ];
    
    let contactUrl: string | null = null;
    let authorUrl: string | null = null;
    
    for (const selector of contactSelectors) {
      const element = $(selector).first();
      if (element.length) {
        const href = element.attr('href');
        if (href) {
          if (href.includes('contact') || href.includes('about')) {
            contactUrl = href.startsWith('http') ? href : new URL(href, url).toString();
          } else if (href.includes('author') || href.includes('bio')) {
            authorUrl = href.startsWith('http') ? href : new URL(href, url).toString();
          }
        }
      }
    }

    // PUBLICATION DATE EXTRACTION
    const dateSelectors = [
      'time[datetime]', '.date', '.publish-date', '.post-date', 
      '.article-date', '[class*="date"]', '.timestamp'
    ];
    
    let pubDate: string | null = null;
    
    // Try datetime attribute first
    const timeElement = $('time[datetime]').first();
    if (timeElement.length) {
      pubDate = timeElement.attr('datetime');
    }
    
    // Try meta tags
    if (!pubDate) {
      pubDate = $('meta[property="article:published_time"]').attr('content') ||
               $('meta[name="date"]').attr('content') ||
               $('meta[name="publish_date"]').attr('content');
    }
    
    // Try text-based date selectors
    if (!pubDate) {
      for (const selector of dateSelectors) {
        const dateText = $(selector).first().text().trim();
        if (dateText && dateText.length < 50) { // Reasonable date length
          pubDate = dateText;
          break;
        }
      }
    }

    // Debug logging focused on contact information
    console.log('=== CONTACT EXTRACTION RESULTS ===');
    console.log(`Author: ${authorName || 'None found'}`);
    console.log(`Author Email: ${authorEmail || 'None found'}`);
    console.log(`Author Bio: ${authorBio ? authorBio.substring(0, 100) + '...' : 'None found'}`);
    console.log(`Author URL: ${authorUrl || 'None found'}`);
    console.log(`Contact URL: ${contactUrl || 'None found'}`);
    console.log(`Publication Date: ${pubDate || 'None found'}`);
    console.log(`Opening Content: ${truncatedContent.length} chars`);
    console.log('=== END CONTACT EXTRACTION ===');

    // Create comprehensive prompt for OpenAI focused on contact information
    const prompt = `
Analyze this listicle for outreach opportunities. Focus heavily on CONTACT INFORMATION and OUTREACH POTENTIAL.

BUSINESS CONTEXT:
- Business: ${userProfile.business_name}
- Industry: ${userProfile.business_description}
- Website: ${userProfile.website || 'Not provided'}
- Experience: ${userProfile.years_in_business || 'Not specified'} years

LISTICLE DETAILS:
- Title: ${title}
- URL: ${url}
- Publication Date: ${pubDate || 'Unknown'}

AUTHOR & CONTACT INFORMATION FOUND:
- Author Name: ${authorName || 'Unknown'}
- Author Email: ${authorEmail || 'Not found'}
- Author Bio: ${authorBio || 'Not available'}
- Author URL: ${authorUrl || 'Not found'}
- Contact URL: ${contactUrl || 'Not found'}

ARTICLE OPENING CONTENT:
${truncatedContent}

INSTRUCTIONS:
Focus your analysis on the OUTREACH POTENTIAL and CONTACT ACCESSIBILITY. If we found contact information (email, author details, contact pages), rate this higher for outreach priority. The opening content shows what the article is about - assess how relevant this content is to our business for potential collaboration or mention opportunities.

Provide a JSON response with this structure:

{
  "title": "Article title (cleaned up if needed)",
  "author_name": "${authorName || 'Unknown'}",
  "author_email": "${authorEmail || null}",
  "contact_url": "${contactUrl || authorUrl || null}",
  "publication_date": "${pubDate || null}",
  "description": "150-200 character summary focusing on what the article covers and why it's relevant",
  "llm_quality_rating": "HIGH/MED/LOW based on content quality and authority",
  "quality_reasons": "Brief explanation focusing on contact accessibility and content relevance",
  "importance_score": 1-10 (heavily weight contact information availability + business relevance),
  "importance_breakdown": {
    "auth": 0-3 (site authority and reach),
    "rel": 0-3 (relevance to ${userProfile.business_description}),
    "fresh": 0-2 (content recency),
    "eng": 0-2 (engagement potential + contact accessibility)
  },
  "outreach_priority": "P1/P2/P3 (P1 if good contact info + relevant, P2 if one or the other, P3 if neither)",
  "suggested_outreach_angle": "Specific strategy for reaching out - mention what value we could provide based on article content",
  "model_email": "Draft outreach email template using author name and article specifics"
}

PRIORITIZE articles where we found contact information (email, author bio, contact pages) as these have higher outreach success potential.
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
