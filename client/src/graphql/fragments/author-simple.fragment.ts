import { gql } from "../../__generated__";

export const AUTHOR_SIMPLE_FRAGMENT = gql(`
    fragment AuthorSimpleFragment on Author {
        id
        username
    }
`);
