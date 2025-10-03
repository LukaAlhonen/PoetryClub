import { gql } from "graphql-tag";

export const REMOVE_AUTHOR = gql(`
    mutation RemoveAuthor {
      removeAuthor {
            id
        }
    }
`);
