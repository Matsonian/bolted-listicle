import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/search" className="font-medium text-gray-700 hover:text-blue-600">Search</Link>
            <Link to="/blog" className="font-medium text-gray-700 hover:text-blue-600">Blog</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/search" onClick={() => setIsOpen(false)}>Search</Link>
              <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
