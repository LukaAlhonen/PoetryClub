import { gql } from "../../__generated__"

export const CREATE_COMMENT = gql(`
    mutation CreateComment($poemId: ID!, $text: String!) {
      createComment(poemId: $poemId, text: $text) {
        id
      }
    }
`)
