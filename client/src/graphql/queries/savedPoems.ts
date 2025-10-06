import { gql } from "../../__generated__/"

export const GET_SAVED_POEMS = gql(`
    query GetSavedPoems ($limit: Int, $cursor: ID, $poemId: ID, $authorId: ID) {
        savedPoems(limit: $limit, cursor: $cursor, poemId: $poemId, authorId: $authorId) {
            id
            poem {
                ...PoemFragment
            }
            author {
                ...AuthorSimpleFragment
            }
            dateSaved
        }
    }
`)
