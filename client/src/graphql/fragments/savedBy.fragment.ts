import { gql } from "../../__generated__"

export const SAVED_BY_FRAGMENT = gql(`
    fragment SavedByFragment on SavedPoem {
        id
        author {
            ...AuthorSimpleFragment
        }
    }
`)
