import { gql } from "graphql-tag";

export const GET_LIKES = gql(`
    query GetLikes($limit: Int $cursor: ID $authorId: ID $poemId: ID) {
        likes(limit: $limit cursor: $cursor authorId: $authorId poemId: $poemId) {
            id
            author {
                id
            }
            poem {
                id
            }
            datePublished
        }
    }
`);
