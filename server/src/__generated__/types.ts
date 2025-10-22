import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { PoemModel, AuthorModel, CommentModel, CollectionModel, SavedPoemModel, LikeModel, FollowedAuthorModel } from '../models.js';
import { MyContext } from '../types/context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'author'> & { author: ResolversTypes['Author'] }>;
  Author: ResolverTypeWrapper<AuthorModel>;
  AuthorsConnection: ResolverTypeWrapper<Omit<AuthorsConnection, 'edges'> & { edges: Array<ResolversTypes['AuthorsEdge']> }>;
  AuthorsEdge: ResolverTypeWrapper<Omit<AuthorsEdge, 'node'> & { node?: Maybe<ResolversTypes['Author']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Collection: ResolverTypeWrapper<CollectionModel>;
  CollectionsConnection: ResolverTypeWrapper<Omit<CollectionsConnection, 'edges'> & { edges: Array<ResolversTypes['CollectionsEdge']> }>;
  CollectionsEdge: ResolverTypeWrapper<Omit<CollectionsEdge, 'node'> & { node?: Maybe<ResolversTypes['Collection']> }>;
  Comment: ResolverTypeWrapper<CommentModel>;
  CommentsConnection: ResolverTypeWrapper<Omit<CommentsConnection, 'edges'> & { edges: Array<ResolversTypes['CommentsEdge']> }>;
  CommentsEdge: ResolverTypeWrapper<Omit<CommentsEdge, 'node'> & { node?: Maybe<ResolversTypes['Comment']> }>;
  CreateAuthorInput: CreateAuthorInput;
  CreatePoemInput: CreatePoemInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FollowedAuthor: ResolverTypeWrapper<FollowedAuthorModel>;
  FollowedAuthorsConnection: ResolverTypeWrapper<Omit<FollowedAuthorsConnection, 'edges'> & { edges: Array<ResolversTypes['FollowedAuthorsEdge']> }>;
  FollowedAuthorsEdge: ResolverTypeWrapper<Omit<FollowedAuthorsEdge, 'node'> & { node?: Maybe<ResolversTypes['FollowedAuthor']> }>;
  GetCollectionsFilter: GetCollectionsFilter;
  GetPoemsFilter: GetPoemsFilter;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<LikeModel>;
  LikesConnection: ResolverTypeWrapper<Omit<LikesConnection, 'edges'> & { edges: Array<ResolversTypes['LikesEdge']> }>;
  LikesEdge: ResolverTypeWrapper<Omit<LikesEdge, 'node'> & { node?: Maybe<ResolversTypes['Like']> }>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Poem: ResolverTypeWrapper<PoemModel>;
  PoemsConnection: ResolverTypeWrapper<Omit<PoemsConnection, 'edges'> & { edges: Array<ResolversTypes['PoemsEdge']> }>;
  PoemsEdge: ResolverTypeWrapper<Omit<PoemsEdge, 'node'> & { node?: Maybe<ResolversTypes['Poem']> }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SavedPoem: ResolverTypeWrapper<SavedPoemModel>;
  SavedPoemsConnection: ResolverTypeWrapper<Omit<SavedPoemsConnection, 'edges'> & { edges: Array<ResolversTypes['SavedPoemsEdge']> }>;
  SavedPoemsEdge: ResolverTypeWrapper<Omit<SavedPoemsEdge, 'node'> & { node?: Maybe<ResolversTypes['SavedPoem']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, 'author'> & { author: ResolversParentTypes['Author'] };
  Author: AuthorModel;
  AuthorsConnection: Omit<AuthorsConnection, 'edges'> & { edges: Array<ResolversParentTypes['AuthorsEdge']> };
  AuthorsEdge: Omit<AuthorsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Author']> };
  Boolean: Scalars['Boolean']['output'];
  Collection: CollectionModel;
  CollectionsConnection: Omit<CollectionsConnection, 'edges'> & { edges: Array<ResolversParentTypes['CollectionsEdge']> };
  CollectionsEdge: Omit<CollectionsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Collection']> };
  Comment: CommentModel;
  CommentsConnection: Omit<CommentsConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommentsEdge']> };
  CommentsEdge: Omit<CommentsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Comment']> };
  CreateAuthorInput: CreateAuthorInput;
  CreatePoemInput: CreatePoemInput;
  Date: Scalars['Date']['output'];
  FollowedAuthor: FollowedAuthorModel;
  FollowedAuthorsConnection: Omit<FollowedAuthorsConnection, 'edges'> & { edges: Array<ResolversParentTypes['FollowedAuthorsEdge']> };
  FollowedAuthorsEdge: Omit<FollowedAuthorsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['FollowedAuthor']> };
  GetCollectionsFilter: GetCollectionsFilter;
  GetPoemsFilter: GetPoemsFilter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: LikeModel;
  LikesConnection: Omit<LikesConnection, 'edges'> & { edges: Array<ResolversParentTypes['LikesEdge']> };
  LikesEdge: Omit<LikesEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Like']> };
  Mutation: Record<PropertyKey, never>;
  PageInfo: PageInfo;
  Poem: PoemModel;
  PoemsConnection: Omit<PoemsConnection, 'edges'> & { edges: Array<ResolversParentTypes['PoemsEdge']> };
  PoemsEdge: Omit<PoemsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Poem']> };
  Query: Record<PropertyKey, never>;
  SavedPoem: SavedPoemModel;
  SavedPoemsConnection: Omit<SavedPoemsConnection, 'edges'> & { edges: Array<ResolversParentTypes['SavedPoemsEdge']> };
  SavedPoemsEdge: Omit<SavedPoemsEdge, 'node'> & { node?: Maybe<ResolversParentTypes['SavedPoem']> };
  String: Scalars['String']['output'];
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type AuthorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  collections?: Resolver<ResolversTypes['CollectionsConnection'], ParentType, ContextType, Partial<AuthorCollectionsArgs>>;
  comments?: Resolver<ResolversTypes['CommentsConnection'], ParentType, ContextType, Partial<AuthorCommentsArgs>>;
  dateJoined?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followedBy?: Resolver<ResolversTypes['FollowedAuthorsConnection'], ParentType, ContextType, Partial<AuthorFollowedByArgs>>;
  followedByCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['FollowedAuthorsConnection'], ParentType, ContextType, Partial<AuthorFollowingArgs>>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likedPoems?: Resolver<ResolversTypes['LikesConnection'], ParentType, ContextType, Partial<AuthorLikedPoemsArgs>>;
  poems?: Resolver<ResolversTypes['PoemsConnection'], ParentType, ContextType, Partial<AuthorPoemsArgs>>;
  savedPoems?: Resolver<ResolversTypes['SavedPoemsConnection'], ParentType, ContextType, Partial<AuthorSavedPoemsArgs>>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type AuthorsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthorsConnection'] = ResolversParentTypes['AuthorsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AuthorsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type AuthorsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthorsEdge'] = ResolversParentTypes['AuthorsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poems?: Resolver<ResolversTypes['PoemsConnection'], ParentType, ContextType, Partial<CollectionPoemsArgs>>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CollectionsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CollectionsConnection'] = ResolversParentTypes['CollectionsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CollectionsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type CollectionsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CollectionsEdge'] = ResolversParentTypes['CollectionsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
};

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CommentsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommentsConnection'] = ResolversParentTypes['CommentsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommentsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type CommentsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommentsEdge'] = ResolversParentTypes['CommentsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FollowedAuthorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FollowedAuthor'] = ResolversParentTypes['FollowedAuthor']> = {
  dateFollowed?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type FollowedAuthorsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FollowedAuthorsConnection'] = ResolversParentTypes['FollowedAuthorsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FollowedAuthorsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type FollowedAuthorsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FollowedAuthorsEdge'] = ResolversParentTypes['FollowedAuthorsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['FollowedAuthor']>, ParentType, ContextType>;
};

export type LikeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType>;
};

export type LikesConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LikesConnection'] = ResolversParentTypes['LikesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LikesEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type LikesEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LikesEdge'] = ResolversParentTypes['LikesEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'input'>>;
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'title'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'poemId' | 'text'>>;
  createFollowedAuthor?: Resolver<Maybe<ResolversTypes['FollowedAuthor']>, ParentType, ContextType, RequireFields<MutationCreateFollowedAuthorArgs, 'followingId'>>;
  createLike?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationCreateLikeArgs, 'poemId'>>;
  createPoem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<MutationCreatePoemArgs, 'input'>>;
  createSavedPoem?: Resolver<ResolversTypes['SavedPoem'], ParentType, ContextType, RequireFields<MutationCreateSavedPoemArgs, 'poemId'>>;
  incrementPoemViews?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<MutationIncrementPoemViewsArgs, 'poemId'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  removeAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  removeCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationRemoveCollectionArgs, 'collectionId'>>;
  removeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationRemoveCommentArgs, 'commentId'>>;
  removeFollowedAuthor?: Resolver<ResolversTypes['FollowedAuthor'], ParentType, ContextType, RequireFields<MutationRemoveFollowedAuthorArgs, 'followedAuthorId'>>;
  removeLike?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationRemoveLikeArgs, 'likeId'>>;
  removePoem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<MutationRemovePoemArgs, 'poemId'>>;
  removeSavedPoem?: Resolver<ResolversTypes['SavedPoem'], ParentType, ContextType, RequireFields<MutationRemoveSavedPoemArgs, 'savedPoemId'>>;
  signup?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'input'>>;
  updateCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'input'>>;
  updatePoem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<MutationUpdatePoemArgs, 'input'>>;
};

export type PageInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pageSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PoemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Poem'] = ResolversParentTypes['Poem']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes['CommentsConnection'], ParentType, ContextType, Partial<PoemCommentsArgs>>;
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inCollection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['LikesConnection'], ParentType, ContextType, Partial<PoemLikesArgs>>;
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  savedBy?: Resolver<ResolversTypes['SavedPoemsConnection'], ParentType, ContextType, Partial<PoemSavedByArgs>>;
  savedByCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type PoemsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PoemsConnection'] = ResolversParentTypes['PoemsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PoemsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type PoemsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PoemsEdge'] = ResolversParentTypes['PoemsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Poem']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authorById?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<QueryAuthorByIdArgs, 'id'>>;
  authorByUsername?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<QueryAuthorByUsernameArgs, 'username'>>;
  authors?: Resolver<ResolversTypes['AuthorsConnection'], ParentType, ContextType, Partial<QueryAuthorsArgs>>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<QueryCollectionArgs, 'id'>>;
  collections?: Resolver<ResolversTypes['CollectionsConnection'], ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  comment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>;
  comments?: Resolver<ResolversTypes['CommentsConnection'], ParentType, ContextType, Partial<QueryCommentsArgs>>;
  followedAuthor?: Resolver<ResolversTypes['FollowedAuthor'], ParentType, ContextType, RequireFields<QueryFollowedAuthorArgs, 'id'>>;
  followedAuthors?: Resolver<ResolversTypes['FollowedAuthorsConnection'], ParentType, ContextType, Partial<QueryFollowedAuthorsArgs>>;
  like?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<QueryLikeArgs, 'id'>>;
  likes?: Resolver<ResolversTypes['LikesConnection'], ParentType, ContextType, Partial<QueryLikesArgs>>;
  me?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType, RequireFields<QueryPoemArgs, 'id'>>;
  poems?: Resolver<ResolversTypes['PoemsConnection'], ParentType, ContextType, Partial<QueryPoemsArgs>>;
  savedPoem?: Resolver<ResolversTypes['SavedPoem'], ParentType, ContextType, RequireFields<QuerySavedPoemArgs, 'id'>>;
  savedPoems?: Resolver<ResolversTypes['SavedPoemsConnection'], ParentType, ContextType, Partial<QuerySavedPoemsArgs>>;
};

export type SavedPoemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SavedPoem'] = ResolversParentTypes['SavedPoem']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  dateSaved?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes['Poem'], ParentType, ContextType>;
};

export type SavedPoemsConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SavedPoemsConnection'] = ResolversParentTypes['SavedPoemsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SavedPoemsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type SavedPoemsEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SavedPoemsEdge'] = ResolversParentTypes['SavedPoemsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SavedPoem']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  AuthorsConnection?: AuthorsConnectionResolvers<ContextType>;
  AuthorsEdge?: AuthorsEdgeResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionsConnection?: CollectionsConnectionResolvers<ContextType>;
  CollectionsEdge?: CollectionsEdgeResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentsConnection?: CommentsConnectionResolvers<ContextType>;
  CommentsEdge?: CommentsEdgeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FollowedAuthor?: FollowedAuthorResolvers<ContextType>;
  FollowedAuthorsConnection?: FollowedAuthorsConnectionResolvers<ContextType>;
  FollowedAuthorsEdge?: FollowedAuthorsEdgeResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  LikesConnection?: LikesConnectionResolvers<ContextType>;
  LikesEdge?: LikesEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Poem?: PoemResolvers<ContextType>;
  PoemsConnection?: PoemsConnectionResolvers<ContextType>;
  PoemsEdge?: PoemsEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SavedPoem?: SavedPoemResolvers<ContextType>;
  SavedPoemsConnection?: SavedPoemsConnectionResolvers<ContextType>;
  SavedPoemsEdge?: SavedPoemsEdgeResolvers<ContextType>;
};

