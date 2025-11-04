import { beforeEach, afterEach, vi, describe, test, expect } from "vitest";
import * as AuthContext from "../../../context/use-auth";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import ComposeCommentForm from "../compose-comment-form";
import { screen } from "@testing-library/react";
import type { MockLink } from "@apollo/client/testing";
import { CREATE_COMMENT } from "../compose-comment-form.graphql";
import type { CreateCommentMutation, CreateCommentMutationVariables } from "../../../__generated__/graphql";
import { makeFragmentData } from "../../../__generated__";
import { COMMENT_FRAGMENT } from "../../../components/Comment/comment.graphql";
import userEvent from "@testing-library/user-event";

const date = new Date();

const composeMock: MockLink.MockedResponse<CreateCommentMutation, CreateCommentMutationVariables> = {
  request: {
    query: CREATE_COMMENT,
    variables: {
      poemId: "p_01",
      text: "comment_01_text"
    }
  },
  result: {
    data: {
      createComment: {
        id: "c_01",
        ...makeFragmentData({
          id: "c_01",
          text: "comment_01_text",
          author: {
              id: "a_01",
              username: "author_01"
          },
          datePublished: date,
        }, COMMENT_FRAGMENT)
      }
    },
  },
}

const failComposeMock: MockLink.MockedResponse<CreateCommentMutation, CreateCommentMutationVariables> = {
  request: {
    query: CREATE_COMMENT,
    variables: {
      poemId: "p_01",
      text: "comment_01_text"
    }
  },
  result: {
    errors: [new Error("an error has occured")]
  },
}

describe("ComposeCommentForm unit tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  test("Renders ComposeCommentForm", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <ComposeCommentForm poemId={"p_01"} />
      </MemoryRouter>
    })

    expect(await screen.findByTestId("comment-text-input")).toBeInTheDocument();
    expect(await screen.findByTestId("submit-comment-button")).toBeInTheDocument();
  })

  test("creates new comment", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
     user: "author_01",
     userId: "a_01",
     login: vi.fn(),
     logout: vi.fn(),
    })

    renderMockProvider({
      component:
        <MemoryRouter>
          <ComposeCommentForm poemId={"p_01"} />
        </MemoryRouter>,
      mocks: [composeMock]
    });

    await userEvent.type(await screen.findByTestId("comment-text-input"), "comment_01_text");
    await userEvent.click(await screen.findByTestId("submit-comment-button"))

    // make sure no error state was rendered
    expect(await screen.findByTestId("comment-text-input")).toBeInTheDocument();
    expect(await screen.findByTestId("submit-comment-button")).toBeInTheDocument();
  })

  test("fails to create comment by not logging in first", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <ComposeCommentForm poemId={"p_01"} />
        </MemoryRouter>,
      mocks: [failComposeMock]
    });

    await userEvent.type(await screen.findByTestId("comment-text-input"), "comment_01_text");
    await userEvent.click(await screen.findByTestId("submit-comment-button"));

    expect(await screen.findByTestId("compose-error")).toHaveTextContent("an error has occured")
  })
})
