import { gql } from "graphql-tag";

export const REMOVE_LIKE = gql(`
    mutation RemoveLike ($likeId: ID!) {
        removeLike (likeId: $likeId) {
            id
        }
    }
`);
