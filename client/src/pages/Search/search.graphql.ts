import { gql } from "../../__generated__";

export const GET_POEMS_WITH_FILTER = gql(`
  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter, $currentUserId: ID) {
    poems(first: $first, after: $after, filter: $filter) {
      edges {
          node {
            id
            ...PoemCardFragment
            likes (authorId: $currentUserId) {
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
