import { gql } from "graphql-tag";

export const GET_SAVED_POEMS = gql(`
    query GetSavedPoems(
        $limit: Int
        $cursor: ID
        $authorId: ID
        $poemId: ID
    ) {
        savedPoems(limit: $limit cursor: $cursor authorId: $authorId poemId: $poemId) {
            id
            author {
                id
            }
            poem {
                id
            }
            dateSaved
        }
    }
`);
