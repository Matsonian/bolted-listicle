import { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    // ... all your providers code (copy from route.ts)
  ],
  callbacks: {
    // ... all your callbacks (copy from route.ts)
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt" as const,
  },
}
