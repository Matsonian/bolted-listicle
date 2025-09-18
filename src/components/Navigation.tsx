import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

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

          {/* Desktop Navigation - HARDCODED FOR TESTING */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/search" className="font-medium text-gray-700 hover:text-blue-600">Search</Link>
            <Link to="/blog" className="font-medium text-gray-700 hover:text-blue-600">Blog</Link>
            <Link to="/education" className="font-medium text-gray-700 hover:text-blue-600">Education</Link>
            
            {/* Hardcoded user display */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">test@example.com</span>
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">BASIC</span>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                <User className="w-6 h-6 stroke-2" />
              </Link>
              <button className="text-red-600 hover:text-red-700">
                <LogOut className="w-6 h-6 stroke-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
