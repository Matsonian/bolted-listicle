import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from '@/lib/auth'
import { AuthProvider } from "../components/auth-provider";
import { ApolloProviderWrapper } from "../components/apollo-provider";
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Get Listicled - Your Path to being Indexed By AI',
  description: 'Find the best listicles in your niche and learn how to make your product popular with ChatGPT, Gemini, Claude and Perplexity.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = (await getServerSession(authOptions)) as Session | null;
  
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if(window.location && window.location.search && window.location.search.indexOf('capture-sitebehaviour-heatmap') !== -1) {
                    sessionStorage.setItem('capture-sitebehaviour-heatmap', '_');
                  }
                  var sbSiteSecret = 'a1f9c791-4145-4a6f-9c63-7c19f2b466f0';
                  window.sitebehaviourTrackingSecret = sbSiteSecret;
                  var scriptElement = document.createElement('script');
                  scriptElement.defer = true;
                  scriptElement.id = 'site-behaviour-script-v2';
                  scriptElement.src = 'https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=' + sbSiteSecret;
                  document.head.appendChild(scriptElement); 
                }
                catch (e) {console.error(e)}
              })()
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider session={session}>  
          <ApolloProviderWrapper> 
            <div className="min-h-screen bg-white flex flex-col">
              <Navigation />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ApolloProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
