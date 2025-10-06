import { gql } from "../../__generated__"

export const CREATE_COLLECTION = gql(`
    mutation CreateCollection($title: String!) {
      createCollection(title: $title) {
        id
      }
    }
`)
