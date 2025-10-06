import { gql } from "../../__generated__"

export const CREATE_FOLLOWED_AUTHOR = gql(`
    mutation CreateFollowedAuthor($followingId: ID!) {
      createFollowedAuthor(followingId: $followingId) {
        id
      }
    }
`)
