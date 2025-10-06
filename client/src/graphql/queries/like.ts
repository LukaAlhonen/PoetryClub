import { gql } from "../../__generated__";

export const GET_LIKE = gql(`
    query GetLike ($id: ID!) {
        like (id: $id) {
           id
           author {
               id
               ...AuthorSimpleFragment
           }
           poem {
               id
               ...PoemFragment
           }
        }
    }
`)
