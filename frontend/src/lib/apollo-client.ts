import { useMemo } from "react"
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  from,
  HttpLink,
} from "@apollo/client"
import { onError, ErrorResponse } from "@apollo/client/link/error"
import { setContext } from '@apollo/client/link/context'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

// --- Links ---

// All GraphQL requests go to the backend
const uri = "https://listicle-api.onrender.com/graphql"

const httpLink = new HttpLink({
  uri,
})

// Auth link to add authorization headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken')

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

// Error link for handling GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
      
      // Handle authentication errors
      if (message.includes('Unauthorized') || message.includes('Authentication')) {
        // Clear invalid token
        localStorage.removeItem('authToken')
        // Optionally redirect to login
        // window.location.href = '/login'
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    
    // Handle 401 Unauthorized responses
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      localStorage.removeItem('authToken')
      // Optionally redirect to login
      // window.location.href = '/login'
    }
  }
})

// Link to remove __typename from variables
function createOmitTypenameLink() {
  return new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        (key, value) => (key === "__typename" ? undefined : value),
      )
    }
    return forward(operation)
  })
}

// --- Cache ---

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userSessions: {
          merge: (existing = [], incoming) => incoming,
        },
        userGoals: {
          merge: (existing = [], incoming) => incoming,
        },
      },
    },
    User: {
      fields: {
        sessions: {
          merge: (existing = [], incoming) => incoming,
        },
        goals: {
          merge: (existing = [], incoming) => incoming,
        },
      },
    },
    Session: {
      fields: {
        messages: {
          merge: (existing = [], incoming) => [...existing, ...incoming],
        },
      },
    },
  },
})

// --- Client Creation ---

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([
      createOmitTypenameLink(), 
      errorLink, 
      authLink, 
      httpLink
    ]),
    cache,
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
        fetchPolicy: "cache-first",
      },
      query: {
        errorPolicy: "all",
        fetchPolicy: "cache-first",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    connectToDevTools: process.env.NODE_ENV === "development",
  })
}

// --- Initialization and Hooks ---

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  if (typeof window === "undefined") return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: NormalizedCacheObject | null = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

// --- Helper Functions ---

export const clearCache = () => {
  const client = initializeApollo()
  client.cache.reset()
}

// Export a function to get the client instance for use in AuthContext
export const getApolloClient = () => initializeApollo()
