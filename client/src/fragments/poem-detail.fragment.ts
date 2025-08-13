import { gql } from "../__generated__";

export const POEM_DETAIL_FRAGMENT = gql(`
  fragment PoemDetailFragment on Poem {
     id
     title
     datePublished
     text
     author {
         username
     }
  }
`);
