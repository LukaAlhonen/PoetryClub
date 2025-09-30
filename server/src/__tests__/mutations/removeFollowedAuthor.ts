import { gql } from "graphql-tag";

export const REMOVE_FOLLOWED_AUTHOR = gql(`
    mutation RemoveFollowedAuthor ($followedAuthorId: ID!) {
        removeFollowedAuthor (followedAuthorId: $followedAuthorId) {
            id
        }
    }
`);
