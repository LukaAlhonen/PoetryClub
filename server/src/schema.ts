import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(limit: Int, cursor: ID, filter: GetPoemsFilter): [Poem!]!
    poem(id: ID!): Poem
    authorById(id: ID): Author
    authors(limit: Int, cursor: ID, usernameContains: String): [Author!]!
    authorByUsername(username: String!): Author
    comment(id: ID!): Comment
    comments(limit: Int, cursor: ID, authorId: ID, poemId: ID): [Comment!]!
    collection(id: ID!): Collection!
    collections(
      limit: Int
      cursor: ID
      filter: GetCollectionsFilter
    ): [Collection!]!
    like(id: ID!): Like
    likes(limit: Int, cursor: ID, authorId: ID, poemId: ID): [Like!]!
    savedPoem(id: ID!): SavedPoem
    savedPoems(limit: Int, cursor: ID, authorId: ID, poemId: ID): [SavedPoem!]!
    followedAuthor(id: ID!): FollowedAuthor
    followedAuthors(
      limit: Int
      cursor: ID
      followingId: ID
      followerId: ID
    ): [FollowedAuthor!]!
  }

  type Mutation {
    # Create
    createPoem(input: CreatePoemInput!): Poem!
    createAuthor(input: CreateAuthorInput!): Author!
    createComment(input: CreateCommentInput!): Comment!
    createCollection(input: CreateCollectionInput!): Collection!
    createSavedPoem(input: CreateSavedPoemInput!): SavedPoem!
    createLike(input: CreateLikeInput!): Like!
    createFollowedAuthor(input: CreateFollowedAuthorInput!): FollowedAuthor!

    # Update
    updatePoem(input: UpdatePoemInput!): Poem!
    updateAuthor(input: UpdateAuthorInput!): Author!
    updateCollection(input: UpdateCollectionInput!): Collection!

    # Remove
    removeAuthor(id: String!): Author!
    removePoem(input: RemovePoemInput!): Poem!
    removeComment(input: RemoveCommentInput!): Comment!
    removeCollection(input: RemoveCollectionInput!): Collection!
    removeSavedPoem(input: RemoveSavedPoemInput!): SavedPoem!
    removeLike(input: RemoveLikeInput!): Like!
    removeFollowedAuthor(input: RemoveFollowedAuthorInput!): FollowedAuthor!

    # Auth
    login(username: String!, password: String!): AuthPayload!
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
    dateJoined: Date!
  }

  type Poem {
    id: ID!
    title: String!
    author: Author!
    text: String!
    datePublished: Date!
    comments(limit: Int, cursor: ID): [Comment!]!
    inCollection: Collection
    likes(limit: Int, cursor: ID): [Like!]!
    savedBy(limit: Int, cursor: ID): [SavedPoem!]!
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
    authorId: String!
    collectionId: String
  }

  input CreateAuthorInput {
    username: String!
    password: String!
    email: String!
    omitPassword: Boolean! = true
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

  input CreateFollowedAuthorInput {
    followerId: String!
    followingId: String!
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
    omitPassword: Boolean! = true
  }

  input UpdateCollectionInput {
    id: String!
    authorId: String
    title: String!
  }

  input RemovePoemInput {
    poemId: String!
    authorId: String!
  }

  input RemoveCommentInput {
    commentId: String!
    authorId: String!
  }

  input RemoveSavedPoemInput {
    savedPoemId: String!
    authorId: String!
  }

  input RemoveLikeInput {
    likeId: String!
    authorId: String!
  }

  input RemoveCollectionInput {
    collectionId: String!
    authorId: String!
  }

  input RemoveFollowedAuthorInput {
    followerId: String!
    followingId: String!
  }
`;
