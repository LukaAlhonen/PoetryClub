import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import type { GetPoemQuery, Poem } from "../../__generated__/types";
import { POEM } from "../../queries";
import { type MockedResponse } from "@apollo/client/testing";
import { renderMockProvider } from "../../utils/test-utils";
import PoemCard from "../poem-card";

const mockPoem: Poem = {
  id: "p_01",
  title: "Poem_01",
  author: {
    id: "a_01",
    username: "author_01",
    email: "author01@example.com",
    poems: [],
  },
  datePublished: "01-01-1970",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

const successMocks: MockedResponse<GetPoemQuery>[] = [
  {
    request: {
      query: POEM,
      variables: {
        id: "p_01",
      },
    },
    result: {
      data: {},
    },
  },
];

test("Renders a poem-card without error", async () => {
  renderMockProvider(<PoemCard poem={mockPoem} />, successMocks);
  expect(await screen.findByText("Poem_01")).toBeInTheDocument();
});
