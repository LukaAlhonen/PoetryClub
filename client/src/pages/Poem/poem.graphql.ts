import { gql } from "../../__generated__";

export const GET_POEM = gql(`
    query GetPoem(
      $poemId: ID!
      $commentsLimit: Int
      $commentsCursor: ID
    ) {
      poem(id: $poemId) {
          id
          ...PoemDetailFragment
          comments (first: $commentsLimit after: $commentsCursor) {
              edges {
                  node {
                      id
                      ...CommentFragment
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
    }
`)
