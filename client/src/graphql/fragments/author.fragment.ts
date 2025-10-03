import { gql } from "../../__generated__";

export const AUTHOR_FRAGMENT = gql(`
    fragment AuthorFragment on Author {
        id
        username
        dateJoined
        followedByCount
        followingCount
    }
`);
