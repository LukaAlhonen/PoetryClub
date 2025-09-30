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
           comments(limit: $commentsLimit, cursor: $commentsCursor) {
               id
               poem {
                   id
               }
           }
           commentsCount
           inCollection {
               id
           }
           likes(limit: $likesLimit, cursor: $likesCursor) {
               id
               poem {
                   id
               }
           }
           likesCount
           savedBy(limit: $savedByLimit, cursor: $savedByCursor) {
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
