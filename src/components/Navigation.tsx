import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()

  console.log('Navigation rendering - user:', user?.email || 'null', 'loading:', loading)

  const handleLogout = async () => {
    try {
      console.log('Navigation: Starting logout...')
      await logout()
      console.log('Navigation: Logout completed, navigating to home')
      navigate('/')
    } catch (error) {
      console.error('Navigation: Error during logout:', error)
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
            <div className="text-sm text-gray-500">Loading...</div>
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
            
            {/* Show Education when user is logged in */}
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
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user.email}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                    BASIC
                  </span>
                </div>
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
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link 
                to="/search" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Search
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Blog
              </Link>
              
              {user && (
                <Link 
                  to="/education" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Education
                </Link>
              )}
              
              {user ? (
                <>
                  <div className="text-sm text-gray-600 py-2 border-t border-gray-100">
                    Logged in as: {user.email}
                  </div>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="text-red-600 hover:text-red-700 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center"
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
