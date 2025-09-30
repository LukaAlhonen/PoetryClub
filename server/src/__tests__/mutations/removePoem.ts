import { gql } from "graphql-tag";

export const REMOVE_POEM = gql(`
    mutation RemovePome ($poemId: ID!) {
        removePoem (poemId: $poemId) {
            id
        }
    }
`);
