'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSignUpOrInWithPasswordMutation, useSendOtpMutation, useSignInWithOtpMutation } from '../../generated/graphql'
import { BookOpen, Mail, Lock, Loader2, AlertCircle, Shield, Clock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const [otpData, setOtpData] = useState({
    email: "",
    otpCode: "",
  })
  const [activeTab, setActiveTab] = useState<'signin' | 'otp' | 'signup'>('signin')

  const [signUpOrInWithPasswordMutation] = useSignUpOrInWithPasswordMutation()
  const [sendOtpMutation] = useSendOtpMutation()
  const [signInWithOtpMutation] = useSignInWithOtpMutation()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { data, errors } = await signUpOrInWithPasswordMutation({
        variables: { email: signUpData.email, password: signUpData.password }
      })

      if (errors || !data?.signUpOrInWithPassword?.token) {
        setError("Account creation failed. Please try again.")
      } else {
        // Store token and navigate
        localStorage.setItem('authToken', data.signUpOrInWithPassword.token)
        router.push("/welcome")
      }
    } catch (error: any) {
      setError(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, errors } = await signUpOrInWithPasswordMutation({
        variables: { email: signInData.email, password: signInData.password }
      })

      if (errors || !data?.signUpOrInWithPassword?.token) {
        setError("Invalid email or password")
      } else {
        localStorage.setItem('authToken', data.signUpOrInWithPassword.token)
        router.push("/welcome")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, errors } = await sendOtpMutation({
        variables: { email: otpData.email }
      })

      if (errors || !data?.sendOtp) {
        setError("Failed to send OTP")
      } else {
        setOtpSent(true)
        setOtpEmail(otpData.email)
        setCountdown(60)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { data, errors } = await signInWithOtpMutation({
        variables: { otpCode: otpData.otpCode }
      })

      if (errors || !data?.signInWithOtp?.token) {
        setError("Sign-in failed after OTP verification, try logging in with a different method.")
      } else {
        localStorage.setItem('authToken', data.signInWithOtp.token)
        router.push("/welcome")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    setError("")

    try {
      const { data, errors } = await sendOtpMutation({
        variables: { email: otpEmail }
      })

      if (errors || !data?.sendOtp) {
        setError("Failed to resend OTP")
      } else {
        setCountdown(60)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <img
            src="/GetListicledLogo-BlueGreen.png"
            alt="Get Listicled"
            className="h-12 w-auto"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Tabs */}
            <div className="space-y-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${activeTab === 'signin' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${activeTab === 'otp' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('otp')}
                >
                  OTP
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${activeTab === 'signup' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Social Sign In Buttons - Disabled for now */}
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
                  style={{ borderColor: "#2563eb" }}
                  disabled
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google (Coming Soon)
                </button>

                <button
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
                  style={{ borderColor: "#2563eb" }}
                  disabled
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook (Coming Soon)
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2" style={{ color: "#4A4A4A" }}>
                    Or continue with email
                  </span>
                </div>
              </div>

              {activeTab === 'signin' && (
                /* Sign In Form */
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signin-email" style={{ color: "#2E2E2E" }}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@church.com"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signin-password" style={{ color: "#2E2E2E" }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              )}

              {activeTab === 'otp' && (
                /* OTP Form */
                !otpEmail ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="otp-email" style={{ color: "#2E2E2E" }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <input
                          id="otp-email"
                          type="email"
                          placeholder="your.email@church.com"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={otpData.email}
                          onChange={(e) => setOtpData({ ...otpData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      style={{ backgroundColor: "#285943" }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Send OTP
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="text-center space-y-2">
                      <Shield className="h-12 w-12 mx-auto" style={{ color: "#285943" }} />
                      <h3 className="text-lg font-medium" style={{ color: "#2E2E2E" }}>
                        Enter OTP Code
                      </h3>
                      <p className="text-sm" style={{ color: "#4A4A4A" }}>
                        We've sent a 6-digit code to <span className="font-medium">{otpEmail}</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="otp-code" style={{ color: "#2E2E2E" }}>
                        OTP Code
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <input
                          id="otp-code"
                          type="text"
                          placeholder="Enter 6-digit code"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-widest"
                          maxLength={6}
                          value={otpData.otpCode}
                          onChange={(e) => setOtpData({ ...otpData, otpCode: e.target.value.replace(/\D/g, "") })}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      style={{ backgroundColor: "#285943" }}
                      disabled={isLoading || otpData.otpCode.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </button>

                    <div className="text-center space-y-2">
                      <button
                        type="button"
                        className="text-sm text-gray-500 hover:text-gray-700"
                        onClick={handleResendOtp}
                        disabled={countdown > 0 || isLoading}
                      >
                        {countdown > 0 ? (
                          <>
                            <Clock className="mr-1 h-3 w-3 inline" />
                            Resend in {countdown}s
                          </>
                        ) : (
                          "Resend OTP"
                        )}
                      </button>

                      <button
                        type="button"
                        className="text-sm text-gray-500 hover:text-gray-700 ml-4"
                        onClick={() => {
                          setOtpEmail("")
                          setOtpData({ email: "", otpCode: "" })
                          setCountdown(0)
                        }}
                      >
                        Change Email
                      </button>
                    </div>
                  </form>
                )
              )}

              {activeTab === 'signup' && (
                /* Sign Up Form */
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-email" style={{ color: "#2E2E2E" }}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@church.com"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-password" style={{ color: "#2E2E2E" }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <input
                          id="signup-password"
                          type="password"
                          placeholder="Password"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-confirm" style={{ color: "#2E2E2E" }}>
                        Confirm
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 text-center text-sm">
              <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
                ← Back to home
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}