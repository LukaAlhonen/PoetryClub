import { gql } from "graphql-tag";

export const GET_FOLLOWED_AUTHORS = gql(`
    query GetFollowedAuthors(
        $limit: Int
        $cursor: ID
        $followingId: ID
        $followerId: ID
    ) {
        followedAuthors(
            limit: $limit
            cursor: $cursor
            followingId: $followingId
            followerId: $followerId
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
