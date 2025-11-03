import { describe, vi, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderMockProvider } from "../../../utils/test-utils";
import { makeFragmentData } from "../../../__generated__";
import { MemoryRouter } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import type { Author } from "../../../__generated__/graphql";
import { AUTHOR_DETAIL_FRAGMENT } from "../author-detail.graphql";
import AuthorDetail from "../author-detail";
import * as AuthContext from "../../../context/use-auth";

describe("AuthorDetail unit tests", () => {
  const date = new Date();

  const mockAuthor: Omit<Author, "poems" | "collections" | "comments" | "followedBy" | "following" | "savedPoems" | "likedPoems"> = {
    id: "a_01",
    username: "author_01",
    email: "author_01@domain.com",
    dateJoined: date,
    followedByCount: 10,
    followingCount: 20
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

  test.fails("Renders AuthorDetail while logged in", async () => {
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

    expect(await screen.findByTestId("unfollow-button-a_01")).not.toBeInTheDocument();
  })
  test.todo("Renders AuthorDetail while logged in as other user", async () => {
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

    // expect(await screen.findByTestId)

  })
  test.todo("Follows author and checks that followers was incremented")
  test.todo("Unfollows author and checks that followers was decremented")
});
