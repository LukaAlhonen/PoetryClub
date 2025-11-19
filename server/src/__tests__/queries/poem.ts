import { gql } from "graphql-tag";

export const GET_POEM = gql(`
   query GetPoem(
       $id: ID!
       $commentsLimit: Int
       $commentsCursor: ID
       $likesLimit: Int
       $likesCursor: ID
       $savedByLimit: Int
       $savedByCursor: ID
   ) {
       poem(
           id: $id
       ) {
           id
           title
           text
           author {
               id
           }
           datePublished
           comments(first: $commentsLimit, after: $commentsCursor) {
               edges {
                   node {
                       id
                       poem {
                           id
                       }
                   }
                   cursor
               }
               pageInfo {
                   hasNextPage
                   hasPreviousPage
                   startCursor
                   endCursor
                   pageSize
               }
           }
           commentsCount
           inCollection {
               id
           }
           likes(first: $likesLimit, after: $likesCursor) {
               edges {
                   node {
                       id
                       poem {
                           id
                       }
                   }
                   cursor
               }
               pageInfo {
                   hasNextPage
                   hasPreviousPage
                   startCursor
                   endCursor
                   pageSize
               }
           }
           likesCount
           savedBy(first: $savedByLimit, after: $savedByCursor) {
               edges {
                   node {
                       id
                       poem {
                           id
                       }
                   }
                   cursor
               }
               pageInfo {
                   hasNextPage
                   hasPreviousPage
                   startCursor
                   endCursor
                   pageSize
               }
           }
           savedByCount
           views
       }
   }
`);
