import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import type { Poem } from "../../../__generated__/types";
import { renderMockProvider } from "../../../utils/test-utils";
import PoemDetail from "../poem-detail";
import { makeFragmentData } from "../../../__generated__";
import { POEM_DETAIL_FRAGMENT } from "../poem-detail.graphql";
import { MemoryRouter } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";

const date = new Date()

const mockPoem: Poem = {
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
  views: 10,
  commentsCount: 2,
  likesCount: 7,
  inCollection: null,
  savedByCount: 200,
  comments: [],
  likes: [],
  savedBy: [],
}

const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_DETAIL_FRAGMENT)

test("Renders poem-card without errors", async () => {
  renderMockProvider({
    component:
    <MemoryRouter>
      <PoemDetail poem={ mockPoemCardFragment } />
    </MemoryRouter>,
  })

  // make sure poem fields are rendered
  expect(await screen.findByText("poem_01")).toBeInTheDocument()
  expect(await screen.findByText("poem_01_text")).toBeInTheDocument()
  expect(await screen.findByText("author_01")).toBeInTheDocument()
  expect(await screen.findByText(dateFormatter(date))).toBeInTheDocument()
})
