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

let apolloClient: ApolloClient<NormalizedCacheObject> | null

// --- Links ---

// All GraphQL requests will be proxied through this local route
const uri = "/api/graphql"

const httpLink = new HttpLink({
  uri,
})


// Error link for handling GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
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
    link: from([createOmitTypenameLink(), errorLink, httpLink]),
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
