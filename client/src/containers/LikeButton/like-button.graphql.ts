import { gql } from "../../__generated__";

export const CREATE_LIKE = gql(`
    mutation CreateLike ($poemId: ID!) {
        createLike(poemId: $poemId) {
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
`)

export const REMOVE_LIKE = gql(`
    mutation RemoveLike($likeId: ID!) {
        removeLike(likeId: $likeId) {
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
`)
