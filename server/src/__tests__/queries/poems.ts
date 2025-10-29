import { gql } from "graphql-tag";

export const GET_POEMS = gql(`
   query GetPoems(
       $first: Int
       $after: ID
       $commentsLimit: Int
       $commentsCursor: ID
       $likesLimit: Int
       $likesCursor: ID
       $savedByLimit: Int
       $savedByCursor: ID
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
                               author {
                                   id
                                   username
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
                   likedByCurrentUser {
                       id
                       poem {
                           id
                       }
                       author {
                           id
                           username
                       }
                   }
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
