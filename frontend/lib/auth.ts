import { type NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
   // GoogleProvider({
   //   clientId: process.env.GOOGLE_CLIENT_ID!,
   //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
   //  }),
   // FacebookProvider({
   //   clientId: process.env.FACEBOOK_CLIENT_ID!,
   //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
   // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "Otp", type: "otp" },
      },
      async authorize(credentials) {
        console.log(credentials, 'credentials')
        if (!credentials?.email || !credentials?.password) return null;

        try {
          let res;
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
                      businessDescription
                      businessName
                      city
                      dailySearchesUsed
                      email
                      firstName
                      id
                      isOnboarded
                      lastName
                      role
                      state
                      tier
                      website
                      yearOfFounding
                    }
                  }
                }
              `,
                variables: {
                  otpCode: credentials.otp,
                },
              }),
            });
          } else {
            console.log(`${process.env.GRAPHQL_URL}/graphql`)
            res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `
                mutation SignUpOrInWithPassword($email: String!, $password: String!) {
                  signUpOrInWithPassword(email: $email, password: $password) {
                    token
                    user {
                      businessDescription
                      businessName
                      city
                      dailySearchesUsed
                      email
                      firstName
                      id
                      isOnboarded
                      lastName
                      role
                      state
                      tier
                      website
                      yearOfFounding
                    }
                  }
                }
              `,
                variables: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }),
            });
          }

          const result = await res.json();

          if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            return null;
          }

          const loginData =
            result?.data?.signUpOrInWithPassword || result?.data?.signInWithOtp;
          if (loginData?.token && loginData?.user) {
            return {
              businessDescription: loginData.user.businessDescription,
              businessName: loginData.user.businessName,
              city: loginData.user.city,
              dailySearchesUsed: loginData.user.dailySearchesUsed,
              email: loginData.user.email,
              firstName: loginData.user.firstName,
              id: loginData.user.id,
              isOnboarded: loginData.user.isOnboarded,
              lastName: loginData.user.lastName,
              role: loginData.user.role,
              state: loginData.user.state,
              tier: loginData.user.tier,
              website: loginData.user.website,
              yearOfFounding: loginData.user.yearOfFounding,
              accessToken: loginData.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // OAuth SSO logic commented out since we're not using OAuth providers yet
      // if (account?.provider === "google" || account?.provider === "facebook") {
      //   try {
      //     const res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //         query: `
      //           mutation SsoLogin($provider: String!, $accessToken: String!) {
      //             ssoLogin(provider: $provider, accessToken: $accessToken) {
      //               token
      //               user {
      //                 businessDescription
      //                 businessName
      //                 city
      //                 createdAt
      //                 dailySearchesUsed
      //                 email
      //                 firstName
      //                 id
      //                 isOnboarded
      //                 lastName
      //                 role
      //                 state
      //                 tier
      //                 website
      //                 yearOfFounding
      //               }
      //             }
      //           }
      //         `,
      //         variables: {
      //           provider: account.provider,
      //           accessToken: account.access_token,
      //         },
      //       }),
      //     });
      //
      //     const result = await res.json();
      //     const ssoData = result?.data?.ssoLogin;
      //
      //     if (ssoData?.token && ssoData?.user) {
      //       token.accessToken= ssoData.token;
      //       token.id = ssoData.user.id;
      //       token.email = ssoData.user.email;
      //       token.firstName = ssoData.user.firstName;
      //       token.isOnboarded = ssoData.user.isOnboarded
      //       token.lastName = ssoData.user.lastName
      //       token.role = ssoData.user.role
      //       token.state = ssoData.user.state
      //       token.tier = ssoData.user.tier
      //     }
      //   } catch (error) {
      //     console.error("SSO login error:", error);
      //   }
      // } else 
      
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token?.accessToken;
      if (session.user) {
        (session.user as any).id = token?.id as string;
        session.user.email = token?.email;
        (session.user as any).firstName = token?.firstName;
        (session.user as any).tier = token?.tier
      }
      console.log("session data",session, token)
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt" as const,
  },
}
