import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
          <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
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
                    <p>Hi Name,</p>
                    <p>
                      I loved your section on specific use case in "[Guide Title]." One thing your readers might find
                      helpful is 1 short insight with evidence. Here's a concise nugget you can add if useful:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Benchmark:</strong> metric or stat
                      </li>
                      <li>
                        <strong>Why it matters:</strong> reader-benefit explanation
                      </li>
                      <li>
                        <strong>Source:</strong> credible source or methodology link
                      </li>
                    </ul>
                    <p>
                      Separately, if you're refreshing the list, here's a paste-ready card for{" "}
                      <strong>Your Product</strong>:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>What it is:</strong> 1-line explanation
                      </li>
                      <li>
                        <strong>Best for:</strong> audience/use case
                      </li>
                      <li>
                        <strong>Standout:</strong> 2–3 differentiators with proof
                      </li>
                      <li>
                        <strong>Key specs:</strong> 3–5 specs
                      </li>
                      <li>
                        <strong>Price:</strong> range
                      </li>
                      <li>
                        <strong>Assets:</strong> Drive/Box link to images + logo
                      </li>
                      <li>
                        <strong>Docs:</strong> manual / test / security / certification
                      </li>
                    </ul>
                    <p>Happy to tailor this to your style guide.</p>
                    <p>
                      Thanks,
                      <br />
                      Your Name — Role at Company | site
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Follow-up (3–5 business days)</h4>
                  <p className="font-mono text-sm">
                    Hi Name, quick bump… if the insight isn't a fit, no worries. Would a comparison table row be more
                    useful?
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 2: Update Request (swap outdated picks)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> A listicle mentions discontinued or outdated tools.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Subject line ideas</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Quick update for your Month Year Category guide</li>
                    <li>Heads up: Old Tool is EOL—drop-in replacement card</li>
                    <li>"Best Category" refresh suggestion</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi Name,</p>
                    <p>
                      In "[Guide Title]" you include <strong>Old Tool</strong>, which appears discontinued / no longer
                      maintained / missing key compliance. If you're updating that section, here's a drop-in
                      replacement:
                    </p>
                    <p>
                      <strong>Replace:</strong> Old Tool → <strong>Your Product</strong>
                      <br />
                      <strong>Why:</strong> 2 concise reasons with evidence or links
                      <br />
                      <strong>Impact on readers:</strong> how it improves accuracy/UX/cost/safety
                    </p>
                    <p>
                      <strong>Paste-ready card</strong>
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Overview:</strong> 1 line
                      </li>
                      <li>
                        <strong>Key advantages vs Old Tool:</strong> bulleted A/B list
                      </li>
                      <li>
                        <strong>Migration notes:</strong> how long it takes, importer, support
                      </li>
                      <li>
                        <strong>Proof:</strong> case study, certification, 3rd-party test
                      </li>
                    </ul>
                    <p>Happy to provide quotes, screenshots, or reviewer access.</p>
                    <p>
                      Best,
                      <br />
                      Your Name
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 3: Data-Driven Pitch (lead with proof)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> You have credible stats, tests, or testimonials.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-purple-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi Name,</p>
                    <p>
                      If you're refreshing "[Guide Title]," you might want this evidence on{" "}
                      <strong>Your Product</strong>:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Outcome:</strong> metric improvement in use case
                      </li>
                      <li>
                        <strong>Method:</strong> testing protocol in one line
                      </li>
                      <li>
                        <strong>Sample:</strong> N, audience, timeframe
                      </li>
                      <li>
                        <strong>Independent:</strong> 3rd-party validation if any
                      </li>
                    </ul>
                    <p>Here's a quote you can use:</p>
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                      "11–18 word testimonial with a specific result" — Name, Role, Company
                    </blockquote>
                    <p>
                      <strong>Paste-ready card + table row</strong> attached. Let me know if you prefer raw CSV or
                      screenshots.
                    </p>
                    <p>Thanks for your work on Site Name—it's widely cited.</p>
                    <p>Your Name</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 4: Editor-Assist (do the formatting for them)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> The guide has strict structure or comparison tables.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-orange-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi Name,</p>
                    <p>I matched your format in "[Guide Title]" so it's paste-ready:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>H3:</strong> Your Product — Best for X
                      </li>
                      <li>
                        <strong>Summary (35–45 words):</strong> concise blurb
                      </li>
                      <li>
                        <strong>Pros:</strong> 3 bullets
                      </li>
                      <li>
                        <strong>Cons:</strong> 1 honest trade-off
                      </li>
                      <li>
                        <strong>Specs table row:</strong> CSV or markdown matching their headers
                      </li>
                      <li>
                        <strong>Pricing:</strong> transparent range + plan notes
                      </li>
                      <li>
                        <strong>Links:</strong> official, docs, security, changelog
                      </li>
                      <li>
                        <strong>Media:</strong> link to 1200×630, 800×800, SVG logo; all under 500 KB
                      </li>
                    </ul>
                    <p>If you'd like, I can draft a "What changed in Month Year" note for your update stamp.</p>
                    <p>
                      Best,
                      <br />
                      Your Name
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Template 5: Expert Quote / Co-Create (become a source)
                </h2>
                <p className="text-gray-600 mb-4">
                  <strong>When to use:</strong> Build relationships and earn recurring inclusion.
                </p>

                <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-teal-500 mb-4">
                  <h3 className="font-semibold mb-3">Email Template</h3>
                  <div className="font-mono text-sm space-y-3 text-gray-700">
                    <p>Hi Name,</p>
                    <p>
                      If you're adding context to "[Guide Title]," I can provide a neutral 60–80 word quote on topic—no
                      brand pitch, just clarity for readers. Example angles:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>When to choose Option A vs Option B</li>
                      <li>What actually matters in spec (and what's marketing fluff)</li>
                      <li>Budget vs pro picks—how to decide</li>
                    </ul>
                    <p>If useful, I can also share an anonymized dataset (N records) showing insight.</p>
                    <p>Either way, thank you for maintaining a high-quality guide.</p>
                    <p>Your Name</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Best practices (quick)</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Personalize with <strong>two specifics</strong> from their article.
                  </li>
                  <li>
                    Keep the ask simple: <strong>one action</strong> per email.
                  </li>
                  <li>
                    Offer a <strong>paste-ready card, table row, and assets</strong> every time.
                  </li>
                  <li>Be honest about trade-offs… editors keep trustworthy contributors around.</li>
                  <li>
                    Follow-ups: <strong>one short nudge per week, max 3 total</strong>, then let it rest for a quarter.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your "paste-ready" asset pack (link in every email)
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>1-line value prop + 45-word blurb</li>
                  <li>Pros/cons (3/1)</li>
                  <li>
                    Specs in the <strong>publisher's exact columns</strong>
                  </li>
                  <li>Price range + plan notes</li>
                  <li>Hi-res images (1200×630, 800×800), lightweight WebP + SVG logo</li>
                  <li>PDF one-pager with testing data, certifications, and changelog</li>
                  <li>1–2 short quotes with full attribution and permission</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tracking & goals</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Replies per 100 sends</strong> (aim: 15–30%)
                  </li>
                  <li>
                    <strong>Additions per 100 sends</strong> (aim: 5–10%)
                  </li>
                  <li>
                    <strong>Retention on refresh</strong> (stay in after updates)
                  </li>
                  <li>
                    <strong>AI citation lift</strong> on target queries (log monthly)
                  </li>
                </ul>
              </section>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Ready to scale this?</h3>
                <p className="text-gray-700">
                  Use <strong>GetListicled</strong> to discover, score, and prioritize live listicles… then plug these
                  templates into your outreach rhythm.
                </p>
                <Link to="/" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
