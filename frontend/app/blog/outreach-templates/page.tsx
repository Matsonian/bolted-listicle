// FILE: app/blog/outreach-templates/page.tsx - Outreach Templates Blog Post
'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export default function OutreachTemplatesPage() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "5 Proven Email Templates That Get Your Product Featured in Listicles",
      description: "Five copy-and-paste outreach templates—value-first, update request, data-driven, editor-assist, and expert quote—plus subject lines, follow-ups, and an asset checklist.",
      author: { "@type": "Organization", name: "GetListicled" },
      publisher: { "@type": "Organization", name: "GetListicled" },
      datePublished: "2025-08-24",
      dateModified: "2025-08-24",
      articleSection: [
        "Value-first template",
        "Update request template", 
        "Data-driven template",
        "Editor-assist template",
        "Expert quote template",
        "Best practices",
        "Asset checklist",
        "Tracking metrics",
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Outreach
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                5 Proven Email Templates That Get Your Product Featured in Listicles
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  August 24, 2025
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  12 min read
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <h2 className="text-xl font-bold text-blue-900 mb-3">Why this works</h2>
                <p className="text-blue-800">
                  Editors keep and update listicles because readers want fast comparisons. Your job is to make inclusion
                  the easiest decision in their inbox: clear value, paste-ready assets, and credible proof.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 1: Value-First (you give before you ask)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> Cold outreach to an editor you haven't met.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Subject line ideas</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Quick enhancement for your "[Best Category]" guide</li>
                    <li>Two data points your readers will value in Guide Title</li>
                    <li>Small contribution for your Site Name roundup</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-green-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi [Name],</p>
                    <p>
                      I loved your section on [specific use case] in "[Guide Title]." One thing your readers might find
                      helpful is [1 short insight with evidence]. Here's a concise nugget you can add if useful:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Insight:</strong> [Specific finding or tip]</li>
                      <li><strong>Source:</strong> [Where this comes from]</li>
                      <li><strong>Why it matters:</strong> [Reader benefit]</li>
                    </ul>
                    <p>
                      If you're updating the guide and think [Product Name] might fit, I'd be happy to provide a
                      ready-to-use product card. No pressure either way—just wanted to share something useful.
                    </p>
                    <p>
                      Best,<br />
                      [Your name]
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 2: Update Request (for existing relationships)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> Following up on a listicle that already includes you, or when you have
                  product updates.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi [Name],</p>
                    <p>
                      Hope you're well! I noticed you're refreshing "[Guide Title]" (saw the update on [date]). We've
                      made some significant improvements to [Product Name] that your readers would find valuable:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>[New feature/improvement 1]</li>
                      <li>[New feature/improvement 2]</li>
                      <li>[Updated pricing/availability]</li>
                    </ul>
                    <p>
                      Here's an updated product card if you'd like to refresh our section:
                    </p>
                    <p>
                      [Insert ready-to-use product description]
                    </p>
                    <p>
                      Thanks for including us previously—it's been a great source of qualified leads.
                    </p>
                    <p>
                      Best,<br />
                      [Your name]
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 3: Data-Driven (lead with research)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> You have unique data, survey results, or industry insights.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-purple-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi [Name],</p>
                    <p>
                      I just finished reading your "[Guide Title]" and thought you might find our latest research
                      interesting. We surveyed [X number] of [target audience] about [relevant topic] and found:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>[Key finding 1 with percentage]</li>
                      <li>[Key finding 2 with percentage]</li>
                      <li>[Surprising insight]</li>
                    </ul>
                    <p>
                      I can share the full methodology and additional data points if you're interested in citing this
                      research. We'd also be happy to provide a product overview for [Product Name] if it fits your
                      criteria.
                    </p>
                    <p>
                      Full study attached. Let me know if you'd like any additional details.
                    </p>
                    <p>
                      Best,<br />
                      [Your name]
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 4: Editor-Assist (help them improve)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> You notice gaps or outdated information in their listicle.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-orange-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi [Name],</p>
                    <p>
                      Your "[Guide Title]" is incredibly thorough—I've bookmarked it for reference. I noticed a couple
                      of small updates that might be helpful:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>[Product X] recently changed their pricing from $Y to $Z</li>
                      <li>[Product Y] added [new feature] that addresses [use case you mentioned]</li>
                      <li>[Industry trend or regulation change]</li>
                    </ul>
                    <p>
                      I work with [Product Name] and would be happy to provide updated information for any of the tools
                      you're tracking. We also have some unique capabilities in [specific area] that might fit your
                      "[category]" section.
                    </p>
                    <p>
                      Happy to help keep the guide current—just let me know what would be most useful.
                    </p>
                    <p>
                      Best,<br />
                      [Your name]
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 5: Expert Quote (position as thought leader)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> You want to be quoted as an expert, not just featured as a product.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-red-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi [Name],</p>
                    <p>
                      I really appreciated your take on [specific point] in "[Guide Title]." As someone who's been
                      working in [industry/field] for [X years], I'd love to contribute a perspective on [relevant
                      topic].
                    </p>
                    <p>
                      Here are a few insights that might add value for your readers:
                    </p>
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                      "[Quotable insight about industry trend, best practice, or prediction]"
                    </blockquote>
                    <p>
                      I'm [Your title] at [Company] where we've helped [impressive metric or client base]. Happy to
                      provide additional quotes, data, or insights if you're looking for expert perspectives.
                    </p>
                    <p>
                      Best,<br />
                      [Your name]<br />
                      [Title], [Company]
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices for All Templates</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">✅ Do This</h3>
                    <ul className="space-y-2">
                      <li>• Keep emails under 150 words</li>
                      <li>• Include specific details about their content</li>
                      <li>• Provide ready-to-use assets</li>
                      <li>• Follow up once after 1 week</li>
                      <li>• Track which templates work best</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">❌ Avoid This</h3>
                    <ul className="space-y-2">
                      <li>• Generic "please include us" requests</li>
                      <li>• Attachments in first email</li>
                      <li>• Multiple follow-ups</li>
                      <li>• Pitching competitors' content</li>
                      <li>• Forgetting to personalize</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Asset Checklist</h2>
                <p className="mb-4">Have these ready before you start outreach:</p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <ul className="space-y-2">
                    <li>□ Product description (50 words max)</li>
                    <li>□ Key features list (3-5 bullets)</li>
                    <li>□ Pricing information</li>
                    <li>□ High-resolution logo and screenshots</li>
                    <li>□ Customer testimonials or case studies</li>
                    <li>□ Technical specifications</li>
                    <li>□ Comparison data vs. competitors</li>
                    <li>□ Free trial or demo links</li>
                  </ul>
                </div>
              </section>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to start your outreach campaign?</h3>
                <p className="text-lg mb-6">
                  Find the exact listicles where your competitors are getting featured—and where you should be too.
                </p>
                <Link
                  href="/search"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Discover Listicles in Your Industry
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
