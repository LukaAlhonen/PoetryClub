import { gql } from "../../__generated__";

export const GET_COLLECTION = gql(`
    query GetCollection($id: ID!) {
        collection(id: $id) {
            id
            ...CollectionFragment
            poems {
                ...PoemFragment
            }
        }
    }
`);
