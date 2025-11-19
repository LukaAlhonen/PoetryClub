import { beforeEach, afterEach, expect, test, vi, describe } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import type { GetAuthorQuery } from "../../../__generated__/types";
import { MockLink } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Author from "../author";
import type { GetAuthorQueryVariables } from "../../../__generated__/graphql";
import { GET_AUTHOR } from "../author.graphql";
import { dateFormatter } from "../../../utils/formatters";
import userEvent from "@testing-library/user-event";
import * as AuthContext from "../../../context/use-auth";

describe("Author page unit tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    // dummy intersectionobserver mock
    const mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    vi.spyOn(console, "error").mockImplementation(() => { })
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  const date = new Date()

  const mockAuthor: GetAuthorQuery["authorByUsername"] = {
    id: "a_01",
    username: "author_01",
    dateJoined: date,
    followedByCount: 0,
    followingCount: 0,
    followedByCurrentUser: null,
    followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    poems: {
      edges: [
        {
          node: {
            id: "p_01",
            title: "poem_01",
            text: "poem_01_text",
            datePublished: date,
            author: {
                id: "a_01",
                username: "author_01",
            },
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            savedByCount: 0,
            inCollection: null,
            likedByCurrentUser: null,
            savedByCurrentUser: null,
          },
          cursor: "p_01",
        }
      ],
      pageInfo: { hasNextPage: false, hasPreviousPage: false }
    },
    likedPoems: {
      edges: [
        {
          node: {
            id: "l_01",
            poem: {
              id: "p_02",
              title: "poem_02",
              text: "poem_02_text",
              datePublished: date,
              author: {
                  id: "a_01",
                  username: "author_01",
              },
              views: 0,
              likesCount: 1,
              commentsCount: 0,
              savedByCount: 0,
              inCollection: null,
              likedByCurrentUser: {
                id: "l_01",
                poem: {
                  id: "p_02",
                },
                author: {
                  id: "a_01",
                  username: "author_01"
                }
              },
              savedByCurrentUser: null,
            }
          },
          cursor: "p_02",
        }
      ],
      pageInfo: { hasNextPage: false, hasPreviousPage: false }
    },
    savedPoems: {
      edges: [
        {
          node: {
            id: "s_01",
            poem: {
              id: "p_03",
              title: "poem_03",
              text: "poem_03_text",
              datePublished: date,
              author: {
                  id: "a_01",
                  username: "author_01",
              },
              views: 0,
              likesCount: 1,
              commentsCount: 0,
              savedByCount: 0,
              inCollection: null,
              savedByCurrentUser: {
                id: "s_01",
                poem: {
                  id: "p_03",
                },
                author: {
                  id: "a_01",
                  username: "author_01"
                }
              },
              likedByCurrentUser: null,
            }
          },
          cursor: "p_03",
        }
      ],
      pageInfo: { hasNextPage: false, hasPreviousPage: false }
    }
  }

  const getAuthorMock: MockLink.MockedResponse<GetAuthorQuery, GetAuthorQueryVariables> = {
    request: {
      query: GET_AUTHOR,
      variables: { username: "author_01", poemsLimit: 5, followedByLimit: 10, followingLimit: 10, likedPoemsLimit: 5, savedPoemsLimit: 5 }
    },
    result: {
      data: {
        authorByUsername: mockAuthor
      }
    }
  };

  test("Renders Author page without loggin in first", async () => {
    renderMockProvider({
      component:
        <MemoryRouter initialEntries={["/author/author_01"]}>
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<Author />} path="/author/:username" />
          </Routes>
        </MemoryRouter>,
      mocks: [getAuthorMock]
    })

    expect(await screen.findAllByText(/.*author_01/)).toHaveLength(2);
    expect(await screen.findByText("poem_01")).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(`Joined.*${dateFormatter(date)}`))).toBeInTheDocument();
  })

  test("Renders author liked poems", async () => {
    renderMockProvider({
      component:
        <MemoryRouter initialEntries={["/author/author_01"]}>
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<Author />} path={"/author/:username"} />
            <Route element={<Author />} path={"/author/:username/likes"} />
          </Routes>
        </MemoryRouter>,
      mocks: [getAuthorMock]
    });

    expect(screen.queryByText("poem_02")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("poem_01")).toBeInTheDocument();
    })

    const likedPoemsButton = await screen.findByTestId("likes-link-author_01");

    await userEvent.click(likedPoemsButton);
    await waitFor(() => {
      expect(screen.getByText("poem_02")).toBeInTheDocument();
    })
  })

  test("Renders author saved poems", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <MemoryRouter initialEntries={["/author/author_01"]}>
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<Author />} path={"/author/:username"} />
            <Route element={<Author />} path={"/author/:username/saved"} />
          </Routes>
        </MemoryRouter>,
      mocks: [getAuthorMock]
    });

    const savedPoemsButton = await screen.findByTestId("saved-link-author_01");

    await userEvent.click(savedPoemsButton);
    await waitFor(() => {
      expect(screen.getByText("poem_03")).toBeInTheDocument();
      expect(screen.queryByText("poem_01")).not.toBeInTheDocument();
    })
  })

  test("checks that saved poems is not rendered when not logged in", async () => {
    renderMockProvider({
      component:
        <MemoryRouter initialEntries={["/author/author_01"]}>
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<Author />} path={"/author/:username"} />
            <Route element={<Author />} path={"/author/:username/saved"} />
          </Routes>
        </MemoryRouter>,
      mocks: [getAuthorMock]
    });

    await waitFor(() => {
      expect(screen.queryByTestId("saved-link-author_01")).not.toBeInTheDocument();
    })
  })
});
