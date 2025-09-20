import React from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function WelcomePage() {
  const { userProfile } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to GetListicled, {userProfile?.first_name}!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your account is confirmed and ready to go. You now have access to our powerful listicle discovery system that will help grow your business visibility.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What you can do now:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Search className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Start Searching</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Search for listicles in your industry and discover where your competitors are getting featured. You have <strong>1 search per day</strong> with up to <strong>20 results</strong> each.
              </p>
              <Link 
                to="/search" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block"
              >
                Start Your First Search
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Learn the Process</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Visit our Education section to learn proven strategies for getting featured in high-authority listicles and growing your business visibility.
              </p>
              <Link 
                to="/education" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block"
              >
                Access Education
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your {userProfile?.tier === 'basic' ? 'Basic' : 'Pro'} Account Includes:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Daily Searches</h3>
              <p className="text-gray-600">1 search per day</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">20</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Results Per Search</h3>
              <p className="text-gray-600">Up to 20 results each search</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Education Access</h3>
              <p className="text-gray-600">Exclusive learning content</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help getting started? Check out our{' '}
            <Link to="/education" className="text-blue-600 hover:text-blue-500 font-medium">
              step-by-step guides
            </Link>{' '}
            or start exploring with your first search.
          </p>
        </div>
      </div>
    </div>
  )
}
