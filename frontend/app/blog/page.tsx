'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  categoryColor: string
  author: string
  publishDate: string
  readTime: string
  slug: string
  image?: string
}

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const blogPosts: BlogPost[] = [
    {
      id: 'outreach-templates',
      title: '5 Proven Email Templates That Get Your Product Featured in Listicles',
      subtitle: 'Copy-and-paste templates that actually work',
      description: 'Land listicle placements fast. Copy these 5 email templates, subject lines, and follow-ups—plus an asset checklist editors can paste in seconds.',
      category: 'Outreach',
      categoryColor: 'bg-blue-100 text-blue-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24',
      readTime: '12 min read',
      slug: '/blog/outreach-templates',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'seo-impact',
      title: 'How Listicle Features Impact Your SEO and Brand Authority',
      subtitle: 'Beyond backlinks: the compound benefits',
      description: 'Learn how listicle features compound: backlinks, co-citation, brand mentions, and long-term ranking gains—plus a repeatable plan to measure results.',
      category: 'SEO',
      categoryColor: 'bg-green-100 text-green-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24',
      readTime: '8 min read',
      slug: '/blog/seo-impact',
      image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'pitch-timing',
      title: 'The Best Times to Pitch Your Product for Listicle Inclusion',
      subtitle: 'Timing is everything in editorial outreach',
      description: 'Discover the optimal timing for pitching editors, seasonal content calendars, and how to align your outreach with publication schedules for maximum success.',
      category: 'Strategy',
      categoryColor: 'bg-purple-100 text-purple-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-23',
      readTime: '6 min read',
      slug: '/blog/pitch-timing',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'content-angles',
      title: 'Finding the Perfect Angle: How to Position Your Product in Any Listicle',
      subtitle: 'Make your product fit naturally into any list',
      description: 'Master the art of positioning. Learn how to identify content angles, craft compelling product narratives, and make your solution the obvious choice for any listicle.',
      category: 'Content',
      categoryColor: 'bg-orange-100 text-orange-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-22',
      readTime: '10 min read',
      slug: '/blog/content-angles',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'relationship-building',
      title: 'Building Long-Term Relationships with Editors and Content Creators',
      subtitle: 'Beyond the one-time feature',
      description: 'Transform single placements into ongoing partnerships. Learn how to nurture editor relationships, provide ongoing value, and become their go-to source.',
      category: 'Relationships',
      categoryColor: 'bg-pink-100 text-pink-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-21',
      readTime: '9 min read',
      slug: '/blog/relationship-building',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'metrics-tracking',
      title: 'Measuring Success: Key Metrics for Listicle Marketing Campaigns',
      subtitle: 'What to track and how to optimize',
      description: 'Set up proper tracking for your listicle marketing efforts. Learn which metrics matter, how to measure ROI, and optimize your campaigns for better results.',
      category: 'Analytics',
      categoryColor: 'bg-indigo-100 text-indigo-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-20',
      readTime: '7 min read',
      slug: '/blog/metrics-tracking',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GetListicled Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, proven strategies, and actionable tips to get your product featured in high-impact listicles
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {blogPosts[0].image && (
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${blogPosts[0].categoryColor}`}>
                      {blogPosts[0].category}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">Featured Post</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {blogPosts[0].title}
                  </h2>
                  
                  <p className="text-lg text-blue-600 font-medium mb-4">
                    {blogPosts[0].subtitle}
                  </p>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center mr-6">
                      <User className="w-4 h-4 mr-2" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(blogPosts[0].publishDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={blogPosts[0].slug}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors group"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {post.subtitle}
                </p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Link
                  href={post.slug}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with GetListicled
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest strategies, templates, and insights delivered to your inbox. Join thousands of marketers growing their reach through listicle placements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-white text-blue-600 hover:bg-gray-50 font-medium px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
