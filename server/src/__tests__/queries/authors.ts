import { gql } from "graphql-tag";

export const GET_AUTHORS = gql(`
    query GetAuthors(
        $first: Int
        $after: ID
        $poemsLimit: Int
        $poemsCursor: ID
        $commentsLimit: Int
        $commentsCursor: ID
        $savedPoemsLimit: Int
        $savedPoemsCursor: ID
        $collectionsLimit: Int
        $collectionsCursor: ID
        $likedPoemsLimit: Int
        $likedPoemsCursor: ID
        $followingLimit: Int
        $followingCursor: ID
        $followedByLimit: Int
        $followedByCursor: ID
        $usernameContains: String
    ) {
        authors(
            first: $first
            after: $after
            usernameContains: $usernameContains
        ) {
            edges {
                node {
                    id
                    username
                    email
                    poems (first: $poemsLimit after: $poemsCursor) {
                        edges {
                            node {
                                id
                                author {
                                    id
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
                                author {
                                    id
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
                    comments (first: $commentsLimit after: $commentsCursor){
                        edges {
                            node {
                                id
                                author {
                                    id
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
                    collections (first: $collectionsLimit after: $collectionsCursor) {
                        edges {
                            node {
                                id
                                author {
                                    id
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
                    likedPoems (first: $likedPoemsLimit after: $likedPoemsCursor) {
                        edges {
                            node {
                                id
                                author {
                                    id
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
                    following (first: $followingLimit after: $followingCursor) {
                        edges {
                            node {
                                id
                                follower {
                                    id
                                }
                                following {
                                    id
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
                    followingCount
                    followedBy (first: $followedByLimit after: $followedByCursor) {
                        edges {
                            node {
                                id
                                following {
                                    id
                                }
                                follower {
                                    id
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
                    followedByCount
                    dateJoined
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
`);
