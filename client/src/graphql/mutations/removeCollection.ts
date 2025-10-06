import { gql } from "../../__generated__";

export const REMOVE_COLLECTION = gql(`
    mutation RemoveCollection($collectionId: ID!) {
      removeCollection(collectionId: $collectionId) {
        id
      }
    }
`)
