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

export const INCREMENT_POEM_VIEWS = gql(`
    mutation IncrementPoemViews($poemId: ID!) {
        incrementPoemViews (poemId: $poemId) {
            id
        }
    }
`)
