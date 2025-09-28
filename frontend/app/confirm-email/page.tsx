// FILE: app/confirm-email/page.tsx - Email Confirmation Page
'use client'

import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function ConfirmEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-3">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Check your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a confirmation link to your email address
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Please click the confirmation link in your email to activate your account and start searching for listicle opportunities.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Didn't receive the email?</strong> Check your spam folder or wait a few minutes and try again.
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Once confirmed, you'll be redirected to your welcome page where you can start your first search.
            </p>

            <Link 
              href="/login" 
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
