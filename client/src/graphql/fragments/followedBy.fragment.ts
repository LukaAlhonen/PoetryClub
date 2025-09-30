import { gql } from "../../__generated__";

export const FOLLOWED_BY_FRAGMENT = gql(`
    fragment FollowedByFragment on FollowedAuthor {
        id
        follower {
            ...AuthorSimpleFragment
        }
    }
`);
