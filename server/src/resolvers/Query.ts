import { Resolvers } from "../__generated__/types.js";

export const Query: Resolvers["Query"] = {
  poem: (_, { id }, { services }) => {
    return services.poemService.getPoem({ id });
  },

  poems: (_, { limit, cursor, filter }, { services }) => {
    return services.poemService.getPoems({ cursor, limit, filter });
  },

  authorById: (_, { id }, { services }) => {
    return services.authorService.getAuthorById({ id });
  },

  authors: (
    _,
    { limit, cursor, usernameContains },
    { services },
  ) => {
    return services.authorService.getAuthors({
      limit,
      cursor,
      usernameContains,
    });
  },

  comment: (_, { id }, { services }) => {
    return services.commentService.getComment({ id });
  },

  comments: (
    _,
    { limit, cursor, authorId, poemId },
    { services },
  ) => {
    return services.commentService.getComments({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  authorByUsername: (_, { username }, { services }) => {
    return services.authorService.getAuthorByUsername({
      username,
    });
  },

  collection: (_, { id }, { services }) => {
    return services.collectionService.getCollection({ id });
  },

  collections: (_, { limit, cursor, filter }, { services }) => {
    return services.collectionService.getCollections({ limit, cursor, filter });
  },

  like: (_, { id }, { services }) => {
    return services.likeService.getLike({ id });
  },

  likes: (
    _,
    { limit, cursor, authorId, poemId },
    { services },
  ) => {
    return services.likeService.getLikes({ limit, cursor, authorId, poemId });
  },

  savedPoem: (_, { id }, { services }) => {
    return services.savedPoemService.getSavedPoem({ id });
  },

  savedPoems: (
    _,
    { limit, cursor, authorId, poemId },
    { services },
  ) => {
    return services.savedPoemService.getSavedPoems({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  followedAuthor: (_, { id }, { services }) => {
    return services.followedAuthorService.getFollowedAuthor({ id });
  },

  followedAuthors: (
    _,
    { limit, cursor, followerId, followingId },
    { services },
  ) => {
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followerId,
      followingId,
    });
  },

  me: async (_, __, { user, services }) => {
    if (!user || user === null) {
      throw new Error("Not authenticated");
    }

    const author = await services.authorService.getAuthorById({
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
