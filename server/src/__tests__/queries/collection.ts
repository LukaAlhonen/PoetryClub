import { gql } from "graphql-tag";

export const GET_COLLECTION = gql(`
    query GetCollection($id: ID! $poemsLimit: Int $poemsCursor: ID) {
        collection(id: $id) {
            id
            author {
                id
            }
            poems(first: $poemsLimit, after: $poemsCursor) {
                edges {
                    node {
                        id
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
            dateCreated
            title
        }
    }
`);
