import { gql } from "graphql-tag";

export const UPDATE_COLLECTION = gql(`
    mutation UpdateCollection ($input: UpdateCollectionInput!) {
        updateCollection (input: $input) {
            id
            title
        }
    }
`);
