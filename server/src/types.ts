import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  PoemModel,
  AuthorModel,
  CommentModel,
  CollectionModel,
  SavedPoemModel,
  LikeModel,
  FollowedAuthorModel,
} from "./models.js";
import { DataSourceContext } from "./context.js";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  author: Author;
  token: Scalars["String"]["output"];
};

export type Author = {
  __typename?: "Author";
  collections: Array<Collection>;
  comments: Array<Comment>;
  dateJoined: Scalars["Date"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  likedPoems: Array<Like>;
  poems: Array<Poem>;
  savedPoems: Array<SavedPoem>;
  username: Scalars["String"]["output"];
};

export type Collection = {
  __typename?: "Collection";
  author: Author;
  dateCreated: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poems: Array<Poem>;
  title: Scalars["String"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  author: Author;
  datePublished: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
  text: Scalars["String"]["output"];
};

export type CreateAuthorInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type CreateCollectionInput = {
  authorId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateCommentInput = {
  authorId: Scalars["String"]["input"];
  poemId: Scalars["String"]["input"];
  text: Scalars["String"]["input"];
};

export type CreateFollowedAuthorInput = {
  followerId: Scalars["String"]["input"];
  followingId: Scalars["String"]["input"];
};

export type CreateLikeInput = {
  authorId: Scalars["String"]["input"];
  poemId: Scalars["String"]["input"];
};

export type CreatePoemInput = {
  authorId: Scalars["String"]["input"];
  collectionId?: InputMaybe<Scalars["String"]["input"]>;
  text: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateSavedPoemInput = {
  authorId: Scalars["String"]["input"];
  poemId: Scalars["String"]["input"];
};

export type FollowedAuthor = {
  __typename?: "FollowedAuthor";
  follower: Author;
  following: Author;
  id: Scalars["ID"]["output"];
};

export type GetPoemsFilter = {
  authorId?: InputMaybe<Scalars["ID"]["input"]>;
  authorNameContains?: InputMaybe<Scalars["String"]["input"]>;
  textContains?: InputMaybe<Scalars["String"]["input"]>;
  titleContains?: InputMaybe<Scalars["String"]["input"]>;
};

export type Like = {
  __typename?: "Like";
  author: Author;
  datePublished: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
};

export type Mutation = {
  __typename?: "Mutation";
  createAuthor: Author;
  createCollection: Collection;
  createComment: Comment;
  createLike: Like;
  createPoem: Poem;
  createSavedPoem: SavedPoem;
  login: AuthPayload;
  removeAuthor: Author;
  removeCollection: Collection;
  removeComment: Comment;
  removeLike: Like;
  removePoem: Poem;
  removeSavedPoem: SavedPoem;
  updateAuthor: Author;
  updateCollection: Collection;
  updatePoem: Poem;
};

export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationCreateLikeArgs = {
  input: CreateLikeInput;
};

export type MutationCreatePoemArgs = {
  input: CreatePoemInput;
};

export type MutationCreateSavedPoemArgs = {
  input: CreateSavedPoemInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRemoveAuthorArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveCollectionArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveCommentArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveLikeArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemovePoemArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveSavedPoemArgs = {
  id: Scalars["String"]["input"];
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
  __typename?: "Poem";
  author: Author;
  comments: Array<Comment>;
  datePublished: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  inCollection?: Maybe<Collection>;
  likes: Array<Like>;
  savedBy: Array<SavedPoem>;
  text: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  views: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  authorById?: Maybe<Author>;
  authorByName?: Maybe<Author>;
  authors: Array<Author>;
  collection: Collection;
  collections: Array<Collection>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  poem?: Maybe<Poem>;
  poems: Array<Poem>;
};

export type QueryAuthorByIdArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryAuthorByNameArgs = {
  username: Scalars["String"]["input"];
};

export type QueryCollectionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCollectionsArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCommentArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryCommentsArgs = {
  authorId?: InputMaybe<Scalars["ID"]["input"]>;
  poemId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryPoemArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPoemsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<GetPoemsFilter>;
  limit: Scalars["Int"]["input"];
};

export type SavedPoem = {
  __typename?: "SavedPoem";
  author: Author;
  dateSaved: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
};

export type UpdateAuthorInput = {
  authorId: Scalars["String"]["input"];
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCollectionInput = {
  id: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type UpdatePoemInput = {
  authorId?: InputMaybe<Scalars["String"]["input"]>;
  collectionId?: InputMaybe<Scalars["ID"]["input"]>;
  datePublished?: InputMaybe<Scalars["Date"]["input"]>;
  poemId: Scalars["String"]["input"];
  text?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  views?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<
    Omit<AuthPayload, "author"> & { author: ResolversTypes["Author"] }
  >;
  Author: ResolverTypeWrapper<AuthorModel>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Collection: ResolverTypeWrapper<CollectionModel>;
  Comment: ResolverTypeWrapper<CommentModel>;
  CreateAuthorInput: CreateAuthorInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCommentInput: CreateCommentInput;
  CreateFollowedAuthorInput: CreateFollowedAuthorInput;
  CreateLikeInput: CreateLikeInput;
  CreatePoemInput: CreatePoemInput;
  CreateSavedPoemInput: CreateSavedPoemInput;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  FollowedAuthor: ResolverTypeWrapper<FollowedAuthorModel>;
  GetPoemsFilter: GetPoemsFilter;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Like: ResolverTypeWrapper<LikeModel>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Poem: ResolverTypeWrapper<PoemModel>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SavedPoem: ResolverTypeWrapper<SavedPoemModel>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, "author"> & {
    author: ResolversParentTypes["Author"];
  };
  Author: AuthorModel;
  Boolean: Scalars["Boolean"]["output"];
  Collection: CollectionModel;
  Comment: CommentModel;
  CreateAuthorInput: CreateAuthorInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateCommentInput: CreateCommentInput;
  CreateFollowedAuthorInput: CreateFollowedAuthorInput;
  CreateLikeInput: CreateLikeInput;
  CreatePoemInput: CreatePoemInput;
  CreateSavedPoemInput: CreateSavedPoemInput;
  Date: Scalars["Date"]["output"];
  FollowedAuthor: FollowedAuthorModel;
  GetPoemsFilter: GetPoemsFilter;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Like: LikeModel;
  Mutation: Record<PropertyKey, never>;
  Poem: PoemModel;
  Query: Record<PropertyKey, never>;
  SavedPoem: SavedPoemModel;
  String: Scalars["String"]["output"];
  UpdateAuthorInput: UpdateAuthorInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
};

export type AuthPayloadResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type AuthorResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Author"] = ResolversParentTypes["Author"],
> = {
  collections?: Resolver<
    Array<ResolversTypes["Collection"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  dateJoined?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  likedPoems?: Resolver<Array<ResolversTypes["Like"]>, ParentType, ContextType>;
  poems?: Resolver<Array<ResolversTypes["Poem"]>, ParentType, ContextType>;
  savedPoems?: Resolver<
    Array<ResolversTypes["SavedPoem"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Collection"] = ResolversParentTypes["Collection"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poems?: Resolver<Array<ResolversTypes["Poem"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type FollowedAuthorResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["FollowedAuthor"] = ResolversParentTypes["FollowedAuthor"],
> = {
  follower?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  following?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type LikeResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Like"] = ResolversParentTypes["Like"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createAuthor?: Resolver<
    ResolversTypes["Author"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAuthorArgs, "input">
  >;
  createCollection?: Resolver<
    ResolversTypes["Collection"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, "input">
  >;
  createComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, "input">
  >;
  createLike?: Resolver<
    ResolversTypes["Like"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLikeArgs, "input">
  >;
  createPoem?: Resolver<
    ResolversTypes["Poem"],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePoemArgs, "input">
  >;
  createSavedPoem?: Resolver<
    ResolversTypes["SavedPoem"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSavedPoemArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "password" | "username">
  >;
  removeAuthor?: Resolver<
    ResolversTypes["Author"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAuthorArgs, "id">
  >;
  removeCollection?: Resolver<
    ResolversTypes["Collection"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCollectionArgs, "id">
  >;
  removeComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommentArgs, "id">
  >;
  removeLike?: Resolver<
    ResolversTypes["Like"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveLikeArgs, "id">
  >;
  removePoem?: Resolver<
    ResolversTypes["Poem"],
    ParentType,
    ContextType,
    RequireFields<MutationRemovePoemArgs, "id">
  >;
  removeSavedPoem?: Resolver<
    ResolversTypes["SavedPoem"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveSavedPoemArgs, "id">
  >;
  updateAuthor?: Resolver<
    ResolversTypes["Author"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAuthorArgs, "input">
  >;
  updateCollection?: Resolver<
    ResolversTypes["Collection"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCollectionArgs, "input">
  >;
  updatePoem?: Resolver<
    ResolversTypes["Poem"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePoemArgs, "input">
  >;
};

export type PoemResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Poem"] = ResolversParentTypes["Poem"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  datePublished?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  inCollection?: Resolver<
    Maybe<ResolversTypes["Collection"]>,
    ParentType,
    ContextType
  >;
  likes?: Resolver<Array<ResolversTypes["Like"]>, ParentType, ContextType>;
  savedBy?: Resolver<
    Array<ResolversTypes["SavedPoem"]>,
    ParentType,
    ContextType
  >;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  views?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  authorById?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    Partial<QueryAuthorByIdArgs>
  >;
  authorByName?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAuthorByNameArgs, "username">
  >;
  authors?: Resolver<Array<ResolversTypes["Author"]>, ParentType, ContextType>;
  collection?: Resolver<
    ResolversTypes["Collection"],
    ParentType,
    ContextType,
    RequireFields<QueryCollectionArgs, "id">
  >;
  collections?: Resolver<
    Array<ResolversTypes["Collection"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCollectionsArgs, "id">
  >;
  comment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentArgs, "id">
  >;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    Partial<QueryCommentsArgs>
  >;
  poem?: Resolver<
    Maybe<ResolversTypes["Poem"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPoemArgs, "id">
  >;
  poems?: Resolver<
    Array<ResolversTypes["Poem"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPoemsArgs, "limit">
  >;
};

export type SavedPoemResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["SavedPoem"] = ResolversParentTypes["SavedPoem"],
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  dateSaved?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FollowedAuthor?: FollowedAuthorResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Poem?: PoemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SavedPoem?: SavedPoemResolvers<ContextType>;
};
