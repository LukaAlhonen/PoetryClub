import { gql } from "../../__generated__";

export const GET_AUTHOR = gql(`
    query GetAuthor ($username: String! $poemsLimit: Int $poemsCursor: ID) {
        authorByUsername (username: $username) {
            id
            ...AuthorDetailFragment
            poems (first: $poemsLimit after: $poemsCursor) {
                edges {
                    node {
                        id
                        ...PoemCardFragment
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
        }
    }
`)
