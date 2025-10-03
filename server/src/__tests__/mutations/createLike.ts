import { gql } from "graphql-tag";

export const CREATE_LIKE = gql(`
    mutation CreateLike ($poemId: ID!) {
        createLike (poemId: $poemId) {
            id
            author {
                id
            }
            poem {
                id
            }
            datePublished
        }
    }
`);
