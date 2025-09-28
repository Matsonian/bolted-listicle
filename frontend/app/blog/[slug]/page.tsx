// FILE: app/blog/[slug]/page.tsx - Individual Blog Post Page (Dynamic Route)
'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'

// This would typically come from a CMS or API
const getBlogPost = (slug: string) => {
  const posts = {
    'getting-started-listicle-research': {
      id: '1',
      title: 'Getting Started with Listicle Research',
      subtitle: 'Master the art of finding quality content',
      content: `
        <p>Listicles have become one of the most popular forms of content on the internet, and for good reason. They're easy to scan, provide quick value, and can cover complex topics in digestible chunks.</p>
        
        <h2>Why Listicles Work</h2>
        <p>The human brain is naturally drawn to organized information. When we see a numbered list, we immediately understand the structure and can quickly assess whether the content is worth our time.</p>
        
        <h2>Finding Quality Listicles</h2>
        <p>Not all listicles are created equal. Here are the key characteristics of high-quality listicles:</p>
        <ul>
          <li>Well-researched content with credible sources</li>
          <li>Clear, actionable advice or information</li>
          <li>Proper formatting and visual hierarchy</li>
          <li>Engaging headlines that deliver on their promise</li>
        </ul>
        
        <h2>Research Strategies</h2>
        <p>When searching for listicles in your niche, try these proven strategies:</p>
        <ol>
          <li>Use specific, long-tail keywords</li>
          <li>Look for recent publication dates</li>
          <li>Check the author's credentials and expertise</li>
          <li>Verify information with multiple sources</li>
        </ol>
        
        <p>Remember, the goal isn't just to find any listicle, but to discover content that truly adds value to your audience or research.</p>
      `,
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: 'Sarah Johnson',
      publishDate: '2025-01-15'
    },
    'psychology-effective-lists': {
      id: '2',
      title: 'The Psychology Behind Effective Lists',
      subtitle: 'Why our brains love numbered content',
      content: `
        <p>Have you ever wondered why listicles are so irresistibly clickable? The answer lies deep in human psychology and how our brains process information.</p>
        
        <h2>The Cognitive Load Theory</h2>
        <p>Our brains have limited processing capacity. When faced with large blocks of text, we can quickly become overwhelmed. Lists break information into manageable chunks, reducing cognitive load and making content more accessible.</p>
        
        <h2>The Power of Numbers</h2>
        <p>Numbers provide immediate context and set expectations. When you see "7 Ways to..." you know exactly what you're getting into. This predictability is comforting to our pattern-seeking brains.</p>
        
        <h2>The Completion Principle</h2>
        <p>Humans have an innate desire to complete tasks. A numbered list provides a clear endpoint, making readers more likely to engage with the entire piece of content.</p>
        
        <h2>Scannable Content</h2>
        <p>In our fast-paced digital world, most people scan rather than read. Lists are inherently scannable, allowing readers to quickly identify relevant information.</p>
        
        <h2>Social Proof and Authority</h2>
        <p>Well-crafted listicles often include examples, statistics, and expert opinions, providing social proof and establishing authority on the topic.</p>
        
        <p>Understanding these psychological principles can help you both create better content and identify higher-quality listicles when researching your niche.</p>
      `,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: 'Dr. Mike Chen',
      publishDate: '2025-01-12'
    },
    'building-authority-curated-content': {
      id: '3',
      title: 'Building Authority Through Curated Content',
      subtitle: 'Establish expertise in your niche',
      content: `
        <p>Content curation isn't just about collecting links—it's about demonstrating expertise, providing value, and building trust with your audience.</p>
        
        <h2>What is Content Curation?</h2>
        <p>Content curation involves finding, organizing, and sharing the most relevant and valuable content in your field. When done well, it positions you as a knowledgeable guide in your niche.</p>
        
        <h2>The Authority Building Process</h2>
        <p>Building authority through curated content follows a specific process:</p>
        <ol>
          <li><strong>Research:</strong> Continuously monitor your niche for high-quality content</li>
          <li><strong>Filter:</strong> Apply strict quality standards to what you share</li>
          <li><strong>Add Value:</strong> Provide context, insights, or commentary</li>
          <li><strong>Organize:</strong> Present content in a logical, helpful structure</li>
          <li><strong>Engage:</strong> Respond to feedback and foster discussion</li>
        </ol>
        
        <h2>Quality Over Quantity</h2>
        <p>It's better to share fewer, higher-quality pieces than to overwhelm your audience with mediocre content. Each piece you curate reflects on your judgment and expertise.</p>
        
        <h2>Adding Your Voice</h2>
        <p>Don't just share—add your perspective. Explain why a particular listicle is valuable, what insights it provides, or how it relates to current trends in your industry.</p>
        
        <h2>Building Relationships</h2>
        <p>Curating content also means building relationships with other creators in your space. Thoughtful sharing and engagement can lead to valuable professional connections.</p>
        
        <p>Remember, authority isn't built overnight. Consistent, thoughtful curation over time establishes you as a trusted voice in your field.</p>
      `,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: 'Emily Rodriguez',
      publishDate: '2025-01-10'
    },
    'outreach-templates': {
      id: '4',
      title: '5 Proven Email Templates That Get Your Product Featured in Listicles',
      subtitle: 'Copy-and-paste templates that actually work',
      content: `
        <p>Getting featured in listicles can transform your business, but reaching out to editors and content creators can feel daunting. These proven email templates will help you craft compelling outreach that gets results.</p>
        
        <h2>Template 1: The Value-First Approach</h2>
        <p><strong>Subject:</strong> Quick resource for your [TOPIC] content</p>
        <p>This template leads with value rather than asking for something. It works because you're helping the editor first.</p>
        
        <h2>Template 2: The Social Proof Method</h2>
        <p><strong>Subject:</strong> [PRODUCT] featured in [PUBLICATION] - perfect for your audience</p>
        <p>Leverage existing coverage to build credibility and show that other editors have already validated your product.</p>
        
        <h2>Template 3: The Timely Angle</h2>
        <p><strong>Subject:</strong> Trending: [TOPIC] - [PRODUCT] data inside</p>
        <p>Connect your product to current trends or seasonal relevance to increase urgency and newsworthiness.</p>
        
        <h2>Template 4: The Expert Commentary</h2>
        <p><strong>Subject:</strong> Expert insight on [TOPIC] for your next piece</p>
        <p>Position yourself or your team as subject matter experts who can provide valuable quotes and insights.</p>
        
        <h2>Template 5: The Exclusive Offer</h2>
        <p><strong>Subject:</strong> Exclusive for [PUBLICATION] readers</p>
        <p>Offer something special that the editor's audience can't get anywhere else, creating additional value for featuring you.</p>
        
        <h2>Best Practices for All Templates</h2>
        <ul>
          <li>Keep emails under 150 words</li>
          <li>Include high-quality product images</li>
          <li>Provide clear, factual product information</li>
          <li>Follow up once after 1 week</li>
          <li>Personalize each email to the publication</li>
        </ul>
        
        <p>Remember, the goal is to make the editor's job easier by providing everything they need to feature your product effectively.</p>
      `,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24'
    },
    'seo-impact': {
      id: '5',
      title: 'How Listicle Features Impact Your SEO and Brand Authority',
      subtitle: 'Beyond backlinks: the compound benefits',
      content: `
        <p>Getting featured in listicles provides more than just a backlink. The SEO and brand authority benefits compound over time, creating lasting value for your business.</p>
        
        <h2>Direct SEO Benefits</h2>
        <p>Quality backlinks from established publications pass link equity to your site, improving your domain authority and search rankings.</p>
        
        <h2>Co-Citation and Brand Mentions</h2>
        <p>Even unlinked mentions of your brand help search engines understand your relevance and authority in your industry.</p>
        
        <h2>Increased Brand Searches</h2>
        <p>Exposure in listicles leads to more people searching for your brand directly, which is a strong ranking signal to Google.</p>
        
        <h2>Content Amplification</h2>
        <p>Listicle features often get shared on social media, creating additional exposure and potential for more backlinks.</p>
        
        <h2>Long-Term Authority Building</h2>
        <p>Consistent features in quality publications establish your brand as an industry leader, improving all your marketing efforts.</p>
        
        <h2>Measuring the Impact</h2>
        <ul>
          <li>Track referring domain growth</li>
          <li>Monitor brand search volume</li>
          <li>Measure organic traffic increases</li>
          <li>Watch for ranking improvements</li>
          <li>Track social media mentions</li>
        </ul>
        
        <p>The key is consistency. Regular listicle features create a compound effect that significantly boosts your online presence over time.</p>
      `,
      image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24'
    }
  }
  
  return posts[slug as keyof typeof posts] || null
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = slug ? getBlogPost(slug) : null

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          {/* Header Image */}
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Meta */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Title & Subtitle */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-600 font-medium">
              {post.subtitle}
            </h2>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-600">Content Strategist at Get Listicled</p>
                </div>
              </div>
              <Link href="/blog" className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                More Articles
              </Link>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-center">More related articles coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
