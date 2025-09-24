'use client'

import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Why Listicles Dominate AI Training Data',
      excerpt: 'Discover why over 90% of AI-cited sources are listicles and how this impacts content creation strategies.',
      author: 'Get Listicled Team',
      date: '2024-01-15',
      slug: 'ai-citations'
    },
    {
      id: 2,
      title: 'The Art of Writing Listicles That AI Loves',
      excerpt: 'Learn the secrets behind creating listicles that consistently rank high in AI search results.',
      author: 'Get Listicled Team',
      date: '2024-01-10',
      slug: 'outreach-templates'
    },
    {
      id: 3,
      title: 'What Are Listicles and Why Should You Care?',
      excerpt: 'A comprehensive guide to understanding listicles and their role in modern content marketing.',
      author: 'Get Listicled Team',
      date: '2024-01-05',
      slug: 'what-are-listicles'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and strategies for creating content that AI algorithms love.
            Learn how to optimize your listicles for maximum visibility and impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            More blog posts coming soon! Stay tuned for updates on AI-powered content strategies.
          </p>
        </div>
      </div>
    </div>
  )
}