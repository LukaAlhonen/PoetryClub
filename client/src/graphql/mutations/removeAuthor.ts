import { gql } from "../../__generated__"

export const REMOVE_AUTHOR = gql(`
    mutation RemoveAuthor {
      removeAuthor {
        id
      }
    }
`)
