import { gql } from "graphql-tag";

export const CREATE_SAVED_POEM = gql(`
    mutation CreateSavedPoem (
        $poemId: ID!
    ) {
        createSavedPoem (
            poemId: $poemId
        ) {
            id
            author {
                id
            }
            poem {
                id
            }
            dateSaved
        }
    }
`);
