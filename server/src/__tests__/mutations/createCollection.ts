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
                id
            }
            dateCreated
        }
    }
`);
