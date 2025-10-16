import { gql } from "graphql-tag";

export const GET_COMMENTS = gql(`
    query GetComments($first: Int $after: ID $authorId: ID $poemId: ID) {
        comments(first: $first, after: $after, authorId: $authorId, poemId: $poemId) {
            edges {
                node {
                    id
                    author {
                        id
                    }
                    poem {
                        id
                    }
                    text
                    datePublished
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
