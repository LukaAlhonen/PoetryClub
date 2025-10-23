import { gql } from "../../__generated__"

export const POEM_DETAIL_FRAGMENT = gql(`
    fragment PoemDetailFragment on Poem {
        id
        title
        text
        inCollection {
            id
            title
        }
        datePublished
        author {
            id
            username
        }
        views
        likesCount
        commentsCount
        savedByCount
    }
`)
