import { gql } from "graphql-tag";

export const GET_COLLECTION = gql(`
    query GetCollection($id: ID! $poemsLimit: Int $poemsCursor: ID) {
        collection(id: $id) {
            id
            author {
                id
            }
            poems(limit: $poemsLimit, cursor: $poemsCursor) {
                id
            }
            dateCreated
            title
        }
    }
`);
