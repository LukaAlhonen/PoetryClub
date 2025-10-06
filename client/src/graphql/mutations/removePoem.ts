import { gql } from "../../__generated__";

export const REMOVE_POEM = gql(`
    mutation RemovePoem($poemId: ID!) {
      removePoem(poemId: $poemId) {
        id
      }
    }
`)
