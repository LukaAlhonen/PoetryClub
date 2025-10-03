import { gql } from "../../__generated__";

export const LIKED_POEM_FRAGMENT = gql(`
    fragment LikedPoemFragment on Like {
        id
        poem {
            id
            ...PoemFragment
        }
    }
`);
