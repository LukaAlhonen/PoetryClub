import { beforeAll, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockLink } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import Search from "../search";
import type { GetPoemsWithFilterQuery, GetPoemsWithFilterQueryVariables, PoemsConnection } from "../../../__generated__/graphql";
import { GET_POEMS_WITH_FILTER } from "../search.graphql";

beforeAll(() => {
  // dummy intersectionobserver mock
  const mockIntersectionObserver = vi.fn()
  mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

const date = new Date()

const mockPoems: PoemsConnection = {
  edges: [
    {
      node: {
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
          poems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          savedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          collections: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          likedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          comments: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedBy: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          following: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedByCount: 0,
          followingCount: 0
        },
        views: 200,
        commentsCount: 10,
        likesCount: 50,
        inCollection: null,
        savedByCount: 7,
        comments: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        likes: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        savedBy: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
      },
      cursor: "p_01",
    },
    {
    node: {
      __typename: "Poem",
      id: "p_02",
      title: "poem_02",
      text: "poem_02_text",
      datePublished: date,
      author: {
        __typename: "Author",
        id: "a_01",
        username: "author_01",
        email: "author_01",
        dateJoined: new Date(),
        poems: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        savedPoems: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        collections: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        likedPoems: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        comments: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        followedBy: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        following: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        followedByCount: 0,
        followingCount: 0
      },
      views: 200,
      commentsCount: 10,
      likesCount: 50,
      inCollection: null,
      savedByCount: 7,
      comments: {
        edges: [],
        pageInfo: {hasNextPage: false, hasPreviousPage: false}
      },
      likes: {
        edges: [],
        pageInfo: {hasNextPage: false, hasPreviousPage: false}
      },
      savedBy: {
        edges: [],
        pageInfo: {hasNextPage: false, hasPreviousPage: false}
      },
      },
      cursor: "p_02"
    },
    {
      node: {
        __typename: "Poem",
        id: "p_03",
        title: "poem_03",
        text: "poem_03_text",
        datePublished: date,
        author: {
          __typename: "Author",
          id: "a_02",
          username: "author_02",
          email: "author_02",
          dateJoined: new Date(),
          poems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          savedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          collections: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          likedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          comments: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedBy: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          following: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedByCount: 0,
          followingCount: 0
        },
        views: 200,
        commentsCount: 10,
        likesCount: 50,
        inCollection: null,
        savedByCount: 7,
        comments: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        likes: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        savedBy: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
      },
      cursor: "p_03"
    },
    {
      node: {
        __typename: "Poem",
        id: "p_04",
        title: "poem_04",
        text: "poem_04_text",
        datePublished: date,
        author: {
          __typename: "Author",
          id: "a_02",
          username: "author_02",
          email: "author_02",
          dateJoined: new Date(),
          poems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          savedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          collections: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          likedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          comments: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedBy: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          following: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedByCount: 0,
          followingCount: 0
        },
        views: 200,
        commentsCount: 10,
        likesCount: 50,
        inCollection: null,
        savedByCount: 7,
        comments: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        likes: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        savedBy: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
      },
      cursor: "p_04"
    },
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: "p_04",
    startCursor: "p_01",
    pageSize: 4
  }
}

const mockPoems2: PoemsConnection = {
  edges: [
    {
      node: {
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
          poems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          savedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          collections: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          likedPoems: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          comments: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedBy: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          following: {
            edges: [],
            pageInfo: {hasNextPage: false, hasPreviousPage: false}
          },
          followedByCount: 0,
          followingCount: 0
        },
        views: 200,
        commentsCount: 10,
        likesCount: 50,
        inCollection: null,
        savedByCount: 7,
        comments: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        likes: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
        savedBy: {
          edges: [],
          pageInfo: {hasNextPage: false, hasPreviousPage: false}
        },
      },
      cursor: "p_01",
    },
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "p_01",
    endCursor: "p_01",
    pageSize: 1
  }
}

// const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_CARD_FRAGMENT)

const mocks: MockLink.MockedResponse<GetPoemsWithFilterQuery, GetPoemsWithFilterQueryVariables>[] = [
  {
    request: {
      query: GET_POEMS_WITH_FILTER,
      variables: { first: 5, currentUserId: null },
    },
    result: {
      data: {
        poems: mockPoems
      }
    }
  },
  {
    request: {
      query: GET_POEMS_WITH_FILTER,
      variables: { first: 5, currentUserId: null, filter: { filter: "0" } },
    },
    result: {
      data: {
        poems: mockPoems
      }
    }
  },
  {
    request: {
      query: GET_POEMS_WITH_FILTER,
      variables: { first: 5, currentUserId: null, filter: { filter: "01" } },
    },
    result: {
      data: {
        poems: mockPoems2
      }
    }
  },
]

test("Renders poem-card without errors", async () => {
  renderMockProvider({
    component:
    <MemoryRouter>
      <Search></Search>
    </MemoryRouter>,
    mocks
  })

  expect(await screen.findByText("poem_01")).toBeInTheDocument();
  expect(await screen.findByText("poem_02")).toBeInTheDocument();
  expect(await screen.findByText("poem_03")).toBeInTheDocument();
  expect(await screen.findByText("poem_04")).toBeInTheDocument();

  expect(await screen.findByText("poem_01_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_02_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_03_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_04_text")).toBeInTheDocument();

  // find 4 poems
  const poemCards = await screen.findAllByText(/poem_0\d+_text/i);
  expect(poemCards).toHaveLength(4);

  // simulate live search typing
  // 1st result
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "0");

  expect(await screen.findByText("poem_01")).toBeInTheDocument();
  expect(await screen.findByText("poem_02")).toBeInTheDocument();
  expect(await screen.findByText("poem_03")).toBeInTheDocument();
  expect(await screen.findByText("poem_04")).toBeInTheDocument();

  expect(await screen.findByText("poem_01_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_02_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_03_text")).toBeInTheDocument();
  expect(await screen.findByText("poem_04_text")).toBeInTheDocument();

  // find 4 poems
  const poemCards2 = await screen.findAllByText(/poem_0\d+_text/i);
  expect(poemCards2).toHaveLength(4);

  // 2nd result
  await userEvent.type(input, "1");

  expect(await screen.findByText("poem_01")).toBeInTheDocument();
  expect(await screen.findByText("poem_01_text")).toBeInTheDocument();

  // find 1 poems
  const poemCard = await screen.findAllByText(/poem_0\d+_text/i);
  expect(poemCard).toHaveLength(1);
})
