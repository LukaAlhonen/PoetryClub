import { gql } from "graphql-tag";

export const CREATE_COLLECTION = gql(`
    mutation CreateCollection (
        $title: String!
    ) {
        createCollection (title: $title) {
            id
            title
            author {
                id
            }
            poems {
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
        }
    }
`);
