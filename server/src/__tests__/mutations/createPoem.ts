import { gql } from "graphql-tag";

export const CREATE_POEM = gql(`
    mutation CreatePoem (
        $input: CreatePoemInput!
    ) {
        createPoem (
            input: $input
        ) {
            id
            title
            text
            inCollection {
                id
            }
            author {
                id
            }
            datePublished
        }
    }
`);
