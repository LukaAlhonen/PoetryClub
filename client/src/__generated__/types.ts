export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type CreatePoemInput = {
  authorId: Scalars['String']['input'];
  datePublished: Scalars['Date']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreatePoemResponse = {
  __typename?: 'CreatePoemResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<Poem>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<User>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPoem: CreatePoemResponse;
  createUser: CreateUserResponse;
  updatePoem: CreatePoemResponse;
  updateUser: CreateUserResponse;
};


export type MutationCreatePoemArgs = {
  input: CreatePoemInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdatePoemArgs = {
  input: UpdatePoemInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Poem = {
  __typename?: 'Poem';
  author: User;
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  poem?: Maybe<Poem>;
  poems: Array<Poem>;
  user?: Maybe<User>;
  userByName?: Maybe<User>;
  users: Array<User>;
};


export type QueryPoemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPoemsArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByNameArgs = {
  username: Scalars['String']['input'];
};

export type UpdatePoemInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['Date']['input']>;
  poemId: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  poems: Array<Poem>;
  username: Scalars['String']['output'];
};

export type PoemCardFragmentFragment = { __typename?: 'Poem', id: string, title: string, datePublished: any, author: { __typename?: 'User', username: string } };

export type PoemDetailFragmentFragment = { __typename?: 'Poem', id: string, title: string, datePublished: any, text: string, author: { __typename?: 'User', username: string } };

export type GetPoemsQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPoemsQuery = { __typename?: 'Query', poems: Array<{ __typename?: 'Poem', id: string, title: string, datePublished: any, author: { __typename?: 'User', username: string } }> };

export type GetPoemQueryVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type GetPoemQuery = { __typename?: 'Query', poem?: { __typename?: 'Poem', id: string, title: string, datePublished: any, text: string, author: { __typename?: 'User', username: string } } | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', username: string, id: string, email: string, poems: Array<{ __typename?: 'Poem', id: string, title: string, datePublished: any, author: { __typename?: 'User', username: string } }> } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, email: string }> };
