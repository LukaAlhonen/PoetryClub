import { gql } from "../../__generated__";

export const GET_AUTHOR_BY_USERNAME = gql(`
    query GetAuthorByUsername(
        $username: String!
        $poemsLimit: Int
        $poemsCursor: ID
        $likedPoemsLimit: Int
        $likedPoemsCursor: ID
        $collectionsLimit: Int
        $collectionsCursor: ID
    ) {
        authorByUsername(username: $username) {
            id
            ...AuthorFragment
            poems(limit: $poemsLimit, cursor: $poemsCursor) {
                ...PoemFragment
            }
            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {
                ...LikedPoemFragment
            }
            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {
                ...CollectionFragment
            }
        }
    }
`);
