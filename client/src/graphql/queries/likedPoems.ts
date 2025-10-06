import { gql } from "../../__generated__";

export const GET_LIKED_POEMS = gql(`
    query GetLikedPoems ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {
        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {
            id
            ...LikedPoemFragment
        }
    }
`)
