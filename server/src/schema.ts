import { gql } from "graphql-tag";
import { resolvers } from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(limit: Int, cursor: ID, filter: GetPoemsFilter): [Poem!]!
    poem(id: ID!): Poem!
    authorById(id: ID!): Author!
    authors(limit: Int, cursor: ID, usernameContains: String): [Author!]!
    authorByUsername(username: String!): Author!
    comment(id: ID!): Comment!
    comments(limit: Int, cursor: ID, authorId: ID, poemId: ID): [Comment!]!
    collection(id: ID!): Collection!
    collections(
      limit: Int
      cursor: ID
      filter: GetCollectionsFilter
    ): [Collection!]!
    like(id: ID!): Like!
    likes(limit: Int, cursor: ID, authorId: ID, poemId: ID): [Like!]!
    savedPoem(id: ID!): SavedPoem!
    savedPoems(limit: Int, cursor: ID, authorId: ID, poemId: ID): [SavedPoem!]!
    followedAuthor(id: ID!): FollowedAuthor!
    followedAuthors(
      limit: Int
      cursor: ID
      followingId: ID
      followerId: ID
    ): [FollowedAuthor!]!
    me: Author!
  }

  type Mutation {
    # Create
    createPoem(input: CreatePoemInput!): Poem!
    createAuthor(input: CreateAuthorInput!): Author!
    createComment(poemId: ID!, text: String!): Comment!
    createCollection(title: String!): Collection!
    createSavedPoem(poemId: ID!): SavedPoem!
    createLike(poemId: ID!): Like!
    createFollowedAuthor(followingId: ID!): FollowedAuthor

    # Update
    updatePoem(input: UpdatePoemInput!): Poem!
    updateAuthor(input: UpdateAuthorInput!): Author!
    updateCollection(input: UpdateCollectionInput!): Collection!

    # Remove
    removeAuthor: Author!
    removePoem(poemId: ID!): Poem!
    removeComment(commentId: ID!): Comment!
    removeCollection(collectionId: ID!): Collection!
    removeSavedPoem(savedPoemId: ID!): SavedPoem!
    removeLike(likeId: ID!): Like!
    removeFollowedAuthor(followedAuthorId: ID!): FollowedAuthor!

    # Auth
    login(username: String!, password: String!): AuthPayload!
    signup(input: CreateAuthorInput!): Author!
    logout: Boolean!
    refreshToken: AuthPayload!
  }

  type Author {
    id: ID!
    username: String!
    email: String!
    poems(limit: Int, cursor: ID): [Poem!]!
    savedPoems(limit: Int, cursor: ID): [SavedPoem!]!
    comments(limit: Int, cursor: ID): [Comment!]!
    collections(limit: Int, cursor: ID): [Collection!]!
    likedPoems(limit: Int, cursor: ID): [Like!]!
    following(limit: Int, cursor: ID): [FollowedAuthor!]!
    followingCount: Int!
    followedBy(limit: Int, cursor: ID): [FollowedAuthor!]!
    followedByCount: Int!
    dateJoined: Date!
  }

  type Poem {
    id: ID!
    title: String!
    author: Author!
    text: String!
    datePublished: Date!
    comments(limit: Int, cursor: ID): [Comment!]!
    commentsCount: Int!
    inCollection: Collection
    likes(limit: Int, cursor: ID): [Like!]!
    likesCount: Int!
    savedBy(limit: Int, cursor: ID): [SavedPoem!]!
    savedByCount: Int!
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
    poems(limit: Int, cursor: ID): [Poem!]!
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
    dateFollowed: Date!
  }

  type AuthPayload {
    token: String!
    author: Author!
  }

  input GetPoemsFilter {
    authorId: ID
    collectionId: ID
    textContains: String
    titleContains: String
    authorNameContains: String
  }

  input GetCollectionsFilter {
    authorId: ID
    titleContains: String
    authorNameContains: String
  }

  input CreatePoemInput {
    title: String!
    text: String!
    collectionId: String
  }

  input CreateAuthorInput {
    username: String!
    password: String!
    email: String!
  }

  input UpdatePoemInput {
    poemId: ID!
    title: String
    text: String
    collectionId: ID
    views: Int
  }

  input UpdateAuthorInput {
    username: String
    email: String
    password: String
  }

  input UpdateCollectionInput {
    id: String!
    title: String!
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
