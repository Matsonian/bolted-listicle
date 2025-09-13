import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  author: string;
  publishDate: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  // Placeholder posts - will be replaced with actual content
  {
    id: '1',
    title: 'Getting Started with Listicle Research',
    subtitle: 'Master the art of finding quality content',
    description: 'Learn the essential techniques for discovering high-quality listicles that provide real value to your audience.',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Johnson',
    publishDate: '2025-01-15',
    slug: 'getting-started-listicle-research'
  },
  {
    id: '2',
    title: 'The Psychology Behind Effective Lists',
    subtitle: 'Why our brains love numbered content',
    description: 'Discover the cognitive science that makes listicles so engaging and how to leverage this knowledge.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Mike Chen',
    publishDate: '2025-01-12',
    slug: 'psychology-effective-lists'
  },
  {
    id: '3',
    title: 'Building Authority Through Curated Content',
    subtitle: 'Establish expertise in your niche',
    description: 'How to use curated listicles to build trust and authority with your audience while providing genuine value.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Emily Rodriguez',
    publishDate: '2025-01-10',
    slug: 'building-authority-curated-content'
  }
];

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Listicled Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and strategies for discovering and leveraging the best listicles in your niche
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="card overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

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
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 group"
                >
                  <span>Read The Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State for More Posts */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">More Articles Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're constantly adding new insights and strategies to help you master listicle discovery.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/search" className="btn-primary">
                Start Searching
              </Link>
              <Link to="/contact" className="btn-secondary">
                Suggest a Topic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}