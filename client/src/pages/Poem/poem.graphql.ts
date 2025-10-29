import { gql } from "../../__generated__";

export const GET_POEM = gql(`
    query GetPoem(
      $poemId: ID!
      $commentsLimit: Int
      $commentsCursor: ID
      $authorId: ID
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
    }
`)
