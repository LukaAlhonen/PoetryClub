import { gql } from "../../__generated__";

export const REMOVE_FOLLOWED_AUTHOR = gql(`
    mutation RemoveFollowedAuthor($followedAuthorId: ID!) {
      removeFollowedAuthor(followedAuthorId: $followedAuthorId) {
        id
      }
    }
`)
