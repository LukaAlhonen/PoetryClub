import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";

const link = new HttpLink({
  uri: "http://192.168.1.209:4000/graphql",
  credentials: "include"
})

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
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
