import { expect, test, beforeAll, vi, describe } from "vitest";
import { screen } from "@testing-library/react";
import type { GetAuthorQuery, Author as AuthorModel } from "../../../__generated__/types";
import { MockLink } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Author from "../author";
import type { GetAuthorQueryVariables } from "../../../__generated__/graphql";
import { GET_AUTHOR } from "../author.graphql";
import { dateFormatter } from "../../../utils/formatters";

describe("Author page unit tests", () => {
  beforeAll(() => {
    vi.spyOn(console, "error").mockImplementation(() => { })
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

  const mockAuthor: Omit<AuthorModel, "comments" | "collections"> = {
    __typename: "Author",
    id: "a_01",
    username: "author_01",
    email: "author_01@domain.com",
    dateJoined: date,
    followedByCount: 0,
    followingCount: 0,
    followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
    following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
    likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    poems: {
      __typename: "PoemsConnection",
      edges: [
        {
          node: {
            __typename: "Poem",
            id: "p_01",
            title: "poem_01",
            text: "poem_01 text",
            datePublished: date,
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
            likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
            savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
            views: 0,
            commentsCount: 0,
            savedByCount: 0,
            likesCount: 0,
            author: {
              id: "a_01",
              username: "author_01",
              email: "author_01@domain.com",
              dateJoined: date,
              poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null, pageSize: 0 } },
              followingCount: 0,
              followedByCount: 0
            }
          },
          cursor: "p_01"
        }
      ],
      pageInfo: {
        __typename: "PageInfo",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "p_01",
        endCursor: "p_01",
        pageSize: 1
      }
    }
  }

  const mocks: MockLink.MockedResponse<GetAuthorQuery, GetAuthorQueryVariables>[] = [
    {
      request: {
        query: GET_AUTHOR,
        variables: { username: "author_01", poemsLimit: 5, followedByLimit: 10, followingLimit: 10, likedPoemsLimit: 5, savedPoemsLimit: 5 }
      },
      result: {
        data: {
          authorByUsername: mockAuthor
        }
      }
    }
  ]

  test("Renders Author page without loggin in first", async () => {
    renderMockProvider({
      component:
        <MemoryRouter initialEntries={["/author/author_01"]}>
          <Routes>
            <Route element={<Author />} path="/author/:username" />
          </Routes>
        </MemoryRouter>,
      mocks
    })

    expect(await screen.findAllByText(/.*author_01/)).toHaveLength(2);
    expect(await screen.findByText(new RegExp(`Joined.*${dateFormatter(date)}`))).toBeInTheDocument();
  })

  test.todo("Renders author liked poems")
  test.todo("Renders author saved poems")
  test.todo("Likes poem and checks that it appears in liked poems")
  test.todo("Removes like from poem and checks that it is removed from liked poems")
  test.todo("Saves poem and checks that it appears in saved poems")
  test.todo("Unsaves a poem and checks that it is removed from savd poems")
  test.todo("Follows author and checks that followers was incremented")
  test.todo("Unfollows author and checks that followers was decremented")
});
