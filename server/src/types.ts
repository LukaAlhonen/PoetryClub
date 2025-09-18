import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  PoemModel,
  UserModel,
  CommentModel,
  CollectionModel,
  SavedPoemModel,
  LikeModel,
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
  token: Scalars["String"]["output"];
  user: User;
};

export type Collection = {
  __typename?: "Collection";
  dateCreated: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  owner: User;
  poems: Array<Poem>;
  title: Scalars["String"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  author: User;
  datePublished: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
  text: Scalars["String"]["output"];
};

export type CreateCollectionInput = {
  ownerId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateCommentInput = {
  authorId: Scalars["String"]["input"];
  datePublished: Scalars["Date"]["input"];
  poemId: Scalars["String"]["input"];
  text: Scalars["String"]["input"];
};

export type CreateLikeInput = {
  poemId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreatePoemInput = {
  authorId: Scalars["String"]["input"];
  collectionId?: InputMaybe<Scalars["String"]["input"]>;
  text: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateSavedPoemInput = {
  poemId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type GetPoemsFilter = {
  authorId?: InputMaybe<Scalars["ID"]["input"]>;
  authorNameContains?: InputMaybe<Scalars["String"]["input"]>;
  textContains?: InputMaybe<Scalars["String"]["input"]>;
  titleContains?: InputMaybe<Scalars["String"]["input"]>;
};

export type Like = {
  __typename?: "Like";
  author: User;
  datePublished: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
};

export type Mutation = {
  __typename?: "Mutation";
  createCollection: Collection;
  createComment: Comment;
  createLike: Like;
  createPoem: Poem;
  createSavedPoem: SavedPoem;
  createUser: User;
  login: AuthPayload;
  removeCollection: Collection;
  removeComment: Comment;
  removeLike: Like;
  removePoem: Poem;
  removeSavedPoem: SavedPoem;
  removeUser: User;
  updateCollection: Collection;
  updatePoem: Poem;
  updateUser: User;
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

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
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

export type MutationRemoveUserArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};

export type MutationUpdatePoemArgs = {
  input: UpdatePoemInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Poem = {
  __typename?: "Poem";
  author: User;
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
  collection: Collection;
  collections: Array<Collection>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  poem?: Maybe<Poem>;
  poems: Array<Poem>;
  userById?: Maybe<User>;
  userByName?: Maybe<User>;
  users: Array<User>;
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
  poemId?: InputMaybe<Scalars["ID"]["input"]>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryPoemArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryPoemsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<GetPoemsFilter>;
  limit: Scalars["Int"]["input"];
};

export type QueryUserByIdArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUserByNameArgs = {
  username: Scalars["String"]["input"];
};

export type SavedPoem = {
  __typename?: "SavedPoem";
  dateSaved: Scalars["Date"]["output"];
  id: Scalars["ID"]["output"];
  poem: Poem;
  user: User;
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

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
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
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
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
    Omit<AuthPayload, "user"> & { user: ResolversTypes["User"] }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Collection: ResolverTypeWrapper<CollectionModel>;
  Comment: ResolverTypeWrapper<CommentModel>;
  CreateCollectionInput: CreateCollectionInput;
  CreateCommentInput: CreateCommentInput;
  CreateLikeInput: CreateLikeInput;
  CreatePoemInput: CreatePoemInput;
  CreateSavedPoemInput: CreateSavedPoemInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  GetPoemsFilter: GetPoemsFilter;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Like: ResolverTypeWrapper<LikeModel>;
  Mutation: ResolverTypeWrapper<{}>;
  Poem: ResolverTypeWrapper<PoemModel>;
  Query: ResolverTypeWrapper<{}>;
  SavedPoem: ResolverTypeWrapper<SavedPoemModel>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, "user"> & {
    user: ResolversParentTypes["User"];
  };
  Boolean: Scalars["Boolean"]["output"];
  Collection: CollectionModel;
  Comment: CommentModel;
  CreateCollectionInput: CreateCollectionInput;
  CreateCommentInput: CreateCommentInput;
  CreateLikeInput: CreateLikeInput;
  CreatePoemInput: CreatePoemInput;
  CreateSavedPoemInput: CreateSavedPoemInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars["Date"]["output"];
  GetPoemsFilter: GetPoemsFilter;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Like: LikeModel;
  Mutation: {};
  Poem: PoemModel;
  Query: {};
  SavedPoem: SavedPoemModel;
  String: Scalars["String"]["output"];
  UpdateCollectionInput: UpdateCollectionInput;
  UpdatePoemInput: UpdatePoemInput;
  UpdateUserInput: UpdateUserInput;
  User: UserModel;
};

export type AuthPayloadResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"],
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Collection"] = ResolversParentTypes["Collection"],
> = {
  dateCreated?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  poems?: Resolver<Array<ResolversTypes["Poem"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"],
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type LikeResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Like"] = ResolversParentTypes["Like"],
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  datePublished?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
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
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "password" | "username">
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
  removeUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserArgs, "id">
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
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
};

export type PoemResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Poem"] = ResolversParentTypes["Poem"],
> = {
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
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
  userById?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    Partial<QueryUserByIdArgs>
  >;
  userByName?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserByNameArgs, "username">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type SavedPoemResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["SavedPoem"] = ResolversParentTypes["SavedPoem"],
> = {
  dateSaved?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  poem?: Resolver<ResolversTypes["Poem"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = DataSourceContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Poem?: PoemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SavedPoem?: SavedPoemResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
