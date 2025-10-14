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

    // FIX #1: Clean the URL properly to remove getlisticled.com prefix
    let cleanUrl = url;
    
    // Remove any getlisticled.com prefix that might be in the URL
    cleanUrl = cleanUrl.replace(/^https?:\/\/(?:www\.)?getlisticled\.com\//, '');
    
    // Ensure proper protocol
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    console.log('=== URL CLEANED ===', { original: url, cleaned: cleanUrl });

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

    const $ = cheerio.load(html);
    console.log('=== CHEERIO LOADED ===', new Date().toISOString());
    
    // FIX #2: More aggressive cleanup to remove social media icons and SVGs
    $('script, style, nav, header, footer, aside, .ad, .advertisement, .social-share, svg, .social-icons, .share-buttons, .social-media, .icon').remove();
    console.log('=== CLEANUP COMPLETE ===', new Date().toISOString());
    
    // FIX #2: Better title extraction and cleaning
    let title = $('h1').first().text().trim() || 
                $('title').text().trim() || 
                $('meta[property="og:title"]').attr('content') || 
                'No title found';
    
    // More aggressive cleaning of social media pollution
    title = title
      .replace(/facebook|instagram|pinterest|twitter|search|envelope|check|plus|minus|chevron|times|rectangle|circle|right|left|up|down/gi, '')
      .replace(/[^\w\s\-:,.'!?()\|&]/g, ' ') // Keep basic punctuation including |
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .trim();
    
    console.log('=== TITLE EXTRACTED ===', title);
    
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       $('p').first().text().substring(0, 200) + '...' || 
                       'No description found';

    let openingContent = '';
    
    const firstParagraphs = $('p').slice(0, 2).map((i, el) => $(el).text().trim()).get()
      .filter(p => p.length > 30).join('\n\n');
    
    openingContent = firstParagraphs.substring(0, 800);

    console.log('Opening content extraction method: fast paragraphs only');

    // FIX #3: Enhanced author extraction specifically for OutdoorGearLab patterns
    const authorSelectors = [
      '.byline',              // Common byline class
      '.author',              // Generic author class  
      '.author-name',         // Specific author name class
      '[rel="author"]',       // Author rel attribute
      '.post-author',         // Post author class
      '.article-author',      // Article author class
      '.staff-author',        // Staff author class
      'p:contains("By ")',    // Paragraph containing "By "
      'div:contains("By ")',  // Div containing "By "
      'span:contains("By ")', // Span containing "By "
    ];
    
    let authorName: string | null = null;
    let authorEmail: string | null = null;
    
    // Enhanced author search with better pattern matching
    for (const selector of authorSelectors) {
      const element = $(selector).first();
      if (element.length && element.text().trim()) {
        let text = element.text().trim();
        console.log(`=== CHECKING SELECTOR ${selector} ===`, text.substring(0, 100));
        
        // Handle "By [Name]" patterns specifically
        if (text.toLowerCase().includes('by ')) {
          // Extract everything after "By " and before any special characters or job titles
          const byMatch = text.match(/by\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/i);
          if (byMatch) {
            authorName = byMatch[1].trim();
            console.log('=== FOUND AUTHOR BY PATTERN ===', authorName);
            break;
          }
        }
        
        // Look for name patterns like "Myrha Colt ⋅ Senior Review Editor"
        const nameMatch = text.match(/^([A-Z][a-z]+\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s*[⋅•\-\|]/);
        if (nameMatch) {
          authorName = nameMatch[1].trim();
          console.log('=== FOUND AUTHOR BY NAME PATTERN ===', authorName);
          break;
        }
        
        // Fallback: if it looks like a clean name (2-3 capitalized words)
        const words = text.split(/\s+/).filter(w => w.length > 1);
        if (words.length >= 2 && words.length <= 3 && 
            words.every(w => /^[A-Z][a-z]+/.test(w)) &&
            text.length < 50 && !text.includes('⋅') && !text.includes('•')) {
          authorName = text;
          console.log('=== FOUND AUTHOR BY WORD PATTERN ===', authorName);
          break;
        }
      }
    }
    
    // Fallback to meta tags
    if (!authorName) {
      authorName = $('meta[name="author"]').attr('content') || 
                  $('meta[property="article:author"]').attr('content') || null;
      if (authorName) {
        console.log('=== FOUND AUTHOR IN META ===', authorName);
      }
    }

    // Enhanced email extraction
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    
    // First check in author/contact specific areas
    const authorSections = $('.author, .byline, .contact, .author-contact, .about-author, .contributor-info, .staff-info').text();
    const contactEmails = authorSections.match(emailRegex);
    
    if (contactEmails && contactEmails.length > 0) {
      // Filter out obvious non-author emails
      const filteredEmails = contactEmails.filter(email => 
        !email.toLowerCase().includes('noreply') &&
        !email.toLowerCase().includes('no-reply') &&
        !email.toLowerCase().includes('admin') &&
        !email.toLowerCase().includes('info@') &&
        !email.toLowerCase().includes('support@') &&
        !email.toLowerCase().includes('contact@')
      );
      
      if (filteredEmails.length > 0) {
        authorEmail = filteredEmails[0];
        console.log('=== FOUND EMAIL IN AUTHOR SECTION ===', authorEmail);
      }
    }
    
    // Fallback to page-wide search
    if (!authorEmail) {
      const pageText = $('body').text();
      const allEmails = pageText.match(emailRegex);
      if (allEmails && allEmails.length > 0) {
        const filteredEmails = allEmails.filter(email => 
          !email.toLowerCase().includes('noreply') &&
          !email.toLowerCase().includes('no-reply') &&
          !email.toLowerCase().includes('admin') &&
          !email.toLowerCase().includes('info@') &&
          !email.toLowerCase().includes('support@') &&
          !email.toLowerCase().includes('contact@')
        );
        
        if (filteredEmails.length > 0) {
          authorEmail = filteredEmails[0];
          console.log('=== FOUND EMAIL IN PAGE TEXT ===', authorEmail);
        }
      }
    }

    // Contact URL extraction
    let contactUrl: string | null = null;
    const contactLink = $('a[href*="contact"]').first().attr('href');
    if (contactLink) {
      contactUrl = contactLink.startsWith('http') ? contactLink : new URL(contactLink, cleanUrl).toString();
    }

    // Date extraction
    let pubDate: string | null = null;
    pubDate = $('time[datetime]').first().attr('datetime') || 
             $('meta[property="article:published_time"]').attr('content') || null;

    const truncatedContent = openingContent.substring(0, 800);

    console.log('=== FINAL EXTRACTION RESULTS ===');
    console.log(`Title: "${title}"`);
    console.log(`Author: ${authorName || 'None'}`);
    console.log(`Email: ${authorEmail || 'None'}`);
    console.log(`Contact: ${contactUrl || 'None'}`);
    console.log(`Date: ${pubDate || 'None'}`);
    console.log('=== END EXTRACTION ===');

    // Keep original prompt structure
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
  "model_email": "Short professional email template"
}
`;

    console.log('=== STARTING OPENAI CALL ===', new Date().toISOString());
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "You are an expert outreach strategist and business development specialist. Provide highly personalized, strategic listicle analysis in valid JSON format only. Focus on creating genuinely valuable outreach opportunities."
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
      
      // Ensure we preserve our extracted data
      analysis.title = title;
      analysis.author_name = authorName;
      analysis.author_email = authorEmail;
      analysis.contact_url = contactUrl;
      analysis.publication_date = pubDate;
      
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      console.error('Raw response:', analysisText);
      
      // Use extracted data as fallback
      analysis = {
        title: title,
        author_name: authorName,
        author_email: authorEmail,
        contact_url: contactUrl,
        publication_date: pubDate,
        description: description.substring(0, 150) || 'Analysis could not be completed',
        llm_quality_rating: 'MED',
        quality_reasons: 'Using extracted data - AI parsing had issues',
        importance_score: authorEmail ? 7 : (authorName ? 5 : 3),
        importance_breakdown: { 
          auth: authorName ? 2 : 1, 
          rel: 2, 
          fresh: pubDate ? 1 : 0, 
          eng: authorEmail ? 2 : 1 
        },
        outreach_priority: authorEmail ? 'P1' : (authorName ? 'P2' : 'P3'),
        suggested_outreach_angle: 'Good outreach opportunity with contact information available',
        model_email: `Hi ${authorName || 'there'},\n\nI enjoyed your article "${title}". I'd love to discuss a potential collaboration.\n\nBest regards,\n${userProfile.first_name}`
      };
    }

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

  if (validated.description.length > 200) {
    validated.description = validated.description.substring(0, 197) + '...';
  }

  return validated;
}
