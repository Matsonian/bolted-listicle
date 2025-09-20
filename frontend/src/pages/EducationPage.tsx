import React from 'react'
import { BookOpen, Target, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function EducationPage() {
  const { userProfile } = useAuth()

  const strategies = [
    {
      title: "Find High-Authority Listicles",
      description: "Learn how to identify listicles published by major publications that can drive real traffic to your business.",
      icon: Target,
      lessons: [
        "Identifying authority websites in your niche",
        "Understanding editorial calendars and content gaps",
        "Using search operators to find recent listicles",
        "Analyzing competitor placements for opportunities"
      ]
    },
    {
      title: "Craft Compelling Pitches",
      description: "Master the art of pitching your business to editors and content creators for listicle inclusion.",
      icon: Users,
      lessons: [
        "Writing subject lines that get opened",
        "Structuring your pitch for maximum impact",
        "Providing value before asking for placement",
        "Follow-up strategies that work"
      ]
    },
    {
      title: "Scale Your Outreach",
      description: "Build systems to consistently get featured in multiple listicles every month.",
      icon: TrendingUp,
      lessons: [
        "Creating outreach templates that convert",
        "Building relationships with key editors",
        "Tracking and measuring your success",
        "Automating your outreach workflow"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <BookOpen className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Listicle Marketing Education
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn proven strategies to get your business featured in high-authority listicles 
            and drive qualified traffic that converts.
          </p>
        </div>

        {/* Welcome Message */}
        {userProfile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Welcome to your exclusive education content, {userProfile.first_name}!
            </h2>
            <p className="text-blue-800">
              As a GetListicled member, you have access to our comprehensive training materials 
              that will help you turn your search results into real business growth.
            </p>
          </div>
        )}

        {/* Strategy Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <strategy.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {strategy.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {strategy.description}
                </p>
                <div className="space-y-2">
                  {strategy.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{lesson}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Start: Your First Listicle Placement
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Process</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span className="text-gray-700">Use GetListicled to find recent listicles in your industry</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span className="text-gray-700">Research the publication and identify the right contact</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span className="text-gray-700">Craft a personalized pitch highlighting your unique value</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span className="text-gray-700">Send your pitch and follow up professionally</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">5</span>
                  <span className="text-gray-700">Track your results and optimize for better response rates</span>
                </li>
              </ol>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Target listicles published within the last 30 days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Focus on publications with high domain authority</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Provide unique insights, not just product promotion</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Include high-quality visuals with your pitch</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Find Your First Opportunity?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Put your new knowledge to work. Start searching for listicles in your industry 
            and begin building relationships with key publications.
          </p>
          <button 
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors"
            onClick={() => window.location.href = '/search'}
          >
            Start Your Search Now
          </button>
        </div>
      </div>
    </div>
  )
}
