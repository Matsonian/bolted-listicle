import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "Otp", type: "otp" },
      },
      async authorize(credentials) {
        console.log('=== AUTHORIZE CALLED ===', credentials)
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
                    userId
                  }
                }
              `,
                variables: {
                  otpCode: credentials.otp,
                },
              }),
            });
          } else {
            console.log('=== CALLING GRAPHQL ===', `${process.env.GRAPHQL_URL}/graphql`)
            console.log('=== GRAPHQL_URL VALUE ===', process.env.GRAPHQL_URL) // ADD THIS LINE
            res = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `
                mutation SignUpOrInWithPassword($email: String!, $password: String!) {
                  signUpOrInWithPassword(email: $email, password: $password) {
                    token
                    userId
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
          console.log('=== GRAPHQL RESPONSE ===', result);

          // Check for auth data even if errors exist (Manus's fix)
          const loginData =
            result?.data?.signUpOrInWithPassword || result?.data?.signInWithOtp;
          
          if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            // Still check if we have valid auth data despite errors
            if (loginData?.token && loginData?.userId) {
              console.log('=== USER AUTHENTICATED DESPITE ERRORS ===');
              const returnValue = {
                id: loginData.userId,
                email: credentials.email,
                accessToken: loginData.token,
              };
              return returnValue;
            }
            return null;
          }

          console.log('=== LOGIN DATA ===', loginData);

          if (loginData?.token && loginData?.userId) {
            const returnValue = {
              id: loginData.userId,
              email: credentials.email,
              accessToken: loginData.token,
            };
            console.log('=== RETURNING USER ===', returnValue);
            return returnValue;
          }

          console.log('=== NO TOKEN OR USERID ===');
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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
      }
      console.log("=== SESSION DATA ===", session, token);
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
