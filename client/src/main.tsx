import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

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

// artificial delay for queries to give it that cool realistic vibe bro
const delayLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    const handle = setTimeout(() => {
      const subscription = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });

      return () => subscription.unsubscribe();
    }, 2000);

    return () => clearTimeout(handle);
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, delayLink, link]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          poems: relayStylePagination([
            "filter",
          ]),
          authorByUsername: {
            keyArgs: ["username"],
            merge: true
          }
        }
      },
      Author: {
        fields: {
          poems: relayStylePagination([
            "filter"
          ])
        }
      }
    }
  }),
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
