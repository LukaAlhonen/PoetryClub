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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  author: Author;
  token: Scalars['String']['output'];
};

export type Author = {
  __typename?: 'Author';
  collections: CollectionsConnection;
  comments: CommentsConnection;
  dateJoined: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  followedBy: FollowedAuthorsConnection;
  followedByCount: Scalars['Int']['output'];
  following: FollowedAuthorsConnection;
  followingCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likedPoems: LikesConnection;
  poems: PoemsConnection;
  savedPoems: SavedPoemsConnection;
  username: Scalars['String']['output'];
};


export type AuthorCollectionsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorCommentsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorFollowedByArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorFollowingArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorLikedPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorSavedPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthorsConnection = {
  __typename?: 'AuthorsConnection';
  edges: Array<AuthorsEdge>;
  pageInfo: PageInfo;
};

export type AuthorsEdge = {
  __typename?: 'AuthorsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Author>;
};

export type Collection = {
  __typename?: 'Collection';
  author: Author;
  dateCreated: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poems: PoemsConnection;
  title: Scalars['String']['output'];
};


export type CollectionPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type CollectionsConnection = {
  __typename?: 'CollectionsConnection';
  edges: Array<CollectionsEdge>;
  pageInfo: PageInfo;
};

export type CollectionsEdge = {
  __typename?: 'CollectionsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Collection>;
};

export type Comment = {
  __typename?: 'Comment';
  author: Author;
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
  text: Scalars['String']['output'];
};

export type CommentsConnection = {
  __typename?: 'CommentsConnection';
  edges: Array<CommentsEdge>;
  pageInfo: PageInfo;
};

export type CommentsEdge = {
  __typename?: 'CommentsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Comment>;
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

export type FollowedAuthorsConnection = {
  __typename?: 'FollowedAuthorsConnection';
  edges: Array<FollowedAuthorsEdge>;
  pageInfo: PageInfo;
};

export type FollowedAuthorsEdge = {
  __typename?: 'FollowedAuthorsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<FollowedAuthor>;
};

export type GetCollectionsFilter = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  authorNameContains?: InputMaybe<Scalars['String']['input']>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type GetPoemsFilter = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
};

export type Like = {
  __typename?: 'Like';
  author: Author;
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
};

export type LikesConnection = {
  __typename?: 'LikesConnection';
  edges: Array<LikesEdge>;
  pageInfo: PageInfo;
};

export type LikesEdge = {
  __typename?: 'LikesEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Like>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Poem = {
  __typename?: 'Poem';
  author: Author;
  comments: CommentsConnection;
  commentsCount: Scalars['Int']['output'];
  datePublished: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  inCollection?: Maybe<Collection>;
  likedByCurrentUser?: Maybe<Like>;
  likes: LikesConnection;
  likesCount: Scalars['Int']['output'];
  savedBy: SavedPoemsConnection;
  savedByCount: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};


export type PoemCommentsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type PoemLikesArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type PoemSavedByArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type PoemsConnection = {
  __typename?: 'PoemsConnection';
  edges: Array<PoemsEdge>;
  pageInfo: PageInfo;
};

export type PoemsEdge = {
  __typename?: 'PoemsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Poem>;
};

export type Query = {
  __typename?: 'Query';
  authorById: Author;
  authorByUsername: Author;
  authors: AuthorsConnection;
  collection: Collection;
  collections: CollectionsConnection;
  comment: Comment;
  comments: CommentsConnection;
  followedAuthor: FollowedAuthor;
  followedAuthors: FollowedAuthorsConnection;
  like: Like;
  likes: LikesConnection;
  me: Author;
  poem: Poem;
  poems: PoemsConnection;
  savedPoem: SavedPoem;
  savedPoems: SavedPoemsConnection;
};


export type QueryAuthorByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuthorByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryAuthorsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  usernameContains?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetCollectionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFollowedAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFollowedAuthorsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  followerId?: InputMaybe<Scalars['ID']['input']>;
  followingId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryLikeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLikesArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPoemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetPoemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySavedPoemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySavedPoemsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
};

export type SavedPoem = {
  __typename?: 'SavedPoem';
  author: Author;
  dateSaved: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  poem: Poem;
};

export type SavedPoemsConnection = {
  __typename?: 'SavedPoemsConnection';
  edges: Array<SavedPoemsEdge>;
  pageInfo: PageInfo;
};

export type SavedPoemsEdge = {
  __typename?: 'SavedPoemsEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<SavedPoem>;
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

export type AuthorDetailFragmentFragment = { __typename?: 'Author', id: string, username: string, dateJoined: any, followedByCount: number, followingCount: number };

export type CommentFragmentFragment = { __typename?: 'Comment', id: string, text: string, datePublished: any, author: { __typename?: 'Author', id: string, username: string } };

export type FollowedAuthorFragmentFragment = { __typename?: 'Author', id: string, username: string };

export type PoemCardFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null };

export type CreateCommentMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, datePublished: any, author: { __typename?: 'Author', id: string, username: string } } };

export type FollowAuthorMutationVariables = Exact<{
  followingId: Scalars['ID']['input'];
}>;


export type FollowAuthorMutation = { __typename?: 'Mutation', createFollowedAuthor?: { __typename?: 'FollowedAuthor', id: string, following: { __typename?: 'Author', id: string, username: string }, follower: { __typename?: 'Author', id: string, username: string } } | null };

export type CreateLikeMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null }, author: { __typename?: 'Author', id: string, username: string } } };

export type RemoveLikeMutationVariables = Exact<{
  likeId: Scalars['ID']['input'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } };

export type PoemDetailFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, author: { __typename?: 'Author', id: string, username: string }, likedByCurrentUser?: { __typename?: 'Like', id: string, author: { __typename?: 'Author', id: string, username: string }, poem: { __typename?: 'Poem', id: string } } | null };

export type IncrementPoemViewsMutationVariables = Exact<{
  poemId: Scalars['ID']['input'];
}>;


export type IncrementPoemViewsMutation = { __typename?: 'Mutation', incrementPoemViews: { __typename?: 'Poem', id: string } };

export type UnfollowAuthorMutationVariables = Exact<{
  followedAuthorId: Scalars['ID']['input'];
}>;


export type UnfollowAuthorMutation = { __typename?: 'Mutation', removeFollowedAuthor: { __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string }, following: { __typename?: 'Author', id: string } } };

export type GetAuthorQueryVariables = Exact<{
  username: Scalars['String']['input'];
  poemsLimit?: InputMaybe<Scalars['Int']['input']>;
  poemsCursor?: InputMaybe<Scalars['ID']['input']>;
  followedByLimit?: InputMaybe<Scalars['Int']['input']>;
  followedByCursor?: InputMaybe<Scalars['ID']['input']>;
  followingLimit?: InputMaybe<Scalars['Int']['input']>;
  followingCursor?: InputMaybe<Scalars['ID']['input']>;
  likedPoemsLimit?: InputMaybe<Scalars['Int']['input']>;
  likedPoemsCursor?: InputMaybe<Scalars['ID']['input']>;
  savedPoemsLimit?: InputMaybe<Scalars['Int']['input']>;
  savedPoemsCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorQuery = { __typename?: 'Query', authorByUsername: { __typename?: 'Author', id: string, username: string, dateJoined: any, followedByCount: number, followingCount: number, poems: { __typename?: 'PoemsConnection', edges: Array<{ __typename?: 'PoemsEdge', cursor: string, node?: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } }, likedPoems: { __typename?: 'LikesConnection', edges: Array<{ __typename?: 'LikesEdge', cursor: string, node?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } }, savedPoems: { __typename?: 'SavedPoemsConnection', edges: Array<{ __typename?: 'SavedPoemsEdge', cursor: string, node?: { __typename?: 'SavedPoem', id: string, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } }, followedBy: { __typename?: 'FollowedAuthorsConnection', edges: Array<{ __typename?: 'FollowedAuthorsEdge', cursor: string, node?: { __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string, username: string } } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, pageSize?: number | null } }, following: { __typename?: 'FollowedAuthorsConnection', edges: Array<{ __typename?: 'FollowedAuthorsEdge', cursor: string, node?: { __typename?: 'FollowedAuthor', id: string, following: { __typename?: 'Author', id: string, username: string } } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null, pageSize?: number | null } } } };

export type CreatePoemMutationVariables = Exact<{
  input: CreatePoemInput;
}>;


export type CreatePoemMutation = { __typename?: 'Mutation', createPoem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, author: { __typename?: 'Author', id: string, username: string } } };

export type GetPoemQueryVariables = Exact<{
  poemId: Scalars['ID']['input'];
  commentsLimit?: InputMaybe<Scalars['Int']['input']>;
  commentsCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPoemQuery = { __typename?: 'Query', poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, comments: { __typename?: 'CommentsConnection', edges: Array<{ __typename?: 'CommentsEdge', cursor: string, node?: { __typename?: 'Comment', id: string, text: string, datePublished: any, author: { __typename?: 'Author', id: string, username: string } } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, author: { __typename?: 'Author', id: string, username: string }, likedByCurrentUser?: { __typename?: 'Like', id: string, author: { __typename?: 'Author', id: string, username: string }, poem: { __typename?: 'Poem', id: string } } | null } };

export type GetPoemsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPoemsQuery = { __typename?: 'Query', poems: { __typename?: 'PoemsConnection', edges: Array<{ __typename?: 'PoemsEdge', cursor: string, node?: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } } };

export type GetPoemsWithFilterQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetPoemsFilter>;
}>;


export type GetPoemsWithFilterQuery = { __typename?: 'Query', poems: { __typename?: 'PoemsConnection', edges: Array<{ __typename?: 'PoemsEdge', cursor: string, node?: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: any, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null, likedByCurrentUser?: { __typename?: 'Like', id: string, poem: { __typename?: 'Poem', id: string }, author: { __typename?: 'Author', id: string, username: string } } | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null, pageSize?: number | null } } };

export type SignupMutationVariables = Exact<{
  input: CreateAuthorInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Author', id: string, username: string } };
