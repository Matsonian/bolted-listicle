import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "Otp", type: "otp" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          let res
          if (credentials.otp) {
            res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `
                mutation SignInWithOtp($otpCode: String!) {
                  signInWithOtp(otpCode: $otpCode) {
                    token
                    user {
                      firstName
                      lastName
                      id
                    }
                  }
                }

              `,
                variables: {
                  otpCode: credentials.otp,
                },
              }),
            })
          } else {
            res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `
                mutation SignUpOrInWithPassword($email: String!, $password: String!) {
                  signUpOrInWithPassword(email: $email, password: $password) {
                    token
                    user {
                      email
                      firstName
                      id
                      lastName
                    }
                  }
                }
              `,
                variables: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }),
            })
          }

          const result = await res.json()

          if (result.errors) {
            console.error("GraphQL errors:", result.errors)
            return null
          }

          const loginData = result?.data?.signUpOrInWithPassword || result?.data?.signInWithOtp
          if (loginData?.token && loginData?.user) {
            return {
              id: loginData.user.id,
              email: loginData.user.email,
              firstName: loginData.user.firstName,
              lastName: loginData.user.lastName,
              accessToken: loginData.token,
            }
          }

          return null
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                mutation SsoLogin($accessToken: String!, $provider: String!) {
                  ssoLogin(accessToken: $accessToken, provider: $provider) {
                    token
                    user {
                      email
                      id
                      lastName
                    }
                  }
                }
              `,
              variables: {
                provider: account.provider,
                accessToken: account.access_token,
              },
            }),
          })

          const result = await res.json()
          const ssoData = result?.data?.ssoLogin

          if (ssoData?.token && ssoData?.user) {
            token.accessToken = ssoData.token
            token.id = ssoData.user.id
          }
        } catch (error) {
          console.error("SSO login error:", error)
        }
      } else if (user) {
        // For credentials login
        token.accessToken = (user as any).accessToken
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      ;(session as any).accessToken = token.accessToken
      if (session.user) {
        ;(session.user as any).id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt" as const,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
