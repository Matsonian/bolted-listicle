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

// All GraphQL requests will be proxied through this local route
const uri = "/api/graphql"

const httpLink = new HttpLink({
  uri,
})

// Auth link to add authorization headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

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
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken')
        }
        // Optionally redirect to login
        // window.location.href = '/login'
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)

    // Handle 401 Unauthorized responses
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
      }
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

export const client = new ApolloClient({
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
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
})