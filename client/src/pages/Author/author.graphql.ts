import { gql } from "../../__generated__";

export const GET_AUTHOR = gql(`
    query GetAuthor (
        $username: String!
        $poemsLimit: Int $poemsCursor: ID
        $followedByLimit: Int $followedByCursor: ID
        $followingLimit: Int $followingCursor: ID
        $currentUserId: ID
    ) {
        authorByUsername (username: $username) {
            id
            ...AuthorDetailFragment
            poems (first: $poemsLimit after: $poemsCursor) {
                edges {
                    node {
                        id
                        ...PoemCardFragment
                        likes(authorId: $currentUserId) {
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
                            }
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
