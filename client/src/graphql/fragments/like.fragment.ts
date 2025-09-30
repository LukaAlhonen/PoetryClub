import { gql } from "../../__generated__";

export const LIKE_FRAGMENT = gql(`
    fragment LikeFragment on Like {
        id
        author {
            ...AuthorSimpleFragment
        }
    }
`);
