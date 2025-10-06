import { gql } from "../../__generated__";

export const UPDATE_AUTHOR = gql(`
    mutation UpdateAuthor($input: UpdateAuthorInput!) {
      updateAuthor(input: $input) {
        id
        username
      }
    }
`)
