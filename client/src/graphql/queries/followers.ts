import { gql } from "../../__generated__";

export const GET_FOLLOWERS = gql(`
    query GetFollowers ($limit: Int $cursor: ID $followingId: ID) {
        followedAuthors(limit: $limit cursor: $cursor followingId: $followingId) {
            id
            ...FollowedByFragment
        }
    }
`)
