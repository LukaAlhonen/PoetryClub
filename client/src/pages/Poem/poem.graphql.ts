import { gql } from "../../__generated__";

// $commentsLimit: Int
// $commentsCursor: ID
// $likesLimit: Int
// $likesCursor: ID
// $savedByLimit: Int
// $savedByCursor: ID


export const GET_POEM = gql(`
    query GetPoem(
      $poemId: ID!
    ) {
      poem(id: $poemId) {
          id
          ...PoemDetailFragment
      }
    }
`)
