import { gql } from "../../__generated__"

export const REMOVE_SAVED_POEM = gql(`
    mutation RemoveSavedPoem($savedPoemId: ID!) {
      removeSavedPoem(savedPoemId: $savedPoemId) {
        id
      }
    }
`)
