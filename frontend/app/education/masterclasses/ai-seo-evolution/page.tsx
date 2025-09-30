// FILE: app/education/masterclasses/ai-seo-evolution/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, ChevronDown, ChevronUp, Zap, Search, MessageCircle, Brain, TrendingUp } from 'lucide-react'

export default function AiSeoEvolutionPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>('module1')
  const [completedChecks, setCompletedChecks] = useState<Set<string>>(new Set())

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const toggleCheck = (checkId: string) => {
    const newChecks = new Set(completedChecks)
    if (newChecks.has(checkId)) {
      newChecks.delete(checkId)
    } else {
      newChecks.add(checkId)
    }
    setCompletedChecks(newChecks)
  }

  const modules = [
    {
      id: 'module1',
      number: 1,
      title: 'The New Search Landscape',
      duration: '5 min',
      icon: <Search className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'module2',
      number: 2,
      title: 'GEO – Generative Engine Optimization',
      duration: '6 min',
      icon: <Zap className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'module3',
      number: 3,
      title: 'AEO – Answer Engine Optimization',
      duration: '6 min',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'module4',
      number: 4,
      title: 'LLMO – Large Language Model Optimization',
      duration: '6 min',
      icon: <Brain className="w-5 h-5" />,
      color: 'orange'
    },
    {
      id: 'module5',
      number: 5,
      title: 'The Convergence and Action Plan',
      duration: '6 min',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'indigo'
    }
  ]

  const totalChecks = 13
  const progressPercentage = (completedChecks.size / totalChecks) * 100

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Education
        </Link>

        <div className="mb-8">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            MasterClass
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Understanding AI in a World of GEO, AEO, and LLMO
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            How SEO is Changing and How to Keep Up
          </p>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>30 minutes</span>
            </div>
            <span>•</span>
            <span>5 modules with exercises</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Your Progress</h3>
            <span className="text-sm text-gray-600">{completedChecks.size} of {totalChecks} exercises complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Module 1 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('module1')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('blue').bg} ${getColorClasses('blue').text} rounded-lg p-3`}>
                <Search className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 1: The New Search Landscape</h3>
                <p className="text-sm text-gray-600">5 minutes</p>
              </div>
            </div>
            {expandedModule === 'module1' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module1' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Teaching</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>SEO has always evolved: from keyword stuffing → link building → content authority.</li>
                  <li>AI-driven search is the biggest shift yet.</li>
                  <li>Traditional SEO isn't dead — it's the foundation — but now we must optimize for <strong>how AI engines read and generate content.</strong></li>
                  <li>Key acronyms:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>SEO</strong> = Search Engine Optimization</li>
                      <li><strong>GEO</strong> = Generative Engine Optimization</li>
                      <li><strong>AEO</strong> = Answer Engine Optimization</li>
                      <li><strong>LLMO</strong> = Large Language Model Optimization</li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Exercise */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (2 minutes)</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Write down how your company currently gets found online. Is it primarily through Google, referrals, social, or other channels?</li>
                  <li>Note: How would it change if fewer people clicked websites and more got their answers directly from AI?</li>
                </ul>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m1-1')}
                      onChange={() => toggleCheck('m1-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I documented how my company currently gets found online</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m1-2')}
                      onChange={() => toggleCheck('m1-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the four key acronyms: SEO, GEO, AEO, LLMO</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('module2')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('green').bg} ${getColorClasses('green').text} rounded-lg p-3`}>
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 2: GEO – Generative Engine Optimization</h3>
                <p className="text-sm text-gray-600">6 minutes</p>
              </div>
            </div>
            {expandedModule === 'module2' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module2' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Teaching</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Generative search engines (Google AI Overviews, Bing Copilot, Perplexity) now <em>create</em> answers.</li>
                  <li>GEO is about increasing the odds AI pulls from your site.</li>
                  <li>E-E-A-T (Experience, Expertise, Authority, Trust) has never mattered more.</li>
                </ul>

                <p className="text-gray-900 font-semibold mb-2">Key tactics:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li><strong>Structured content:</strong> schema markup, JSON-LD.</li>
                  <li><strong>Depth over fluff:</strong> in-depth guides, explainer content.</li>
                  <li><strong>Authority signals:</strong> citations, links, trust badges.</li>
                </ol>
              </div>

              {/* Exercise */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (3 minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Google: <em>"Best [your product/service] 2025."</em></li>
                  <li>Scan the AI Overview or top snippet (if available). Who is being cited?</li>
                  <li>Write down 1 thing they did that makes their content "source-worthy."</li>
                </ol>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-1')}
                      onChange={() => toggleCheck('m2-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I searched for my product/service and analyzed AI Overview results</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-2')}
                      onChange={() => toggleCheck('m2-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified what makes cited content "source-worthy"</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-3')}
                      onChange={() => toggleCheck('m2-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the three key GEO tactics</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('module3')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('purple').bg} ${getColorClasses('purple').text} rounded-lg p-3`}>
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 3: AEO – Answer Engine Optimization</h3>
                <p className="text-sm text-gray-600">6 minutes</p>
              </div>
            </div>
            {expandedModule === 'module3' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module3' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Teaching</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Voice assistants and smart devices (Alexa, Siri, Google Assistant) want <em>one best answer</em>, not 10 links.</li>
                  <li>AEO is about creating content structured for Q&A.</li>
                </ul>

                <p className="text-gray-900 font-semibold mb-2">Best practices:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Create FAQ pages with concise answers.</li>
                  <li>Target conversational queries ("What's the best…," "How do I…").</li>
                  <li>Keep answers short: 40–60 words works best.</li>
                  <li>Optimize for featured snippets and knowledge panels.</li>
                </ul>
              </div>

              {/* Exercise */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (3 minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Brainstorm 5 customer questions your company gets all the time.</li>
                  <li>Draft 1 clear, 2–3 sentence answer for each — as if Alexa had to read it aloud.</li>
                </ol>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-1')}
                      onChange={() => toggleCheck('m3-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I brainstormed 5 common customer questions</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-2')}
                      onChange={() => toggleCheck('m3-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I drafted voice-optimized answers (40-60 words each)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-3')}
                      onChange={() => toggleCheck('m3-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand AEO best practices for voice search</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 4 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('module4')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('orange').bg} ${getColorClasses('orange').text} rounded-lg p-3`}>
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 4: LLMO – Large Language Model Optimization</h3>
                <p className="text-sm text-gray-600">6 minutes</p>
              </div>
            </div>
            {expandedModule === 'module4' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module4' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Teaching</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>People now <em>ask ChatGPT, Claude, Gemini</em> instead of searching Google.</li>
                  <li>LLMs don't just crawl pages — they rely on training data + fresh sources (forums, wikis, cited blogs, high-authority sites).</li>
                  <li>LLMO is about becoming part of the "knowledge base" these AIs trust.</li>
                </ul>

                <p className="text-gray-900 font-semibold mb-2">Key levers:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Citations in high-authority publications.</li>
                  <li>Building topic clusters (not just one article, but a web of related ones).</li>
                  <li>Getting mentioned in forums, wikis, and communities.</li>
                </ol>
              </div>

              {/* Exercise */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (3 minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Ask ChatGPT (or another LLM): <em>"What are the best [your product/service]?"</em></li>
                  <li>Note which brands or sources it mentions.</li>
                  <li>Ask yourself: What would it take for my company to be in that answer?</li>
                </ol>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-1')}
                      onChange={() => toggleCheck('m4-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I tested my brand visibility in AI language models</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-2')}
                      onChange={() => toggleCheck('m4-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified gaps in my LLMO strategy</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-3')}
                      onChange={() => toggleCheck('m4-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the three key LLMO levers</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module 5 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('module5')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('indigo').bg} ${getColorClasses('indigo').text} rounded-lg p-3`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 5: The Convergence and Action Plan</h3>
                <p className="text-sm text-gray-600">6 minutes</p>
              </div>
            </div>
            {expandedModule === 'module5' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module5' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Teaching</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Old SEO = ranking for keywords.</li>
                  <li>New AI SEO = being <em>the trusted source</em> AI systems cite, quote, and recommend.</li>
                </ul>

                <p className="text-gray-900 font-semibold mb-2">The hierarchy:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-4">
                  <li><strong>SEO</strong> = foundation.</li>
                  <li><strong>GEO</strong> = visibility in generative AI summaries.</li>
                  <li><strong>AEO</strong> = readiness for voice & assistant answers.</li>
                  <li><strong>LLMO</strong> = presence in AI knowledge systems.</li>
                </ul>

                <p className="text-gray-900 font-semibold mb-2">Practical action steps for companies:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li><strong>Audit</strong> your content for depth + clarity.</li>
                  <li><strong>Implement Schema</strong> (FAQ, product, article markup).</li>
                  <li><strong>Expand Distribution</strong> (guest blogs, listicles, press).</li>
                  <li><strong>Publish Source-Worthy Assets</strong> (surveys, original data).</li>
                  <li><strong>Track</strong> AI visibility with emerging AI SEO tools.</li>
                </ol>
              </div>

              {/* Exercise */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5 minutes)</h4>
                <p className="text-gray-700 mb-3">Write a 3-step "AI SEO Action Plan" for your company:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Step 1</strong> = a quick win you can do this week.</li>
                  <li><strong>Step 2</strong> = a mid-term change (1–3 months).</li>
                  <li><strong>Step 3</strong> = a long-term initiative (6–12 months).</li>
                </ul>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m5-1')}
                      onChange={() => toggleCheck('m5-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified a quick win for this week</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m5-2')}
                      onChange={() => toggleCheck('m5-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I planned a mid-term change (1-3 months)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m5-3')}
                      onChange={() => toggleCheck('m5-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I outlined a long-term initiative (6-12 months)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m5-4')}
                      onChange={() => toggleCheck('m5-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the AI SEO hierarchy (SEO → GEO → AEO → LLMO)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
          <p className="mb-4">
            The companies who win won't just chase SEO… they'll <em>lead AI optimization.</em> Being discoverable in this 
            new era is about becoming the source AI engines and LLMs trust enough to surface. That requires clarity, 
            authority, and strategy — not just keywords.
          </p>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-2">Final Prompt:</p>
            <p>
              Ask yourself every time you publish: <em>"Would this piece make sense for an AI to quote directly?"</em> If 
              the answer is yes, you're building future-proof visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}