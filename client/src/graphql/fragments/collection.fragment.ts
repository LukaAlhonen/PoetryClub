import { gql } from "../../__generated__";

export const COLLECTION_FRAGMENT = gql(`
    fragment CollectionFragment on Collection {
        id
        title
        dateCreated
        author {
            ...AuthorSimpleFragment
        }
    }
`);
