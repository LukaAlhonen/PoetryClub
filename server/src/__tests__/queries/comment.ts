import { gql } from "graphql-tag";

export const GET_COMMENT = gql(`
    query GetComment($id: ID!) {
        comment(id: $id) {
            id
            author {
                id
            }
            poem {
                id
            }
            text
            datePublished
        }
    }
`);
