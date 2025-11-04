import { test, describe, expect } from "vitest";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FollowedAuthor from "../followed-author";
import { makeFragmentData } from "../../../__generated__";
import { FOLLOWED_AUTHOR_FRAGMENT } from "../followed-author.graphql";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockAuthorFragment = makeFragmentData({id: "a_01", username: "author_01"}, FOLLOWED_AUTHOR_FRAGMENT)

describe("FollowedAuthor unit test", () => {
  test("Renders FollowedAuthor without errors", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <FollowedAuthor author={mockAuthorFragment} />
      </MemoryRouter>
    })

    expect(await screen.findByText("author_01")).toBeInTheDocument();
  })

  test("Renders FollowedAuthor loading state", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <FollowedAuthor />
      </MemoryRouter>
    })

    expect(await screen.findByText("loading...")).toBeInTheDocument();
  })

  test("Navigates to autor page via author link", async () => {
    renderMockProvider({
      component:
      <MemoryRouter>
        <FollowedAuthor author={mockAuthorFragment} />
        <Routes>
          <Route path={"author/:username"} element={<div>Author Page</div>}/>
            <Route path={"/"} element={<div></div>} />
        </Routes>
      </MemoryRouter>
    })

    await userEvent.click(await screen.findByTestId("followed-author-link-a_01"))

    expect(await screen.findByText("Author Page")).toBeInTheDocument();
  })
})
