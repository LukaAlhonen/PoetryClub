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
    "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            id\n            ...CommentFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n": typeof types.PoemDetailFragmentFragmentDoc,
    "\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n": typeof types.AuthorSimpleFragmentFragmentDoc,
    "\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n": typeof types.AuthorFragmentFragmentDoc,
    "\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.CollectionFragmentFragmentDoc,
    "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.FollowedByFragmentFragmentDoc,
    "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.FollowingFragmentFragmentDoc,
    "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n        datePublished\n    }\n": typeof types.LikeFragmentFragmentDoc,
    "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n        datePublished\n    }\n": typeof types.LikedPoemFragmentFragmentDoc,
    "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": typeof types.PoemFragmentFragmentDoc,
    "\n    fragment SavedByFragment on SavedPoem {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.SavedByFragmentFragmentDoc,
    "\n    mutation CreateCollection($title: String!) {\n      createCollection(title: $title) {\n        id\n      }\n    }\n": typeof types.CreateCollectionDocument,
    "\n    mutation CreateComment($poemId: ID!, $text: String!) {\n      createComment(poemId: $poemId, text: $text) {\n        id\n      }\n    }\n": typeof types.CreateCommentDocument,
    "\n    mutation CreateFollowedAuthor($followingId: ID!) {\n      createFollowedAuthor(followingId: $followingId) {\n        id\n      }\n    }\n": typeof types.CreateFollowedAuthorDocument,
    "\n    mutation CreateLike($poemId: ID!) {\n      createLike(poemId: $poemId) {\n        id\n      }\n    }\n": typeof types.CreateLikeDocument,
    "\n    mutation CreateSavedPoem($poemId: ID!) {\n      createSavedPoem(poemId: $poemId) {\n        id\n      }\n    }\n": typeof types.CreateSavedPoemDocument,
    "\n    mutation RemoveAuthor {\n      removeAuthor {\n        id\n      }\n    }\n": typeof types.RemoveAuthorDocument,
    "\n    mutation RemoveCollection($collectionId: ID!) {\n      removeCollection(collectionId: $collectionId) {\n        id\n      }\n    }\n": typeof types.RemoveCollectionDocument,
    "\n    mutation RemoveComment($commentId: ID!) {\n      removeComment(commentId: $commentId) {\n        id\n      }\n    }\n": typeof types.RemoveCommentDocument,
    "\n    mutation RemoveFollowedAuthor($followedAuthorId: ID!) {\n      removeFollowedAuthor(followedAuthorId: $followedAuthorId) {\n        id\n      }\n    }\n": typeof types.RemoveFollowedAuthorDocument,
    "\n    mutation RemoveLike($likeId: ID!) {\n      removeLike(likeId: $likeId) {\n        id\n      }\n    }\n": typeof types.RemoveLikeDocument,
    "\n    mutation RemovePoem($poemId: ID!) {\n      removePoem(poemId: $poemId) {\n        id\n      }\n    }\n": typeof types.RemovePoemDocument,
    "\n    mutation RemoveSavedPoem($savedPoemId: ID!) {\n      removeSavedPoem(savedPoemId: $savedPoemId) {\n        id\n      }\n    }\n": typeof types.RemoveSavedPoemDocument,
    "\n    mutation CreateAuthor($input: CreateAuthorInput!) {\n      createAuthor(input: $input) {\n        id\n      }\n    }\n": typeof types.CreateAuthorDocument,
    "\n    mutation UpdateAuthor($input: UpdateAuthorInput!) {\n      updateAuthor(input: $input) {\n        id\n        username\n      }\n    }\n": typeof types.UpdateAuthorDocument,
    "\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n      updateCollection(input: $input) {\n        id\n      }\n    }\n": typeof types.UpdateCollectionDocument,
    "\n    mutation UpdatePoem($input: UpdatePoemInput!) {\n      updatePoem(input: $input) {\n        id\n      }\n    }\n": typeof types.UpdatePoemDocument,
    "\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": typeof types.GetAuthorByIdDocument,
    "\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": typeof types.GetAuthorByUsernameDocument,
    "\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n": typeof types.GetAuthorsDocument,
    "\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n": typeof types.GetCollectionDocument,
    "\n    query GetCollections ($limit: Int $cursor: ID $filter: GetCollectionsFilter) {\n        collections(limit: $limit cursor: $cursor filter: $filter) {\n            id\n            ...CollectionFragment\n        }\n    }\n": typeof types.GetCollectionsDocument,
    "\n    query GetComment($id: ID!) {\n        comment(id: $id) {\n            id\n            text\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            datePublished\n        }\n    }\n": typeof types.GetCommentDocument,
    "\n    query GetComments ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        comments (limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...CommentFragment\n        }\n    }\n": typeof types.GetCommentsDocument,
    "\n    query GetFollowedAuthor ($id: ID!) {\n        followedAuthor (id: $id) {\n            id\n            follower {\n                id\n            }\n            following {\n                id\n            }\n        }\n    }\n": typeof types.GetFollowedAuthorDocument,
    "\n    query GetFollowers ($limit: Int $cursor: ID $followingId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followingId: $followingId) {\n            id\n            ...FollowedByFragment\n        }\n    }\n": typeof types.GetFollowersDocument,
    "\n    query GetFollowing ($limit: Int $cursor: ID $followerId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followerId: $followerId) {\n            id\n            ...FollowingFragment\n        }\n    }\n": typeof types.GetFollowingDocument,
    "\n    query GetLike ($id: ID!) {\n        like (id: $id) {\n           id\n           author {\n               id\n               ...AuthorSimpleFragment\n           }\n           poem {\n               id\n               ...PoemFragment\n           }\n        }\n    }\n": typeof types.GetLikeDocument,
    "\n    query GetLikedPoems ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikedPoemFragment\n        }\n    }\n": typeof types.GetLikedPoemsDocument,
    "\n    query GetLikesForPoem ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikeFragment\n        }\n    }\n": typeof types.GetLikesForPoemDocument,
    "\n    query GetSavedPoem ($id: ID!) {\n        savedPoem(id: $id) {\n            id\n            author {\n                id\n                ...AuthorSimpleFragment\n            }\n            poem {\n                id\n                ...PoemFragment\n            }\n            dateSaved\n        }\n    }\n": typeof types.GetSavedPoemDocument,
    "\n    query GetSavedPoems ($limit: Int, $cursor: ID, $poemId: ID, $authorId: ID) {\n        savedPoems(limit: $limit, cursor: $cursor, poemId: $poemId, authorId: $authorId) {\n            id\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            dateSaved\n        }\n    }\n": typeof types.GetSavedPoemsDocument,
    "\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n": typeof types.CreatePoemDocument,
    "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n": typeof types.LoginDocument,
    "\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n": typeof types.GetPoemDocument,
    "\n  query GetPoems($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": typeof types.GetPoemsDocument,
};
const documents: Documents = {
    "\n    fragment CommentFragment on Comment {\n        id\n        text\n        author {\n            id\n            username\n        }\n        datePublished\n    }\n": types.CommentFragmentFragmentDoc,
    "\n    fragment PoemCardFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            id\n            username\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": types.PoemCardFragmentFragmentDoc,
    "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            id\n            ...CommentFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n": types.PoemDetailFragmentFragmentDoc,
    "\n    fragment AuthorSimpleFragment on Author {\n        id\n        username\n    }\n": types.AuthorSimpleFragmentFragmentDoc,
    "\n    fragment AuthorFragment on Author {\n        id\n        username\n        dateJoined\n        followedByCount\n        followingCount\n    }\n": types.AuthorFragmentFragmentDoc,
    "\n    fragment CollectionFragment on Collection {\n        id\n        title\n        dateCreated\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.CollectionFragmentFragmentDoc,
    "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.FollowedByFragmentFragmentDoc,
    "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.FollowingFragmentFragmentDoc,
    "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n        datePublished\n    }\n": types.LikeFragmentFragmentDoc,
    "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n        datePublished\n    }\n": types.LikedPoemFragmentFragmentDoc,
    "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n": types.PoemFragmentFragmentDoc,
    "\n    fragment SavedByFragment on SavedPoem {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n": types.SavedByFragmentFragmentDoc,
    "\n    mutation CreateCollection($title: String!) {\n      createCollection(title: $title) {\n        id\n      }\n    }\n": types.CreateCollectionDocument,
    "\n    mutation CreateComment($poemId: ID!, $text: String!) {\n      createComment(poemId: $poemId, text: $text) {\n        id\n      }\n    }\n": types.CreateCommentDocument,
    "\n    mutation CreateFollowedAuthor($followingId: ID!) {\n      createFollowedAuthor(followingId: $followingId) {\n        id\n      }\n    }\n": types.CreateFollowedAuthorDocument,
    "\n    mutation CreateLike($poemId: ID!) {\n      createLike(poemId: $poemId) {\n        id\n      }\n    }\n": types.CreateLikeDocument,
    "\n    mutation CreateSavedPoem($poemId: ID!) {\n      createSavedPoem(poemId: $poemId) {\n        id\n      }\n    }\n": types.CreateSavedPoemDocument,
    "\n    mutation RemoveAuthor {\n      removeAuthor {\n        id\n      }\n    }\n": types.RemoveAuthorDocument,
    "\n    mutation RemoveCollection($collectionId: ID!) {\n      removeCollection(collectionId: $collectionId) {\n        id\n      }\n    }\n": types.RemoveCollectionDocument,
    "\n    mutation RemoveComment($commentId: ID!) {\n      removeComment(commentId: $commentId) {\n        id\n      }\n    }\n": types.RemoveCommentDocument,
    "\n    mutation RemoveFollowedAuthor($followedAuthorId: ID!) {\n      removeFollowedAuthor(followedAuthorId: $followedAuthorId) {\n        id\n      }\n    }\n": types.RemoveFollowedAuthorDocument,
    "\n    mutation RemoveLike($likeId: ID!) {\n      removeLike(likeId: $likeId) {\n        id\n      }\n    }\n": types.RemoveLikeDocument,
    "\n    mutation RemovePoem($poemId: ID!) {\n      removePoem(poemId: $poemId) {\n        id\n      }\n    }\n": types.RemovePoemDocument,
    "\n    mutation RemoveSavedPoem($savedPoemId: ID!) {\n      removeSavedPoem(savedPoemId: $savedPoemId) {\n        id\n      }\n    }\n": types.RemoveSavedPoemDocument,
    "\n    mutation CreateAuthor($input: CreateAuthorInput!) {\n      createAuthor(input: $input) {\n        id\n      }\n    }\n": types.CreateAuthorDocument,
    "\n    mutation UpdateAuthor($input: UpdateAuthorInput!) {\n      updateAuthor(input: $input) {\n        id\n        username\n      }\n    }\n": types.UpdateAuthorDocument,
    "\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n      updateCollection(input: $input) {\n        id\n      }\n    }\n": types.UpdateCollectionDocument,
    "\n    mutation UpdatePoem($input: UpdatePoemInput!) {\n      updatePoem(input: $input) {\n        id\n      }\n    }\n": types.UpdatePoemDocument,
    "\n    query GetAuthorById(\n        $id: ID!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorById(id: $id) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": types.GetAuthorByIdDocument,
    "\n    query GetAuthorByUsername(\n        $username: String!\n        $poemsLimit: Int\n        $poemsCursor: ID\n        $likedPoemsLimit: Int\n        $likedPoemsCursor: ID\n        $collectionsLimit: Int\n        $collectionsCursor: ID\n    ) {\n        authorByUsername(username: $username) {\n            id\n            ...AuthorFragment\n            poems(limit: $poemsLimit, cursor: $poemsCursor) {\n                ...PoemFragment\n            }\n            likedPoems(limit: $likedPoemsLimit, cursor: $likedPoemsCursor) {\n                ...LikedPoemFragment\n            }\n            collections(limit: $collectionsLimit, cursor: $collectionsCursor) {\n                ...CollectionFragment\n            }\n        }\n    }\n": types.GetAuthorByUsernameDocument,
    "\n    query GetAuthors(\n        $limit: Int\n        $cursor: ID\n        $usernameContains: String\n    ) {\n        authors(limit: $limit, cursor: $cursor, usernameContains: $usernameContains) {\n            id\n            ...AuthorSimpleFragment\n        }\n    }\n": types.GetAuthorsDocument,
    "\n    query GetCollection($id: ID!) {\n        collection(id: $id) {\n            id\n            ...CollectionFragment\n            poems {\n                ...PoemFragment\n            }\n        }\n    }\n": types.GetCollectionDocument,
    "\n    query GetCollections ($limit: Int $cursor: ID $filter: GetCollectionsFilter) {\n        collections(limit: $limit cursor: $cursor filter: $filter) {\n            id\n            ...CollectionFragment\n        }\n    }\n": types.GetCollectionsDocument,
    "\n    query GetComment($id: ID!) {\n        comment(id: $id) {\n            id\n            text\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            datePublished\n        }\n    }\n": types.GetCommentDocument,
    "\n    query GetComments ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        comments (limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...CommentFragment\n        }\n    }\n": types.GetCommentsDocument,
    "\n    query GetFollowedAuthor ($id: ID!) {\n        followedAuthor (id: $id) {\n            id\n            follower {\n                id\n            }\n            following {\n                id\n            }\n        }\n    }\n": types.GetFollowedAuthorDocument,
    "\n    query GetFollowers ($limit: Int $cursor: ID $followingId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followingId: $followingId) {\n            id\n            ...FollowedByFragment\n        }\n    }\n": types.GetFollowersDocument,
    "\n    query GetFollowing ($limit: Int $cursor: ID $followerId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followerId: $followerId) {\n            id\n            ...FollowingFragment\n        }\n    }\n": types.GetFollowingDocument,
    "\n    query GetLike ($id: ID!) {\n        like (id: $id) {\n           id\n           author {\n               id\n               ...AuthorSimpleFragment\n           }\n           poem {\n               id\n               ...PoemFragment\n           }\n        }\n    }\n": types.GetLikeDocument,
    "\n    query GetLikedPoems ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikedPoemFragment\n        }\n    }\n": types.GetLikedPoemsDocument,
    "\n    query GetLikesForPoem ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikeFragment\n        }\n    }\n": types.GetLikesForPoemDocument,
    "\n    query GetSavedPoem ($id: ID!) {\n        savedPoem(id: $id) {\n            id\n            author {\n                id\n                ...AuthorSimpleFragment\n            }\n            poem {\n                id\n                ...PoemFragment\n            }\n            dateSaved\n        }\n    }\n": types.GetSavedPoemDocument,
    "\n    query GetSavedPoems ($limit: Int, $cursor: ID, $poemId: ID, $authorId: ID) {\n        savedPoems(limit: $limit, cursor: $cursor, poemId: $poemId, authorId: $authorId) {\n            id\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            dateSaved\n        }\n    }\n": types.GetSavedPoemsDocument,
    "\n    mutation CreatePoem($input: CreatePoemInput!) {\n      createPoem(input: $input) {\n        id\n        ...PoemCardFragment\n      }\n    }\n": types.CreatePoemDocument,
    "\n    mutation Login($username: String!, $password: String!) {\n      login(username: $username, password: $password) {\n        token\n        author {\n          id\n          username\n        }\n      }\n    }\n": types.LoginDocument,
    "\n    query GetPoem(\n      $poemId: ID!\n    ) {\n      poem(id: $poemId) {\n          id\n          ...PoemDetailFragment\n      }\n    }\n": types.GetPoemDocument,
    "\n  query GetPoems($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n": types.GetPoemsDocument,
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
export function gql(source: "\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            id\n            ...CommentFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n"): (typeof documents)["\n    fragment PoemDetailFragment on Poem {\n        id\n        title\n        text\n        inCollection {\n            id\n            title\n        }\n        datePublished\n        author {\n            id\n            username\n        }\n        comments {\n            id\n            ...CommentFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n    }\n"];
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
export function gql(source: "\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment FollowedByFragment on FollowedAuthor {\n        id\n        follower {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment FollowingFragment on FollowedAuthor {\n        id\n        following {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n        datePublished\n    }\n"): (typeof documents)["\n    fragment LikeFragment on Like {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n        datePublished\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n        datePublished\n    }\n"): (typeof documents)["\n    fragment LikedPoemFragment on Like {\n        id\n        poem {\n            id\n            ...PoemFragment\n        }\n        datePublished\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"): (typeof documents)["\n    fragment PoemFragment on Poem {\n        id\n        title\n        text\n        datePublished\n        author {\n            ...AuthorSimpleFragment\n        }\n        views\n        likesCount\n        commentsCount\n        savedByCount\n        inCollection {\n           id\n           title\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment SavedByFragment on SavedPoem {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"): (typeof documents)["\n    fragment SavedByFragment on SavedPoem {\n        id\n        author {\n            ...AuthorSimpleFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateCollection($title: String!) {\n      createCollection(title: $title) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateCollection($title: String!) {\n      createCollection(title: $title) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateComment($poemId: ID!, $text: String!) {\n      createComment(poemId: $poemId, text: $text) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateComment($poemId: ID!, $text: String!) {\n      createComment(poemId: $poemId, text: $text) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateFollowedAuthor($followingId: ID!) {\n      createFollowedAuthor(followingId: $followingId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateFollowedAuthor($followingId: ID!) {\n      createFollowedAuthor(followingId: $followingId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateLike($poemId: ID!) {\n      createLike(poemId: $poemId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateLike($poemId: ID!) {\n      createLike(poemId: $poemId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateSavedPoem($poemId: ID!) {\n      createSavedPoem(poemId: $poemId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateSavedPoem($poemId: ID!) {\n      createSavedPoem(poemId: $poemId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveAuthor {\n      removeAuthor {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveAuthor {\n      removeAuthor {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveCollection($collectionId: ID!) {\n      removeCollection(collectionId: $collectionId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveCollection($collectionId: ID!) {\n      removeCollection(collectionId: $collectionId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveComment($commentId: ID!) {\n      removeComment(commentId: $commentId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveComment($commentId: ID!) {\n      removeComment(commentId: $commentId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveFollowedAuthor($followedAuthorId: ID!) {\n      removeFollowedAuthor(followedAuthorId: $followedAuthorId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveFollowedAuthor($followedAuthorId: ID!) {\n      removeFollowedAuthor(followedAuthorId: $followedAuthorId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveLike($likeId: ID!) {\n      removeLike(likeId: $likeId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveLike($likeId: ID!) {\n      removeLike(likeId: $likeId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemovePoem($poemId: ID!) {\n      removePoem(poemId: $poemId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemovePoem($poemId: ID!) {\n      removePoem(poemId: $poemId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RemoveSavedPoem($savedPoemId: ID!) {\n      removeSavedPoem(savedPoemId: $savedPoemId) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation RemoveSavedPoem($savedPoemId: ID!) {\n      removeSavedPoem(savedPoemId: $savedPoemId) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateAuthor($input: CreateAuthorInput!) {\n      createAuthor(input: $input) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateAuthor($input: CreateAuthorInput!) {\n      createAuthor(input: $input) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateAuthor($input: UpdateAuthorInput!) {\n      updateAuthor(input: $input) {\n        id\n        username\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateAuthor($input: UpdateAuthorInput!) {\n      updateAuthor(input: $input) {\n        id\n        username\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n      updateCollection(input: $input) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateCollection($input: UpdateCollectionInput!) {\n      updateCollection(input: $input) {\n        id\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdatePoem($input: UpdatePoemInput!) {\n      updatePoem(input: $input) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation UpdatePoem($input: UpdatePoemInput!) {\n      updatePoem(input: $input) {\n        id\n      }\n    }\n"];
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
export function gql(source: "\n    query GetCollections ($limit: Int $cursor: ID $filter: GetCollectionsFilter) {\n        collections(limit: $limit cursor: $cursor filter: $filter) {\n            id\n            ...CollectionFragment\n        }\n    }\n"): (typeof documents)["\n    query GetCollections ($limit: Int $cursor: ID $filter: GetCollectionsFilter) {\n        collections(limit: $limit cursor: $cursor filter: $filter) {\n            id\n            ...CollectionFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetComment($id: ID!) {\n        comment(id: $id) {\n            id\n            text\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            datePublished\n        }\n    }\n"): (typeof documents)["\n    query GetComment($id: ID!) {\n        comment(id: $id) {\n            id\n            text\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            datePublished\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetComments ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        comments (limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...CommentFragment\n        }\n    }\n"): (typeof documents)["\n    query GetComments ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        comments (limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...CommentFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetFollowedAuthor ($id: ID!) {\n        followedAuthor (id: $id) {\n            id\n            follower {\n                id\n            }\n            following {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetFollowedAuthor ($id: ID!) {\n        followedAuthor (id: $id) {\n            id\n            follower {\n                id\n            }\n            following {\n                id\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetFollowers ($limit: Int $cursor: ID $followingId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followingId: $followingId) {\n            id\n            ...FollowedByFragment\n        }\n    }\n"): (typeof documents)["\n    query GetFollowers ($limit: Int $cursor: ID $followingId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followingId: $followingId) {\n            id\n            ...FollowedByFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetFollowing ($limit: Int $cursor: ID $followerId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followerId: $followerId) {\n            id\n            ...FollowingFragment\n        }\n    }\n"): (typeof documents)["\n    query GetFollowing ($limit: Int $cursor: ID $followerId: ID) {\n        followedAuthors(limit: $limit cursor: $cursor followerId: $followerId) {\n            id\n            ...FollowingFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetLike ($id: ID!) {\n        like (id: $id) {\n           id\n           author {\n               id\n               ...AuthorSimpleFragment\n           }\n           poem {\n               id\n               ...PoemFragment\n           }\n        }\n    }\n"): (typeof documents)["\n    query GetLike ($id: ID!) {\n        like (id: $id) {\n           id\n           author {\n               id\n               ...AuthorSimpleFragment\n           }\n           poem {\n               id\n               ...PoemFragment\n           }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetLikedPoems ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikedPoemFragment\n        }\n    }\n"): (typeof documents)["\n    query GetLikedPoems ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikedPoemFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetLikesForPoem ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikeFragment\n        }\n    }\n"): (typeof documents)["\n    query GetLikesForPoem ($limit: Int $cursor: ID $poemId: ID $authorId: ID) {\n        likes(limit: $limit cursor: $cursor poemId: $poemId authorId: $authorId) {\n            id\n            ...LikeFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSavedPoem ($id: ID!) {\n        savedPoem(id: $id) {\n            id\n            author {\n                id\n                ...AuthorSimpleFragment\n            }\n            poem {\n                id\n                ...PoemFragment\n            }\n            dateSaved\n        }\n    }\n"): (typeof documents)["\n    query GetSavedPoem ($id: ID!) {\n        savedPoem(id: $id) {\n            id\n            author {\n                id\n                ...AuthorSimpleFragment\n            }\n            poem {\n                id\n                ...PoemFragment\n            }\n            dateSaved\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSavedPoems ($limit: Int, $cursor: ID, $poemId: ID, $authorId: ID) {\n        savedPoems(limit: $limit, cursor: $cursor, poemId: $poemId, authorId: $authorId) {\n            id\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            dateSaved\n        }\n    }\n"): (typeof documents)["\n    query GetSavedPoems ($limit: Int, $cursor: ID, $poemId: ID, $authorId: ID) {\n        savedPoems(limit: $limit, cursor: $cursor, poemId: $poemId, authorId: $authorId) {\n            id\n            poem {\n                ...PoemFragment\n            }\n            author {\n                ...AuthorSimpleFragment\n            }\n            dateSaved\n        }\n    }\n"];
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
export function gql(source: "\n  query GetPoems($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPoems($first: Int, $after: ID, $filter: GetPoemsFilter) {\n    poems(first: $first, after: $after, filter: $filter) {\n      edges {\n          node {\n            id\n            ...PoemCardFragment\n          }\n          cursor\n      }\n      pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          pageSize\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;