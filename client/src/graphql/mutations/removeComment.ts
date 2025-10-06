import { gql } from "../../__generated__";

export const REMOVE_COMMENT = gql(`
    mutation RemoveComment($commentId: ID!) {
      removeComment(commentId: $commentId) {
        id
      }
    }
`)
