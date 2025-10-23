import { gql } from "../../__generated__";

export const SIGNUP = gql(`
    mutation Signup ($input: CreateAuthorInput!) {
        signup (input: $input) {
            id
            username
        }
    }
`)
