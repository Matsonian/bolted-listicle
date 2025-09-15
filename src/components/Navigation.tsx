import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  tier: 'basic' | 'pro';
  subscription_status: string;
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navigation: Starting auth initialization');
    
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Navigation: Initial session check', { session: !!session, error });
        
        if (session?.user) {
          console.log('Navigation: User found, fetching profile');
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          console.log('Navigation: No user found');
          setUser(null);
          setUserProfile(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Navigation: Auth init error:', error);
        setLoading(false);
      } finally {
        console.log('Navigation: Auth init complete, setting loading false');
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Navigation: Auth state change', { event, session: !!session });
        
        if (session?.user) {
          console.log('Navigation: Setting user from auth change');
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          console.log('Navigation: Clearing user from auth change');
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => {
      console.log('Navigation: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Navigation: Fetching profile for user', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        console.log('Navigation: Profile fetched successfully', data);
        setUserProfile(data);
      } else {
        console.error('Navigation: Profile fetch error:', error);
      }
    } catch (error) {
      console.error('Navigation: Profile fetch exception:', error);
    }
  };

  const handleLogout = async () => {
    console.log('Navigation: Logout initiated');
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      console.log('Navigation: Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Navigation: Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isEmailConfirmed = user?.email_confirmed_at;

  console.log('Navigation: Render state', { 
    loading, 
    user: !!user, 
    userProfile: !!userProfile, 
    isEmailConfirmed 
  });

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
            {user && isEmailConfirmed && (
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
            {user && isEmailConfirmed && (
              <Link 
                to="/maker" 
                className={`font-medium transition-colors ${
                  location.pathname === '/maker' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Maker
              </Link>
            )}
            
            {/* Auth Section */}
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : user ? (
              isEmailConfirmed ? (
                <div className="flex items-center space-x-4">
                  {userProfile && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {userProfile.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        userProfile.tier === 'pro' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
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
                  <span className="text-sm text-yellow-600 font-medium">
                    Email Confirmation Required
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 transition-colors text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )
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
                  className="btn-primary"
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
              {user && isEmailConfirmed && (
                <Link 
                  to="/education" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Education
                </Link>
              )}
              {user && isEmailConfirmed && (
                <Link 
                  to="/maker" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Maker
                </Link>
              )}
              
              {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : user ? (
                isEmailConfirmed ? (
                  <>
                    {userProfile && (
                      <div className="flex items-center space-x-2 py-2">
                        <span className="text-sm text-gray-600">
                          {userProfile.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          userProfile.tier === 'pro' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
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
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700 font-medium transition-colors text-left flex items-center space-x-2"
                    >
                      <LogOut className="w-5 h-5 stroke-2" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-yellow-600 font-medium">
                      Email Confirmation Required
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700 font-medium transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </>
                )
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
                    className="btn-primary inline-block text-center"
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
  );
}

export default memo(Navigation);