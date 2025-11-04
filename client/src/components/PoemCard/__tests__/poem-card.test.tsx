import { expect, describe, test } from "vitest";
import { screen } from "@testing-library/react";
import type { Poem } from "../../../__generated__/types";
import { renderMockProvider } from "../../../utils/test-utils";
import PoemCard from "../poem-card";
import { makeFragmentData } from "../../../__generated__";
import { POEM_CARD_FRAGMENT } from "../poem-card.graphql";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import userEvent from "@testing-library/user-event";

describe("PoemCard unit tests", () => {
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
    views: 200,
    commentsCount: 10,
    likesCount: 50,
    inCollection: null,
    savedByCount: 7,
    comments: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    likes: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    savedBy: { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
  }

  const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_CARD_FRAGMENT)

  test("Renders poem-card without errors", async () => {
    renderMockProvider({
      component:
        <MemoryRouter>
          <PoemCard poem={mockPoemCardFragment} />
        </MemoryRouter>,
    })

    // make sure poem fields are rendered
    expect(await screen.findByText("poem_01")).toBeInTheDocument()
    expect(await screen.findByText("poem_01_text")).toBeInTheDocument()
    expect(await screen.findByText("author_01")).toBeInTheDocument()
    expect(await screen.findByText(dateFormatter(date))).toBeInTheDocument()

    expect(screen.getByTestId("views")).toHaveTextContent("200")
    expect(screen.getByTestId("likesCount")).toHaveTextContent("50")
    expect(screen.getByTestId("commentsCount")).toHaveTextContent("10")
  })

  test("Navigates to Poem page via poem title", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <PoemCard poem={mockPoemCardFragment} />
        <Routes>
          <Route element={<div></div>} path={"/"} />
          <Route element={<div>Poem Page</div>} path={"/poem/:poemId"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("poem-title-link-p_01"));

    expect(await screen.findByText("Poem Page")).toBeInTheDocument();
  })

  test("Navigates to Poem page via 'show full poem' link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <PoemCard poem={mockPoemCardFragment} />
        <Routes>
          <Route element={<div></div>} path={"/"} />
          <Route element={<div>Poem Page</div>} path={"/poem/:poemId"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("poem-link-p_01"));

    expect(await screen.findByText("Poem Page")).toBeInTheDocument();
  })

  test("Navigates to Poem page via comments button", async () => {

    renderMockProvider({
      component:
      <MemoryRouter>
        <PoemCard poem={mockPoemCardFragment} />
        <Routes>
          <Route element={<div></div>} path={"/"} />
          <Route element={<div>Author Page</div>} path={"/author/:username"} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("poem-author-link-a_01"));

    expect(await screen.findByText("Author Page")).toBeInTheDocument();
  })
});
