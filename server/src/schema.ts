import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(cursor: String, limit: Int!, filter: GetPoemsFilter): [Poem!]!
    poem(id: ID!): Poem
    authorById(id: ID): Author
    authors: [Author!]!
    authorByName(username: String!): Author
    comment(id: ID!): Comment
    comments(authorId: ID, poemId: ID): [Comment!]!
    collection(id: ID!): Collection!
    collections(id: ID!): [Collection!]!
  }

  type Mutation {
    # Create
    createPoem(input: CreatePoemInput!): Poem!
    createAuthor(input: CreateAuthorInput!): Author!
    createComment(input: CreateCommentInput!): Comment!
    createCollection(input: CreateCollectionInput!): Collection!
    createSavedPoem(input: CreateSavedPoemInput!): SavedPoem!
    createLike(input: CreateLikeInput!): Like!

    # Update
    updatePoem(input: UpdatePoemInput!): Poem!
    updateAuthor(input: UpdateAuthorInput!): Author!
    updateCollection(input: UpdateCollectionInput!): Collection!

    # Remove
    removeAuthor(id: String!): Author!
    removePoem(id: String!): Poem!
    removeComment(id: String!): Comment!
    removeCollection(id: String!): Collection!
    removeSavedPoem(id: String!): SavedPoem!
    removeLike(id: String!): Like!

    # Auth
    login(username: String!, password: String!): AuthPayload!
  }

  type Author {
    id: ID!
    username: String!
    email: String!
    poems: [Poem!]!
    savedPoems: [SavedPoem!]!
    comments: [Comment!]!
    collections: [Collection!]!
    likedPoems: [Like!]!
    dateJoined: Date!
  }

  type Poem {
    id: ID!
    title: String!
    author: Author!
    text: String!
    datePublished: Date!
    comments: [Comment!]!
    inCollection: Collection
    likes: [Like!]!
    savedBy: [SavedPoem!]!
    views: Int!
  }

  type Comment {
    id: ID!
    author: Author!
    poem: Poem!
    text: String!
    datePublished: Date!
  }

  type Collection {
    id: ID!
    author: Author!
    poems: [Poem!]!
    dateCreated: Date!
    title: String!
  }

  type Like {
    id: ID!
    author: Author!
    poem: Poem!
    datePublished: Date!
  }

  type SavedPoem {
    id: ID!
    author: Author!
    poem: Poem!
    dateSaved: Date!
  }

  type FollowedAuthor {
    id: ID!
    follower: Author!
    following: Author!
  }

  type AuthPayload {
    token: String!
    author: Author!
  }

  input GetPoemsFilter {
    authorId: ID
    textContains: String
    titleContains: String
    authorNameContains: String
  }

  input CreatePoemInput {
    title: String!
    text: String!
    authorId: String!
    collectionId: String
  }

  input CreateAuthorInput {
    username: String!
    password: String!
    email: String!
  }

  input UpdatePoemInput {
    poemId: String!
    title: String
    authorId: String
    text: String
    datePublished: Date
    collectionId: ID
    views: Int
  }

  input UpdateAuthorInput {
    authorId: String!
    username: String
    email: String
    password: String
  }

  input CreateCommentInput {
    text: String!
    poemId: String!
    authorId: String!
  }

  input CreateCollectionInput {
    title: String!
    authorId: String!
  }

  input CreateSavedPoemInput {
    poemId: String!
    authorId: String!
  }

  input CreateLikeInput {
    poemId: String!
    authorId: String!
  }

  input UpdateCollectionInput {
    id: String!
    title: String!
  }

  input CreateFollowedAuthorInput {
    followerId: String!
    followingId: String!
  }
`;
