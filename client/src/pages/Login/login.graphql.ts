import { gql } from "../../__generated__";

export const LOGIN = gql(`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        author {
          id
          username
        }
      }
    }
`)
