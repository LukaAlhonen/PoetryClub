import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(cursor: String, limit: Int!, filter: GetPoemsFilter): [Poem!]!
    poem(id: ID!): Poem
    userById(id: ID): User
    users: [User!]!
    userByName(username: String!): User
    comment(id: ID!): Comment
    comments(userId: ID, poemId: ID): [Comment!]!
    collection(id: ID!): Collection!
    collections(id: ID!): [Collection!]!
  }

  type Mutation {
    # Create
    createPoem(input: CreatePoemInput!): Poem!
    createUser(input: CreateUserInput!): User!
    createComment(input: CreateCommentInput!): Comment!
    createCollection(input: CreateCollectionInput!): Collection!
    createSavedPoem(input: CreateSavedPoemInput!): SavedPoem!
    createLike(input: CreateLikeInput!): Like!

    # Update
    updatePoem(input: UpdatePoemInput!): Poem!
    updateUser(input: UpdateUserInput!): User!
    updateCollection(input: UpdateCollectionInput!): Collection!

    # Remove
    removeUser(id: String!): User!
    removePoem(id: String!): Poem!
    removeComment(id: String!): Comment!
    removeCollection(id: String!): Collection!
    removeSavedPoem(id: String!): SavedPoem!
    removeLike(id: String!): Like!

    # Auth
    login(username: String!, password: String!): AuthPayload!
  }

  type User {
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
    author: User!
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
    author: User!
    poem: Poem!
    text: String!
    datePublished: Date!
  }

  type Collection {
    id: ID!
    owner: User!
    poems: [Poem!]!
    dateCreated: Date!
    title: String!
  }

  type Like {
    id: ID!
    author: User!
    poem: Poem!
    datePublished: Date!
  }

  type SavedPoem {
    id: ID!
    user: User!
    poem: Poem!
    dateSaved: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
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

  input CreateUserInput {
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

  input UpdateUserInput {
    userId: String!
    username: String
    email: String
    password: String
  }

  input CreateCommentInput {
    text: String!
    poemId: String!
    authorId: String!
    datePublished: Date!
  }

  input CreateCollectionInput {
    title: String!
    ownerId: String!
  }

  input CreateSavedPoemInput {
    poemId: String!
    userId: String!
  }

  input CreateLikeInput {
    poemId: String!
    userId: String!
  }

  input UpdateCollectionInput {
    id: String!
    title: String!
  }
`;
