import { gql } from "graphql-tag";

export const GET_COLLECTIONS = gql(`
    query GetCollections($limit: Int $cursor: ID $filter: GetCollectionsFilter) {
        collections(limit: $limit, cursor: $cursor, filter: $filter) {
            id
            author {
                id
            }
            poems {
                id
            }
            dateCreated
            title
        }
    }
`);
