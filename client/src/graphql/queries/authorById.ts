import { gql } from "../../__generated__";

export const GET_AUTHOR_BY_ID = gql(`
    query GetAuthorById(
        $id: ID!
        $poemsLimit: Int
        $poemsCursor: ID
        $likedPoemsLimit: Int
        $likedPoemsCursor: ID
        $collectionsLimit: Int
        $collectionsCursor: ID
    ) {
        authorById(id: $id) {
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
