import { gql } from "graphql-tag";

export const GET_SAVED_POEMS = gql(`
    query GetSavedPoems(
        $first: Int
        $after: ID
        $authorId: ID
        $poemId: ID
    ) {
        savedPoems(first: $first after: $after authorId: $authorId poemId: $poemId) {
            edges {
                node {
                    id
                    author {
                        id
                    }
                    poem {
                        id
                    }
                    dateSaved
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
                pageSize
            }
        }
    }
`);
