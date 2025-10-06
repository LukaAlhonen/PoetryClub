import { gql } from "../../__generated__";

export const CREATE_AUTHOR = gql(`
    mutation CreateAuthor($input: CreateAuthorInput!) {
      createAuthor(input: $input) {
        id
      }
    }
`)
