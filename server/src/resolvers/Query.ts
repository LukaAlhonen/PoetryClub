import { Resolvers } from "../__generated__/types.js";

export const Query: Resolvers["Query"] = {
  poem: (_, { id }, { services }) => {
    return services.poemService.getPoem({ id });
  },

  poems: (_, { first, after, filter }, { services }) => {
    return services.poemService.getPoemsConnection({ first, after, filter });
  },

  authorById: (_, { id }, { services }) => {
    return services.authorService.getAuthorById({ id });
  },

  authors: (
    _,
    { first, after, usernameContains },
    { services },
  ) => {
    return services.authorService.getAuthorsConnection({
      first,
      after,
      usernameContains,
    });
  },

  comment: (_, { id }, { services }) => {
    return services.commentService.getComment({ id });
  },

  comments: (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    return services.commentService.getCommentsConnection({
      first,
      after,
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

  collections: (_, { first, after, filter }, { services }) => {
    return services.collectionService.getCollectionsConnection({ first, after, filter });
  },

  like: (_, { id }, { services }) => {
    return services.likeService.getLike({ id });
  },

  likes: (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    return services.likeService.getLikesConnection({ first, after, authorId, poemId });
  },

  savedPoem: (_, { id }, { services }) => {
    return services.savedPoemService.getSavedPoem({ id });
  },

  savedPoems: (
    _,
    { first, after, authorId, poemId },
    { services },
  ) => {
    return services.savedPoemService.getSavedPoemsConnection({
      first,
      after,
      authorId,
      poemId,
    });
  },

  followedAuthor: (_, { id }, { services }) => {
    return services.followedAuthorService.getFollowedAuthor({ id });
  },

  followedAuthors: (
    _,
    { first, after, followerId, followingId },
    { services },
  ) => {
    return services.followedAuthorService.getFollowedAuthorsConnection({
      first,
      after,
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
