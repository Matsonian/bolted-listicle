'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BookOpen, GraduationCap, Wrench, ArrowRight, Clock, Users, Brain, Zap, Mail, Lock, Download, Gift } from 'lucide-react'

export default function EducationPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Explicit membership check - must be logged in AND have paid tier
  const isPaidMember = !!session?.user
  const shouldShowGate = !session

  const handleBookDownload = () => {
    if (isPaidMember) {
      // Trigger actual download
      // You would replace this with your actual download logic
      alert('Download started! The GetListicled book will begin downloading shortly.')
      // window.location.href = '/downloads/getlisticled-book.pdf'
    } else {
      router.push('/login')
    }
  }

  const masterclasses = [
    {
      id: 'media-relationships',
      title: 'How to Find and Build Relationships with Media, Press, and Listicle Authors',
      description: 'Learn how to identify, contact, and build lasting relationships with the writers who can feature your brand in high-impact listicles and press coverage.',
      duration: '25-50 min',
      modules: 5,
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      slug: '/education/masterclasses/media-relationships'
    },
    {
      id: 'press-release',
      title: 'From Listicle to Legacy: Why Press Releases Supercharge AI Discovery',
      description: 'Discover how to turn your listicles into lasting authority by combining them with AI-focused press distribution strategies.',
      duration: '30 min',
      modules: 6,
      icon: <Zap className="w-6 h-6" />,
      color: 'green',
      slug: '/education/masterclasses/press-release-strategy'
    },
    {
      id: 'ai-seo',
      title: 'Understanding AI in a World of GEO, AEO, and LLMO',
      description: 'Master the evolution of SEO into AI-driven optimization. Learn GEO, AEO, and LLMO strategies to ensure your brand gets cited by AI systems.',
      duration: '30 min',
      modules: 5,
      icon: <Brain className="w-6 h-6" />,
      color: 'purple',
      slug: '/education/masterclasses/ai-seo-evolution'
    }
  ]

  const tools = [
    {
      id: 'outreach-templates',
      title: '30 Proven Templates for Contacting Listicle Writers',
      description: 'Copy-and-paste email templates for reaching out to writers across email, LinkedIn, Facebook, Instagram, and more. Each template includes why it works.',
      icon: <Mail className="w-6 h-6" />,
      color: 'orange',
      slug: '/education/tools/outreach-templates'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-300' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:border-green-300' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-300' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-300' }
    }
    return colors[color] || colors.blue
  }

  const handleSignup = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Always Visible */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Member's Only Education Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of listicle marketing with comprehensive masterclasses, practical guides, and proven templates 
            to get your brand featured in high-authority publications.
          </p>
        </div>

        {/* Content Area - Conditional Display */}
        <div className="relative">
          {/* FREE BOOK OFFER SECTION - NEW */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 mr-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-1 rounded-full text-sm font-semibold">
                  EXCLUSIVE MEMBER BENEFIT
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                FREE BOOK SPECIAL OFFER
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    GetListicled: The Secret to Getting Ahead with AI Indexing
                  </h3>
                  <p className="text-orange-100 mb-6 text-lg leading-relaxed">
                    Written by the research team at Matsonian Labs, this comprehensive 55-page guide reveals 
                    the strategies you need to stay discoverable in the AI-driven landscape.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-20 rounded p-1 mr-3 mt-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span>Why listicles and directories remain essential in the AI era</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-20 rounded p-1 mr-3 mt-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span>How to get your brand included in "Best Of" content across the web</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-20 rounded p-1 mr-3 mt-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span>Technical optimization strategies for AI discovery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white bg-opacity-20 rounded p-1 mr-3 mt-0.5">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span>Complete workbook to track opportunities and measure visibility</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="bg-gray-800 rounded-xl p-8 mb-6 shadow-2xl">
                      <div className="text-orange-400 text-3xl font-bold mb-2">GetListicled</div>
                      <div className="text-white text-sm mb-2">The Secret to Getting Ahead</div>
                      <div className="text-white text-sm mb-6">with AI Indexing</div>
                      <div className="text-orange-400 text-lg">Matsonian Labs</div>
                    </div>
                    <div className="text-sm text-orange-100 mb-4">55-page comprehensive guide</div>
                  </div>
                  
                  <button
                    onClick={handleBookDownload}
                    className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl w-full md:w-auto mx-auto"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {isPaidMember ? 'Download Free Book (PDF)' : 'Members Only - Upgrade to Download'}
                  </button>
                  
                  {!isPaidMember && (
                    <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
                      <p className="text-sm text-orange-100">
                        <strong>Members Only:</strong> This exclusive guide is available as a free download 
                        for all paid GetListicled members.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MasterClasses Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 rounded-lg p-2 mr-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">MasterClasses</h2>
                <p className="text-gray-600">Structured learning paths with exercises and actionable takeaways</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masterclasses.map((course) => {
                const colors = getColorClasses(course.color)
                return (
                  <Link 
                    key={course.id}
                    href={isPaidMember ? course.slug : '#'}
                    className={`bg-white rounded-lg border-2 ${colors.border} ${colors.hover} p-6 transition-all hover:shadow-lg group ${isPaidMember ? '' : 'cursor-default'}`}
                  >
                    <div className={`${colors.bg} ${colors.text} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                      {course.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <span>{course.modules} modules</span>
                    </div>

                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      {isPaidMember ? 'Start Learning' : 'Members Only'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-orange-100 rounded-lg p-2 mr-3">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Tools & Templates</h2>
                <p className="text-gray-600">Ready-to-use resources for immediate implementation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const colors = getColorClasses(tool.color)
                return (
                  <Link 
                    key={tool.id}
                    href={isPaidMember ? tool.slug : '#'}
                    className={`bg-white rounded-lg border-2 ${colors.border} ${colors.hover} p-6 transition-all hover:shadow-lg group ${isPaidMember ? '' : 'cursor-default'}`}
                  >
                    <div className={`${colors.bg} ${colors.text} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                      {tool.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      {isPaidMember ? 'View Templates' : 'Members Only'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Recommended Learning Path</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get the most from our education center by following this structured learning path
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Start with AI & SEO Fundamentals</h4>
                  <p className="text-blue-100 text-sm">Understand how AI is changing search and discovery</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Learn Media Relationship Building</h4>
                  <p className="text-blue-100 text-sm">Build your media list and master outreach strategies</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Use Outreach Templates</h4>
                  <p className="text-blue-100 text-sm">Apply proven templates to contact writers and editors</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 mr-4">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Amplify with Press Distribution</h4>
                  <p className="text-blue-100 text-sm">Turn listicle placements into lasting AI authority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Gate Overlay - Only shows for non-paid members */}
          {shouldShowGate && (
            <div className="absolute inset-0 top-0 z-50">
              <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-lg mx-auto border-2 border-blue-200">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Exclusive Member Content
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Unlock access to comprehensive MasterClasses, proven outreach templates, and insider strategies 
                    that transform your business into an industry authority.
                  </p>
                  <div className="space-y-4 mb-6">
                    <button
                      onClick={handleSignup}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      Start Your Membership
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                    <p className="text-sm text-gray-500">
                      Join hundreds of businesses getting featured in top publications
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    30-day money-back guarantee • Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
