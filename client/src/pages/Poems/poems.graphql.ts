import { gql } from "../../__generated__";

export const GET_POEMS = gql(`
  query GetPoems($first: Int, $after: ID $authorId: ID) {
    poems(first: $first, after: $after) {
      edges {
          node {
            id
            ...PoemCardFragment
            likes (authorId: $authorId) {
                edges {
                    node {
                        id
                        poem {
                            id
                        }
                        author {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                    pageSize
                }
            }
          }
          cursor
      }
      pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          pageSize
      }
    }
  }
`);
