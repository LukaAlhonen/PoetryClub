import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const link = new HttpLink({
  uri: "/graphql",
  credentials: "include",
});

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// handle token refresh
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`,
      );
    });
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, link]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          poems: relayStylePagination(["filter"]),
          authorByUsername: {
            keyArgs: ["username"],
            merge: true,
          },
          poem: {
            keyArgs: ["id"],
          },
        },
      },
      Author: {
        fields: {
          poems: relayStylePagination(["filter"]),
          followedBy: relayStylePagination(["followingId"]),
          following: relayStylePagination(["followerId"]),
          likedPoems: relayStylePagination(),
          savedPoems: relayStylePagination(),
        },
      },
      Poem: {
        fields: {
          comments: relayStylePagination(["poemId"]),
          likes: relayStylePagination(["poemId", "authorId"]),
          savedBy: relayStylePagination(["poemId", "authorId"]),
        },
      },
    },
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
