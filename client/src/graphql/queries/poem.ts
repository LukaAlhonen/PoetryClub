import { gql } from "graphql-tag";

export const GET_POEM = gql`
  query GetPoem(
    $poemId: ID!
    $commentsLimit: Int
    $commentsCursor: ID
    $likesLimit: Int
    $likesCursor: ID
    $savedByLimit: Int
    $savedByCursor: ID
  ) {
    poem(id: $poemId) {
        id
        ...PoemFragment
        comments(limit: $commentsLimit, cursor: $commentsCursor) {
            ...CommentFragment
        }
        likes(limit: $likesLimit, cursor: $likesCursor) {
            ...LikeFragment
        }
        savedBy(limit: $savedByLimit, cursor: $savedByCursor) {
            ...SavedByFragment
        }
  }
`;
