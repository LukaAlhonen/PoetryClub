import { MockedProvider } from "@apollo/client/testing/react";
import { MockLink } from "@apollo/client/testing";
import { AuthProvider } from "../context/auth-provider";
import {
    act,
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { ReactElement } from "react";
import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authorByUsername: {
          keyArgs: ["username"],
        },
      }
    },
  }
})

const renderMockProvider = ({ component, mocks = [], options}: {
  component: ReactElement,
  mocks?: MockLink.MockedResponse[],
  options?: RenderOptions,
  }): RenderResult => {
  return render(
    <AuthProvider>
      <MockedProvider mocks={mocks} cache={cache} defaultOptions={{ mutate: { errorPolicy: "all"}}}>
        {component}
      </MockedProvider>
    </AuthProvider>,
    options,
  );
};

export { renderMockProvider };

export const flushAllPromises = async (ticks = 10) => {
  for (let i = 0; i < ticks; i++) {
    await act(async () => {
      await Promise.resolve();
      await new Promise(res => setTimeout(res, 0));
      console.log("flushed")
    });
  }
};
