import { gql } from "graphql-tag";

export const GET_FOLLOWED_AUTHORS = gql(`
    query GetFollowedAuthors(
        $first: Int
        $after: ID
        $followingId: ID
        $followerId: ID
    ) {
        followedAuthors(
            first: $first
            after: $after
            followingId: $followingId
            followerId: $followerId
        ) {
            edges {
                node {
                    id
                    follower {
                        id
                    }
                    following {
                        id
                    }
                    dateFollowed
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
                pageSize
            }
        }
    }
`);
