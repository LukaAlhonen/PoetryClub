import { gql } from "../../__generated__";

export const GET_LIKES_FOR_POEM = gql(`
    query GetLikesForPoem ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {
        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {
            id
            ...LikeFragment
        }
    }
`)
