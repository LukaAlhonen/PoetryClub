import { gql } from "graphql-tag";

export const INCREMENT_POEM_VIEWS = gql(`
    mutation IncrementPoemViews ($poemId: ID!) {
        incrementPoemViews (poemId: $poemId) {
            id
            title
            text
            views
        }
    }
`);
