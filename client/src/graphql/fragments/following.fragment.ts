import { gql } from "../../__generated__";

export const FOLLOWING_FRAGMENT = gql(`
    fragment FollowingFragment on FollowedAuthor {
        id
        following {
            ...AuthorSimpleFragment
        }
    }
`);
