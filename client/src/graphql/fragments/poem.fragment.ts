import { gql } from "../../__generated__";

export const POEM_FRAGMENT = gql(`
    fragment PoemFragment on Poem {
        id
        title
        text
        datePublished
        author {
            ...AuthorSimpleFragment
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
