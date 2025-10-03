import { gql } from "../../__generated__";

export const GET_AUTHORS = gql(`
    query GetAuthors(
        $limit: Int
        $cursor: ID
        $usernameContains: String
    ) {
        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {
            id
            ...AuthorSimpleFragment
        }
    }
`);
