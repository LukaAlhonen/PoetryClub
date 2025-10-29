import { gql } from "../../__generated__";

export const GET_AUTHOR = gql(`
    query GetAuthor (
        $username: String!
        $poemsLimit: Int $poemsCursor: ID
        $followedByLimit: Int $followedByCursor: ID
        $followingLimit: Int $followingCursor: ID
        $likedPoemsLimit: Int $likedPoemsCursor: ID
        $savedPoemsLimit: Int $savedPoemsCursor: ID
    ) {
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
            likedPoems (first: $likedPoemsLimit after: $likedPoemsCursor) {
                edges {
                    node {
                        id
                        poem {
                            id
                            ...PoemCardFragment
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
            savedPoems (first: $savedPoemsLimit after: $savedPoemsCursor) {
                edges {
                    node {
                        id
                        poem {
                            id
                            ...PoemCardFragment
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
            followedBy (first: $followedByLimit after: $followedByCursor) {
                edges {
                    node {
                        id
                        follower {
                            id
                            ...FollowedAuthorFragment
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                    startCursor
                    pageSize
                }
            }
            following (first: $followingLimit after: $followingCursor) {
                edges {
                    node {
                        id
                        following {
                            id
                            ...FollowedAuthorFragment
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                    startCursor
                    pageSize
                }
            }
        }
    }
`)
