import { beforeEach, afterEach, describe, vi, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderMockProvider } from "../../../utils/test-utils";
import { makeFragmentData } from "../../../__generated__";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import type { Author } from "../../../__generated__/graphql";
import { AUTHOR_DETAIL_FRAGMENT } from "../author-detail.graphql";
import AuthorDetail from "../author-detail";
import * as AuthContext from "../../../context/use-auth";
import userEvent from "@testing-library/user-event";

describe("AuthorDetail unit tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  const date = new Date();

  const mockAuthor: Author = {
    id: "a_01",
    username: "author_01",
    email: "author_01@domain.com",
    dateJoined: date,
    followedByCount: 10,
    followingCount: 20,
    collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    followedByCurrentUser: {
      id: "f_01",
      dateFollowed: date,
      follower: {
        id: "a_02",
        username: "author_02",
        email: "author_02@domain.com",
        collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedByCount: 0,
        followingCount: 0,
        dateJoined: date,
      },
      following: {
        id: "a_01",
        username: "author_01",
        email: "author_01@domain.com",
        collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedByCount: 0,
        followingCount: 0,
        comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        dateJoined: date,
      }
    }
  }

  const mockAuthorFragment = makeFragmentData(mockAuthor, AUTHOR_DETAIL_FRAGMENT);

  test("Renders AuthorDetail", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
        </MemoryRouter>
    })

    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(`Joined.*${dateFormatter(date)}`))).toBeInTheDocument();
    expect(await screen.findByText("10")).toBeInTheDocument();
    expect(await screen.findByText("Followers")).toBeInTheDocument();
    expect(await screen.findByText("20")).toBeInTheDocument();
    expect(await screen.findByText("Following")).toBeInTheDocument();
  })

  test("Renders AuthorDetail while logged in", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
        </MemoryRouter>
    })

    await expect(screen.findByTestId("unfollow-button-a_01")).rejects.toThrow();
    await expect(screen.findByTestId("follow-button-a_01")).rejects.toThrow();
  })

  test("Renders AuthorDetail while logged in as other user that follows the author", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_02",
     userId: "a_02",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
        </MemoryRouter>
    })

    expect(await screen.findByTestId("unfollow-button-a_01")).toBeInTheDocument();

  })

  test("Renders AuthorDetail while logged in as other user that does not follow the author", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_03",
     userId: "a_03",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
        </MemoryRouter>
    })

    expect(await screen.findByTestId("follow-button-a_01")).toBeInTheDocument();

  })

  test("clicks on followers link and checks that the page renders", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<div>Followers Page</div>} path="/author/:username/followers" />
          </Routes>
        </MemoryRouter>
    })

    await userEvent.click(screen.getByTestId("followers-link-a_01"));
    expect(await screen.findByText("Followers Page")).toBeInTheDocument();
  })

  test("clicks on following link and checks that the page renders", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <AuthorDetail author={mockAuthorFragment} />
          <Routes>
            <Route element={<div></div>} path={"/"} />
            <Route element={<div>Following Page</div>} path="/author/:username/following" />
          </Routes>
        </MemoryRouter>
    })

    await userEvent.click(screen.getByTestId("following-link-a_01"));
    expect(await screen.findByText("Following Page")).toBeInTheDocument();
  })

  // test("Follows author and checks that followers was incremented", async () => {
  //   vi.spyOn(AuthContext, "useAuth").mockReturnValue({
  //    user: "author_03",
  //    userId: "a_03",
  //    login: vi.fn(),
  //    logout: vi.fn(),
  //   })

  //   renderMockProvider({
  //     component:
  //       <MemoryRouter>
  //         <AuthorDetail author={mockAuthorFragment} />
  //       </MemoryRouter>,
  //     mocks: [mockGetAuthor, followMock]
  //   })

  //   expect(await screen.findByText("10")).toBeInTheDocument();
  //   expect(await screen.findByText("Followers")).toBeInTheDocument();

  //   await userEvent.click(screen.getByTestId("follow-button-a_01"));

  //   expect(await screen.findByText("11")).toBeInTheDocument();
  //   expect(await screen.findByText("Followers")).toBeInTheDocument();
  // })

  // test.todo("Unfollows author and checks that followers was decremented")
});
