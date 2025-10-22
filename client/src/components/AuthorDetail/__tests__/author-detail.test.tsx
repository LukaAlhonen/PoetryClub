import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { renderMockProvider } from "../../../utils/test-utils";
import { makeFragmentData } from "../../../__generated__";
import { MemoryRouter } from "react-router-dom";
import { dateFormatter } from "../../../utils/formatters";
import type { Author } from "../../../__generated__/graphql";
import { AUTHOR_DETAIL_FRAGMENT } from "../author-detail.graphql";
import AuthorDetail from "../author-detail";

const date = new Date();

const mockAuthor: Omit<Author, "poems"|"collections"|"comments"|"followedBy"|"following"|"savedPoems"|"likedPoems"> = {
  id: "a_01",
  username: "author_01",
  email: "author_01@domain.com",
  dateJoined: date,
  followedByCount: 10,
  followingCount: 20
}

const mockAuthorFragment = makeFragmentData(mockAuthor, AUTHOR_DETAIL_FRAGMENT);

test("Renders author-detail without errors", async () => {
  renderMockProvider({
    component:
      <MemoryRouter>
        <AuthorDetail author={mockAuthorFragment} />
      </MemoryRouter>
  })

  expect(await screen.findByText("author_01")).toBeInTheDocument();
  expect(await screen.findByText(new RegExp(`Joined.*${dateFormatter(date)}`))).toBeInTheDocument();
  expect(await screen.findByText("10")).toBeInTheDocument();
  expect(await screen.findByText("Followers")).toBeInTheDocument();
  expect(await screen.findByText("20")).toBeInTheDocument();
  expect(await screen.findByText("Following")).toBeInTheDocument();
})
