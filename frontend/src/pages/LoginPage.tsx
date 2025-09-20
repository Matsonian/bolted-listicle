"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Mail, Lock, Loader2, AlertCircle, Shield, Clock } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")
  const [countdown, setCountdown] = useState(0)

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    profession: "",
    company: "",
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

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true)
    setError("")
    try {
      const signInResponse = await signIn(provider, {
        callbackUrl: "/onboarding",
      })
      if (signInResponse?.error) {
        console.error("Sign-in error:", signInResponse.error)
        setError("Sign-in failed. Please try again.")
        setIsLoading(false)
        return
      }
    } catch (error) {
      console.error("Error in handleSocialSignIn:", error)
      setError("An unexpected error occurred during sign-in.")
      setIsLoading(false)
    }
  }

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
      const result = await signIn("credentials", {
        email: signUpData.email,
        password: signUpData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Account created but sign-in failed. Please try signing in manually.")
      } else if (result?.ok) {
        router.push("/onboarding")
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
      const result = await signIn("credentials", {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else if (result?.ok) {
        router.push("/onboarding")
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
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          email: otpData.email,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOtpSent(true)
        setOtpEmail(otpData.email)
        setCountdown(60)

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(result.error || "Failed to send OTP")
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
      // Create a custom sign-in with the token
      const signInResult = await signIn("credentials", {
        email: otpData.email,
        password: "otp-signin", // Special flag for OTP signin
        otp: otpData.otpCode,
        callbackUrl: "/onboarding",
      })
      console.log("signInResult", JSON.stringify(signInResult))
      if (signInResult?.ok) {
        router.push("/onboarding")
      } else {
        setError("Sign-in failed after OTP verification, try logging in with a different method.")
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
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          email: otpEmail,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCountdown(60)

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(result.error || "Failed to resend OTP")
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F5F1E6" }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8" style={{ color: "#C9A646" }} />
            <span className="text-2xl font-light" style={{ color: "#2E2E2E" }}>
              livethrough.faith
            </span>
          </Link>
          <h1 className="text-2xl font-light mb-2" style={{ color: "#2E2E2E" }}>
            Welcome to your ministry journey
          </h1>
          <p style={{ color: "#4A4A4A" }}>Sign in to continue creating inspiring sermons</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-medium text-center" style={{ color: "#2E2E2E" }}>
              Get Started
            </CardTitle>
            <CardDescription className="text-center" style={{ color: "#4A4A4A" }}>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3" style={{ backgroundColor: "#F5F1E6" }}>
                <TabsTrigger value="signin" className="data-[state=active]:bg-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="otp" className="data-[state=active]:bg-white">
                  OTP
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert style={{ borderColor: "#7A2E2E", backgroundColor: "#7A2E2E20" }}>
                  <AlertCircle className="h-4 w-4" style={{ color: "#7A2E2E" }} />
                  <AlertDescription style={{ color: "#7A2E2E" }}>{error}</AlertDescription>
                </Alert>
              )}

              {/* Social Sign In Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50"
                  style={{ borderColor: "#C9A646" }}
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
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
                  Continue with Google
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50"
                  style={{ borderColor: "#C9A646" }}
                  onClick={() => handleSocialSignIn("facebook")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2" style={{ color: "#4A4A4A" }}>
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" style={{ color: "#2E2E2E" }}>
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@church.com"
                        className="pl-10"
                        value={signInData.email}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" style={{ color: "#2E2E2E" }}>
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={signInData.password}
                        onChange={(e) =>
                          setSignInData({
                            ...signInData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: "#C9A646" }}
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
                  </Button>
                </form>
              </TabsContent>

              {/* OTP Tab */}
              <TabsContent value="otp" className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp-email" style={{ color: "#2E2E2E" }}>
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <Input
                          id="otp-email"
                          type="email"
                          placeholder="your.email@church.com"
                          className="pl-10"
                          value={otpData.email}
                          onChange={(e) =>
                            setOtpData({
                              ...otpData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-white hover:opacity-90"
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
                    </Button>
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
                      <Label htmlFor="otp-code" style={{ color: "#2E2E2E" }}>
                        OTP Code
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <Input
                          id="otp-code"
                          type="text"
                          placeholder="Enter 6-digit code"
                          className="pl-10 text-center text-lg tracking-widest"
                          maxLength={6}
                          value={otpData.otpCode}
                          onChange={(e) =>
                            setOtpData({
                              ...otpData,
                              otpCode: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white hover:opacity-90"
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
                    </Button>

                    <div className="text-center space-y-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleResendOtp}
                        disabled={countdown > 0 || isLoading}
                        style={{ color: "#4A4A4A" }}
                        className="hover:text-slate-800"
                      >
                        {countdown > 0 ? (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Resend in {countdown}s
                          </>
                        ) : (
                          "Resend OTP"
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOtpSent(false)
                          setOtpData({ email: "", otpCode: "" })
                          setCountdown(0)
                        }}
                        style={{ color: "#4A4A4A" }}
                        className="hover:text-slate-800 ml-4"
                      >
                        Change Email
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" style={{ color: "#2E2E2E" }}>
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@church.com"
                        className="pl-10"
                        value={signUpData.email}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" style={{ color: "#2E2E2E" }}>
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={signUpData.password}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" style={{ color: "#2E2E2E" }}>
                        Confirm
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: "#4A4A4A" }} />
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm"
                          className="pl-10"
                          value={signUpData.confirmPassword}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: "#C9A646" }}
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
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm" style={{ color: "#4A4A4A" }}>
              <Link href="/" className="hover:opacity-70 transition-opacity">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs" style={{ color: "#6B6B6B" }}>
          By continuing, you agree to our terms of service and privacy policy.
        </div>
      </div>
    </div>
  )
}
