import { gql } from "graphql-tag";

export const CREATE_AUTHOR = gql(`
    mutation CreateAuthor (
        $input: CreateAuthorInput!
    ) {
        createAuthor(input: $input) {
            id
            username
            email
            dateJoined
        }
    }
`);
