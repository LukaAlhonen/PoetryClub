import { test, describe, expect } from "vitest";
import type { PoemCardFragmentFragment } from "../../../__generated__/graphql";
import { makeFragmentData } from "../../../__generated__";
import { POEM_CARD_FRAGMENT } from "../../PoemCard/poem-card.graphql";
import { renderMockProvider } from "../../../utils/test-utils";
import PoemGrid from "../poem-grid";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";

const mockPoems: ({ __typename?: "Poem", id: string } & { ' $fragmentRefs'?: { "PoemCardFragmentFragment": PoemCardFragmentFragment } })[] = [
  {
    id: "p_01",
    ...makeFragmentData({
        id: "p_01",
      title: "poem_01",
      text: "poem_01_text",
      datePublished: "",
      author: {
          id: "a_01",
          username: "author_01",
      },
      views: 0,
      likesCount: 0,
      commentsCount: 0,
      savedByCount: 0,
      inCollection: {
        id: "c_01",
        title: "collection_01",
      },
      likedByCurrentUser: null,
      savedByCurrentUser: null,
    }, POEM_CARD_FRAGMENT)
  },
  {
    id: "p_02",
    ...makeFragmentData({
        id: "p_02",
      title: "poem_02",
      text: "poem_02_text",
      datePublished: "",
      author: {
          id: "a_01",
          username: "author_01",
      },
      views: 0,
      likesCount: 0,
      commentsCount: 0,
      savedByCount: 0,
      inCollection: {
        id: "c_01",
        title: "collection_01",
      },
      likedByCurrentUser: null,
      savedByCurrentUser: null,
    }, POEM_CARD_FRAGMENT)
  },
  {
    id: "p_03",
    ...makeFragmentData({
        id: "p_03",
      title: "poem_03",
      text: "poem_03_text",
      datePublished: "",
      author: {
          id: "a_01",
          username: "author_01",
      },
      views: 0,
      likesCount: 0,
      commentsCount: 0,
      savedByCount: 0,
      inCollection: {
        id: "c_01",
        title: "collection_01",
      },
      likedByCurrentUser: null,
      savedByCurrentUser: null,
    }, POEM_CARD_FRAGMENT)
  }
]

describe("PoemGrid unit tests", () => {
  test("Renders PoemGrid without errors", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <PoemGrid poems={mockPoems} pageSize={3} />
      </MemoryRouter>
    })

    expect(await screen.findByText("poem_01")).toBeInTheDocument();
    expect(await screen.findByText("poem_02")).toBeInTheDocument();
    expect(await screen.findByText("poem_03")).toBeInTheDocument();

    expect(await screen.findByText("poem_01_text")).toBeInTheDocument();
    expect(await screen.findByText("poem_02_text")).toBeInTheDocument();
    expect(await screen.findByText("poem_03_text")).toBeInTheDocument();

    expect(await screen.findAllByText("author_01")).toHaveLength(3)
  })

  test("Renders PoemGrid loading state", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <PoemGrid pageSize={3} isLoading={true} />
      </MemoryRouter>
    })

    expect(await screen.findAllByTestId("poem-spinner")).toHaveLength(3)
  })
})
