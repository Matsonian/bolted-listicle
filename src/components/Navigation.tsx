import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, userProfile, loading, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/GetListicledLogo-BlueGreen.png" 
                alt="Get Listicled" 
                className="h-10 w-auto max-w-none"
              />
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/GetListicledLogo-BlueGreen.png" 
              alt="Get Listicled" 
              className="h-10 w-auto max-w-none"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`font-medium transition-colors ${
                location.pathname === '/search' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Search
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium transition-colors ${
                location.pathname.startsWith('/blog') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Blog
            </Link>
            {user && (
              <Link 
                to="/education" 
                className={`font-medium transition-colors ${
                  location.pathname === '/education' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Education
              </Link>
            )}
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                {userProfile && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {userProfile.first_name}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                      {userProfile.tier.toUpperCase()}
                    </span>
                  </div>
                )}
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                  title="My Account"
                >
                  <User className="w-6 h-6 stroke-2" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6 stroke-2" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              {user && (
                <Link 
                  to="/education" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Education
                </Link>
              )}
              
              {user ? (
                <>
                  {userProfile && (
                    <div className="flex items-center space-x-2 py-2">
                      <span className="text-sm text-gray-600">
                        {userProfile.first_name}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                        {userProfile.tier.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5 stroke-2" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="text-red-600 hover:text-red-700 font-medium transition-colors text-left flex items-center space-x-2"
                  >
                    <LogOut className="w-5 h-5 stroke-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
