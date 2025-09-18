// Add this to your AuthContext.tsx - replace the useEffect entirely:

useEffect(() => {
  console.log('AuthContext mounting...')
  
  let mounted = true
  let timeoutId: number // Changed from NodeJS.Timeout to number
  
  const initializeAuth = async () => {
    try {
      // Set a timeout to prevent infinite loading
      timeoutId = window.setTimeout(() => { // Added window. prefix
        if (mounted) {
          console.log('Auth initialization timeout - forcing loading to false')
          setLoading(false)
        }
      }, 5000) // 5 second timeout
      
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (!mounted) return
      
      // Clear timeout since we got a response
      window.clearTimeout(timeoutId) // Added window. prefix
      
      if (error) {
        console.error('Session check error:', error)
        setUser(null)
        setUserProfile(null)
      } else if (session?.user) {
        console.log('Found existing session for user:', session.user.email)
        setUser(session.user)
        await fetchUserProfile(session.user.id)
      } else {
        console.log('No existing session found')
        setUser(null)
        setUserProfile(null)
      }
    } catch (err) {
      console.error('Exception during auth initialization:', err)
      if (mounted) {
        setUser(null)
        setUserProfile(null)
      }
    } finally {
      if (mounted) {
        setLoading(false)
      }
    }
  }

  initializeAuth()

  // Listen for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (!mounted) return
      
      console.log('Auth state changed:', event, session?.user?.email)
      
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUserProfile(null)
      }
      
      // Ensure loading is false after any auth state change
      setLoading(false)
    }
  )

  return () => {
    mounted = false
    if (timeoutId) window.clearTimeout(timeoutId) // Added window. prefix
    subscription.unsubscribe()
  }
}, [])
