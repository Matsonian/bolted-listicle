// FILE: app/about/page.tsx - About GetListicled Company Page
'use client'

import React from 'react'
import Link from 'next/link'
import { Search, Users, Target, Zap } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former tech journalist with a passion for curating the best content on the web.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      bio: 'Full-stack engineer with expertise in search algorithms and web scraping.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      bio: 'Content strategist ensuring quality and relevance in every search result.'
    }
  ]

  const values = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Discovery First',
      description: 'We believe great content should be easy to find and accessible to everyone.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Our platform grows stronger with every user who discovers and shares great listicles.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Quality Focus',
      description: 'We curate results to ensure you find the most relevant and high-quality content.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speed & Simplicity',
      description: 'Fast, intuitive search that gets you to the content you want without hassle.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Get Listicled
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to make discovering amazing listicles as simple as a single search. 
            No more endless browsing - just the best curated content in your niche.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="max-w-3xl mx-auto text-lg text-gray-600 space-y-6">
              <p>
                Get Listicled was born from a simple frustration: finding quality listicles across different niches 
                was time-consuming and scattered across countless websites. Whether you needed the best Jeep accessories, 
                kitchen gadgets, or travel gear, you had to search multiple sites and sift through endless results.
              </p>
              <p>
                We realized there had to be a better way. What if there was a single platform that aggregated the best 
                listicles from across the web, organized them by niche, and made them instantly searchable?
              </p>
              <p>
                That's exactly what we built. Get Listicled is your one-stop destination for discovering curated, 
                high-quality listicles in any niche you can imagine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Get Listicled
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Listicled?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users discovering amazing content every day
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Start Searching
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-gray-600 hover:border-gray-500 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
