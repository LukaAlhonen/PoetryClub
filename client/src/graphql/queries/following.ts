import { gql } from "../../__generated__";

export const GET_FOLLOWING = gql(`
    query GetFollowing ($limit: Int $cursor: ID $followerId: ID) {
        followedAuthors(limit: $limit cursor: $cursor followerId: $followerId) {
            id
            ...FollowingFragment
        }
    }
`)
