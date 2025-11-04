import { test, describe, expect } from "vitest";
import { renderMockProvider } from "../../../utils/test-utils";
import type { MockLink } from "@apollo/client/testing";
import type { FollowAuthorMutation, FollowAuthorMutationVariables } from "../../../__generated__/graphql";
import { FOLLOW_AUTHOR } from "../follow-button.graphql";
import FollowButton from "../follow-button";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";


describe("FolloweButton unit tests", () => {
  const followMock: MockLink.MockedResponse<FollowAuthorMutation, FollowAuthorMutationVariables> = {
    request: {
      query: FOLLOW_AUTHOR,
      variables: {
        followingId: "a_02"
      }
    },
    result: {
      data: {
        createFollowedAuthor: {
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

  test("follow button click on unfollowed author", async () => {
    renderMockProvider({
      component:
        <FollowButton testId={"follow-button"} followingId={"a_02"} />,
      mocks: [followMock]
    });

    await userEvent.click(await screen.findByTestId("follow-button"))

    // make sure button is still rendered
    expect(await screen.findByTestId("follow-button")).toBeInTheDocument();
  })
})
