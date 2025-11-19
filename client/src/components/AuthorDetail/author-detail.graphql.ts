import { gql } from "../../__generated__";

export const AUTHOR_DETAIL_FRAGMENT = gql(`
    fragment AuthorDetailFragment on Author {
        id
        username
        dateJoined
        followedByCount
        followingCount
        followedByCurrentUser {
            id
            follower {
                id
                ...FollowedAuthorFragment
            }
            following {
                id
                ...FollowedAuthorFragment
            }
        }
    }
`)
