import { gql } from "../../__generated__";

export const UNFOLLOW_AUTHOR = gql(`
    mutation UnfollowAuthor ($followedAuthorId: ID!) {
        removeFollowedAuthor (followedAuthorId: $followedAuthorId) {
            id
            follower {
                id
            }
            following {
                id
            }
        }
    }
`)
