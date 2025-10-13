import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client";

const link = new HttpLink({
  uri: "http://192.168.1.209:4000/graphql",
  credentials: "include"
})

// let token = localStorage.getItem("token")

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

// handle token refresh
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path}) => {
      console.log(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`);
    })
  }
})

const client = new ApolloClient({
  // link: authLink.concat(link),
  link: ApolloLink.from([errorLink, authLink, link]),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
