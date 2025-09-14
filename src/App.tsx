import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EducationPage from './pages/EducationPage';
import MakerPage from './pages/MakerPage';
import YouNeedListiclesPage from './pages/YouNeedListiclesPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import WelcomePage from './pages/WelcomePage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/maker" element={<MakerPage />} />
            <Route path="/you-need-listicles" element={<YouNeedListiclesPage />} />
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/listicle-detail/:url" element={<ListicleDetailPage />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
