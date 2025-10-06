import { gql } from "../../__generated__";

export const GET_COMMENTS = gql(`
    query GetComments ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {
        comments (limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {
            id
            ...CommentFragment
        }
    }
`)
