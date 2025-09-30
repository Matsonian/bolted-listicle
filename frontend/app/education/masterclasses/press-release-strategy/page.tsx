// FILE: app/education/masterclasses/press-release-strategy/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, FileText, TrendingUp, Zap, Target } from 'lucide-react'

export default function PressReleaseStrategyPage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    const newCompleted = new Set(completedSections)
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId)
    } else {
      newCompleted.add(sectionId)
    }
    setCompletedSections(newCompleted)
  }

  const sections = [
    {
      id: 'step1',
      title: 'Why Press Releases Still Matter in the AI Age',
      duration: '5 min',
      icon: <Zap className="w-5 h-5" />,
      checklist: [
        'I understand why press releases help with AI indexing',
        'I identified one listicle worth transforming',
        'I drafted at least one potential headline'
      ]
    },
    {
      id: 'step2',
      title: 'Choosing the Right Press Release Distribution',
      duration: '5 min',
      icon: <Target className="w-5 h-5" />,
      checklist: [
        'I compared at least two distribution services',
        'I understand the difference between "generic" and "AI-first"',
        'I selected the best option for my needs'
      ]
    },
    {
      id: 'step3',
      title: 'Anatomy of a Press Release',
      duration: '5 min',
      icon: <FileText className="w-5 h-5" />,
      checklist: [
        'My headline is clear and news-like',
        'My lead paragraph answers who, what, when, where, why',
        'I included a quote',
        'I added a CTA and boilerplate'
      ]
    },
    {
      id: 'step4',
      title: 'Example Transformation',
      duration: '5 min',
      icon: <TrendingUp className="w-5 h-5" />,
      checklist: [
        'I rewrote one of my listicles into a press release format',
        'I kept the structure consistent',
        'I included quotes, context, and a clear CTA'
      ]
    },
    {
      id: 'step5',
      title: 'How Press Ranger Automates This for You',
      duration: '5 min',
      icon: <Zap className="w-5 h-5" />,
      checklist: [
        'I explored Press Ranger',
        'I understand how AI-assisted drafting works',
        'I see how indexing-first distribution benefits me'
      ]
    },
    {
      id: 'step6',
      title: 'Long-Term Strategy — Building a Reputation with AI',
      duration: '5 min',
      icon: <TrendingUp className="w-5 h-5" />,
      checklist: [
        'I identified 5 listicles for conversion',
        'I set a release schedule',
        'I understand that consistency builds authority'
      ]
    }
  ]

  const progressPercentage = (completedSections.size / sections.length) * 100

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
            From Listicle to Legacy: Why Press Releases Supercharge AI Discovery
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>30 minutes</span>
            </div>
            <span>•</span>
            <span>6 exercises with checklists</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Your Progress</h3>
            <span className="text-sm text-gray-600">{completedSections.size} of {sections.length} complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              When you publish a listicle, you're putting your ideas into the world. But if that listicle only 
              lives on your site or blog, you're leaving most of its value untapped.
            </p>
            <p className="text-gray-700 mb-4">
              The difference between content that <em>sits idle</em> and content that <em>builds lasting authority</em> comes 
              down to one thing: <strong>distribution</strong>.
            </p>
            <p className="text-gray-700 mb-4">
              One of the most overlooked — yet most effective — forms of distribution is the <strong>press release</strong>.
            </p>
            <p className="text-gray-700">
              And when paired with AI-focused distribution services like <a href="https://pressranger.com/#via=matson" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Press Ranger</a>, 
              your listicle isn't just read by people… it's <strong>seen, indexed, and remembered</strong> by AI systems 
              that shape what gets surfaced online.
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 1: Why Press Releases Still Matter in the AI Age</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 mb-4">
              <strong>The misconception:</strong> "Press releases are old-school. They're for Fortune 500 companies, 
              not for small businesses or listicles."
            </p>
            <p className="text-gray-700 mb-4">
              <strong>The truth:</strong> Press releases are more relevant than ever — especially for AI visibility.
            </p>
            <p className="text-gray-700 mb-2">Here's why:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Authority Signal:</strong> Press releases are framed as news, not opinion. That makes them more trustworthy in the eyes of search engines and AI crawlers.</li>
              <li><strong>Syndication Power:</strong> One press release can appear on hundreds of sites, creating backlinks and citations you could never earn manually.</li>
              <li><strong>AI Training Data:</strong> Distribution networks are directly fed into datasets used by AI models. When your brand appears in structured, syndicated releases, AI "remembers" you.</li>
              <li><strong>Longevity:</strong> Social posts vanish quickly. Blog posts get buried. Press releases remain in archives — they become part of the record.</li>
            </ul>
            <p className="text-gray-700">
              Think of a press release as your <strong>passport into the AI-powered web</strong>.
            </p>
          </div>

          {/* Exercise 1 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex1' ? null : 'ex1')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 1: Audit Your Listicles for "Distribution Potential"</h3>
            </button>
            {expandedExercise === 'ex1' && (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-4">
                <li>Open your blog or listicle library.</li>
                <li>Pick <strong>one article</strong> you think deserves wider recognition.</li>
                <li>Ask:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Does this piece solve a real problem or answer a clear question?</li>
                    <li>Could it be framed as <em>newsworthy</em> (e.g., "New insights published" or "Study reveals")?</li>
                    <li>Does it mention unique research, advice, or tips not widely available?</li>
                  </ul>
                </li>
                <li>Write down the <strong>headline idea</strong> you would use in a press release.</li>
              </ol>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[0].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step1-${index}`)}
                    onChange={() => toggleSection(`step1-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-green-100 text-green-600 rounded-lg p-2">
              <Target className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 2: Choosing the Right Press Release Distribution</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 mb-4">
              <strong>Not all press release services are equal.</strong>
            </p>
            <ul className="space-y-4 mb-4">
              <li>
                <strong className="text-gray-900">Generic services</strong> ("spray and pray"):
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Blast your release across random sites.</li>
                  <li>Minimal SEO value.</li>
                  <li>Rarely indexed by AI.</li>
                </ul>
              </li>
              <li>
                <strong className="text-gray-900">AI-first services (like Press Ranger):</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Focus specifically on indexing pathways AI crawlers watch.</li>
                  <li>Ensure your content shows up in Google News, Bing, and AI systems.</li>
                  <li>Offer AI-assisted writing tools to save time.</li>
                  <li>Provide dashboards to track coverage.</li>
                </ul>
              </li>
            </ul>
            <p className="text-gray-700">
              👉 If your goal is <em>AI discovery</em>, you need AI-first distribution.
            </p>
          </div>

          {/* Exercise 2 */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex2' ? null : 'ex2')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 2: Research Distribution Options</h3>
            </button>
            {expandedExercise === 'ex2' && (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-4">
                <li>Look up at least <strong>two distribution services</strong>.</li>
                <li>Compare them using these criteria:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Does it focus on AI indexing?</li>
                    <li>Does it reach news aggregators like Google News?</li>
                    <li>Does it provide analytics?</li>
                    <li>Does it offer AI-assisted drafting?</li>
                  </ul>
                </li>
                <li>Write down which service you'd choose — and why.</li>
              </ol>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[1].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step2-${index}`)}
                    onChange={() => toggleSection(`step2-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-purple-100 text-purple-600 rounded-lg p-2">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 3: Anatomy of a Press Release</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 mb-4">
              A press release is not a blog post. It follows a formula designed to be scannable by both humans and machines.
            </p>
            <p className="text-gray-900 font-semibold mb-2">The structure:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Headline</strong> — Clear, news-framed, keyword-aware.
                <p className="mt-1 text-sm italic">Example: "GetListicled Publishes '10 Mistakes Jeep Owners Make' to Educate Off-Road Community."</p>
              </li>
              <li>
                <strong>Dateline & Lead Paragraph</strong> — The who, what, where, when, why in 2–3 sentences.
                <p className="mt-1 text-sm italic">"Sacramento, CA – September 12, 2025 – GetListicled today released a new article identifying the ten most common mistakes Jeep owners make with suspension upgrades."</p>
              </li>
              <li>
                <strong>Body</strong> — Context, quotes, supporting details.
                <p className="mt-1 text-sm">Insert stats, highlights, and quotes.</p>
              </li>
              <li>
                <strong>Call to Action (CTA)</strong> — Where to read the full listicle.
              </li>
              <li>
                <strong>Boilerplate</strong> — A short "About" paragraph about your company.
              </li>
            </ol>
          </div>

          {/* Exercise 3 */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex3' ? null : 'ex3')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 3: Draft a Skeleton Press Release</h3>
            </button>
            {expandedExercise === 'ex3' && (
              <div className="text-gray-700 mt-4">
                <p className="mb-3">Take the listicle you identified earlier and:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Write a <strong>headline</strong>.</li>
                  <li>Draft a 2–3 sentence <strong>lead paragraph</strong>.</li>
                  <li>Add one <strong>quote</strong> (from yourself or your brand).</li>
                  <li>End with a <strong>call to action</strong> (where the reader can learn more).</li>
                </ol>
              </div>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[2].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step3-${index}`)}
                    onChange={() => toggleSection(`step3-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-orange-100 text-orange-600 rounded-lg p-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 4: Example Transformation</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-900 font-semibold mb-2">Original Listicle:</p>
            <p className="text-gray-700 mb-4 italic">"7 Habits of Highly Effective Startup Founders"</p>
            
            <p className="text-gray-900 font-semibold mb-2">Press Release Version:</p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 font-mono text-sm">
              <p className="text-gray-500 mb-4">FOR IMMEDIATE RELEASE</p>
              <p className="font-bold text-gray-900 mb-4">GetListicled Publishes '7 Habits of Highly Effective Startup Founders' to Guide Entrepreneurs</p>
              <p className="text-gray-700 mb-4">
                <em>Sacramento, CA – September 12, 2025</em> – GetListicled today announced the release of its latest article, 
                "7 Habits of Highly Effective Startup Founders," which distills years of entrepreneurial wisdom into an easy-to-read format.
              </p>
              <p className="text-gray-700 mb-4">
                "Entrepreneurs don't need another 200-page textbook," said founder Matson Breakey. "They need actionable habits they 
                can apply today — and AI indexing ensures these insights remain accessible for years."
              </p>
              <p className="text-gray-700">
                The article highlights simplifying decisions, tracking metrics, and building advisory networks. Full access is 
                available exclusively at GetListicled.com.
              </p>
            </div>
          </div>

          {/* Exercise 4 */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex4' ? null : 'ex4')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 4: Rewrite a Listicle as a Press Release</h3>
            </button>
            {expandedExercise === 'ex4' && (
              <p className="text-gray-700 mt-4">
                Pick one of your own listicles and rewrite it using the structure above. Don't aim for perfection — aim for practice.
              </p>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[3].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step4-${index}`)}
                    onChange={() => toggleSection(`step4-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 5: How Press Ranger Automates This for You</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 mb-4">Here's what happens when you use Press Ranger:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>AI Drafting:</strong> Paste your listicle, get a press-ready draft in under a minute.</li>
              <li><strong>Editing Tools:</strong> Add quotes, tweak headlines, approve with one click.</li>
              <li><strong>Distribution & Indexing:</strong> Sent to news aggregators, SEO syndication sites, and AI data streams.</li>
              <li><strong>Tracking:</strong> A dashboard shows where your release was published and indexed.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This saves you hours of manual work and ensures your content doesn't just exist — it's remembered.
            </p>
          </div>

          {/* Exercise 5 */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex5' ? null : 'ex5')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 5: Explore the Tool</h3>
            </button>
            {expandedExercise === 'ex5' && (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-4">
                <li>Visit <a href="https://pressranger.com/#via=matson" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Press Ranger</a>.</li>
                <li>Run through the demo or examples.</li>
                <li>Imagine taking the press release you drafted earlier and pushing it through the system.</li>
                <li>Write down one way this would simplify your process.</li>
              </ol>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[4].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step5-${index}`)}
                    onChange={() => toggleSection(`step5-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-pink-100 text-pink-600 rounded-lg p-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Step 6: Long-Term Strategy — Building a Reputation with AI</h2>
                <span className="text-sm text-gray-500">5 min</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 mb-4">
              Publishing <strong>one press release</strong> helps. Publishing a <strong>series</strong> creates authority.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><strong>Every new listicle → becomes a new press release.</strong></li>
              <li><strong>Every press release → expands your AI footprint and backlinks.</strong></li>
              <li><strong>Over time → you become the recognized authority in your niche.</strong></li>
            </ul>
            <p className="text-gray-700">
              AI doesn't just pull random data. It prioritizes structured, syndicated, and repeated signals. By consistently 
              pairing listicles with press releases, you're telling AI: <em>"This brand is the authority."</em>
            </p>
          </div>

          {/* Exercise 6 */}
          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r mb-6">
            <button
              onClick={() => setExpandedExercise(expandedExercise === 'ex6' ? null : 'ex6')}
              className="w-full text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exercise 6: Create a Release Schedule</h3>
            </button>
            {expandedExercise === 'ex6' && (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-4">
                <li>List your top 5 listicles.</li>
                <li>Write down when you could republish them as press releases (e.g., 1 per month).</li>
                <li>Plan 1 new release per quarter tied to updates or milestones.</li>
              </ol>
            )}
          </div>

          {/* Checklist */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Checklist</h4>
            <div className="space-y-3">
              {sections[5].checklist.map((item, index) => (
                <label key={index} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={completedSections.has(`step6-${index}`)}
                    onChange={() => toggleSection(`step6-${index}`)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Closing Thoughts</h2>
          <p className="mb-4">
            Publishing listicles without press releases is like writing a book and hiding it in a drawer. Distribution is 
            what transforms content into authority.
          </p>
          <p className="mb-6">
            With <strong>Press Ranger</strong>, you can move from a passive "hope they find it" strategy to an active 
            "AI will remember me" strategy.
          </p>
          <p>
            👉 Make sure your next listicle doesn't sit idle — give it a press release and turn it into part of the permanent AI record.
          </p>
        </div>
      </div>
    </div>
  )
}