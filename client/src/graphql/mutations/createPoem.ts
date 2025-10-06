import { gql } from "../../__generated__"

export const CREATE_POEM = gql(`
    mutation CreatePoem($input: CreatePoemInput!) {
      createPoem(input: $input) {
        id
      }
    }
`)
