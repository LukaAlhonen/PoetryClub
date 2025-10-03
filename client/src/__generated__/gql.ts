/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n": typeof types.AuthorSimpleFragmentFragmentDoc,
    "\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n": typeof types.AuthorFragmentFragmentDoc,
    "\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.CollectionFragmentFragmentDoc,
    "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.CommentFragmentFragmentDoc,
    "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.FollowedByFragmentFragmentDoc,
    "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.FollowingFragmentFragmentDoc,
    "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.LikeFragmentFragmentDoc,
    "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n    }\n": typeof types.LikedPoemFragmentFragmentDoc,
    "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": typeof types.PoemFragmentFragmentDoc,
    "\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": typeof types.GetAuthorByIdDocument,
    "\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": typeof types.GetAuthorByUsernameDocument,
    "\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.GetAuthorsDocument,
    "\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n": typeof types.GetCollectionDocument,
    "\n  query GetPoems($limit: Int, $cursor: ID, $filter: GetPoemsFilter) {\n    poems(limit: $limit, cursor: $cursor, filter: $filter) {\n      id\n      ...PoemFragment\n    }\n  }\n": typeof types.GetPoemsDocument,
};
const documents: Documents = {
    "\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n": types.AuthorSimpleFragmentFragmentDoc,
    "\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n": types.AuthorFragmentFragmentDoc,
    "\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.CollectionFragmentFragmentDoc,
    "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.CommentFragmentFragmentDoc,
    "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.FollowedByFragmentFragmentDoc,
    "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.FollowingFragmentFragmentDoc,
    "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.LikeFragmentFragmentDoc,
    "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n    }\n": types.LikedPoemFragmentFragmentDoc,
    "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": types.PoemFragmentFragmentDoc,
    "\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": types.GetAuthorByIdDocument,
    "\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": types.GetAuthorByUsernameDocument,
    "\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n": types.GetAuthorsDocument,
    "\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n": types.GetCollectionDocument,
    "\n  query GetPoems($limit: Int, $cursor: ID, $filter: GetPoemsFilter) {\n    poems(limit: $limit, cursor: $cursor, filter: $filter) {\n      id\n      ...PoemFragment\n    }\n  }\n": types.GetPoemsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n"): (typeof documents)["\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n"): (typeof documents)["\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n    }\n"): (typeof documents)["\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"): (typeof documents)["\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPoems($limit: Int, $cursor: ID, $filter: GetPoemsFilter) {\n    poems(limit: $limit, cursor: $cursor, filter: $filter) {\n      id\n      ...PoemFragment\n    }\n  }\n"): (typeof documents)["\n  query GetPoems($limit: Int, $cursor: ID, $filter: GetPoemsFilter) {\n    poems(limit: $limit, cursor: $cursor, filter: $filter) {\n      id\n      ...PoemFragment\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;