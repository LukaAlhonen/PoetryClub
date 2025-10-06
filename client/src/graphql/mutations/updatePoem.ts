import { gql } from "../../__generated__";

export const UPDATE_POEM = gql(`
    mutation UpdatePoem($input: UpdatePoemInput!) {
      updatePoem(input: $input) {
        id
      }
    }
`)
