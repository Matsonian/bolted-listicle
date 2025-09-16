import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  console.log('Navigation rendering...')
  
  try {
    const { useAuth } = require('../contexts/AuthContext')
    console.log('AuthContext imported successfully')
    
    const authData = useAuth()
    console.log('useAuth() called successfully:', authData)
    
    return (
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <img src="/GetListicledLogo-BlueGreen.png" alt="Get Listicled" className="h-10 w-auto" />
            </Link>
            <div>Auth working!</div>
          </div>
        </div>
      </nav>
    )
  } catch (error) {
    console.error('Navigation error:', error)
    return (
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <img src="/GetListicledLogo-BlueGreen.png" alt="Get Listicled" className="h-10 w-auto" />
            </Link>
            <div>Error in auth - check console</div>
          </div>
        </div>
      </nav>
    )
  }
}
