import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  type Query {
    poems(authorId: ID): [Poem!]!
    poem(id: ID!): Poem
    user(id: ID!): User
    users: [User!]!
    userByName(username: String!): User
  }

  type Mutation {
    createPoem(input: CreatePoemInput!): CreatePoemResponse!
    createUser(input: CreateUserInput!): CreateUserResponse!
    updatePoem(input: UpdatePoemInput!): CreatePoemResponse!
    updateUser(input: UpdateUserInput!): CreateUserResponse!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    poems: [Poem!]!
  }

  type Poem {
    id: ID!
    title: String!
    author: User!
    text: String!
    datePublished: Date!
  }

  input CreatePoemInput {
    title: String!
    text: String!
    authorId: String!
    datePublished: Date!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
  }

  type CreatePoemResponse {
    code: Int!
    success: Boolean!
    message: String!
    data: Poem
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    data: User
  }

  input UpdatePoemInput {
    poemId: String!
    title: String
    authorId: String
    text: String
    datePublished: Date
  }

  input UpdateUserInput {
    userId: String!
    username: String
    email: String
    password: String
  }
`;
