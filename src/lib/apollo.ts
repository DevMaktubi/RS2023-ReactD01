import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
