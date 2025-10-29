import { beforeAll, expect, test, vi } from "vitest";
import { screen } from "@testing-library/react";
// import type { GetPoemsQuery, PoemsConnection } from "../../../__generated__/types";
import { GET_POEMS } from "../../../pages/Poems/poems.graphql";
import { MockLink } from "@apollo/client/testing";
import { renderMockProvider } from "../../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import Poems from "../poems";
import type { GetPoemsQueryVariables, GetPoemsQuery, PoemsConnection } from "../../../__generated__/graphql";

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

// const mockPoemCardFragment = makeFragmentData(mockPoem, POEM_CARD_FRAGMENT)

const mocks: MockLink.MockedResponse<GetPoemsQuery, GetPoemsQueryVariables>[] = [
  {
    request: {
      query: GET_POEMS,
      variables: { first: 5, authorId: null}
    },
    result: {
      data: {
        poems: mockPoems
      }
    }
  }
]

test("Renders poem-card without errors", async () => {
  renderMockProvider({
    component:
    <MemoryRouter>
      <Poems></Poems>
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
    expect(poemCards).toHaveLength(4)
})
