import { gql } from "../../__generated__";

export const FOLLOW_AUTHOR = gql(`
    mutation FollowAuthor ($followingId: ID!) {
        createFollowedAuthor (followingId: $followingId) {
            id
            following {
                id
                ...FollowedAuthorFragment
            }
            follower {
                id
                ...FollowedAuthorFragment
            }
        }
    }
`)
