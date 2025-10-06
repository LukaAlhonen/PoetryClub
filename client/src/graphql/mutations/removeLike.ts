import { gql } from "../../__generated__";

export const REMOVE_LIKE = gql(`
    mutation RemoveLike($likeId: ID!) {
      removeLike(likeId: $likeId) {
        id
      }
    }
`)
