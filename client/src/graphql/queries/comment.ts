import { gql } from "../../__generated__";

export const GET_COMMENT = gql(`
    query GetComment($id: ID!) {
        comment(id: $id) {
            id
            text
            poem {
                ...PoemFragment
            }
            author {
                ...AuthorSimpleFragment
            }
            datePublished
        }
    }
`)
