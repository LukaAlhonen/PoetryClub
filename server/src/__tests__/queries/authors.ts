import { gql } from "graphql-tag";

export const GET_AUTHORS = gql(`
    query GetAuthors(
        $limit: Int
        $cursor: ID
        $usernameContains: String
    ) {
        authors(
            limit: $limit
            cursor: $cursor
            usernameContains: $usernameContains
        ) {
            id
            username
            email
            poems {
                id
                author {
                    id
                }
            }
            savedPoems {
                id
                author {
                    id
                }
            }
            comments {
                id
                author {
                    id
                }
            }
            collections {
                id
                author {
                    id
                }
            }
            likedPoems {
                id
                author {
                    id
                }
            }
            following {
                id
                follower {
                    id
                }
                following {
                    id
                }
            }
            followingCount
            followedBy {
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
