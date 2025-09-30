import { gql } from "graphql-tag";

export const GET_POEMS = gql`
  query GetPoems($limit: Int, $cursor: ID, $filter: GetPoemsFilter) {
    poems(limit: $limit, cursor: $cursor, filter: $filter) {
      id
      ...PoemFragment
    }
  }
`;
