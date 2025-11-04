import type { MockLink } from "@apollo/client/testing";
import { describe, expect, test } from "vitest";
import type { UnfollowAuthorMutation, UnfollowAuthorMutationVariables } from "../../../__generated__/graphql";
import { UNFOLLOW_AUTHOR } from "../unfollow-button.graphql";
import { renderMockProvider } from "../../../utils/test-utils";
import UnfollowButton from "../unfollow-button";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

describe("UnfollowButton unit tests", () => {
  const unFollowMock: MockLink.MockedResponse<UnfollowAuthorMutation, UnfollowAuthorMutationVariables> = {
    request: {
      query: UNFOLLOW_AUTHOR,
      variables: {
        followedAuthorId: "f_01"
      }
    },
    result: {
      data: {
        removeFollowedAuthor: {
          id: "",
          following: {
            id: "",
          },
          follower: {
            id: "",
          }
        }
      }
    }
  }

  test("Follows an unfollowed author", async () => {
    renderMockProvider({
      component:
        <UnfollowButton testId={"unfollow-button"} followedAuthorId={"f_01"} />,
      mocks: [unFollowMock]
    });

    await userEvent.click(await screen.findByTestId("unfollow-button"))

    // make sure error is not rendered
    expect(await screen.findByTestId("unfollow-button")).toBeInTheDocument();
  })
})
