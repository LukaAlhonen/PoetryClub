import { gql } from "graphql-tag";

export const UPDATE_POEM = gql(`
    mutation UpdatePoem ($input: UpdatePoemInput!) {
        updatePoem (input: $input) {
            id
            title
            author {
                id
            }
            text
            datePublished
            inCollection {
                id
            }
            views
        }
    }
`);
