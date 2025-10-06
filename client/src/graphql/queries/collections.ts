import { gql } from "../../__generated__";

export const GET_COLLECTIONS = gql(`
    query GetCollections ($limit: Int $cursor: ID $filter: GetCollectionsFilter) {
        collections(limit: $limit cursor: $cursor filter: $filter) {
            id
            ...CollectionFragment
        }
    }
`)
