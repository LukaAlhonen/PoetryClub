import { gql } from "./__generated__";

// Get all poems, optionally filter by author
export const GET_POEMS = gql(`
    query GetPoems($authorId: ID) {
      poems(authorId: $authorId) {
          id
          ...PoemCardFragment
      }
    }

`);

// Get one poem by id
export const GET_POEM = gql(`
  query GetPoem($poemId: ID!) {
    poem(id: $poemId) {
        id
        ...PoemDetailFragment
    }
  }

`);

// OBS!! DOES NOT WORK
// TODO:
// - fix querying poems for user, seems to return null for now
export const GET_USER = gql(`
    query GetUser($userId: ID!) {
      user(id: $userId) {
        username
        id
        email
        poems {
            id
            ...PoemCardFragment
        }
      }
    }

`);

// Get all users
export const GET_USERS = gql(`
  query GetUsers {
    users {
    id
    username
    email
    }
  }
`);
