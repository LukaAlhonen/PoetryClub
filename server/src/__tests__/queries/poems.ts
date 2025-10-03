import { gql } from "graphql-tag";

export const GET_POEMS = gql(`
   query GetPoems(
       $limit: Int
       $cursor: ID
       $filter: GetPoemsFilter
   ) {
       poems(
           limit: $limit
           cursor: $cursor
           filter: $filter
       ) {
           id
           title
           text
           author {
               id
           }
           datePublished
           comments {
               id
               poem {
                   id
               }
           }
           commentsCount
           inCollection {
               id
           }
           likes {
               id
               poem {
                   id
               }
           }
           likesCount
           savedBy {
               id
               poem {
                   id
               }
           }
           savedByCount
           views
       }
   }
`);
