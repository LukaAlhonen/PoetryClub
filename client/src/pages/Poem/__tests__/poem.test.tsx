import { expect, test, beforeAll, vi } from "vitest";
import { screen } from "@testing-library/react";
import type { GetPoemQuery, Poem as PoemModel } from "../../../__generated__/types";
import { GET_POEM } from "../../../pages/Poem/poem.graphql";
import { MockLink } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Poem from "../poem";

beforeAll(() => {
  // dummy intersectionobserver mock
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

const date = new Date()

const mockPoem: PoemModel = {
  __typename: "Poem",
  id: "p_01",
  title: "poem_01",
  text: "poem_01_text",
  datePublished: date,
  author: {
    __typename: "Author",
    id: "a_01",
    username: "author_01",
    email: "author_01",
    dateJoined: new Date(),
    poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    followedByCount: 0,
    followingCount: 0
  },
  views: 200,
  commentsCount: 10,
  likesCount: 50,
  inCollection: null,
  savedByCount: 7,
  comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
  likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
  savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
}

// const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_CARD_FRAGMENT)

const mocks: MockLink.MockedResponse<GetPoemQuery>[] = [
  {
    request: {
      query: GET_POEM,
      variables: {poemId: "p_01", commentsLimit: 5}
    },
    result: {
      data: {
        poem: mockPoem
      }
    }
  }
]

test("Renders poem-card without errors", async () => {
  renderMockProvider({
    component:
    <MemoryRouter initialEntries={["/poem/p_01"]}>
      <Routes>
        <Route element={<Poem />} path="/poem/:poemId" />
      </Routes>
    </MemoryRouter>,
    mocks
  })

    expect(await screen.findByText("poem_01")).toBeInTheDocument();
    expect(await screen.findByText("poem_01_text")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
})
