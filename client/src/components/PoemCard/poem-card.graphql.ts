import { gql } from "../../__generated__";

export const POEM_CARD_FRAGMENT = gql(`
    fragment PoemCardFragment on Poem {
        id
        title
        text
        datePublished
        author {
            id
            username
        }
        views
        likesCount
        commentsCount
        savedByCount
        inCollection {
           id
           title
        }
    }
`);
