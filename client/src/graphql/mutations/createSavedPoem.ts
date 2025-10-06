import { gql } from "../../__generated__"

export const CREATE_SAVED_POEM = gql(`
    mutation CreateSavedPoem($poemId: ID!) {
      createSavedPoem(poemId: $poemId) {
        id
      }
    }
`)
