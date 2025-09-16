import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { loading, user } = useAuth()
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <img src="/GetListicledLogo-BlueGreen.png" alt="Get Listicled" className="h-10 w-auto" />
          </Link>
          <div>Loading: {loading ? 'true' : 'false'} | User: {user ? 'logged in' : 'not logged in'}</div>
        </div>
      </div>
    </nav>
  )
}
