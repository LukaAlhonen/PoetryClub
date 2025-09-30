import { gql } from "graphql-tag";

export const REMOVE_COLLECTION = gql(`
    mutation RemoveCollection ($collectionId: ID!) {
      removeCollection (collectionId: $collectionId) {
            id
        }
    }
`);
