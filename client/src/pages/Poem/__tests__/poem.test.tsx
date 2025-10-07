import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import type { GetPoemQuery, Poem as PoemModel } from "../../../__generated__/types";
import { GET_POEM } from "../../../pages/Poem/poem.graphql";
import { type MockedResponse } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import Poem from "../poem";

const date = new Date()

const mockPoem: PoemModel = {
  __typename: "Poem",
  id: "p_01",
  title: "poem_01",
  text: "poem_01_text",
  datePublished: date,
  author: {
    __typename: "Author",
    id: "a_01",
    username: "author_01",
    email: "author_01",
    dateJoined: new Date(),
    poems: [],
    savedPoems: [],
    collections: [],
    likedPoems: [],
    comments: [],
    followedBy: [],
    following: [],
    followedByCount: 0,
    followingCount: 0
  },
  views: 200,
  commentsCount: 10,
  likesCount: 50,
  inCollection: null,
  savedByCount: 7,
  comments: [],
  likes: [],
  savedBy: [],
}

// const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_CARD_FRAGMENT)

const mocks: MockedResponse<GetPoemQuery>[] = [
  {
    request: {
      query: GET_POEM,
      variables: {poemId: ""}
    },
    result: {
      data: {
        poem: mockPoem
      }
    }
  }
]

test("Renders poem-card without errors", async () => {
  renderMockProvider({
    component:
    <MemoryRouter>
      <Poem></Poem>
    </MemoryRouter>,
    mocks
  })

    expect(await screen.findByText("poem_01")).toBeInTheDocument();
    expect(await screen.findByText("poem_01_text")).toBeInTheDocument();
    expect(await screen.findByText("author_01")).toBeInTheDocument();
})
