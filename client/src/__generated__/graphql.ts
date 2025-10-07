/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Custom date scalar */
  Date: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  author: Author;
  token: Scalars['String']['output'];
};

export type Author = {
  __typename?: 'Author';
  collections: Array<Collection>;
  comments: Array<Comment>;
  dateJoined: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  followedBy: Array<FollowedAuthor>;
  followedByCount: Scalars['Int']['output'];
  following: Array<FollowedAuthor>;
  followingCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likedPoems: Array<Like>;
  poems: Array<Poem>;
  savedPoems: Array<SavedPoem>;
  username: Scalars['String']['output'];
};


export type AuthorCollectionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorCommentsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorFollowedByArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorFollowingArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorLikedPoemsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorPoemsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorSavedPoemsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Collection = {
  __typename?: 'Collection';
  author: Author;
  dateCreated: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poems: Array<Poem>;
  title: Scalars['String']['output'];
};


export type CollectionPoemsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  author: Author;
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
  text: Scalars['String']['output'];
};

export type CreateAuthorInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreatePoemInput = {
  collectionId?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FollowedAuthor = {
  __typename?: 'FollowedAuthor';
  dateFollowed: Scalars['Date']['output'];
  follower: Author;
  following: Author;
  id: Scalars['ID']['output'];
};

export type GetCollectionsFilter = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  authorNameContains?: InputMaybe<Scalars['String']['input']>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type GetPoemsFilter = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  authorNameContains?: InputMaybe<Scalars['String']['input']>;
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  textContains?: InputMaybe<Scalars['String']['input']>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type Like = {
  __typename?: 'Like';
  author: Author;
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createCollection: Collection;
  createComment: Comment;
  createFollowedAuthor?: Maybe<FollowedAuthor>;
  createLike: Like;
  createPoem: Poem;
  createSavedPoem: SavedPoem;
  incrementPoemViews: Poem;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  refreshToken: AuthPayload;
  removeAuthor: Author;
  removeCollection: Collection;
  removeComment: Comment;
  removeFollowedAuthor: FollowedAuthor;
  removeLike: Like;
  removePoem: Poem;
  removeSavedPoem: SavedPoem;
  signup: Author;
  updateAuthor: Author;
  updateCollection: Collection;
  updatePoem: Poem;
};


export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};


export type MutationCreateCollectionArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  poemId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateFollowedAuthorArgs = {
  followingId: Scalars['ID']['input'];
};


export type MutationCreateLikeArgs = {
  poemId: Scalars['ID']['input'];
};


export type MutationCreatePoemArgs = {
  input: CreatePoemInput;
};


export type MutationCreateSavedPoemArgs = {
  poemId: Scalars['ID']['input'];
};


export type MutationIncrementPoemViewsArgs = {
  poemId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationRemoveCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationRemoveFollowedAuthorArgs = {
  followedAuthorId: Scalars['ID']['input'];
};


export type MutationRemoveLikeArgs = {
  likeId: Scalars['ID']['input'];
};


export type MutationRemovePoemArgs = {
  poemId: Scalars['ID']['input'];
};


export type MutationRemoveSavedPoemArgs = {
  savedPoemId: Scalars['ID']['input'];
};


export type MutationSignupArgs = {
  input: CreateAuthorInput;
};


export type MutationUpdateAuthorArgs = {
  input: UpdateAuthorInput;
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationUpdatePoemArgs = {
  input: UpdatePoemInput;
};

export type Poem = {
  __typename?: 'Poem';
  author: Author;
  comments: Array<Comment>;
  commentsCount: Scalars['Int']['output'];
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  inCollection?: Maybe<Collection>;
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  savedBy: Array<SavedPoem>;
  savedByCount: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};


export type PoemCommentsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type PoemLikesArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type PoemSavedByArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authorById: Author;
  authorByUsername: Author;
  authors: Array<Author>;
  collection: Collection;
  collections: Array<Collection>;
  comment: Comment;
  comments: Array<Comment>;
  followedAuthor: FollowedAuthor;
  followedAuthors: Array<FollowedAuthor>;
  like: Like;
  likes: Array<Like>;
  me: Author;
  poem: Poem;
  poems: Array<Poem>;
  savedPoem: SavedPoem;
  savedPoems: Array<SavedPoem>;
};


export type QueryAuthorByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuthorByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryAuthorsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  usernameContains?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetCollectionsFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFollowedAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFollowedAuthorsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  followerId?: InputMaybe<Scalars['ID']['input']>;
  followingId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLikeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLikesArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPoemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPoemsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetPoemsFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySavedPoemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySavedPoemsArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};

export type SavedPoem = {
  __typename?: 'SavedPoem';
  author: Author;
  dateSaved: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
};

export type UpdateAuthorInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCollectionInput = {
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdatePoemInput = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  poemId: Scalars['ID']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  views?: InputMaybe<Scalars['Int']['input']>;
};

export type PoemCardFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } & { ' $fragmentName'?: 'PoemCardFragmentFragment' };

export type PoemDetailFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, author: { __typename?: 'Author', id: string, username: string } } & { ' $fragmentName'?: 'PoemDetailFragmentFragment' };

export type AuthorSimpleFragmentFragment = { __typename?: 'Author', id: string, username: string } & { ' $fragmentName'?: 'AuthorSimpleFragmentFragment' };

export type AuthorFragmentFragment = { __typename?: 'Author', id: string, username: string, dateJoined: any, followedByCount: number, followingCount: number } & { ' $fragmentName'?: 'AuthorFragmentFragment' };

export type CollectionFragmentFragment = { __typename?: 'Collection', id: string, title: string, dateCreated: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'CollectionFragmentFragment' };

export type CommentFragmentFragment = { __typename?: 'Comment', id: string, text: string, datePublished: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type FollowedByFragmentFragment = { __typename?: 'FollowedAuthor', id: string, follower: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'FollowedByFragmentFragment' };

export type FollowingFragmentFragment = { __typename?: 'FollowedAuthor', id: string, following: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'FollowingFragmentFragment' };

export type LikeFragmentFragment = { __typename?: 'Like', id: string, datePublished: any, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'LikeFragmentFragment' };

export type LikedPoemFragmentFragment = { __typename?: 'Like', id: string, datePublished: any, poem: (
    { __typename?: 'Poem', id: string }
    & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
  ) } & { ' $fragmentName'?: 'LikedPoemFragmentFragment' };

export type PoemFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ), inCollection?: { __typename?: 'Collection', id: string, title: string } | null } & { ' $fragmentName'?: 'PoemFragmentFragment' };

export type SavedByFragmentFragment = { __typename?: 'SavedPoem', id: string, author: (
    { __typename?: 'Author' }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  ) } & { ' $fragmentName'?: 'SavedByFragmentFragment' };

export type CreateCollectionMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: string } };

export type CreateCommentMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string } };

export type CreateFollowedAuthorMutationVariables = Exact<{
  followingId: Scalars['ID']['input'];
}>;


export type CreateFollowedAuthorMutation = { __typename?: 'Mutation', createFollowedAuthor?: { __typename?: 'FollowedAuthor', id: string } | null };

export type CreateLikeMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'Like', id: string } };

export type CreatePoemMutationVariables = Exact<{
  input: CreatePoemInput;
}>;


export type CreatePoemMutation = { __typename?: 'Mutation', createPoem: { __typename?: 'Poem', id: string } };

export type CreateSavedPoemMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type CreateSavedPoemMutation = { __typename?: 'Mutation', createSavedPoem: { __typename?: 'SavedPoem', id: string } };

export type RemoveAuthorMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAuthorMutation = { __typename?: 'Mutation', removeAuthor: { __typename?: 'Author', id: string } };

export type RemoveCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type RemoveCollectionMutation = { __typename?: 'Mutation', removeCollection: { __typename?: 'Collection', id: string } };

export type RemoveCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: { __typename?: 'Comment', id: string } };

export type RemoveFollowedAuthorMutationVariables = Exact<{
  followedAuthorId: Scalars['ID']['input'];
}>;


export type RemoveFollowedAuthorMutation = { __typename?: 'Mutation', removeFollowedAuthor: { __typename?: 'FollowedAuthor', id: string } };

export type RemoveLikeMutationVariables = Exact<{
  likeId: Scalars['ID']['input'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: { __typename?: 'Like', id: string } };

export type RemovePoemMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type RemovePoemMutation = { __typename?: 'Mutation', removePoem: { __typename?: 'Poem', id: string } };

export type RemoveSavedPoemMutationVariables = Exact<{
  savedPoemId: Scalars['ID']['input'];
}>;


export type RemoveSavedPoemMutation = { __typename?: 'Mutation', removeSavedPoem: { __typename?: 'SavedPoem', id: string } };

export type CreateAuthorMutationVariables = Exact<{
  input: CreateAuthorInput;
}>;


export type CreateAuthorMutation = { __typename?: 'Mutation', createAuthor: { __typename?: 'Author', id: string } };

export type UpdateAuthorMutationVariables = Exact<{
  input: UpdateAuthorInput;
}>;


export type UpdateAuthorMutation = { __typename?: 'Mutation', updateAuthor: { __typename?: 'Author', id: string, username: string } };

export type UpdateCollectionMutationVariables = Exact<{
  input: UpdateCollectionInput;
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'Collection', id: string } };

export type UpdatePoemMutationVariables = Exact<{
  input: UpdatePoemInput;
}>;


export type UpdatePoemMutation = { __typename?: 'Mutation', updatePoem: { __typename?: 'Poem', id: string } };

export type GetAuthorByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  poemsLimit?: InputMaybe<Scalars['Int']['input']>;
  poemsCursor?: InputMaybe<Scalars['ID']['input']>;
  likedPoemsLimit?: InputMaybe<Scalars['Int']['input']>;
  likedPoemsCursor?: InputMaybe<Scalars['ID']['input']>;
  collectionsLimit?: InputMaybe<Scalars['Int']['input']>;
  collectionsCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorByIdQuery = { __typename?: 'Query', authorById: (
    { __typename?: 'Author', id: string, poems: Array<(
      { __typename?: 'Poem' }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    )>, likedPoems: Array<(
      { __typename?: 'Like' }
      & { ' $fragmentRefs'?: { 'LikedPoemFragmentFragment': LikedPoemFragmentFragment } }
    )>, collections: Array<(
      { __typename?: 'Collection' }
      & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'AuthorFragmentFragment': AuthorFragmentFragment } }
  ) };

export type GetAuthorByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
  poemsLimit?: InputMaybe<Scalars['Int']['input']>;
  poemsCursor?: InputMaybe<Scalars['ID']['input']>;
  likedPoemsLimit?: InputMaybe<Scalars['Int']['input']>;
  likedPoemsCursor?: InputMaybe<Scalars['ID']['input']>;
  collectionsLimit?: InputMaybe<Scalars['Int']['input']>;
  collectionsCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorByUsernameQuery = { __typename?: 'Query', authorByUsername: (
    { __typename?: 'Author', id: string, poems: Array<(
      { __typename?: 'Poem' }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    )>, likedPoems: Array<(
      { __typename?: 'Like' }
      & { ' $fragmentRefs'?: { 'LikedPoemFragmentFragment': LikedPoemFragmentFragment } }
    )>, collections: Array<(
      { __typename?: 'Collection' }
      & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'AuthorFragmentFragment': AuthorFragmentFragment } }
  ) };

export type GetAuthorsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  usernameContains?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAuthorsQuery = { __typename?: 'Query', authors: Array<(
    { __typename?: 'Author', id: string }
    & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
  )> };

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', collection: (
    { __typename?: 'Collection', id: string, poems: Array<(
      { __typename?: 'Poem' }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  ) };

export type GetCollectionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetCollectionsFilter>;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: Array<(
    { __typename?: 'Collection', id: string }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  )> };

export type GetCommentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCommentQuery = { __typename?: 'Query', comment: { __typename?: 'Comment', id: string, text: string, datePublished: any, poem: (
      { __typename?: 'Poem' }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    ), author: (
      { __typename?: 'Author' }
      & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
    ) } };

export type GetCommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments: Array<(
    { __typename?: 'Comment', id: string }
    & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
  )> };

export type GetFollowedAuthorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFollowedAuthorQuery = { __typename?: 'Query', followedAuthor: { __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string }, following: { __typename?: 'Author', id: string } } };

export type GetFollowersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  followingId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', followedAuthors: Array<(
    { __typename?: 'FollowedAuthor', id: string }
    & { ' $fragmentRefs'?: { 'FollowedByFragmentFragment': FollowedByFragmentFragment } }
  )> };

export type GetFollowingQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  followerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetFollowingQuery = { __typename?: 'Query', followedAuthors: Array<(
    { __typename?: 'FollowedAuthor', id: string }
    & { ' $fragmentRefs'?: { 'FollowingFragmentFragment': FollowingFragmentFragment } }
  )> };

export type GetLikeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLikeQuery = { __typename?: 'Query', like: { __typename?: 'Like', id: string, author: (
      { __typename?: 'Author', id: string }
      & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
    ), poem: (
      { __typename?: 'Poem', id: string }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    ) } };

export type GetLikedPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLikedPoemsQuery = { __typename?: 'Query', likes: Array<(
    { __typename?: 'Like', id: string }
    & { ' $fragmentRefs'?: { 'LikedPoemFragmentFragment': LikedPoemFragmentFragment } }
  )> };

export type GetLikesForPoemQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLikesForPoemQuery = { __typename?: 'Query', likes: Array<(
    { __typename?: 'Like', id: string }
    & { ' $fragmentRefs'?: { 'LikeFragmentFragment': LikeFragmentFragment } }
  )> };

export type GetSavedPoemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSavedPoemQuery = { __typename?: 'Query', savedPoem: { __typename?: 'SavedPoem', id: string, dateSaved: any, author: (
      { __typename?: 'Author', id: string }
      & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
    ), poem: (
      { __typename?: 'Poem', id: string }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    ) } };

export type GetSavedPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetSavedPoemsQuery = { __typename?: 'Query', savedPoems: Array<{ __typename?: 'SavedPoem', id: string, dateSaved: any, poem: (
      { __typename?: 'Poem' }
      & { ' $fragmentRefs'?: { 'PoemFragmentFragment': PoemFragmentFragment } }
    ), author: (
      { __typename?: 'Author' }
      & { ' $fragmentRefs'?: { 'AuthorSimpleFragmentFragment': AuthorSimpleFragmentFragment } }
    ) }> };

export type GetPoemQueryVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type GetPoemQuery = { __typename?: 'Query', poem: (
    { __typename?: 'Poem', id: string }
    & { ' $fragmentRefs'?: { 'PoemDetailFragmentFragment': PoemDetailFragmentFragment } }
  ) };

export type GetPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetPoemsFilter>;
}>;


export type GetPoemsQuery = { __typename?: 'Query', poems: Array<(
    { __typename?: 'Poem', id: string }
    & { ' $fragmentRefs'?: { 'PoemCardFragmentFragment': PoemCardFragmentFragment } }
  )> };

export const PoemCardFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemCardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<PoemCardFragmentFragment, unknown>;
export const PoemDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}}]}}]} as unknown as DocumentNode<PoemDetailFragmentFragment, unknown>;
export const AuthorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"followedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}}]}}]} as unknown as DocumentNode<AuthorFragmentFragment, unknown>;
export const AuthorSimpleFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<AuthorSimpleFragmentFragment, unknown>;
export const CollectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<CollectionFragmentFragment, unknown>;
export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const FollowedByFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowedByFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowedAuthor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<FollowedByFragmentFragment, unknown>;
export const FollowingFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowingFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowedAuthor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<FollowingFragmentFragment, unknown>;
export const LikeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<LikeFragmentFragment, unknown>;
export const PoemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<PoemFragmentFragment, unknown>;
export const LikedPoemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikedPoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<LikedPoemFragmentFragment, unknown>;
export const SavedByFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SavedByFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SavedPoem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<SavedByFragmentFragment, unknown>;
export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateFollowedAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFollowedAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFollowedAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFollowedAuthorMutation, CreateFollowedAuthorMutationVariables>;
export const CreateLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLikeMutation, CreateLikeMutationVariables>;
export const CreatePoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePoemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePoemMutation, CreatePoemMutationVariables>;
export const CreateSavedPoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSavedPoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSavedPoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSavedPoemMutation, CreateSavedPoemMutationVariables>;
export const RemoveAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAuthor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAuthor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveAuthorMutation, RemoveAuthorMutationVariables>;
export const RemoveCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveCollectionMutation, RemoveCollectionMutationVariables>;
export const RemoveCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const RemoveFollowedAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFollowedAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followedAuthorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFollowedAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followedAuthorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followedAuthorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveFollowedAuthorMutation, RemoveFollowedAuthorMutationVariables>;
export const RemoveLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"likeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const RemovePoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemovePoemMutation, RemovePoemMutationVariables>;
export const RemoveSavedPoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSavedPoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"savedPoemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSavedPoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"savedPoemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"savedPoemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveSavedPoemMutation, RemoveSavedPoemMutationVariables>;
export const CreateAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const UpdateAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UpdateAuthorMutation, UpdateAuthorMutationVariables>;
export const UpdateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export const UpdatePoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePoemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdatePoemMutation, UpdatePoemMutationVariables>;
export const GetAuthorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorFragment"}},{"kind":"Field","name":{"kind":"Name","value":"poems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPoems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikedPoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"followedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikedPoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}}]} as unknown as DocumentNode<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>;
export const GetAuthorByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionsCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorFragment"}},{"kind":"Field","name":{"kind":"Name","value":"poems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedPoems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likedPoemsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikedPoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionsCursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"followedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikedPoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}}]} as unknown as DocumentNode<GetAuthorByUsernameQuery, GetAuthorByUsernameQueryVariables>;
export const GetAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameContains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"usernameContains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameContains"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"poems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCollectionsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCommentQuery, GetCommentQueryVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetFollowedAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowedAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followedAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowedAuthorQuery, GetFollowedAuthorQueryVariables>;
export const GetFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followedAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"followingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowedByFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowedByFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowedAuthor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}}]} as unknown as DocumentNode<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followedAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowingFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowingFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowedAuthor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}}]}}]} as unknown as DocumentNode<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetLikeQuery, GetLikeQueryVariables>;
export const GetLikedPoemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedPoems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikedPoemFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikedPoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}}]} as unknown as DocumentNode<GetLikedPoemsQuery, GetLikedPoemsQueryVariables>;
export const GetLikesForPoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikesForPoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LikeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LikeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Like"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}}]}}]} as unknown as DocumentNode<GetLikesForPoemQuery, GetLikesForPoemQueryVariables>;
export const GetSavedPoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSavedPoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savedPoem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateSaved"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetSavedPoemQuery, GetSavedPoemQueryVariables>;
export const GetSavedPoemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSavedPoems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savedPoems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"poemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateSaved"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthorSimpleFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthorSimpleFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetSavedPoemsQuery, GetSavedPoemsQueryVariables>;
export const GetPoemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}}]}}]} as unknown as DocumentNode<GetPoemQuery, GetPoemQueryVariables>;
export const GetPoemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPoems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPoemsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PoemCardFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PoemCardFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Poem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"savedByCount"}},{"kind":"Field","name":{"kind":"Name","value":"inCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetPoemsQuery, GetPoemsQueryVariables>;