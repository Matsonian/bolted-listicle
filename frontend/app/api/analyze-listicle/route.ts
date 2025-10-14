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

    // FIX #1: Ensure URL has proper protocol
    let cleanUrl = url;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    console.log('=== STARTING FETCH ===', new Date().toISOString(), cleanUrl);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('=== FETCH TIMEOUT ===', new Date().toISOString());
      controller.abort();
    }, 10000); // 10 second timeout

    let html: string;
    
    try {
      const response = await fetch(cleanUrl, {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('=== FETCH COMPLETED ===', new Date().toISOString());

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(`Website blocked our request (403 Forbidden). The site ${new URL(cleanUrl).hostname} may be blocking automated access.`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      html = await response.text();
      console.log('=== HTML RECEIVED ===', new Date().toISOString(), 'Length:', html.length);

    } catch (error) {
      clearTimeout(timeoutId);
      console.log('=== FETCH ERROR ===', new Date().toISOString(), error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out after 10 seconds');
      }
      throw error;
    }

    console.log('=== STARTING CHEERIO PARSE ===', new Date().toISOString());

    // Parse HTML and extract content
    const $ = cheerio.load(html);
    console.log('=== CHEERIO LOADED ===', new Date().toISOString());
    
    // Remove unwanted elements including SVGs and social icons
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .social-share, svg, .social-icons, .share-buttons').remove();
    console.log('=== CLEANUP COMPLETE ===', new Date().toISOString());
    
    // FIX #2: Better title extraction to avoid icon pollution
    function extractCleanTitle(): string {
      // Try multiple approaches to get clean title
      let title = '';
      
      // First try: main article title
      const articleTitle = $('article h1, .article h1, [role="main"] h1').first().text().trim();
      if (articleTitle && articleTitle.length > 5 && articleTitle.length < 200) {
        title = articleTitle;
      } else {
        // Second try: any h1 but clean it
        const h1Title = $('h1').first().text().trim();
        if (h1Title && h1Title.length > 5) {
          title = h1Title;
        } else {
          // Fallback to page title
          title = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || 'No title found';
        }
      }
      
      // Clean the title of common pollutants
      title = title
        .replace(/facebook|instagram|pinterest|twitter|search|envelope|check|plus|minus|chevron|times|rectangle/gi, '')
        .replace(/[^\w\s\-:,.'!?()]/g, ' ') // Remove special chars but keep basic punctuation
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .trim();
      
      return title;
    }
    
    const title = extractCleanTitle();
    
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       $('article p, .article p, .content p').first().text().substring(0, 200) + '...' || 
                       'No description found';

    // Content extraction
    let openingContent = '';
    
    const firstParagraphs = $('article p, .article p, .content p, .post-content p, p').slice(0, 3)
      .map((i, el) => $(el).text().trim())
      .get()
      .filter(p => p.length > 30)
      .join('\n\n');
    
    openingContent = firstParagraphs.substring(0, 800);

    console.log('Opening content extraction method: enhanced paragraphs');

    // FIX #3: Enhanced author and contact extraction
    let authorName: string | null = null;
    let authorEmail: string | null = null;
    
    // Enhanced author selectors including OutdoorGearLab patterns
    const authorSelectors = [
      '.author-name',
      '.author .name',
      '.byline .author',
      '.byline a[href*="author"]',
      '.post-author',
      '.article-author',
      '[rel="author"]',
      '.contributor',
      '.writer',
      // Specific patterns for OutdoorGearLab and similar sites
      '.byline',
      '.author-info',
      '.review-author',
      '.staff-author',
      // Look for "By [Name]" patterns in text
      'p:contains("By ")',
      'div:contains("By ")',
      'span:contains("By ")'
    ];
    
    // Try each selector
    for (const selector of authorSelectors) {
      const element = $(selector).first();
      if (element.length) {
        let text = element.text().trim();
        
        // Clean up "By [Name]" patterns
        if (text.toLowerCase().startsWith('by ')) {
          text = text.substring(3).trim();
        }
        
        // Extract author name from patterns like "By Myrha Colt ⋅ Senior Review Editor"
        const authorMatch = text.match(/^([A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/);
        if (authorMatch) {
          authorName = authorMatch[1].trim();
          console.log('Found author with pattern match:', authorName);
          break;
        }
        
        // If it looks like a name (2-3 words, proper capitalization)
        const words = text.split(/\s+/).filter(w => w.length > 1);
        if (words.length >= 2 && words.length <= 3 && 
            words.every(w => /^[A-Z][a-z]+/.test(w)) &&
            text.length < 50) {
          authorName = text;
          console.log('Found author with name pattern:', authorName);
          break;
        }
      }
    }
    
    // Additional author extraction from meta tags
    if (!authorName) {
      const metaAuthor = $('meta[name="author"]').attr('content') ||
                        $('meta[property="article:author"]').attr('content');
      if (metaAuthor && metaAuthor.length < 50) {
        authorName = metaAuthor.trim();
        console.log('Found author in meta tags:', authorName);
      }
    }

    // Enhanced email extraction with better patterns
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    
    // Look for emails in specific sections first
    const contactSections = $('.contact, .author-contact, .about-author, .contributor-info, .staff-info').text();
    const emailInContact = contactSections.match(emailRegex);
    
    if (emailInContact && emailInContact.length > 0) {
      authorEmail = emailInContact[0];
      console.log('Found email in contact section:', authorEmail);
    } else {
      // Fallback to page-wide search but filter out common false positives
      const pageText = $('body').text();
      const allEmails = pageText.match(emailRegex);
      
      if (allEmails && allEmails.length > 0) {
        // Filter out common non-author emails
        const filteredEmails = allEmails.filter(email => 
          !email.includes('noreply') &&
          !email.includes('no-reply') &&
          !email.includes('admin') &&
          !email.includes('info@') &&
          !email.includes('support@') &&
          !email.includes('contact@')
        );
        
        if (filteredEmails.length > 0) {
          authorEmail = filteredEmails[0];
          console.log('Found filtered email:', authorEmail);
        }
      }
    }

    // Enhanced contact URL detection
    let contactUrl: string | null = null;
    const contactSelectors = [
      'a[href*="contact"]',
      'a[href*="about"]',
      'a[href*="author"]',
      'a[href*="contributor"]',
      'a:contains("Contact")',
      'a:contains("About")'
    ];
    
    for (const selector of contactSelectors) {
      const link = $(selector).first().attr('href');
      if (link) {
        try {
          contactUrl = link.startsWith('http') ? link : new URL(link, cleanUrl).toString();
          console.log('Found contact URL:', contactUrl);
          break;
        } catch (e) {
          continue;
        }
      }
    }

    // Enhanced date extraction
    let pubDate: string | null = null;
    
    // Try multiple date extraction methods
    const dateSelectors = [
      'time[datetime]',
      'time',
      '.date',
      '.published',
      '.publish-date',
      '.post-date',
      '.article-date',
      '[datetime]'
    ];
    
    for (const selector of dateSelectors) {
      const dateElement = $(selector).first();
      if (dateElement.length) {
        pubDate = dateElement.attr('datetime') || 
                 dateElement.attr('content') ||
                 dateElement.text().trim();
        
        if (pubDate && pubDate.match(/\d{4}/)) { // Has a year
          console.log('Found publication date:', pubDate);
          break;
        }
      }
    }
    
    // Fallback to meta tags
    if (!pubDate) {
      pubDate = $('meta[property="article:published_time"]').attr('content') ||
               $('meta[name="published_time"]').attr('content') ||
               $('meta[property="article:modified_time"]').attr('content') ||
               null;
    }

    // Debug logging
    console.log('=== ENHANCED EXTRACTION RESULTS ===');
    console.log(`Title: ${title}`);
    console.log(`Author: ${authorName || 'None found'}`);
    console.log(`Email: ${authorEmail || 'None found'}`);
    console.log(`Contact: ${contactUrl || 'None found'}`);
    console.log(`Date: ${pubDate || 'None found'}`);
    console.log(`Content: ${openingContent.length} chars`);
    console.log('=== END ENHANCED EXTRACTION ===');

    // Streamlined content for faster processing
    const truncatedContent = openingContent.substring(0, 800);

    // Enhanced prompt with better extraction context
    const prompt = `
Analyze this listicle for outreach opportunities for ${userProfile.business_name}.

ARTICLE DETAILS:
Title: ${title}
Author: ${authorName || 'Not found'}
Email: ${authorEmail || 'Not found'}  
Contact URL: ${contactUrl || 'Not found'}
Publication Date: ${pubDate || 'Not found'}

CONTENT PREVIEW:
${truncatedContent}

BUSINESS CONTEXT:
Company: ${userProfile.business_name}
Description: ${userProfile.business_description}

ANALYSIS REQUIREMENTS:
- Rate outreach value 1-10 based on article quality, author authority, and business relevance
- Provide contact assessment based on available information
- Create personalized outreach strategy

Respond with valid JSON only:
{
  "title": "${title.replace(/"/g, '\\"')}",
  "author_name": ${authorName ? `"${authorName.replace(/"/g, '\\"')}"` : 'null'},
  "author_email": ${authorEmail ? `"${authorEmail}"` : 'null'},
  "contact_url": ${contactUrl ? `"${contactUrl}"` : 'null'},
  "publication_date": ${pubDate ? `"${pubDate}"` : 'null'},
  "description": "Brief summary (150 chars max)",
  "llm_quality_rating": "HIGH/MED/LOW",
  "quality_reasons": "Brief explanation",
  "importance_score": 1-10,
  "importance_breakdown": {"auth": 0-3, "rel": 0-3, "fresh": 0-2, "eng": 0-2},
  "outreach_priority": "P1/P2/P3",
  "suggested_outreach_angle": "One sentence approach",
  "model_email": "Personalized professional email template"
}
`;

    console.log('=== STARTING OPENAI CALL ===', new Date().toISOString());
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "You are an expert outreach strategist. Provide strategic listicle analysis in valid JSON format only. Focus on creating genuinely valuable outreach opportunities with personalized approaches."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    console.log('=== OPENAI RESPONSE RECEIVED ===', new Date().toISOString());

    const analysisText = completion.choices[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No analysis generated');
    }

    // Parse JSON response
    let analysis;
    try {
      let cleanedResponse = analysisText.trim();
      
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
      }
      
      analysis = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:');
      console.error('Raw response:', analysisText);
      console.error('Parse error:', parseError);
      
      // Fallback response with extracted data
      analysis = {
        title: title || 'Unknown Title',
        author_name: authorName,
        author_email: authorEmail,
        contact_url: contactUrl,
        publication_date: pubDate,
        description: description.substring(0, 150) || 'Analysis could not be completed',
        llm_quality_rating: 'LOW',
        quality_reasons: 'AI response parsing failed - using extracted data',
        importance_score: authorEmail ? 6 : 3,
        importance_breakdown: { 
          auth: authorName ? 2 : 1, 
          rel: 1, 
          fresh: pubDate ? 1 : 0, 
          eng: authorEmail ? 2 : 1 
        },
        outreach_priority: authorEmail ? 'P2' : 'P3',
        suggested_outreach_angle: 'Manual review recommended - contact information available',
        model_email: `Hi ${authorName || 'there'},\n\nI enjoyed your article "${title}". I'd love to discuss a collaboration opportunity.\n\nBest regards,\n${userProfile.first_name}`
      };
    }

    // Validate and clean the response
    const validatedResponse = validateAnalysisResponse(analysis, {
      title,
      authorName,
      authorEmail,
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
  const breakdown = response.importance_breakdown || {};
  const calculatedScore = (breakdown.auth || 0) + (breakdown.rel || 0) + 
                         (breakdown.fresh || 0) + (breakdown.eng || 0);
  
  const score = response.importance_score || calculatedScore || 5;
  
  let priority: 'P1' | 'P2' | 'P3';
  if (score >= 8) priority = 'P1';
  else if (score >= 5) priority = 'P2';
  else priority = 'P3';

  const validated: AnalysisResponse = {
    title: response.title || fallbacks.title || 'Unknown Title',
    author_name: response.author_name || fallbacks.authorName || null,
    author_email: response.author_email || fallbacks.authorEmail || null,
    contact_url: response.contact_url || fallbacks.contactUrl || null,
    publication_date: response.publication_date || fallbacks.pubDate || null,
    description: response.description || fallbacks.description?.substring(0, 200) || 'No description available',
    llm_quality_rating: ['HIGH', 'MED', 'LOW'].includes(response.llm_quality_rating) 
      ? response.llm_quality_rating : 'LOW',
    quality_reasons: response.quality_reasons || 'No quality assessment available',
    importance_score: Math.min(Math.max(score, 1), 10),
    importance_breakdown: {
      auth: Math.min(Math.max(parseInt(response.importance_breakdown?.auth) || 0, 0), 3),
      rel: Math.min(Math.max(parseInt(response.importance_breakdown?.rel) || 0, 0), 3),
      fresh: Math.min(Math.max(parseInt(response.importance_breakdown?.fresh) || 0, 0), 2),
      eng: Math.min(Math.max(parseInt(response.importance_breakdown?.eng) || 0, 2), 2)
    },
    outreach_priority: ['P1', 'P2', 'P3'].includes(response.outreach_priority) 
      ? response.outreach_priority : priority,
    suggested_outreach_angle: response.suggested_outreach_angle || 'Consider reaching out to this publication',
    model_email: response.model_email || 'Email template not generated'
  };

  if (validated.description.length > 200) {
    validated.description = validated.description.substring(0, 197) + '...';
  }

  return validated;
}
