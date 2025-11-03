import { test, describe, expect, beforeAll, vi } from "vitest";
import type { CommentsConnection } from "../../../__generated__/graphql";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import CommentsSection from "../comments-section";
import { screen } from "@testing-library/react";
import { dateFormatter } from "../../../utils/formatters";

describe("CommentsSection unit test", () => {
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

  const date = new Date();

  const mockComments: CommentsConnection = {
    edges: [
      {
        node: {
          id: "c_01",
          text: "comment_01 text",
          datePublished: date,
          author: {
            id: "a_01",
            username: "author_01",
            email: "author_01@domain.com",
            poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedByCount: 0,
            followingCount: 0,
            dateJoined: date
          },
          poem: {
            id: "p_01",
            datePublished: date,
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedByCount: 0,
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            text: "",
            title: "",
            author: {
              id: "a_01",
              username: "",
              email: "",
              poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedByCount: 0,
              followingCount: 0,
              dateJoined: date
            }
          }
        },
        cursor: "c_01"
      },
      {
        node: {
          id: "c_02",
          text: "comment_02 text",
          datePublished: date,
          author: {
            id: "a_01",
            username: "author_01",
            email: "author_01@domain.com",
            poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedByCount: 0,
            followingCount: 0,
            dateJoined: date
          },
          poem: {
            id: "p_01",
            datePublished: date,
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedByCount: 0,
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            text: "",
            title: "",
            author: {
              id: "a_01",
              username: "",
              email: "",
              poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedByCount: 0,
              followingCount: 0,
              dateJoined: date
            }
          }
        },
        cursor: "c_02"
      },
      {
        node: {
          id: "c_03",
          text: "comment_03 text",
          datePublished: date,
          author: {
            id: "a_01",
            username: "author_01",
            email: "author_01@domain.com",
            poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedByCount: 0,
            followingCount: 0,
            dateJoined: date
          },
          poem: {
            id: "p_01",
            datePublished: date,
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedByCount: 0,
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            text: "",
            title: "",
            author: {
              id: "a_01",
              username: "",
              email: "",
              poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedByCount: 0,
              followingCount: 0,
              dateJoined: date
            }
          }
        },
        cursor: "c_03"
      },
      {
        node: {
          id: "c_04",
          text: "comment_04 text",
          datePublished: date,
          author: {
            id: "a_01",
            username: "author_01",
            email: "author_01@domain.com",
            poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            followedByCount: 0,
            followingCount: 0,
            dateJoined: date
          },
          poem: {
            id: "p_01",
            datePublished: date,
            comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
            savedByCount: 0,
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            text: "",
            title: "",
            author: {
              id: "a_01",
              username: "",
              email: "",
              poems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              savedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              likedPoems: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              following: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              collections: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
              followedByCount: 0,
              followingCount: 0,
              dateJoined: date
            }
          }
        },
        cursor: "c_04"
      }
    ],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "c_01",
      endCursor: "c_03",
      pageSize: 3
    }
  }

  test("Renders comments section without error", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <CommentsSection comments={mockComments} />
        </MemoryRouter>
    })

    expect(await screen.findByText("comment_01 text")).toBeInTheDocument();
    expect(await screen.findByText("comment_02 text")).toBeInTheDocument();
    expect(await screen.findByText("comment_03 text")).toBeInTheDocument();
    expect(await screen.findByText("comment_04 text")).toBeInTheDocument();

    expect(await screen.findAllByText(/.*author_01/)).toHaveLength(4);
    expect(await screen.findAllByText(dateFormatter(date))).toHaveLength(4)
  })

  test.todo("Creates new comment and makes sure it appears in comments section")
});
