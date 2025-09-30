import { gql } from "graphql-tag";

export const SIGNUP = gql(`
    mutation Signup (
        $input: CreateAuthorInput!
    ) {
        signup(input: $input) {
            id
            username
            email
            dateJoined
        }
    }
`);
