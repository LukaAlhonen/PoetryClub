import { gql } from "graphql-tag";

export const CREATE_COMMENT = gql(`
    mutation CreateComment (
        $poemId: ID! $text: String!
    ) {
        createComment (
            poemId: $poemId, text: $text
        ) {
            id
            text
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
