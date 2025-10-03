import { Resolvers } from "../__generated__/types.js";

export const Query: Resolvers["Query"] = {
  poem: (_, { id }, { dataSources, services }) => {
    // return dataSources, services.poemAPI.getPoem({ id });
    return services.poemService.getPoem({ id });
  },

  poems: (_, { limit, cursor, filter }, { dataSources, services }) => {
    // return dataSources.poemAPI.getPoems({ cursor, limit, filter });
    return services.poemService.getPoems({ cursor, limit, filter });
  },

  authorById: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({ id });
    return services.authorService.getAuthorById({ id });
  },

  authors: (
    _,
    { limit, cursor, usernameContains },
    { dataSources, services },
  ) => {
    // return dataSources.poemAPI.getAuthors({
    //   limit,
    //   cursor,
    //   usernameContains,
    // });
    return services.authorService.getAuthors({
      limit,
      cursor,
      usernameContains,
    });
  },

  comment: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getComment({ id });
    return services.commentService.getComment({ id });
  },

  comments: (
    _,
    { limit, cursor, authorId, poemId },
    { dataSources, services },
  ) => {
    // return dataSources.poemAPI.getComments({
    //   limit,
    //   cursor,
    //   authorId,
    //   poemId,
    // });
    return services.commentService.getComments({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  authorByUsername: (_, { username }, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorByUsername({
    //   username,
    // });
    return services.authorService.getAuthorByUsername({
      username,
    });
  },

  collection: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getCollection({ id });
    return services.collectionService.getCollection({ id });
  },

  collections: (_, { limit, cursor, filter }, { dataSources, services }) => {
    // return dataSources.poemAPI.getCollections({ limit, cursor, filter });
    return services.collectionService.getCollections({ limit, cursor, filter });
  },

  like: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getLike({ id });
    return services.likeService.getLike({ id });
  },

  likes: (
    _,
    { limit, cursor, authorId, poemId },
    { dataSources, services },
  ) => {
    // return dataSources.poemAPI.getLikes({ limit, cursor, authorId, poemId });
    return services.likeService.getLikes({ limit, cursor, authorId, poemId });
  },

  savedPoem: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getSavedPoem({ id });
    return services.savedPoemService.getSavedPoem({ id });
  },

  savedPoems: (
    _,
    { limit, cursor, authorId, poemId },
    { dataSources, services },
  ) => {
    // return dataSources.poemAPI.getSavedPoems({
    //   limit,
    //   cursor,
    //   authorId,
    //   poemId,
    // });
    return services.savedPoemService.getSavedPoems({
      limit,
      cursor,
      authorId,
      poemId,
    });
  },

  followedAuthor: (_, { id }, { dataSources, services }) => {
    // return dataSources.poemAPI.getFollowedAuthor({ id });
    return services.followedAuthorService.getFollowedAuthor({ id });
  },

  followedAuthors: (
    _,
    { limit, cursor, followerId, followingId },
    { dataSources, services },
  ) => {
    // return dataSources.poemAPI.getFollowedAuthors({
    //   limit,
    //   cursor,
    //   followerId,
    //   followingId,
    // });
    return services.followedAuthorService.getFollowedAuthors({
      limit,
      cursor,
      followerId,
      followingId,
    });
  },

  me: async (_, __, { user, dataSources, services }) => {
    if (!user || user === null) {
      throw new Error("Not authenticated");
    }

    // const author = await dataSources.poemAPI.getAuthorById({
    //   id: user.authorId,
    //   omitAuthVersion: false,
    // });
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
