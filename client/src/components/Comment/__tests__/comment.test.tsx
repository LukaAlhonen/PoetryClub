import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import type { Comment as CommentType } from "../../../__generated__/types";
import { renderMockProvider } from "../../../utils/test-utils";
import { makeFragmentData } from "../../../__generated__";
import { COMMENT_FRAGMENT } from "../comment.graphql";
import { MemoryRouter } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import Comment from "../comment";

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
    comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    commentsCount: 0,
    likesCount: 0,
    views: 0,
    savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false}},
    savedByCount: 0,
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
    }
  },
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
