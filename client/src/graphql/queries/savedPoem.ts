import { gql } from "graphql-tag";

export const GET_SAVED_POEM = gql(`
    query GetSavedPoem ($id: ID!) {
        savedPoem(id: $id) {
            id
            author {
                id
                ...AuthorSimpleFragment
            }
            poem {
                id
                ...PoemFragment
            }
            dateSaved
        }
    }
`)
