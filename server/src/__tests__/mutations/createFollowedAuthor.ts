import { gql } from "graphql-tag";

export const CREATE_FOLLOWED_AUTHOR = gql(`
    mutation CreateFollowedAuthor (
        $followingId: ID!
    ) {
        createFollowedAuthor (
            followingId: $followingId
        ) {
            id
            follower {
                id
            }
            following {
                id
            }
            dateFollowed
        }
    }
`);
