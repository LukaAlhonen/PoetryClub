import { gql } from "../../__generated__";

export const FOLLOWED_AUTHOR_FRAGMENT = gql(`
    fragment FollowedAuthorFragment on Author {
        id
        username
    }
`)
