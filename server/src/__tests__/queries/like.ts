import { gql } from "graphql-tag";

export const GET_LIKE = gql(`
    query GetLike($id: ID!) {
        like(id: $id) {
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
