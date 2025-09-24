import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloProvider } from '../lib/apollo-provider'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Get Listicled',
  description: 'Find the best listicles in your niche',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  )
}