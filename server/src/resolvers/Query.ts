import { Resolvers } from "../__generated__/types.js";

export const Query: Resolvers["Query"] = {
  poem: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getPoem({ id });
  },

  poems: (_, { limit, cursor, filter }, { dataSources }) => {
    return dataSources.poemAPI.getPoems({ cursor, limit, filter });
  },

  authorById: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({ id });
  },

  authors: (_, { limit, cursor, usernameContains }, { dataSources }) => {
    return dataSources.poemAPI.getAuthors({
      limit,
      cursor,
      usernameContains,
    });
  },

  comment: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getComment({ id });
  },

  comments: (_, { limit, cursor, authorId, poemId }, { dataSources }) => {
    return dataSources.poemAPI.getComments({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  authorByUsername: (_, { username }, { dataSources }) => {
    return dataSources.poemAPI.getAuthorByUsername({
      username,
    });
  },

  collection: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getCollection({ id });
  },

  collections: (_, { limit, cursor, filter }, { dataSources }) => {
    return dataSources.poemAPI.getCollections({ limit, cursor, filter });
  },

  like: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getLike({ id });
  },

  likes: (_, { limit, cursor, authorId, poemId }, { dataSources }) => {
    return dataSources.poemAPI.getLikes({ limit, cursor, authorId, poemId });
  },

  savedPoem: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getSavedPoem({ id });
  },

  savedPoems: (_, { limit, cursor, authorId, poemId }, { dataSources }) => {
    return dataSources.poemAPI.getSavedPoems({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  followedAuthor: (_, { id }, { dataSources }) => {
    return dataSources.poemAPI.getFollowedAuthor({ id });
  },

  followedAuthors: (
    _,
    { limit, cursor, followerId, followingId },
    { dataSources },
  ) => {
    return dataSources.poemAPI.getFollowedAuthors({
      limit,
      cursor,
      followerId,
      followingId,
    });
  },

  me: async (_, __, { user, dataSources }) => {
    if (!user || user === null) {
      throw new Error("Not authenticated");
    }

    const author = await dataSources.poemAPI.getAuthorById({
      id: user.authorId,
      omitAuthVersion: false,
    });

    if (!author) {
      throw new Error("user not found");
    }

    if (!(author.authVersion === user.authVersion)) {
      throw new Error("token no longer valid");
    }

    const { authVersion, ...authorWithoutAuthVersion } = author;
    return authorWithoutAuthVersion;
  },
};
