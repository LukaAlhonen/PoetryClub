import { gql } from "graphql-tag";

export const REMOVE_POEM = gql(`
    mutation RemovePoem ($poemId: ID!) {
        removePoem (poemId: $poemId) {
            id
        }
    }
`);
