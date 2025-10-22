import { gql } from "../../__generated__";

export const GET_POEMS_WITH_FILTER = gql(`
  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter) {
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
