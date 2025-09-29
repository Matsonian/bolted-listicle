import React from 'react'
import { X, Users, TrendingUp } from 'lucide-react'
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  resultsCount: number
  searchQuery: string
}

export default function LoginModal({ isOpen, onClose, resultsCount, searchQuery }: LoginModalProps) {
  if (!isOpen) return null

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDontHaveAccount = () => {
    // Navigate to sales page with results count
    window.location.href = `/guest-results?q=${encodeURIComponent(searchQuery)}&count=${resultsCount}`
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Search Complete!
          </h2>
          <p className="text-gray-600">
            We found <span className="font-semibold text-blue-600">{resultsCount} high-quality listicles</span> for "{searchQuery}"
          </p>
        </div>

        {/* Value preview */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">What you'll get:</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Direct editor contact information</li>
            <li>• Authority scores and traffic rankings</li>
            <li>• Publication update frequency</li>
            <li>• AI-powered outreach strategies</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center block"
          >
            Sign In to View Results
          </Link>
          
          <button
            onClick={handleDontHaveAccount}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            I don't have an account
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Join 1,200+ marketers finding their next listicle opportunities
        </p>
      </div>
    </div>
  )
}
