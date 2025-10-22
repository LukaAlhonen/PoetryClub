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
    "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            id\n            username\n        }\n        datePublished\n    }\n": typeof types.CommentFragmentFragmentDoc,
    "\n    fragment PoemCardFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            id\n            username\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": typeof types.PoemCardFragmentFragmentDoc,
    "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            edges {\n                node {\n                    id\n                    ...CommentFragment\n                }\n            }\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n": typeof types.PoemDetailFragmentFragmentDoc,
    "\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n": typeof types.CreatePoemDocument,
    "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n": typeof types.LoginDocument,
    "\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n": typeof types.GetPoemDocument,
    "\n  query GetPoems($first: Int, $after: ID) {\n    poems(first: $first, after: $after) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": typeof types.GetPoemsDocument,
    "\n  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": typeof types.GetPoemsWithFilterDocument,
};
const documents: Documents = {
    "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            id\n            username\n        }\n        datePublished\n    }\n": types.CommentFragmentFragmentDoc,
    "\n    fragment PoemCardFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            id\n            username\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": types.PoemCardFragmentFragmentDoc,
    "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            edges {\n                node {\n                    id\n                    ...CommentFragment\n                }\n            }\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n": types.PoemDetailFragmentFragmentDoc,
    "\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n": types.CreatePoemDocument,
    "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n": types.LoginDocument,
    "\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n": types.GetPoemDocument,
    "\n  query GetPoems($first: Int, $after: ID) {\n    poems(first: $first, after: $after) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": types.GetPoemsDocument,
    "\n  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": types.GetPoemsWithFilterDocument,
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
export function gql(source: "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            id\n            username\n        }\n        datePublished\n    }\n"): (typeof documents)["\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            id\n            username\n        }\n        datePublished\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment PoemCardFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            id\n            username\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"): (typeof documents)["\n    fragment PoemCardFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            id\n            username\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            edges {\n                node {\n                    id\n                    ...CommentFragment\n                }\n            }\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n"): (typeof documents)["\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            edges {\n                node {\n                    id\n                    ...CommentFragment\n                }\n            }\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n"): (typeof documents)["\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n"): (typeof documents)["\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n"): (typeof documents)["\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPoems($first: Int, $after: ID) {\n    poems(first: $first, after: $after) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoems($first: Int, $after: ID) {\n    poems(first: $first, after: $after) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoemsWithFilter($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;