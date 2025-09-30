import { gql } from "graphql-tag";

export const REMOVE_FOLLOWED_AUTHOR = gql(`
    mutation RemoveFollowedAuthor ($authorId: ID!) {
        removeFollowedAuthor (authorId: $authorId) {
            id
        }
    }
`);
