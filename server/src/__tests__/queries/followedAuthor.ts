import { gql } from "graphql-tag";

export const GET_FOLLOWED_AUTHOR = gql(`
    query GetFollowedAuthor($id: ID!) {
        followedAuthor(id: $id) {
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
