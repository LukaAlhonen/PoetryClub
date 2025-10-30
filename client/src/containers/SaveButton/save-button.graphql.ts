import { gql } from "../../__generated__";

export const CREATE_SAVED_POEM = gql(`
    mutation CreateSavedPoem ($poemId: ID!) {
        createSavedPoem (poemId: $poemId) {
            id
            poem {
                id
                ...PoemCardFragment
            }
            author {
                id
                username
            }
        }
    }
`)

export const REMOVE_SAVED_POEM = gql(`
    mutation RemoveSavedPoem ($savedPoemId: ID!) {
        removeSavedPoem(savedPoemId: $savedPoemId) {
            id
            poem {
                id
            }
            author {
                id
                username
            }
        }
    }
`)
