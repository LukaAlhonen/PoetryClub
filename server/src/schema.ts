import { gql } from "graphql-tag";
import { resolvers } from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(first: Int, after: ID, filter: GetPoemsFilter): PoemsConnection!
    poem(id: ID!): Poem!
    authorById(id: ID!): Author!
    authors(first: Int, after: ID, usernameContains: String): AuthorsConnection!
    authorByUsername(username: String!): Author!
    comment(id: ID!): Comment!
    comments(first: Int, after: ID, authorId: ID, poemId: ID): CommentsConnection!
    collection(id: ID!): Collection!
    collections(
        first: Int
      after: ID
      filter: GetCollectionsFilter
    ): CollectionsConnection!
    like(id: ID!): Like!
    likes(first: Int, after: ID, authorId: ID, poemId: ID): LikesConnection!
    savedPoem(id: ID!): SavedPoem!
    savedPoems(first: Int, after: ID, authorId: ID, poemId: ID): SavedPoemsConnection!
    followedAuthor(id: ID!): FollowedAuthor!
    followedAuthors(
        first: Int
        after: ID
      followingId: ID
      followerId: ID
    ): FollowedAuthorsConnection!
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
    incrementPoemViews(poemId: ID!): Poem!

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
  }

  type Author {
    id: ID!
    username: String!
    email: String!
    poems(first: Int, after: ID): PoemsConnection!
    savedPoems(first: Int, after: ID): SavedPoemsConnection!
    comments(first: Int, after: ID): CommentsConnection!
    collections(first: Int, after: ID): CollectionsConnection!
    likedPoems(first: Int, after: ID): LikesConnection!
    following(first: Int, after: ID): FollowedAuthorsConnection!
    followingCount: Int!
    followedBy(first: Int, after: ID): FollowedAuthorsConnection!
    followedByCount: Int!
    dateJoined: Date!
  }

  type Poem {
    id: ID!
    title: String!
    author: Author!
    text: String!
    datePublished: Date!
    comments(first: Int, after: ID): CommentsConnection!
    commentsCount: Int!
    inCollection: Collection
    likes(first: Int, after: ID): LikesConnection!
    likesCount: Int!
    savedBy(first: Int, after: ID): SavedPoemsConnection!
    savedByCount: Int!
    views: Int!
    likedByCurrentUser: Like
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
    poems(first: Int, after: ID): PoemsConnection!
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
    filter: String
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

  # Relay style pagination
  type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
      pageSize: Int
  }

  # Poem
  type PoemsEdge {
      node: Poem
      cursor: String!
  }

  type PoemsConnection {
      edges: [PoemsEdge!]!
      pageInfo: PageInfo!
  }

  # Author
  type AuthorsEdge {
      node: Author
      cursor: String!
  }

  type AuthorsConnection {
      edges: [AuthorsEdge!]!
      pageInfo: PageInfo!
  }

  # Comments
  type CommentsEdge {
      node: Comment
      cursor: String!
  }

  type CommentsConnection {
      edges: [CommentsEdge!]!
      pageInfo: PageInfo!
  }

  # Collections
  type CollectionsEdge {
      node: Collection
      cursor: String!
  }

  type CollectionsConnection {
      edges: [CollectionsEdge!]!
      pageInfo: PageInfo!
  }

  # Likes
  type LikesEdge {
      node: Like
      cursor: String!
  }

  type LikesConnection {
      edges: [LikesEdge!]!
      pageInfo: PageInfo!
  }

  # SavedPoem
  type SavedPoemsEdge {
      node: SavedPoem
      cursor: String!
  }

  type SavedPoemsConnection {
      edges: [SavedPoemsEdge!]!
      pageInfo: PageInfo!
  }

  # FollowedAuthor
  type FollowedAuthorsEdge {
      node: FollowedAuthor
      cursor: String!
  }

  type FollowedAuthorsConnection {
      edges: [FollowedAuthorsEdge!]!
      pageInfo: PageInfo!
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
