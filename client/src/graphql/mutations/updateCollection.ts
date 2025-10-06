import { gql } from "../../__generated__";

export const UPDATE_COLLECTION = gql(`
    mutation UpdateCollection($input: UpdateCollectionInput!) {
      updateCollection(input: $input) {
        id
      }
    }
`)
