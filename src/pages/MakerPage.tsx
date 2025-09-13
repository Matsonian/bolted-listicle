import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lightbulb, PenTool, Zap, Target, Lock, Sparkles, FileText, Brain } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  status: 'available' | 'coming-soon';
}

const tools: Tool[] = [
  {
    id: 'idea-generator',
    title: 'Title Idea Generator',
    description: 'Generate compelling listicle titles and headlines that drive engagement',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    status: 'available'
  },
  {
    id: 'listicle-writer',
    title: 'Listicle Writer',
    description: 'AI-powered tool to help you write comprehensive, well-structured listicles',
    icon: <PenTool className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    status: 'available'
  },
  {
    id: 'prompt-generator',
    title: 'AI Prompt Generator',
    description: 'Create effective prompts for AI tools to generate listicle content',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    status: 'available'
  },
  {
    id: 'topic-research',
    title: 'Topic Research Assistant',
    description: 'Research trending topics and find content gaps in your niche',
    icon: <Target className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    status: 'coming-soon'
  },
  {
    id: 'seo-optimizer',
    title: 'SEO Optimizer',
    description: 'Optimize your listicles for search engines and better discoverability',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    status: 'coming-soon'
  },
  {
    id: 'content-planner',
    title: 'Content Planner',
    description: 'Plan and schedule your listicle content strategy',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    status: 'coming-soon'
  }
];

export default function MakerPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="card p-8 text-center max-w-md w-full">
          <Lock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Maker Tools</h1>
          <p className="text-gray-600 mb-6">
            Access exclusive tools to create amazing listicles and build your content empire.
          </p>
          <div className="space-y-3">
            <Link to="/login" className="btn-primary w-full">
              Login to Access
            </Link>
            <Link to="/signup" className="btn-secondary w-full">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleToolClick = (toolId: string, status: string) => {
    if (status === 'available') {
      setSelectedTool(toolId);
    }
  };

  const renderToolInterface = () => {
    if (!selectedTool) return null;

    const tool = tools.find(t => t.id === selectedTool);
    if (!tool) return null;

    return (
      <div className="card p-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`${tool.bgColor} ${tool.color} p-3 rounded-lg`}>
              {tool.icon}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">{tool.title}</h2>
          </div>
          <button
            onClick={() => setSelectedTool(null)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {selectedTool === 'idea-generator' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your niche or topic?
              </label>
              <input
                type="text"
                placeholder="e.g., kitchen gadgets, productivity tools, travel gear"
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target audience
              </label>
              <select className="input-field w-full">
                <option>General audience</option>
                <option>Beginners</option>
                <option>Professionals</option>
                <option>Enthusiasts</option>
              </select>
            </div>
            <button className="btn-primary">
              Generate Title Ideas
            </button>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">Generated ideas will appear here...</p>
            </div>
          </div>
        )}

        {selectedTool === 'listicle-writer' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listicle Title
              </label>
              <input
                type="text"
                placeholder="e.g., 10 Best Kitchen Gadgets for Home Cooks"
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Items
              </label>
              <select className="input-field w-full">
                <option>5 items</option>
                <option>7 items</option>
                <option>10 items</option>
                <option>15 items</option>
                <option>20 items</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Writing Style
              </label>
              <select className="input-field w-full">
                <option>Professional</option>
                <option>Casual & Friendly</option>
                <option>Expert & Technical</option>
                <option>Conversational</option>
              </select>
            </div>
            <button className="btn-primary">
              Generate Listicle Draft
            </button>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">Your listicle draft will appear here...</p>
            </div>
          </div>
        )}

        {selectedTool === 'prompt-generator' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select className="input-field w-full">
                <option>Product Reviews</option>
                <option>How-to Guides</option>
                <option>Best Of Lists</option>
                <option>Comparison Articles</option>
                <option>Tips & Tricks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic/Niche
              </label>
              <input
                type="text"
                placeholder="e.g., fitness equipment, software tools, travel destinations"
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target AI Platform
              </label>
              <select className="input-field w-full">
                <option>ChatGPT</option>
                <option>Claude</option>
                <option>Gemini</option>
                <option>Generic</option>
              </select>
            </div>
            <button className="btn-primary">
              Generate AI Prompts
            </button>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">Optimized prompts will appear here...</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Maker Studio</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create compelling listicles with our suite of AI-powered tools designed for content creators
          </p>
        </div>

        {/* Welcome Message */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Welcome to Maker Studio, {user.name}!</h2>
              <p className="text-gray-600">Transform your ideas into engaging listicles with our powerful creation tools.</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.id, tool.status)}
              className={`card p-6 transition-all duration-200 ${
                tool.status === 'available' 
                  ? 'cursor-pointer hover:shadow-lg hover:scale-105' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${tool.bgColor} ${tool.color} p-3 rounded-lg`}>
                  {tool.icon}
                </div>
                {tool.status === 'coming-soon' && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              {tool.status === 'available' && (
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Launch Tool →
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Tool Interface */}
        {renderToolInterface()}

        {/* Tips Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Great Listicles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Start with Research</h3>
                  <p className="text-gray-600 text-sm">Use our search tools to find gaps in existing content</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Focus on Value</h3>
                  <p className="text-gray-600 text-sm">Each item should provide genuine value to your readers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Use Compelling Headlines</h3>
                  <p className="text-gray-600 text-sm">Numbers and power words increase click-through rates</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Include Visuals</h3>
                  <p className="text-gray-600 text-sm">Images and graphics make content more engaging</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Optimize for SEO</h3>
                  <p className="text-gray-600 text-sm">Use relevant keywords and meta descriptions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Test and Iterate</h3>
                  <p className="text-gray-600 text-sm">Analyze performance and improve your content strategy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}