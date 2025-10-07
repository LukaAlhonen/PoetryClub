import { type MockedResponse, MockedProvider } from "@apollo/client/testing";
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import type { ReactElement } from "react";

const renderMockProvider = ({ component, mocks = [], options}: {
  component: ReactElement,
  mocks?: MockedResponse[],
  options?: RenderOptions,
  }): RenderResult => {
  return render(
    <MockedProvider mocks={mocks}>
      {component}
    </MockedProvider>,
    options,
  );
};

export { renderMockProvider };
