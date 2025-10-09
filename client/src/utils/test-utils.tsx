import { MockedProvider } from "@apollo/client/testing/react";
import { MockLink } from "@apollo/client/testing";
import { AuthProvider } from "../context/auth-provider";
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { ReactElement } from "react";

const renderMockProvider = ({ component, mocks = [], options}: {
  component: ReactElement,
  mocks?: MockLink.MockedResponse[],
  options?: RenderOptions,
  }): RenderResult => {
  return render(
    <AuthProvider>
      <MockedProvider mocks={mocks}>
        {component}
      </MockedProvider>
    </AuthProvider>,
    options,
  );
};

export { renderMockProvider };
