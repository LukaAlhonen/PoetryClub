import { gql } from "graphql-tag";

export const GET_COLLECTIONS = gql(`
    query GetCollections($first: Int $after: ID $poemsLimit: Int $poemsCursor: ID $filter: GetCollectionsFilter) {
        collections(first: $first, after: $after, filter: $filter) {
            edges {
                node {
                    id
                    author {
                        id
                    }
                    poems (first: $poemsLimit after: $poemsCursor) {
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
