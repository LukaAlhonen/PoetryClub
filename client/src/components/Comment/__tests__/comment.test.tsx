import { expect, describe, test } from "vitest";
import { screen } from "@testing-library/react";
import type { Comment as CommentType } from "../../../__generated__/types";
import { renderMockProvider } from "../../../utils/test-utils";
import { makeFragmentData } from "../../../__generated__";
import { COMMENT_FRAGMENT } from "../comment.graphql";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import Comment from "../comment";
import userEvent from "@testing-library/user-event";

describe("Comment unit tests", () => {
  const date = new Date()

  const mockComment: CommentType = {
    __typename: "Comment",
    id: "c_01",
    text: "comment_01",
    datePublished: date,
    poem: {
      id: "p_01",
      title: "poem_01",
      text: "poem_01_text",
      comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      commentsCount: 0,
      likesCount: 0,
      views: 0,
      savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      savedByCount: 0,
      datePublished: date,
      author: {
        __typename: "Author",
        id: "a_01",
        username: "author_01",
        email: "author_01",
        dateJoined: new Date(),
        poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
        followedByCount: 0,
        followingCount: 0
      }
    },
    author: {
      __typename: "Author",
      id: "a_01",
      username: "author_01",
      email: "author_01",
      dateJoined: new Date(),
      poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
      followedByCount: 0,
      followingCount: 0
    },
  }
  const mockCommentFragment = makeFragmentData(mockComment, COMMENT_FRAGMENT)

  test("Renders comment without errors", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <Comment comment={mockCommentFragment} />
        </MemoryRouter>,
    })

    expect(await screen.findByText("comment_01")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
    expect(await screen.findByText(dateFormatter(date))).toBeInTheDocument();
  })

  test("clicks on author link and checks that page renders", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <Comment comment={mockCommentFragment} />
          <Routes>
            <Route path="/author/:username" element={<div>Author Page</div>} />
            <Route path="/" element={<div></div>} /> {/* to silence err output about "/" route missing */}
          </Routes>
        </MemoryRouter>,
    })

    await userEvent.click(await screen.findByTestId("author-link-c_01"));

    expect(await screen.findByText("Author Page")).toBeInTheDocument();
  })

  test("Renders Comment loading state", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <Comment isLoading={true} />
        </MemoryRouter>,
    })

    expect(await screen.findByTestId("comment-spinner")).toBeInTheDocument();
  })
});
