import { gql } from "graphql-tag";

export const GET_LIKES = gql(`
    query GetLikes($first: Int $after: ID $authorId: ID $poemId: ID) {
        likes(first: $first after: $after authorId: $authorId poemId: $poemId) {
            edges {
                node {
                    id
                    author {
                        id
                    }
                    poem {
                        id
                    }
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
