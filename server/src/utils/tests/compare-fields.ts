import {
  CollectionWithRelations,
  CommentWithRelations,
  FollowedAuthorWithRelations,
  LikeWithRelations,
  PoemWithRelations,
  SafeAuthor,
  SavedPoemWithRelations,
} from "../../types/extended-types.js";

export const compareAuthorFields = (
  author1: SafeAuthor,
  author2: SafeAuthor,
) => {
  expect(author1.id).toStrictEqual(author2.id);
  expect(author1.username).toStrictEqual(author2.username);
  expect(author1.email).toStrictEqual(author2.email);
  expect(author1.password).toStrictEqual(author2.password);
  expect(author1.authVersion).toStrictEqual(author2.authVersion);
  expect(author1.dateJoined).toStrictEqual(author2.dateJoined);
};

export const comparePoemFields = (
  poem1: PoemWithRelations,
  poem2: PoemWithRelations,
) => {
  expect(poem1.id).toStrictEqual(poem2.id);
  expect(poem1.title).toStrictEqual(poem2.title);
  expect(poem1.text).toStrictEqual(poem2.text);
  expect(poem1.datePublished).toStrictEqual(poem2.datePublished);
  expect(poem1.authorId).toStrictEqual(poem2.authorId);
  expect(poem1.collectionId).toStrictEqual(poem2.collectionId);
  expect(poem1.views).toStrictEqual(poem2.views);
};

export const compareCommentFields = (
  comment1: CommentWithRelations,
  comment2: CommentWithRelations,
) => {
  expect(comment1.id).toStrictEqual(comment2.id);
  expect(comment1.text).toStrictEqual(comment2.text);
  expect(comment1.datePublished).toStrictEqual(comment2.datePublished);
  expect(comment1.authorId).toStrictEqual(comment2.authorId);
  expect(comment1.poemId).toStrictEqual(comment2.poemId);
};

export const compareCollectionFields = (
  collection1: CollectionWithRelations,
  collection2: CollectionWithRelations,
) => {
  expect(collection1.id).toStrictEqual(collection2.id);
  expect(collection1.title).toStrictEqual(collection2.title);
  expect(collection1.dateCreated).toStrictEqual(collection2.dateCreated);
  expect(collection1.authorId).toStrictEqual(collection2.authorId);
};

export const compareLikeFields = (
  like1: LikeWithRelations,
  like2: LikeWithRelations,
) => {
  expect(like1.id).toStrictEqual(like2.id);
  expect(like1.datePublished).toStrictEqual(like2.datePublished);
  expect(like1.authorId).toStrictEqual(like2.authorId);
  expect(like1.poemId).toStrictEqual(like2.poemId);
};

export const compareSavedPoemFields = (
  savedPoem1: SavedPoemWithRelations,
  savedPoem2: SavedPoemWithRelations,
) => {
  expect(savedPoem1.id).toStrictEqual(savedPoem2.id);
  expect(savedPoem1.dateSaved).toStrictEqual(savedPoem2.dateSaved);
  expect(savedPoem1.authorId).toStrictEqual(savedPoem2.authorId);
  expect(savedPoem1.poemId).toStrictEqual(savedPoem2.poemId);
};

export const compareFollowedAuthorFields = (
  followedAuthor1: FollowedAuthorWithRelations,
  followedAuthor2: FollowedAuthorWithRelations,
) => {
  expect(followedAuthor1.id).toStrictEqual(followedAuthor2.id);
  expect(followedAuthor1.dateFollowed).toStrictEqual(
    followedAuthor2.dateFollowed,
  );
  expect(followedAuthor1.followerId).toStrictEqual(followedAuthor2.followerId);
  expect(followedAuthor1.followingId).toStrictEqual(
    followedAuthor2.followingId,
  );
};
