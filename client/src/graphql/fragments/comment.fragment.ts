import { gql } from "../../__generated__";

export const COMMENT_FRAGMENT = gql(`
    fragment CommentFragment on Comment {
        id
        text
        author {
            ...AuthorSimpleFragment
        }
    }
`);
