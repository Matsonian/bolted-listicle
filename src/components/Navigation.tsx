import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading, logout } = useAuth()

  console.log('Navigation rendering - user:', user, 'loading:', loading)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/search" className="font-medium text-gray-700 hover:text-blue-600">Search</Link>
            <Link to="/blog" className="font-medium text-gray-700 hover:text-blue-600">Blog</Link>
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Logged In</span>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                  <LogOut className="w-6 h-6 stroke-2" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
