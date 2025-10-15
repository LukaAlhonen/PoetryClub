import { gql } from "../../__generated__";

export const GET_POEMS = gql(`
  query GetPoems($first: Int, $after: ID, $filter: GetPoemsFilter) {
    poems(first: $first, after: $after, filter: $filter) {
      edges {
          node {
            id
            ...PoemCardFragment
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
