// FILE: app/education/tools/outreach-templates/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Linkedin, Facebook, Instagram, Globe, Building2, Copy, CheckCircle } from 'lucide-react'

export default function OutreachTemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const sections = [
    {
      id: 'email',
      title: 'Email Outreach Templates',
      icon: <Mail className="w-6 h-6" />,
      color: 'blue',
      templates: [
        {
          id: 'email-1',
          name: 'The Direct Ask with Value',
          subject: 'Suggestion for your [Topic] listicle',
          body: `Dear [Name],
I enjoyed your article "[Title]." I noticed you highlighted [Product A, Product B]. I think your readers might also benefit from knowing about [Your Product], which solves [specific problem]. I'd be glad to provide details or images if helpful.`,
          why: "It's polite, straightforward, and frames your product as an addition that benefits their audience. Writers appreciate suggestions that make their lists more useful."
        },
        {
          id: 'email-2',
          name: 'The Authority Anchor',
          subject: 'Resource for your [Topic] coverage',
          body: `Dear [Name],
Your listicle "[Title]" was excellent. As the founder of [Your Company], I thought you might find [Your Product] relevant for your readers. It has been featured in [publication/customer success/data point]. If you're open, I'd be glad to provide proof points or a free trial.`,
          why: "Credibility matters. By showing social proof or authority markers, you reassure the writer that including your product strengthens their article."
        },
        {
          id: 'email-3',
          name: 'The Data-Driven Pitch',
          subject: 'Additional data for "[Title]"',
          body: `Dear [Name],
Your list on [Topic] is valuable. One area that may interest your readers is [specific issue]. Our product [Your Product] has been shown to [statistic/proof]. I'd be glad to share more data or case studies for your consideration.`,
          why: "Writers love data. By providing stats, you give them material to update or expand their article while positioning your product as authoritative."
        },
        {
          id: 'email-4',
          name: 'The Reader-First Angle',
          subject: 'Useful addition for your readers',
          body: `Dear [Name],
I enjoyed your piece on [Topic]. Your readers might also appreciate knowing about [Your Product], which directly addresses [reader pain point]. I'd be glad to share a short blurb for your review.`,
          why: 'Instead of "help me," you focus on "help your readers." Writers want their articles to serve their audience — you make their job easier.'
        },
        {
          id: 'email-5',
          name: 'The Update Opportunity',
          subject: 'Update idea for "[Title]"',
          body: `Dear [Name],
I noticed your article "[Title]" was published in [month/year]. Since then, new tools like [Your Product] have entered the market. It may be worth updating your list to keep it current. I'd be glad to provide details if you'd like to review.`,
          why: "Many listicles go out of date. Suggesting an update gives the writer a reason to refresh their content — and include you in the process."
        }
      ]
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Outreach Templates',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'indigo',
      templates: [
        {
          id: 'linkedin-1',
          name: 'The Professional Compliment',
          body: `Hi [Name], I read your listicle on [Topic] — well done. I run [Your Product], which helps with [problem]. If you update your list in the future, I'd be honored if you considered including it.`,
          why: "LinkedIn is a professional setting, so this keeps it concise, respectful, and credible."
        },
        {
          id: 'linkedin-2',
          name: 'The Shared Expertise Angle',
          body: `Hello [Name], your article on [Topic] was excellent. I'm in the same field and recently built [Your Product]. If you're open, I'd be glad to share how it's been solving [problem]. Could be a fit for future content.`,
          why: "Writers like sources from practitioners. You're presenting yourself as a peer, not just a salesperson."
        },
        {
          id: 'linkedin-3',
          name: 'The Soft Touch Follow-Up',
          body: `[Name], I appreciated your "[Title]" article. I'd love to stay connected. If you're ever revisiting the list, I'd be glad to share details on [Your Product].`,
          why: "Some writers won't respond right away. This keeps the door open without pressure, ideal for long-term visibility."
        },
        {
          id: 'linkedin-4',
          name: 'The Specific Engagement',
          body: `Hi [Name], in your listicle "[Title]," I noticed you included [Competitor Product]. Our product [Your Product] solves the same problem with [unique feature]. If you're open, I'd love to send over a demo.`,
          why: "Positioning yourself alongside a competitor makes sense to a writer — listicles thrive on comparisons."
        },
        {
          id: 'linkedin-5',
          name: 'The Collaboration Invite',
          body: `Hello [Name], your work on [Topic] is excellent. If you're open, I'd love to collaborate on resources or provide fresh data on [Your Product] for your future pieces.`,
          why: "Writers often revisit the same niche multiple times. Offering collaboration makes you a resource they can call on again."
        }
      ]
    },
    {
      id: 'facebook',
      title: 'Facebook Outreach Templates',
      icon: <Facebook className="w-6 h-6" />,
      color: 'blue',
      templates: [
        {
          id: 'facebook-1',
          name: 'The Quick Page Message',
          body: `Hi [Name], I enjoyed your "[Title]" article. I run [Your Product], which directly supports [audience]. Would you consider adding it to your list?`,
          why: "Direct page messages feel personal and are often read by the author themselves."
        },
        {
          id: 'facebook-2',
          name: 'The Group Connection',
          body: `Hello [Name], I saw your listicle shared in [Facebook Group]. Excellent work. My company created [Your Product], which might be a useful addition. Could I send you details?`,
          why: "Referencing a group establishes common ground, making your pitch feel less like spam."
        },
        {
          id: 'facebook-3',
          name: 'The Public Thank-You + DM Follow-Up',
          body: `Comment: "Great listicle on [Topic], thanks for putting it together!"
DM: "By the way, I run [Your Product], which solves [problem]. If you ever update your article, I'd be glad if you considered including it."`,
          why: "Public comments show genuine appreciation, while the DM provides the direct ask. It builds rapport."
        },
        {
          id: 'facebook-4',
          name: 'The Shared Audience Angle',
          body: `Hi [Name], loved your article on [Topic]. My company also serves [same audience]. Our product [Your Product] has been getting strong feedback. Would you like to see details for possible inclusion?`,
          why: "Writers want to know that your product resonates with the same audience they serve."
        },
        {
          id: 'facebook-5',
          name: 'The Mutual Value Pitch',
          body: `Hello [Name], thank you for your article on [Topic]. I'd be glad to share your listicle with my audience if you're open to considering [Your Product] in future updates.`,
          why: "Offering promotion in exchange for inclusion shows mutual value — not just a one-way ask."
        }
      ]
    },
    {
      id: 'instagram',
      title: 'Instagram Outreach Templates',
      icon: <Instagram className="w-6 h-6" />,
      color: 'pink',
      templates: [
        {
          id: 'instagram-1',
          name: 'The Direct DM',
          body: `Your listicle on [Topic] was excellent. I run [Your Product], which addresses [problem]. If you update your list, I'd love for you to consider including it.`,
          why: "Instagram DMs are short, casual, and personal — this balances brevity with clarity."
        },
        {
          id: 'instagram-2',
          name: 'The Compliment + Follow',
          body: `Loved your "Top [X]" article. Following your work now — I'd be honored if you checked out [Your Product] for future lists.`,
          why: "The follow shows real interest. Writers are more receptive when they see you're supporting their work."
        },
        {
          id: 'instagram-3',
          name: 'The Story Reply',
          body: `[Reply to a Story promoting their article] "Great breakdown on [Topic]! By the way, our product [Your Product] directly addresses [pain point] — could be a useful fit for your next update."`,
          why: "Story replies feel conversational, not cold. It's a natural opening."
        },
        {
          id: 'instagram-4',
          name: 'The Public Comment + DM Combo',
          body: `Comment: "Excellent insights in your listicle, thank you."
DM: "We make [Your Product], which might be a fit for your audience if you revisit the list."`,
          why: "Like the Facebook combo, it builds visibility publicly, then makes the pitch privately."
        },
        {
          id: 'instagram-5',
          name: 'The Visual Hook',
          body: `Hi [Name], I enjoyed your article on [Topic]. Here's a quick visual of [Your Product] in action [attach photo/short clip]. Could be a great addition for your readers.`,
          why: "Instagram is visual. Providing media makes your pitch tangible and easier for them to envision including."
        }
      ]
    },
    {
      id: 'website',
      title: 'Website Contact Form Templates',
      icon: <Globe className="w-6 h-6" />,
      color: 'green',
      templates: [
        {
          id: 'website-1',
          name: 'The Polite Inquiry',
          body: `Hello, I recently read "[Title]." Thank you for the thoughtful work. Could you connect me with the author? I'd like to share details about [Your Product] for possible inclusion.`,
          why: "Editors monitor contact forms. A polite ask gets forwarded to the right person."
        },
        {
          id: 'website-2',
          name: 'The Formal Contact',
          body: `Dear Editor, I appreciated your recent listicle, "[Title]." My product [Your Product] could be a relevant addition for your readers. May I provide a summary for consideration?`,
          why: "Formal, professional, and clear — works especially well with larger publications."
        },
        {
          id: 'website-3',
          name: 'The Offer of Resources',
          body: `Hello, "[Title]" was excellent. I would be glad to provide additional verified sources, data, and media on [Your Product] to strengthen future updates.`,
          why: "You're offering more than just your product — you're positioning yourself as a resource."
        },
        {
          id: 'website-4',
          name: 'The Content Correction Angle',
          body: `Dear Team, I noticed one detail in "[Title]" that may benefit from clarification. Our product [Your Product] solves this issue directly. Could I provide updated details?`,
          why: "Writers value corrections. You earn credibility by offering accurate input."
        },
        {
          id: 'website-5',
          name: 'The Contribution Offer',
          body: `Greetings, I respect your publication's quality. Do you accept contributions from professionals? I'd be glad to share insights about [Your Product] and how it serves [audience].`,
          why: "Some sites accept guest content. This approach turns a product pitch into a professional contribution."
        }
      ]
    },
    {
      id: 'company',
      title: 'Company-Level Cold Emails',
      icon: <Building2 className="w-6 h-6" />,
      color: 'purple',
      templates: [
        {
          id: 'company-1',
          name: 'The Professional Introduction',
          body: `Dear Editorial Team, I've followed your publication for some time. Your recent "[Title]" listicle was excellent. May I introduce [Your Product], which serves [audience]? I'd love for you to consider it in updates or future pieces.`,
          why: "Editors look for future content ideas. A respectful intro seeds that relationship."
        },
        {
          id: 'company-2',
          name: 'The Strategic Offer',
          body: `Dear [Company], "[Title]" stood out on [Topic]. Our product [Your Product] is making an impact with [audience]. I'd be glad to provide case studies or media for your writers.`,
          why: "You're not just suggesting — you're providing assets that make their job easier."
        },
        {
          id: 'company-3',
          name: 'The Accuracy Anchor',
          body: `Dear [Company], I appreciated your listicle on [Topic]. One section may benefit from updated data. Our product [Your Product] has [verified figures]. Would you like me to share details?`,
          why: "Accuracy is crucial. By offering verified figures, you present yourself as a reliable resource."
        },
        {
          id: 'company-4',
          name: 'The Long-Term Resource Pitch',
          body: `Dear [Company], I admire your editorial work. If helpful, I'd be glad to serve as a resource on [topic], ensuring your future listicles stay current. Our product [Your Product] is part of that landscape.`,
          why: "Instead of asking once, you're offering an ongoing relationship — valuable to editors."
        },
        {
          id: 'company-5',
          name: 'The Professional Collaboration Pitch',
          body: `Dear [Company], your "[Title]" listicle was strong. If you seek partnerships with industry professionals to enhance authority and reach, I'd be glad to discuss how [Your Product] fits.`,
          why: "Positions you not as a petitioner, but as a potential partner. This reframes the relationship on equal footing."
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Education
        </Link>

        <div className="mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            30 Proven Templates for Contacting Listicle Writers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Copy-and-paste templates for reaching out to writers across email, LinkedIn, Facebook, Instagram, and more. 
            Each template includes an explanation of why it works.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <p className="text-gray-700 mb-4">
            AI rankings favor listicles. When you open ChatGPT and ask for product recommendations, most of the sources 
            it cites are "Top 10s" or "Best Of" articles. This means that getting your product included in a listicle is 
            one of the most powerful ways to influence not only human readers but also how AI perceives your authority.
          </p>
          <p className="text-gray-700 mb-4">
            But how do you get your product noticed by the people who write these influential articles?
          </p>
          <p className="text-gray-700">
            This guide provides 30 tested outreach templates across different platforms. Each template is paired with 
            an explanation of why it works so you can adapt the approach with confidence.
          </p>
        </div>

        {/* Templates by Platform */}
        {sections.map((section) => {
          const colors = getColorClasses(section.color)
          return (
            <div key={section.id} className="mb-12">
              <div className={`flex items-center space-x-3 mb-6 p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
                <div className={colors.text}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.templates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <button
                        onClick={() => handleCopy(template.subject ? `Subject: ${template.subject}\n\n${template.body}` : template.body, template.id)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {copiedId === template.id ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {template.subject && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">Subject: </span>
                        <span className="text-sm text-gray-600">{template.subject}</span>
                      </div>
                    )}

                    <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-sm text-gray-700 whitespace-pre-wrap">
                      {template.body}
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">Why it works:</span> {template.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Final Thoughts */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
          <p className="mb-4">
            Every template here is more than a message — it's a strategy. When you approach listicle writers respectfully, 
            with credibility and value, you increase the odds of inclusion. And once your product is in the list, you gain 
            not just human readers, but a lasting footprint in the AI indexing ecosystem.
          </p>
          <p>
            Done consistently, this outreach becomes one of the most effective ways to build your brand's AI authority.
          </p>
        </div>
      </div>
    </div>
  )
}