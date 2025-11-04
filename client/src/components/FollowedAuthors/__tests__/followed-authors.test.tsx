import { beforeEach, afterEach, test, vi, beforeAll, describe, expect } from "vitest"
import { renderMockProvider } from "../../../utils/test-utils"
import type { GetAuthorQuery } from "../../../__generated__/graphql"
import { makeFragmentData } from "../../../__generated__"
import { FOLLOWED_AUTHOR_FRAGMENT } from "../../FollowedAuthor/followed-author.graphql"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import FollowedAuthors from "../followed-authors"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("FollowedAuthors unit tests", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  const mockFollowing: GetAuthorQuery["authorByUsername"]["following"] = {
    edges: [
      {
        node: {
          id: "f_01",
          following: {
            id: "a_01",
            ...makeFragmentData({ id: "a_01", username: "author_01"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_01"
      },
      {
        node: {
          id: "f_02",
          following: {
            id: "a_02",
            ...makeFragmentData({ id: "a_02", username: "author_02"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_02"
      },
      {
        node: {
          id: "f_03",
          following: {
            id: "a_03",
            ...makeFragmentData({ id: "a_03", username: "author_03"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_03"
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    }
  }

  const mockFollowers: GetAuthorQuery["authorByUsername"]["followedBy"] = {
    edges: [
      {
        node: {
          id: "f_04",
          follower: {
            id: "a_04",
            ...makeFragmentData({ id: "a_04", username: "author_04"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_04"
      },
      {
        node: {
          id: "f_05",
          follower: {
            id: "a_05",
            ...makeFragmentData({ id: "a_05", username: "author_05"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_05"
      },
      {
        node: {
          id: "f_06",
          follower: {
            id: "a_06",
            ...makeFragmentData({ id: "a_06", username: "author_06"}, FOLLOWED_AUTHOR_FRAGMENT)
            }
        },
        cursor: "f_06"
      },
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    }
  }

  test("Renders Following tab of FollowedAuthors", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
          <FollowedAuthors following={mockFollowing} />
      </MemoryRouter>
    })

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText("author_02")).toBeInTheDocument();
    expect(await screen.findByText("author_03")).toBeInTheDocument();
  })

  test("Renders Followers tab of FollowedAuthors", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
          <FollowedAuthors followers={mockFollowers} />
      </MemoryRouter>
    })

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_04")).toBeInTheDocument();
    expect(await screen.findByText("author_05")).toBeInTheDocument();
    expect(await screen.findByText("author_06")).toBeInTheDocument();
  })

  test("Switches from Followers tab to Following tab", async () => {
    renderMockProvider({
      component:
      <MemoryRouter initialEntries={["/author/author_07/followers"]}>
          <Routes>
            <Route element={<FollowedAuthors followers={mockFollowers} username={"author_07"} />} path={"/author/:username/followers"} />
            <Route element={<FollowedAuthors following={mockFollowing} username={"author_07"} />} path={"/author/:username/following"} />
          </Routes>
      </MemoryRouter>
    })

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_04")).toBeInTheDocument();
    expect(await screen.findByText("author_05")).toBeInTheDocument();
    expect(await screen.findByText("author_06")).toBeInTheDocument();

    await userEvent.click(await screen.findByTestId("following-link-author_07"));

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText("author_02")).toBeInTheDocument();
    expect(await screen.findByText("author_03")).toBeInTheDocument();
  })

  test("Switches from Following tab to Followers tab", async () => {
    renderMockProvider({
      component:
      <MemoryRouter initialEntries={["/author/author_07/following"]}>
          <Routes>
            <Route element={<FollowedAuthors followers={mockFollowers} username={"author_07"} />} path={"/author/:username/followers"} />
            <Route element={<FollowedAuthors following={mockFollowing} username={"author_07"} />} path={"/author/:username/following"} />
          </Routes>
      </MemoryRouter>
    })

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText("author_02")).toBeInTheDocument();
    expect(await screen.findByText("author_03")).toBeInTheDocument();

    await userEvent.click(await screen.findByTestId("followers-link-author_07"));

    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("author_04")).toBeInTheDocument();
    expect(await screen.findByText("author_05")).toBeInTheDocument();
    expect(await screen.findByText("author_06")).toBeInTheDocument();
  })

  test("Navigates to author page via back button", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
          <FollowedAuthors username={"author_07"} />
        <Routes>
          <Route path={"/author/:username"} element={<div>Author Page</div>} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("author-link-author_07"));

    expect(await screen.findByText("Author Page")).toBeInTheDocument();
  })
})
