import { gql } from "graphql-tag";

export const GET_POEMS = gql(`
   query GetPoems(
       $first: Int
       $after: ID
       $filter: GetPoemsFilter
   ) {
       poems(
           first: $first
           after: $after
           filter: $filter
       ) {
           edges {
               node {
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
           pageInfo {
               hasNextPage
               hasPreviousPage
               startCursor
               endCursor
               pageSize
           }
       }
   }
`);
