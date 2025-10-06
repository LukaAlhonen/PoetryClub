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
  Date: { input: unknown; output: unknown; }
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

export type AuthorSimpleFragmentFragment = { __typename?: 'Author', id: string, username: string };

export type AuthorFragmentFragment = { __typename?: 'Author', id: string, username: string, dateJoined: unknown, followedByCount: number, followingCount: number };

export type CollectionFragmentFragment = { __typename?: 'Collection', id: string, title: string, dateCreated: unknown, author: { __typename?: 'Author', id: string, username: string } };

export type CommentFragmentFragment = { __typename?: 'Comment', id: string, text: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } };

export type FollowedByFragmentFragment = { __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string, username: string } };

export type FollowingFragmentFragment = { __typename?: 'FollowedAuthor', id: string, following: { __typename?: 'Author', id: string, username: string } };

export type LikeFragmentFragment = { __typename?: 'Like', id: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } };

export type LikedPoemFragmentFragment = { __typename?: 'Like', id: string, datePublished: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } };

export type PoemFragmentFragment = { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null };

export type SavedByFragmentFragment = { __typename?: 'SavedPoem', id: string, author: { __typename?: 'Author', id: string, username: string } };

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


export type GetAuthorByIdQuery = { __typename?: 'Query', authorById: { __typename?: 'Author', id: string, username: string, dateJoined: unknown, followedByCount: number, followingCount: number, poems: Array<{ __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }>, likedPoems: Array<{ __typename?: 'Like', id: string, datePublished: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } }>, collections: Array<{ __typename?: 'Collection', id: string, title: string, dateCreated: unknown, author: { __typename?: 'Author', id: string, username: string } }> } };

export type GetAuthorByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
  poemsLimit?: InputMaybe<Scalars['Int']['input']>;
  poemsCursor?: InputMaybe<Scalars['ID']['input']>;
  likedPoemsLimit?: InputMaybe<Scalars['Int']['input']>;
  likedPoemsCursor?: InputMaybe<Scalars['ID']['input']>;
  collectionsLimit?: InputMaybe<Scalars['Int']['input']>;
  collectionsCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAuthorByUsernameQuery = { __typename?: 'Query', authorByUsername: { __typename?: 'Author', id: string, username: string, dateJoined: unknown, followedByCount: number, followingCount: number, poems: Array<{ __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }>, likedPoems: Array<{ __typename?: 'Like', id: string, datePublished: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } }>, collections: Array<{ __typename?: 'Collection', id: string, title: string, dateCreated: unknown, author: { __typename?: 'Author', id: string, username: string } }> } };

export type GetAuthorsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  usernameContains?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', id: string, username: string }> };

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string, title: string, dateCreated: unknown, poems: Array<{ __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }>, author: { __typename?: 'Author', id: string, username: string } } };

export type GetCollectionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetCollectionsFilter>;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, title: string, dateCreated: unknown, author: { __typename?: 'Author', id: string, username: string } }> };

export type GetCommentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCommentQuery = { __typename?: 'Query', comment: { __typename?: 'Comment', id: string, text: string, datePublished: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }, author: { __typename?: 'Author', id: string, username: string } } };

export type GetCommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, text: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } }> };

export type GetFollowedAuthorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFollowedAuthorQuery = { __typename?: 'Query', followedAuthor: { __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string }, following: { __typename?: 'Author', id: string } } };

export type GetFollowersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  followingId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', followedAuthors: Array<{ __typename?: 'FollowedAuthor', id: string, follower: { __typename?: 'Author', id: string, username: string } }> };

export type GetFollowingQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  followerId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetFollowingQuery = { __typename?: 'Query', followedAuthors: Array<{ __typename?: 'FollowedAuthor', id: string, following: { __typename?: 'Author', id: string, username: string } }> };

export type GetLikeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLikeQuery = { __typename?: 'Query', like: { __typename?: 'Like', id: string, author: { __typename?: 'Author', id: string, username: string }, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } } };

export type GetLikedPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLikedPoemsQuery = { __typename?: 'Query', likes: Array<{ __typename?: 'Like', id: string, datePublished: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } }> };

export type GetLikesForPoemQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLikesForPoemQuery = { __typename?: 'Query', likes: Array<{ __typename?: 'Like', id: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } }> };

export type GetPoemQueryVariables = Exact<{
  poemId: Scalars['ID']['input'];
  commentsLimit?: InputMaybe<Scalars['Int']['input']>;
  commentsCursor?: InputMaybe<Scalars['ID']['input']>;
  likesLimit?: InputMaybe<Scalars['Int']['input']>;
  likesCursor?: InputMaybe<Scalars['ID']['input']>;
  savedByLimit?: InputMaybe<Scalars['Int']['input']>;
  savedByCursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetPoemQuery = { __typename?: 'Query', poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, comments: Array<{ __typename?: 'Comment', id: string, text: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } }>, likes: Array<{ __typename?: 'Like', id: string, datePublished: unknown, author: { __typename?: 'Author', id: string, username: string } }>, savedBy: Array<{ __typename?: 'SavedPoem', id: string, author: { __typename?: 'Author', id: string, username: string } }>, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } };

export type GetPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<GetPoemsFilter>;
}>;


export type GetPoemsQuery = { __typename?: 'Query', poems: Array<{ __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }> };

export type GetSavedPoemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSavedPoemQuery = { __typename?: 'Query', savedPoem: { __typename?: 'SavedPoem', id: string, dateSaved: unknown, author: { __typename?: 'Author', id: string, username: string }, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null } } };

export type GetSavedPoemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['ID']['input']>;
  poemId?: InputMaybe<Scalars['ID']['input']>;
  authorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetSavedPoemsQuery = { __typename?: 'Query', savedPoems: Array<{ __typename?: 'SavedPoem', id: string, dateSaved: unknown, poem: { __typename?: 'Poem', id: string, title: string, text: string, datePublished: unknown, views: number, likesCount: number, commentsCount: number, savedByCount: number, author: { __typename?: 'Author', id: string, username: string }, inCollection?: { __typename?: 'Collection', id: string, title: string } | null }, author: { __typename?: 'Author', id: string, username: string } }> };
