import { beforeEach, afterEach, test, describe, expect, vi } from "vitest";
import { renderMockProvider } from "../../../utils/test-utils";
import type { MockLink } from "@apollo/client/testing";
import type { CreateLikeMutation, CreateLikeMutationVariables, RemoveLikeMutation, RemoveLikeMutationVariables } from "../../../__generated__/graphql";
import { CREATE_LIKE, REMOVE_LIKE } from "../like-button.graphql";
import LikeButton from "../like-button";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as AuthContext from "../../../context/use-auth";

describe("LikeButton unit test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  const likeMock: MockLink.MockedResponse<CreateLikeMutation, CreateLikeMutationVariables> = {
    request: {
      query: CREATE_LIKE,
      variables: {
        poemId: "p_01"
      }
    },
    result: {
      data: {
        createLike: {
          id: "l_01",
          poem: {
            id: "p_01",
          },
          author: {
            id: "a_01", username: "author_01" }
        }
      }
    }
  }

  const removeLikeMock: MockLink.MockedResponse<RemoveLikeMutation, RemoveLikeMutationVariables> = {
    request: {
      query: REMOVE_LIKE,
      variables: {
        likeId: "l_01"
      }
    },
    result: {
      data: {
        removeLike: {
          id: "l_01",
          poem: {
            id: "p_01",
          },
          author: {
            id: "a_01", username: "author_01" }
        }
      }
    }
  }

  const mockLikedPoem: CreateLikeMutation["createLike"] = {
    id: "l_01",
    poem: {
      id: "p_01"
    },
    author: {
      id: "a_01",
      username: "author_01"
    }
  }

  test("like button click on unliked poem", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
    user: "author_01",
    userId: "a_01",
    login: vi.fn(),
    logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <LikeButton poemId={"p_01"} likedByCurrentUser={null}>Like</LikeButton>,
      mocks: [likeMock]
    });

    const likeButton = await screen.findByTestId("like-button-p_01")
    expect(window.getComputedStyle(likeButton).background).toBe("rgb(220, 226, 220)")
    expect(window.getComputedStyle(likeButton).color).toBe("rgb(24, 28, 24)")

    await userEvent.click(likeButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(likeButton).background).toBe("rgb(145, 20, 49)")
      expect(window.getComputedStyle(likeButton).color).toBe("rgb(220, 226, 220)")
    })
  })

  test("like button click on liked poem", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <LikeButton poemId={"p_01"} likedByCurrentUser={mockLikedPoem}>Like</LikeButton>,
      mocks: [removeLikeMock]
    });

    const likeButton = await screen.findByTestId("like-button-p_01")
    expect(window.getComputedStyle(likeButton).background).toBe("rgb(145, 20, 49)")
    expect(window.getComputedStyle(likeButton).color).toBe("rgb(220, 226, 220)")

    await userEvent.click(likeButton);

    vi.waitFor(() => {
      expect(window.getComputedStyle(likeButton).background).toBe("rgb(220, 226, 220)")
      expect(window.getComputedStyle(likeButton).color).toBe("rgb(24, 28, 24)")
    })
  })

  test("like button click on unliked poem without loggin in", async () => {
    renderMockProvider({
      component:
        <LikeButton poemId={"p_01"} likedByCurrentUser={null}>Like</LikeButton>,
      mocks: [likeMock]
    });

    const likeButton = await screen.findByTestId("like-button-p_01")
    expect(window.getComputedStyle(likeButton).background).toBe("rgb(220, 226, 220)")
    expect(window.getComputedStyle(likeButton).color).toBe("rgb(24, 28, 24)")

    await userEvent.click(likeButton);
    vi.waitFor(() => {
      expect(window.getComputedStyle(likeButton).background).toBe("rgb(220, 226, 220)")
      expect(window.getComputedStyle(likeButton).color).toBe("rgb(24, 28, 24)")
    })
  })
})
