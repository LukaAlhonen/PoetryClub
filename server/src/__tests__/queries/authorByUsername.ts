import { gql } from "graphql-tag";

export const GET_AUTHOR_BY_USERNAME = gql(`
    query GetAuthorByUsername(
        $username: String!
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
    ) {
        authorByUsername(
            username: $username
        ) {
            id
            username
            email
            poems(limit: $poemsLimit, cursor: $poemsCursor) {
                id
                author {
                    id
                }
            }
            savedPoems(limit: $savedPoemsLimit, cursor: $savedPoemsCursor) {
                id
                author {
                    id
                }
            }
            comments(limit: $commentsLimit, cursor: $commentsCursor) {
                id
                author {
                    id
                }
            }
            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {
                id
                author {
                    id
                }
            }
            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {
                id
                author {
                    id
                }
            }
            following(limit: $followingLimit, cursor: $followingCursor) {
                id
                follower {
                    id
                }
                following {
                    id
                }
            }
            followingCount
            followedBy(limit: $followedByLimit, cursor: $followedByCursor) {
                id
                following {
                    id
                }
                follower {
                    id
                }
            }
            followedByCount
            dateJoined
        }
    }
`);
