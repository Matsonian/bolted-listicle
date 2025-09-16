import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import BlogPage from './pages/BlogPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import WelcomePage from './pages/WelcomePage'
import ProfilePage from './pages/ProfilePage'
import EducationPage from './pages/EducationPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/education" element={
              <ProtectedRoute>
                <EducationPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
