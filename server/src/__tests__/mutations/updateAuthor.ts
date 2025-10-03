import { gql } from "graphql-tag";

export const UPDATE_AUTHOR = gql(`
    mutation UpdateAuthor ($input: UpdateAuthorInput!) {
        updateAuthor (input: $input) {
            id
            username
            email
        }
    }
`);
