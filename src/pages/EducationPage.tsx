import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Video, FileText, Award, Lock, Play, Download } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'video' | 'article' | 'interactive';
  thumbnail: string;
  completed?: boolean;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Mastering Listicle Research',
    description: 'Learn advanced techniques for finding high-quality listicles across any niche',
    duration: '45 min',
    level: 'Beginner',
    type: 'video',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'Content Curation Strategies',
    description: 'Build authority and engage your audience through strategic content curation',
    duration: '30 min',
    level: 'Intermediate',
    type: 'article',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'Advanced Search Techniques',
    description: 'Unlock hidden gems with advanced search operators and filtering methods',
    duration: '60 min',
    level: 'Advanced',
    type: 'interactive',
    thumbnail: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    title: 'Building Your Content Library',
    description: 'Organize and manage your discovered content for maximum efficiency',
    duration: '25 min',
    level: 'Beginner',
    type: 'video',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '5',
    title: 'Niche Authority Development',
    description: 'Establish yourself as a trusted voice in your specific industry or topic',
    duration: '40 min',
    level: 'Intermediate',
    type: 'article',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '6',
    title: 'Analytics and Performance Tracking',
    description: 'Measure the impact of your content curation and research efforts',
    duration: '35 min',
    level: 'Advanced',
    type: 'interactive',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function EducationPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Education Center</h1>
          <p className="text-gray-600 mb-6">
            Access exclusive educational content and courses to master listicle research and content curation.
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'interactive':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    const typeMatch = selectedType === 'All' || course.type === selectedType;
    return levelMatch && typeMatch;
  });

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Education Center</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of listicle research and content curation with our comprehensive courses and resources
          </p>
        </div>

        {/* Welcome Message */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Welcome back, {user.name}!</h2>
              <p className="text-gray-600">Continue your learning journey with our exclusive educational content.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="All">All Types</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card overflow-hidden group hover:shadow-lg transition-all duration-200">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  {getTypeIcon(course.type)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{course.duration}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Start Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Research Templates</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download our proven templates for organizing and tracking your listicle research.
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Download Templates →
                </button>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Industry Reports</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Access exclusive reports on content trends and listicle performance across industries.
                </p>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View Reports →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}