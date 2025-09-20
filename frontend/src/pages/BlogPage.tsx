import React from 'react'
import { Link } from 'react-router-dom'
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
      readTime: '7 min read',
      slug: '/blog/seo-impact',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'ai-citations',
      title: 'The Complete Guide to AI Citations: Why Listicles Matter More Than Ever',
      subtitle: 'Get discovered by ChatGPT, Claude, and Perplexity',
      description: 'Learn why AI tools cite listicles, how to get included, and the exact playbook to boost your product\'s visibility in AI recommendations.',
      category: 'AI & Marketing',
      categoryColor: 'bg-purple-100 text-purple-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24',
      readTime: '12 min read',
      slug: '/blog/ai-citations',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'what-are-listicles',
      title: 'What are Listicles? The Complete Guide to List-Style Content',
      subtitle: 'Master the format that dominates digital marketing',
      description: 'Learn why listicles dominate digital marketing, how to structure them for SEO and AI, and a playbook to distribute, measure, and keep them fresh.',
      category: 'Guide',
      categoryColor: 'bg-gray-100 text-gray-800',
      author: 'GetListicled Team',
      publishDate: '2025-08-24',
      readTime: '8 min read',
      slug: '/blog/what-are-listicles',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            GetListicled Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to find, pitch, and get featured in the listicles that matter most to your business. 
            From outreach templates to AI optimization strategies.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Image */}
              {post.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <h3 className="text-lg font-medium text-blue-600 mb-3">
                  {post.subtitle}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.description}
                </p>

                {/* Read Article Button */}
                <Link
                  to={post.slug}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 group/button"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to put these strategies to work?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              GetListicled helps you discover the right listicles for your product and track your placement success.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors">
                Start Finding Listicles
              </Link>
              <Link to="/search" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors">
                Try Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
