'use client'

import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { client } from './apollo-client'

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  )
}