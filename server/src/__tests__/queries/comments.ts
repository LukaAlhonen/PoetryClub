import { gql } from "graphql-tag";

export const GET_COMMENTS = gql(`
    query GetComments($limit: Int $cursor: ID $authorId: ID $poemId: ID) {
        comments(limit: $limit, cursor: $cursor, authorId: $authorId, poemId: $poemId) {
            id
            author {
                id
            }
            poem {
                id
            }
            text
            datePublished
        }
    }
`);
