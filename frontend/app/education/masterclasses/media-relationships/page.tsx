// FILE: app/education/masterclasses/media-relationships/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, ChevronDown, ChevronUp, Users, Search, Mail, TrendingUp, Award } from 'lucide-react'

export default function MediaRelationshipsPage() {
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
      title: 'Finding the Right Writers and Outlets',
      duration: '5-10 min',
      icon: <Search className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'module2',
      number: 2,
      title: 'Researching and Building Your Media List',
      duration: '5-10 min',
      icon: <Users className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'module3',
      number: 3,
      title: 'Outreach & Relationship Building',
      duration: '5-10 min',
      icon: <Mail className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'module4',
      number: 4,
      title: 'Nurturing Long-Term Media Relationships',
      duration: '5-10 min',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'orange'
    },
    {
      id: 'bonus',
      number: 'Bonus',
      title: 'Leveraging Relationships for Listicle Inclusion',
      duration: '5-10 min',
      icon: <Award className="w-5 h-5" />,
      color: 'indigo'
    }
  ]

  const totalChecks = 21 // Total checkboxes across all modules
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
            How to Find and Build Relationships with Media, Press, and Listicle Authors
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>25-50 minutes total</span>
            </div>
            <span>•</span>
            <span>5 modules with exercises</span>
          </div>
          <p className="text-lg text-gray-700">
            Learn how to identify, contact, and build lasting relationships with the writers who can feature your brand in high-impact listicles and press coverage.
          </p>
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

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This MasterClass Matters</h2>
          <p className="text-gray-700 mb-4">
            Publications don't publish… people do.
          </p>
          <p className="text-gray-700 mb-4">
            The goal is to build real connections with writers, bloggers, and editors—not blast generic pitches. 
            Every listicle, feature, and review is written by a person with their own interests, style, and beat.
          </p>
          <p className="text-gray-700">
            By the end of this masterclass, you'll have a living media list, personalized pitch drafts, and a system 
            for ongoing outreach that turns one-off mentions into lasting partnerships.
          </p>
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
                <h3 className="text-xl font-bold text-gray-900">Module 1: Finding the Right Writers and Outlets</h3>
                <p className="text-sm text-gray-600">5-10 minutes</p>
              </div>
            </div>
            {expandedModule === 'module1' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module1' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Here — Why This Matters</h4>
                <p className="text-gray-700 mb-4">
                  Before you ever pitch a product, story, or idea, you need to know who you're pitching to. The biggest 
                  mistake people make is blasting emails to generic addresses like "editor@" or "info@." Publications don't 
                  write articles… people do.
                </p>
                <p className="text-gray-700 mb-6">
                  Every listicle, every feature piece, every review is written by a person with their own style, interests, 
                  and beats. If you can find that person and learn what they care about, you've already done more than 90% 
                  of your competition.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Breakdown</h4>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">1. Learn Where Listicles Live</h5>
                  <p className="text-gray-700 mb-3">
                    Start by searching for articles that are already ranking. These are the ones readers—and future 
                    customers—are actually finding.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Google Search:</strong> Type "Best [your product/service] 2025" or "Top 10 [your niche]."
                      <p className="text-sm mt-1">Example: "Best camping stoves 2025" or "Top 10 Jeep lift kits."</p>
                    </li>
                    <li><strong>AI Search Tools:</strong> Ask ChatGPT (or other AI) "What are the best [product type] right now?" 
                    Look at the sources it lists—most are listicles.</li>
                    <li><strong>News Aggregators:</strong> Sites like Google News or Feedly let you scan headlines quickly.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    The point isn't just to see what's being said. It's to notice who is saying it.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">2. Look at the Byline</h5>
                  <p className="text-gray-700 mb-2">Every article has an author credit (the "by" line). That's your goldmine.</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Some are staff writers tied to one outlet.</li>
                    <li>Others are freelancers who write for multiple sites (these are especially valuable—they can bring you into different publications).</li>
                    <li>Many have a link to their profile page, with a list of everything else they've written.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Instead of thinking "I need to get into Forbes," think "I need to connect with Sarah Johnson, who writes 
                    about e-commerce for Forbes and Fast Company."
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">3. Distinguish Big vs. Niche Outlets</h5>
                  <p className="text-gray-700 mb-2">Both matter.</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Big Outlets</strong> (Forbes, Wired, NYT): High authority, huge reach, but harder to break into.</li>
                    <li><strong>Niche Blogs & Trade Sites:</strong> Smaller audiences, but hyper-targeted and easier to pitch. 
                    Often these writers are more approachable and open to new voices.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    A mix of both creates balance: credibility from the big names and conversions from niche audiences.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">4. Find Recurring Names</h5>
                  <p className="text-gray-700">
                    As you scan multiple listicles, you'll notice the same names pop up again and again. These are the true 
                    "gatekeepers" in your space. They've built trust with readers and editors, which means if they like you, 
                    their words carry more weight.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">Quick Tools for Research</h5>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Google Advanced Search (to find specific keywords within top domains)</li>
                    <li>LinkedIn/Twitter/X (to check a writer's current role and interests)</li>
                    <li>MuckRack / Hunter.io (for contact info)</li>
                    <li>Simple Guessing (first.last@company.com works more often than you think)</li>
                  </ul>
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5 Minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Search Google for "Best [your niche/product] 2025."</li>
                  <li>Click 3 listicles and write down:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Article title</li>
                      <li>Author name</li>
                      <li>Author's profile or Twitter/LinkedIn</li>
                    </ul>
                  </li>
                  <li>Add them into a spreadsheet with columns: Author, Outlet, Contact Info (if available), Notes.</li>
                </ol>
                <p className="text-gray-700 mt-3 font-medium">
                  Goal: You should finish this module with at least 5 authors in your media tracker.
                </p>
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
                    <span className="text-gray-700">I searched for at least 3 listicles in my niche</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m1-2')}
                      onChange={() => toggleCheck('m1-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified the byline authors from those articles</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m1-3')}
                      onChange={() => toggleCheck('m1-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I created a spreadsheet to track media contacts</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m1-4')}
                      onChange={() => toggleCheck('m1-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I have at least 5 authors listed in my tracker</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">Key Takeaway:</p>
                <p className="text-gray-700 mt-2">
                  Finding the right writers isn't about luck. It's about slowing down, reading the bylines, and realizing 
                  that behind every outlet is a real person. When you know who those people are, you can start building the 
                  relationships that lead to coverage.
                </p>
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
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 2: Researching and Building Your Media List</h3>
                <p className="text-sm text-gray-600">5-10 minutes</p>
              </div>
            </div>
            {expandedModule === 'module2' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module2' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Here — Why This Matters</h4>
                <p className="text-gray-700 mb-4">
                  You now know who the writers are — but if you don't organize your research, it's just random names floating 
                  around. A proper media list is your foundation. It keeps everything in one place: who you know, what they 
                  write about, and how to reach them.
                </p>
                <p className="text-gray-700 mb-6">
                  Think of it as your personal CRM (Customer Relationship Manager) for the press. If Module 1 was about finding 
                  people, Module 2 is about building your system to track and grow those relationships.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Breakdown</h4>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">1. Build Your Media List Framework</h5>
                  <p className="text-gray-700 mb-3">
                    Use a simple spreadsheet (Google Sheets, Excel, or Airtable). Create columns such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li><strong>Name</strong> (journalist, blogger, influencer)</li>
                    <li><strong>Outlet</strong> (where they publish)</li>
                    <li><strong>Email / Contact Info</strong></li>
                    <li><strong>Social Profiles</strong> (Twitter/X, LinkedIn)</li>
                    <li><strong>Last Article Title</strong> (shows what they're writing about lately)</li>
                    <li><strong>Topics / Beat</strong> (what they usually cover)</li>
                    <li><strong>Notes</strong> (any personal details, tone, style)</li>
                    <li><strong>Last Contacted</strong> (date you last reached out)</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Keep it lean but detailed enough to avoid guesswork when you pitch later.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">2. Research Hacks: How to Find Contact Info</h5>
                  <p className="text-gray-700 mb-3">Once you've got the name, you need a way to reach them. Some easy tactics:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Profile Pages:</strong> Many outlets link to an author bio with an email or social link.</li>
                    <li><strong>Social Media:</strong> Twitter bios often include email addresses.</li>
                    <li><strong>Tools:</strong> Hunter.io, RocketReach, Clearbit — great for guessing company emails.</li>
                    <li><strong>Format Guessing:</strong> If one employee is john.smith@website.com, chances are jane.doe@website.com works too.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Always double-check with a quick test email (or use free verification tools to avoid bounces).
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">3. Track Writer Preferences</h5>
                  <p className="text-gray-700 mb-2">
                    Not all journalists are the same. Some love stats. Others prefer personal stories. Some only cover product 
                    launches, while others do in-depth analysis.
                  </p>
                  <p className="text-gray-700">
                    By reading 2–3 of their recent articles, you'll know what they're into. Write this down in the Notes column.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">4. Prioritize Your List</h5>
                  <p className="text-gray-700 mb-2">Not every name deserves the same effort. Sort your list into three tiers:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Tier 1:</strong> Dream writers. Big outlets or highly influential names. Harder to get, but worth it.</li>
                    <li><strong>Tier 2:</strong> Solid opportunities. Niche blogs, industry writers, medium reach.</li>
                    <li><strong>Tier 3:</strong> Newer or smaller writers. Easier to approach, good practice for your outreach.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    This helps you avoid spending all your time chasing "Forbes" when a mid-tier blog might get you real results faster.
                  </p>
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5–10 Minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Open a new spreadsheet or template.</li>
                  <li>Add the 5 writers you found in Module 1. Fill in: Name, Outlet, and Article Title.</li>
                  <li>Research and add at least one piece of contact info for each.</li>
                  <li>Write a one-sentence note about what they usually cover. Example:
                    <p className="text-sm italic mt-1">"Covers outdoor gear with a focus on eco-friendly products."</p>
                  </li>
                  <li>Star or highlight your top 2 (these are your Tier 1 writers).</li>
                </ol>
                <p className="text-gray-700 mt-3 font-medium">
                  Goal: By the end of this module, you'll have a starter media list with at least 5 entries.
                </p>
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
                    <span className="text-gray-700">I created a media list spreadsheet with proper columns</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-2')}
                      onChange={() => toggleCheck('m2-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I added at least 5 writers with contact information</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-3')}
                      onChange={() => toggleCheck('m2-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I wrote notes about what each writer covers</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m2-4')}
                      onChange={() => toggleCheck('m2-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I prioritized my list into Tier 1, 2, and 3</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">Key Takeaway:</p>
                <p className="text-gray-700 mt-2">
                  Your media list is your secret weapon. With it, you're not just cold pitching random inboxes — you're building 
                  a database of people you know, trust, and can return to again and again.
                </p>
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
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 3: Outreach & Relationship Building</h3>
                <p className="text-sm text-gray-600">5-10 minutes</p>
              </div>
            </div>
            {expandedModule === 'module3' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module3' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Here — Why This Matters</h4>
                <p className="text-gray-700 mb-4">
                  Now that you've identified and organized the right writers, it's time to make contact. This is where most people 
                  blow it — they treat journalists like a transaction instead of a relationship. The truth? Journalists, bloggers, 
                  and listicle authors get dozens of pitches a day. If you sound like everyone else, you'll get ignored.
                </p>
                <p className="text-gray-700 mb-6">
                  Outreach isn't about asking for coverage. It's about starting a conversation and building trust.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Breakdown</h4>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">1. Engage Before You Pitch</h5>
                  <p className="text-gray-700 mb-2">Before sending an email, warm up the relationship.</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Follow them on Twitter/X or LinkedIn.</li>
                    <li>Like, comment, or share a few of their articles.</li>
                    <li>Add something thoughtful: "Loved your point about [topic] — I hadn't thought of it that way."</li>
                  </ul>
                  <p className="text-gray-700 mt-3">Think of it like waving hello before asking a favor.</p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">2. How to Write the First Email</h5>
                  <p className="text-gray-700 mb-3">The first message should feel personal, short, and relevant.</p>
                  <p className="text-gray-900 font-semibold mb-2">3 parts to remember:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900">Relevance — Show you actually know their work.</p>
                      <p className="text-sm text-gray-700 italic">"I saw your article on [topic] last week, and it really hit home…"</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Value — Explain why what you're sharing matters to their readers.</p>
                      <p className="text-sm text-gray-700 italic">"We just released new data on [topic] that could give your audience a unique angle."</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Clarity — Be direct. End with one clear action.</p>
                      <p className="text-sm text-gray-700 italic">"Would you like me to send the full report?"</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">Keep it under 150 words. Respect their time.</p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">3. What Not to Do</h5>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Don't send mass emails with "Dear Sir/Madam."</li>
                    <li>Don't pitch outside their beat (a fashion writer doesn't care about software).</li>
                    <li>Don't attach huge files. (Links are better.)</li>
                    <li>Don't follow up every 24 hours — that's how you get blacklisted.</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">4. The Right Way to Follow Up</h5>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Wait at least 5–7 days.</li>
                    <li>Make your follow-up short and polite:
                      <p className="text-sm italic mt-1">"Just wanted to bump this in case it slipped through. If not a fit, no worries — I'll keep reading your work."</p>
                    </li>
                    <li>Limit yourself to two follow-ups max. After that, move on.</li>
                  </ul>
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5–10 Minutes)</h4>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Pick one journalist from your media list.</li>
                  <li>Read their last two articles and jot down:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Topics they cover most.</li>
                      <li>Their style (analytical, casual, consumer-focused, etc.).</li>
                    </ul>
                  </li>
                  <li>Draft a 3-line outreach email using the Relevance → Value → Clarity formula.</li>
                </ol>
                <div className="bg-white border border-purple-200 rounded p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Example:</p>
                  <p className="text-sm text-gray-700">
                    "Hi [Name], I really enjoyed your piece on eco-friendly camping gear — especially the part about long-term 
                    durability. We've just finished testing a new line of stoves that cut fuel use by 30%. Would you like me to 
                    share the results?"
                  </p>
                </div>
                <p className="text-gray-700 mt-3 font-medium">
                  The point isn't to send it yet — it's to practice crafting something short, personal, and clear.
                </p>
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
                    <span className="text-gray-700">I followed at least 3 writers on social media</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-2')}
                      onChange={() => toggleCheck('m3-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I engaged with their recent articles (liked, commented, or shared)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-3')}
                      onChange={() => toggleCheck('m3-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I drafted a personalized outreach email using Relevance-Value-Clarity</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m3-4')}
                      onChange={() => toggleCheck('m3-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the rules for following up without being annoying</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">Key Takeaway:</p>
                <p className="text-gray-700 mt-2">
                  Outreach is about trust, not transactions. If you approach a journalist like a human, not a megaphone, you'll 
                  stand out in a crowded inbox. One thoughtful, relevant message is worth more than a hundred generic pitches.
                </p>
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
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Module 4: Nurturing Long-Term Media Relationships</h3>
                <p className="text-sm text-gray-600">5-10 minutes</p>
              </div>
            </div>
            {expandedModule === 'module4' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'module4' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Here — Why This Matters</h4>
                <p className="text-gray-700 mb-4">
                  Landing your first article or listicle mention is exciting… but it's not the end goal. Real value comes from 
                  sustained relationships. Journalists and bloggers are always looking for reliable sources. If you become one, 
                  they'll come back to you again and again.
                </p>
                <p className="text-gray-700 mb-6">
                  Think of yourself less as a "pitcher" and more as a "partner." That mindset shift turns one-off coverage into 
                  a long-term media asset.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Breakdown</h4>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">1. Stay in Touch Without Being Pushy</h5>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Check in periodically — not just when you need something.</li>
                    <li>Congratulate them on big articles, new jobs, or awards.</li>
                    <li>Share an article of theirs on your social channels with a tag: "Great insights from @WriterName on off-road 
                    suspension design. Worth a read."</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    The goal is to show genuine interest in their work, not just your agenda.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">2. Provide Value Between Pitches</h5>
                  <p className="text-gray-700 mb-2">Ask yourself: "What could make their job easier?"</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Share new data, insights, or studies in your industry.</li>
                    <li>Offer expert commentary when news breaks.</li>
                    <li>Send resources without asking for coverage.</li>
                  </ul>
                  <div className="bg-white border border-orange-200 rounded p-4 mt-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Example:</p>
                    <p className="text-sm text-gray-700">
                      "Hey Sarah, I thought you might find this dataset on fuel efficiency trends useful for your future pieces. 
                      No need to respond — just passing it along."
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">3. Invite Them Into Your World</h5>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Give early access to launches or product demos.</li>
                    <li>Invite them to industry events or behind-the-scenes tours.</li>
                    <li>Provide exclusives when possible — journalists love to be first.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    These small gestures make them feel valued and increase the chances they'll want to cover your story.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">4. Celebrate Their Work</h5>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Share their articles with your audience.</li>
                    <li>Leave thoughtful comments on social media.</li>
                    <li>If they feature you, thank them publicly and privately.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Gratitude builds goodwill. And journalists remember who made them look good.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">5. Turn Mentions Into Partnerships</h5>
                  <p className="text-gray-700 mb-2">One article is good. A recurring relationship is better.</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Stay consistent with updates.</li>
                    <li>Keep offering new story angles.</li>
                    <li>Over time, they'll start reaching out to you when they need a source.</li>
                  </ul>
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5–10 Minutes)</h4>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li>Pick two journalists from your media list.</li>
                  <li>Write a quick "value email" that doesn't pitch anything. Example:
                    <div className="bg-white border border-orange-200 rounded p-3 mt-2">
                      <p className="text-sm text-gray-700">
                        "Hi [Name], I saw you've been covering supply chain issues lately. Here's a recent industry report I 
                        thought you'd appreciate — page 12 has some surprising stats. Hope it helps with your work."
                      </p>
                    </div>
                  </li>
                  <li>Share one of their latest articles on your LinkedIn, Twitter, or Facebook with a genuine comment about why 
                  you liked it.</li>
                </ol>
                <p className="text-gray-700 mt-3 font-medium">
                  Goal: Build goodwill without asking for anything in return.
                </p>
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
                    <span className="text-gray-700">I wrote a "value email" for at least one writer</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-2')}
                      onChange={() => toggleCheck('m4-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I shared a writer's article on my social channels</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-3')}
                      onChange={() => toggleCheck('m4-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I created a follow-up calendar for my top contacts</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('m4-4')}
                      onChange={() => toggleCheck('m4-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand the importance of long-term relationship building</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">Key Takeaway:</p>
                <p className="text-gray-700 mt-2">
                  The real win isn't a single mention — it's becoming a trusted, go-to source. Journalists remember who helped 
                  them, who respected their time, and who added value. If you consistently play the long game, media relationships 
                  will compound in value year after year.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bonus Module */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <button
            onClick={() => toggleModule('bonus')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`${getColorClasses('indigo').bg} ${getColorClasses('indigo').text} rounded-lg p-3`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Bonus Module: Leveraging Relationships for Listicle Inclusion</h3>
                <p className="text-sm text-gray-600">5-10 minutes</p>
              </div>
            </div>
            {expandedModule === 'bonus' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {expandedModule === 'bonus' && (
            <div className="p-6 border-t">
              <div className="prose prose-gray max-w-none mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Start Here — Why This Matters</h4>
                <p className="text-gray-700 mb-4">
                  Listicles are powerful. They don't just bring clicks… they drive sales, build credibility, and boost SEO with 
                  backlinks. Being included in "Top 10" or "Best of" articles instantly positions your product or brand as legit.
                </p>
                <p className="text-gray-700 mb-6">
                  But here's the truth: authors don't add brands because you beg. They add brands when it makes their article better. 
                  Your job is to show them that including you helps them — not just you.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Breakdown</h4>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">1. Identify the Right Listicles</h5>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Start with Google searches: "Best [product/service] 2025," "Top [category] tools," "Best alternatives to [competitor]."</li>
                    <li>Focus on articles still being updated (check "last updated" date).</li>
                    <li>Prioritize authors who have multiple listicles across sites.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">These are your low-hanging fruit.</p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">2. Craft the Inclusion Request</h5>
                  <p className="text-gray-700 mb-2">Your outreach needs a simple, respectful structure:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900">Acknowledge their work</p>
                      <p className="text-sm text-gray-700 italic">"I loved your article on the best off-road suspensions — really helpful breakdown."</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Explain why you fit</p>
                      <p className="text-sm text-gray-700 italic">"We make a patented dual-rate coil spring that solves the common collapse issue you mentioned."</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Make it easy</p>
                      <ul className="list-disc pl-6 mt-1 space-y-1 text-sm text-gray-700">
                        <li>Provide a 2–3 sentence blurb they could copy-paste.</li>
                        <li>Include a high-quality image link and your website.</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">
                    Journalists are busy. The easier you make it, the higher the chance they'll add you.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">3. Offer a Unique Hook</h5>
                  <p className="text-gray-700 mb-2">Why should they include you? Possible hooks:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Exclusive data or test results.</li>
                    <li>A unique product feature.</li>
                    <li>An exclusive discount code for their readers.</li>
                    <li>Expert commentary that makes their article richer.</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Never just say, "Can you add us?" Always show the benefit to them and their readers.
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2">4. Multiply the Impact</h5>
                  <p className="text-gray-700 mb-2">Once you land a listicle mention, don't stop there:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Share it on your social channels.</li>
                    <li>Link it from your website ("As seen in…").</li>
                    <li>Email it to your customers.</li>
                    <li>Use it in ad campaigns for social proof.</li>
                    <li>Circle back with the author to thank them and stay top-of-mind.</li>
                  </ul>
                </div>
              </div>

              {/* Exercise */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exercise (5–10 Minutes)</h4>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li>Search Google for one "Best [your niche]" listicle today.</li>
                  <li>Write down the author, publication, and last updated date.</li>
                  <li>Draft a short inclusion request email using the Acknowledge → Fit → Easy formula.</li>
                </ol>
                <div className="bg-white border border-indigo-200 rounded p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Example:</p>
                  <p className="text-sm text-gray-700">
                    "Hi [Name], I really enjoyed your article on the best camping stoves — especially the point on portability. 
                    I'd love to suggest adding our [Brand Stove], which is the only model with a built-in fuel efficiency gauge. 
                    Here's a 2-line blurb and photo you're welcome to use if it's a fit. Thanks for considering!"
                  </p>
                </div>
                <p className="text-gray-700 mt-3 font-medium">
                  Save this draft in your media tracker.
                </p>
                <p className="text-gray-700 mt-2 font-medium">
                  Goal: Have one ready-to-send inclusion request by the end of this module.
                </p>
              </div>

              {/* Checklist */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Module Checklist</h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('bonus-1')}
                      onChange={() => toggleCheck('bonus-1')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified 3 listicles where my product could be included</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('bonus-2')}
                      onChange={() => toggleCheck('bonus-2')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I drafted an inclusion request using Acknowledge-Fit-Easy</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('bonus-3')}
                      onChange={() => toggleCheck('bonus-3')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I created a 2-3 sentence blurb and high-quality image for editors</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('bonus-4')}
                      onChange={() => toggleCheck('bonus-4')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I identified my unique hook (data, feature, discount, etc.)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedChecks.has('bonus-5')}
                      onChange={() => toggleCheck('bonus-5')}
                      className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">I understand how to multiply the impact of listicle placements</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">Key Takeaway:</p>
                <p className="text-gray-700 mt-2">
                  Listicles aren't just "nice mentions." They're compounding assets — one placement can live for years, drive 
                  backlinks, boost SEO, and keep sending buyers your way. If you make life easier for writers and editors, 
                  they'll happily include you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Completion Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">MasterClass Complete</h2>
          <p className="mb-4">By the end of this MasterClass, you now have:</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>A living media list with writers in your niche</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Personalized pitch drafts and outreach strategies</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>A system for ongoing relationship nurturing</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>A roadmap for landing consistent media and listicle coverage</span>
            </li>
          </ul>
          <p className="text-lg">
            Now it's time to put these strategies into practice. Start building those relationships today!
          </p>
        </div>
      </div>
    </div>
  )
}