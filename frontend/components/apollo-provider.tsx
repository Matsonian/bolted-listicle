"use client"

import type React from "react"

import { ApolloProvider } from "@apollo/client/react"
import { useApollo } from "@/lib/apollo-client"

interface ApolloProviderWrapperProps {
  children: React.ReactNode
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  const client = useApollo(null)
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
