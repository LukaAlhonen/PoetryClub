import { gql } from "graphql-tag";

export const REMOVE_SAVED_POEM = gql(`
    mutation RemoveSavedPoem ($savedPoemId: ID!) {
        removeSavedPoem (savedPoemId: $savedPoemId) {
            id
        }
    }
`);
