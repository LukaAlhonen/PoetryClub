import { gql } from "../../__generated__";

export const CREATE_LIKE = gql(`
    mutation CreateLike($poemId: ID!) {
      createLike(poemId: $poemId) {
        id
      }
    }
`)
